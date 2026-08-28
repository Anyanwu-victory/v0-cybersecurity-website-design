export function getGoogleCalendarUrl({
  title,
  start,
  end,
  description,
  location,
}: {
  title: string
  start: Date
  end: Date
  description?: string
  location?: string
}) {
  const formatDate = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: description || "",
    location: location || "",
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}