import { Resend } from "resend";

// Keep reminder delivery on the same Resend account used by confirmation emails.
export const reminderResend = new Resend(process.env.RESEND_API_KEY);

// Reminder emails display all event times in the application's Lagos timezone.
const EVENT_TIME_ZONE = "Africa/Lagos";

// Escape Sanity and registration values before inserting them into email HTML.
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] || character);
}

// Format the event date independently from its reminder delivery timestamp.
function formatEventDate(startDateTime: string) {
  return new Date(startDateTime).toLocaleDateString("en-NG", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    timeZone: EVENT_TIME_ZONE,
  });
}

// Format a clear 12-hour event time and identify it as West Africa Time.
function formatEventTime(startDateTime: string) {
  const time = new Date(startDateTime).toLocaleTimeString("en-NG", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: EVENT_TIME_ZONE,
  });
  return `${time.toUpperCase()} WAT`;
}

// Render a dedicated online-event reminder with a safe meeting-link fallback.
function onlineReminderTemplate(options: {
  name: string;
  registrationId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  meetingLink: string;
}) {
  const name = escapeHtml(options.name);
  const eventName = escapeHtml(options.eventName);
  const eventDate = escapeHtml(options.eventDate);
  const eventTime = escapeHtml(options.eventTime);
  const registrationId = escapeHtml(options.registrationId);
  const meetingLink = escapeHtml(options.meetingLink);

  return `
    <div style="background:#f4f6f8;padding:32px 16px;font-family:Arial,sans-serif;color:#111827">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
        <h1 style="margin:0 0 20px;font-size:24px;color:#111827">Your online event is tomorrow</h1>
        <p style="font-size:16px;line-height:1.6">Hello ${name},</p>
        <p style="font-size:16px;line-height:1.6">This is a reminder that you are registered for <strong>${eventName}</strong>.</p>
        <div style="margin:24px 0;padding:20px;background:#f8fafc;border-left:4px solid #E11D2E">
          <p style="margin:0 0 8px"><strong>Date:</strong> ${eventDate}</p>
          <p style="margin:0 0 8px"><strong>Time:</strong> ${eventTime}</p>
          <p style="margin:0"><strong>Registration ID:</strong> ${registrationId}</p>
        </div>
        <a href="${meetingLink}" style="display:inline-block;background:#E11D2E;color:#ffffff;padding:14px 24px;border-radius:8px;text-decoration:none;font-weight:700">Join the online event</a>
        <p style="margin-top:20px;font-size:13px;line-height:1.5;color:#6b7280">If the button does not work, copy and open this link:<br><a href="${meetingLink}" style="color:#2563eb;word-break:break-all">${meetingLink}</a></p>
        <p style="margin-top:28px;font-size:16px;line-height:1.6">Please make the necessary preparations. We look forward to having you.</p>
      </div>
    </div>
  `;
}

// Render a dedicated in-person reminder containing the physical venue.
function inPersonReminderTemplate(options: {
  name: string;
  registrationId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
}) {
  const name = escapeHtml(options.name);
  const eventName = escapeHtml(options.eventName);
  const eventDate = escapeHtml(options.eventDate);
  const eventTime = escapeHtml(options.eventTime);
  const registrationId = escapeHtml(options.registrationId);
  const venue = escapeHtml(options.venue);

  return `
    <div style="background:#f4f6f8;padding:32px 16px;font-family:Arial,sans-serif;color:#111827">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px">
        <h1 style="margin:0 0 20px;font-size:24px;color:#111827">Your event is in 5 days</h1>
        <p style="font-size:16px;line-height:1.6">Hello ${name},</p>
        <p style="font-size:16px;line-height:1.6">This is a reminder that you are registered for <strong>${eventName}</strong>.</p>
        <div style="margin:24px 0;padding:20px;background:#f8fafc;border-left:4px solid #E11D2E">
          <p style="margin:0 0 8px"><strong>Date:</strong> ${eventDate}</p>
          <p style="margin:0 0 8px"><strong>Time:</strong> ${eventTime}</p>
          <p style="margin:0 0 8px"><strong>Venue:</strong> ${venue}</p>
          <p style="margin:0"><strong>Registration ID:</strong> ${registrationId}</p>
        </div>
        <p style="margin-top:28px;font-size:16px;line-height:1.6">Please make the necessary preparations. We look forward to having you.</p>
      </div>
    </div>
  `;
}

// Schedule exactly one Resend email for a future online or in-person event reminder.
export async function scheduleReminderEmail(options: {
  to: string;
  name: string;
  registrationId: string;
  eventName: string;
  startDateTime: string;
  meetingType: "online" | "in-person";
  meetingLink?: string;
  venue?: string;
  scheduledAt: Date;
  idempotencyKey: string;
}) {
  if (options.scheduledAt.getTime() <= Date.now()) {
    console.info(`Reminder skipped because its schedule is in the past: ${options.registrationId}`);
    return null;
  }

  const eventDate = formatEventDate(options.startDateTime);
  const eventTime = formatEventTime(options.startDateTime);
  const isOnline = options.meetingType === "online";
  if (isOnline && !options.meetingLink) throw new Error("Online event is missing its meeting link");
  if (!isOnline && !options.venue) throw new Error("In-person event is missing its location");

  const result = await reminderResend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL || "Event Registration <onboarding@resend.dev>",
      to: options.to,
      subject: isOnline
        ? `Reminder: Your online event is tomorrow - ${options.eventName}`
        : `Reminder: Your event is in 5 days - ${options.eventName}`,
      html: isOnline
        ? onlineReminderTemplate({
            name: options.name,
            registrationId: options.registrationId,
            eventName: options.eventName,
            eventDate,
            eventTime,
            meetingLink: options.meetingLink || "",
          })
        : inPersonReminderTemplate({
            name: options.name,
            registrationId: options.registrationId,
            eventName: options.eventName,
            eventDate,
            eventTime,
            venue: options.venue || "",
          }),
      scheduledAt: options.scheduledAt.toISOString(),
    },
    // Resend deduplicates retries for the same registration, event version, and schedule.
    { idempotencyKey: options.idempotencyKey },
  );

  if (result.error) throw new Error(result.error.message);
  if (!result.data?.id) throw new Error("Resend did not return a scheduled email ID");
  return { id: result.data.id };
}
