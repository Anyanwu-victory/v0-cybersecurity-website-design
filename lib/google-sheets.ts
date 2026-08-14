import { google, sheets_v4 } from "googleapis";

// Administrative tab and fixed column layouts shared by all Sheet operations.
const EVENTS_TAB = "Events";
const EVENT_HEADERS = [
  "Event ID", "Event Name", "Event Slug", "Tab Name", "Category", "Price",
  "Currency", "Status", "Event Date", "Registration Deadline", "Created At", "Updated At",
];
const REGISTRATION_HEADERS = [
  "Registration ID", "Name", "Email", "Phone", "Profession", "Company",
  "Registration Type", "Amount", "Currency", "Payment Status", "Payment Reference", "Registered At",
];

// Server-resolved Sanity metadata required to locate and describe an event tab.
export interface EventSheetInfo {
  eventId: string;
  title: string;
  slug: string;
  sheetTabName: string;
  eventCategory: "free" | "paid";
  price?: number | string;
  currency?: string;
  registrationStatus: "draft" | "active" | "closed" | "archived";
  date?: string;
  registrationDeadline?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Standard A:L record written to every event registration tab.
export interface RegistrationRow {
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  company?: string;
  registrationType: "Free" | "Paid";
  amount: number;
  currency?: string;
  paymentStatus: "Not Required" | "Pending" | "Paid" | "Failed" | "Refunded";
  paymentReference?: string;
  registeredAt: string;
}

// Build an authenticated Sheets client from the service-account JSON environment variable.
async function getSheetClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!credentials) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// Return the configured spreadsheet ID or stop before issuing an invalid API request.
function getSpreadsheetId() {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) throw new Error("GOOGLE_SHEET_ID is not configured");
  return spreadsheetId;
}

// Quote apostrophes so generated A1 ranges remain valid for the assigned tab name.
function quotedTab(tabName: string) {
  return `'${tabName.replace(/'/g, "''")}'`;
}

// Find a worksheet by its exact Sanity-assigned title.
async function getTab(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tabName: string,
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties",
  });
  return spreadsheet.data.sheets?.find((sheet) => sheet.properties?.title === tabName) || null;
}

// Write the canonical header row with RAW input semantics.
async function ensureHeaders(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  tabName: string,
  headers: string[],
) {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${quotedTab(tabName)}!A1:${String.fromCharCode(64 + headers.length)}1`,
    valueInputOption: "RAW",
    requestBody: { values: [headers] },
  });
}

// Create a missing event tab and keep its headers, filter, and frozen row consistent.
export async function ensureEventTab(event: EventSheetInfo) {
  const sheets = await getSheetClient();
  const spreadsheetId = getSpreadsheetId();
  let sheet = await getTab(sheets, spreadsheetId, event.sheetTabName);

  if (!sheet) {
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: event.sheetTabName } } }],
      },
    });
    sheet = response.data.replies?.[0]?.addSheet || null;
  }

  const sheetId = sheet?.properties?.sheetId;
  if (sheetId === undefined || sheetId === null) throw new Error("Unable to resolve event Sheet tab");

  await ensureHeaders(sheets, spreadsheetId, event.sheetTabName, REGISTRATION_HEADERS);
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateSheetProperties: {
            properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount",
          },
        },
        {
          setBasicFilter: {
            filter: { range: { sheetId, startRowIndex: 0, startColumnIndex: 0, endColumnIndex: 12 } },
          },
        },
      ],
    },
  });

  return { tabName: event.sheetTabName, sheetId };
}

// Insert or update the event's metadata row in the permanent Events index tab.
export async function upsertEventIndex(event: EventSheetInfo) {
  const sheets = await getSheetClient();
  const spreadsheetId = getSpreadsheetId();
  const eventsTab = await getTab(sheets, spreadsheetId, EVENTS_TAB);
  if (!eventsTab) throw new Error(`Required '${EVENTS_TAB}' tab was not found`);
  await ensureHeaders(sheets, spreadsheetId, EVENTS_TAB, EVENT_HEADERS);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${quotedTab(EVENTS_TAB)}!A:L`,
  });
  const rows = response.data.values || [];
  const rowIndex = rows.slice(1).findIndex((row) => row[0] === event.eventId);
  const now = new Date().toISOString();
  const existingCreatedAt = rowIndex >= 0 ? rows[rowIndex + 1]?.[10] : undefined;
  const values = [[
    event.eventId,
    event.title,
    event.slug,
    event.sheetTabName,
    event.eventCategory,
    event.eventCategory === "paid" ? Number(event.price || 0) : 0,
    event.eventCategory === "paid" ? event.currency || "NGN" : "",
    event.registrationStatus,
    event.date || "",
    event.registrationDeadline || "",
    existingCreatedAt || event.createdAt || now,
    event.updatedAt || now,
  ]];

  if (rowIndex >= 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${quotedTab(EVENTS_TAB)}!A${rowIndex + 2}:L${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: { values },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${quotedTab(EVENTS_TAB)}!A:L`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });
  }
}

// Provision the event structure, sync its index entry, and append one registration.
export async function appendRegistration(event: EventSheetInfo, row: RegistrationRow) {
  await ensureEventTab(event);
  await upsertEventIndex(event);
  const sheets = await getSheetClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: `${quotedTab(event.sheetTabName)}!A:L`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        row.registrationId, row.fullName, row.email, row.phone, row.profession,
        row.company || "", row.registrationType, row.amount, row.currency || "",
        row.paymentStatus, row.paymentReference || "", row.registeredAt,
      ]],
    },
  });
}

// Read only the registration rows belonging to the resolved event tab.
async function readRegistrationRows(event: EventSheetInfo) {
  const sheets = await getSheetClient();
  // A paid success page can arrive before its webhook has created the event tab.
  const tab = await getTab(sheets, getSpreadsheetId(), event.sheetTabName);
  if (!tab) return [];
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: `${quotedTab(event.sheetTabName)}!A:L`,
  });
  return (response.data.values || []).slice(1);
}

// Enforce one email per event and prevent reuse of a Paystack payment reference.
export async function registrationExists(event: EventSheetInfo, email: string, paymentReference?: string) {
  const rows = await readRegistrationRows(event);
  return rows.some((row) =>
    String(row[2] || "").toLowerCase() === email.toLowerCase()
    || (!!paymentReference && row[10] === paymentReference),
  );
}

// Stored rows use the same normalized shape as new registration writes.
export interface StoredRegistration extends RegistrationRow {}

// Locate a registration by its application ID or Paystack reference in one event tab.
export async function findRegistration(event: EventSheetInfo, registrationId: string): Promise<StoredRegistration | null> {
  const rows = await readRegistrationRows(event);
  const row = rows.find((candidate) => candidate[0] === registrationId || candidate[10] === registrationId);
  if (!row) return null;
  return {
    registrationId: row[0] || "",
    fullName: row[1] || "",
    email: row[2] || "",
    phone: row[3] || "",
    profession: row[4] || "",
    company: row[5] || "",
    registrationType: row[6] === "Paid" ? "Paid" : "Free",
    amount: Number(row[7] || 0),
    currency: row[8] || "",
    paymentStatus: row[9] || "Not Required",
    paymentReference: row[10] || "",
    registeredAt: row[11] || "",
  };
}
