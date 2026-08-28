// lib/email/email-utils.ts

export const EVENT_TIME_ZONE = "Africa/Lagos";

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}

export function formatEventDate(startDateTime: string) {
  return new Date(startDateTime).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: EVENT_TIME_ZONE,
  });
}

export function formatEventTime(startDateTime: string) {
  const time = new Date(startDateTime).toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: EVENT_TIME_ZONE,
  });

  return `${time.toUpperCase()} WAT`;
}

export function safeUrl(value: string) {
  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid URL protocol");
    }

    return url.toString();
  } catch {
    throw new Error("Invalid meeting link");
  }
}
