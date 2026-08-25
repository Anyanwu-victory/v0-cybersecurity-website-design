import { reminderResend, scheduleReminderEmail } from "@/lib/email-templates/reminder";
import { getReminderDetails, updateReminderStatus } from "@/lib/google-sheets";

// Sanity event types map directly to their fixed reminder offsets in days.
const REMINDER_OFFSETS = {
  online: 1,
  "in-person": 5,
} as const;

// Reminder scheduling needs only authoritative event fields resolved from Sanity.
export interface ReminderEvent {
  title: string;
  startDateTime?: string;
  eventType?: "online" | "in-person";
  meetingLink?: string;
  location?: string;
  updatedAt?: string;
}

// Calculate delivery from the event start rather than from registration time.
export function calculateReminderDate(
  startDateTime: string,
  eventType: "online" | "in-person",
) {
  const eventStartsAt = new Date(startDateTime);
  if (Number.isNaN(eventStartsAt.getTime())) throw new Error("Event start date is invalid");
  const offsetMilliseconds = REMINDER_OFFSETS[eventType] * 24 * 60 * 60 * 1000;
  return new Date(eventStartsAt.getTime() - offsetMilliseconds);
}

// Schedule and persist one reminder without allowing failure to undo registration.
export async function scheduleRegistrationReminder(options: {
  eventId: string;
  registrationId: string;
  registrantEmail: string;
  registrantName: string;
  event: ReminderEvent;
}) {
  let scheduledAt = "";

  try {
    // A persisted scheduled reminder proves this registration has already been processed.
    const existing = await getReminderDetails(options.eventId, options.registrationId);
    if (existing?.resendEmailId && existing.status === "SCHEDULED") return existing;

    if (!options.event.startDateTime) throw new Error("Event is missing startDateTime");
    if (!options.event.eventType) throw new Error("Event is missing eventType");
    const reminderDate = calculateReminderDate(
      options.event.startDateTime,
      options.event.eventType,
    );
    scheduledAt = reminderDate.toISOString();

    if (reminderDate.getTime() <= Date.now()) {
      // Past reminders are recorded but never sent as misleading late notifications.
      await updateReminderStatus(
        options.eventId, options.registrationId, "", scheduledAt, "CANCELLED",
      );
      return null;
    }

    // Event updatedAt lets a genuinely changed event receive a new idempotency identity.
    const eventVersion = options.event.updatedAt || "initial";
    const idempotencyKey = [
      "event-reminder", options.eventId, options.registrationId, scheduledAt, eventVersion,
    ].join(":");
    const result = await scheduleReminderEmail({
      to: options.registrantEmail,
      name: options.registrantName,
      registrationId: options.registrationId,
      eventName: options.event.title,
      startDateTime: options.event.startDateTime,
      meetingType: options.event.eventType,
      meetingLink: options.event.meetingLink,
      venue: options.event.location,
      scheduledAt: reminderDate,
      idempotencyKey,
    });

    if (!result) {
      await updateReminderStatus(
        options.eventId, options.registrationId, "", scheduledAt, "CANCELLED",
      );
      return null;
    }

    await updateReminderStatus(
      options.eventId, options.registrationId, result.id, scheduledAt, "SCHEDULED",
    );
    return { resendEmailId: result.id, status: "SCHEDULED" as const };
  } catch (error) {
    // A secondary Sheet failure is logged without hiding the original scheduling error.
    try {
      await updateReminderStatus(
        options.eventId, options.registrationId, "", scheduledAt, "FAILED",
      );
    } catch (statusError) {
      console.error("Unable to record failed reminder status:", statusError);
    }
    console.error("Unable to schedule registration reminder:", error);
    return null;
  }
}

// Cancel a pending Resend email before replacing it with updated event information.
export async function cancelAndRescheduleReminder(options: {
  eventId: string;
  registrationId: string;
  registrantEmail: string;
  registrantName: string;
  event: ReminderEvent;
}) {
  const existing = await getReminderDetails(options.eventId, options.registrationId);
  if (existing?.resendEmailId && existing.status === "SCHEDULED") {
    try {
      const cancellation = await reminderResend.emails.cancel(existing.resendEmailId);
      if (cancellation.error) throw new Error(cancellation.error.message);
      await updateReminderStatus(
        options.eventId,
        options.registrationId,
        existing.resendEmailId,
        existing.scheduledAt,
        "CANCELLED",
      );
    } catch (error) {
      // An already-sent or otherwise non-cancellable email must not produce a duplicate.
      console.error("Unable to cancel the existing scheduled reminder:", error);
      return null;
    }
  }

  return scheduleRegistrationReminder(options);
}
