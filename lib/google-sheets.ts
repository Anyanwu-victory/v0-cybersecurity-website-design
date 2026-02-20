import { google } from "googleapis";

export interface RegistrationRow {
  timestamp: string;
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  profession: string;
  status: string;
}

async function getSheetClient() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
 
  if (!privateKey) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY Missing KEY credentials in environment variables");
  }

  console.log("✅ Credentials loaded");

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(privateKey),  // ← Parsing happens here
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendToSheet(row: RegistrationRow) {
  const sheets = await getSheetClient();
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID is not set in environment variables");
  }

  const values = [
    [
      row.timestamp,
      row.eventId,
      row.fullName,
      row.email,
      row.phone,
      row.company || "",
      row.profession,
      row.status,
    ],
  ];

  try {
    console.log("📝 Appending to sheet...");
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("✅ Successfully appended to sheet:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Error appending to sheet:", error);
    console.error("Error details:", error.message);
    
    if (error.code === 404) {
      throw new Error("Sheet not found. Check your GOOGLE_SHEET_ID");
    } else if (error.code === 403) {
      throw new Error("Permission denied. Make sure the service account has access to the sheet");
    } else {
      throw new Error(`Failed to save registration: ${error.message}`);
    }
  }
}