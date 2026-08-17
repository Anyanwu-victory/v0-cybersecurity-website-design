// lib/calendar.ts

interface CalendarEventOptions {
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate?: string; // ISO string, defaults to 1hr after start
  location?: string;
  meetingLink?: string;
}

// Google Calendar link — opens in browser, one click to add
export function generateGoogleCalendarLink(
  options: CalendarEventOptions,
): string {
  const start = new Date(options.startDate);
  const end = options.endDate
    ? new Date(options.endDate)
    : new Date(start.getTime() + 60 * 60 * 1000); // default 1hr

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const location = options.meetingLink || options.location || "";

  const description = [
    options.description,
    options.meetingLink ? `Join here: ${options.meetingLink}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: options.title,
    dates: `${format(start)}/${format(end)}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}

// .ics file — works with Apple Calendar, Outlook, everything
export function generateICSContent(options: CalendarEventOptions): string {
  const start = new Date(options.startDate);
  const end = options.endDate
    ? new Date(options.endDate)
    : new Date(start.getTime() + 60 * 60 * 1000);

  const format = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const description = [
    options.description,
    options.meetingLink ? `Join here: ${options.meetingLink}` : "",
  ]
    .filter(Boolean)
    .join("\\n\\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//YourApp//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `SUMMARY:${options.title}`,
    `DTSTART:${format(start)}`,
    `DTEND:${format(end)}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${options.meetingLink || options.location || ""}`,
    `UID:${Date.now()}@yourdomain.com`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
