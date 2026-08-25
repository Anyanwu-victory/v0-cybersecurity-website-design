import { sanity } from "@/lib/sanity";
import type { EventSheetInfo } from "@/lib/google-sheets";

// Keep every server workflow on one canonical Sanity event projection.
const EVENT_PROJECTION = `{
  "slug": slug.current,
  eventId,
  sheetTabName,
  title,
  eventCategory,
  price,
  currency,
  registrationStatus,
  date,
  startDateTime,
  endDateTime,
  eventType,
  meetingLink,
  location,
  registrationDeadline,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
}`;

// Resolve browser-facing event slugs to authoritative event metadata.
export async function getEventBySlug(slug: string): Promise<EventSheetInfo | null> {
  return sanity.client.fetch(
    `*[_type == "event" && slug.current == $slug][0]${EVENT_PROJECTION}`,
    { slug },
  );
}

// Resolve stable business IDs used by webhooks and status requests.
export async function getEventById(eventId: string): Promise<EventSheetInfo | null> {
  return sanity.client.fetch(
    `*[_type == "event" && eventId == $eventId][0]${EVENT_PROJECTION}`,
    { eventId },
  );
}

// Stop registration when Phase 1 fields have not been populated in Sanity.
export function assertEventSheetConfiguration(event: EventSheetInfo) {
  if (!event.eventId || !event.sheetTabName) {
    throw new Error("Event is missing its Event ID or Sheet tab name");
  }
}

// Apply server-side status and deadline checks for new free registrations.
export function registrationIsOpen(event: EventSheetInfo) {
  if (event.registrationStatus !== "active") return false;
  if (!event.registrationDeadline) return true;
  return new Date(event.registrationDeadline).getTime() >= Date.now();
}
