import { Resend } from "resend";

import { formatEventDate, formatEventTime } from "../email-utils";

import { onlineReminderTemplate } from "./online-reminder-template";

import { inPersonReminderTemplate } from "./in-person-reminder-template";

export const reminderResend = new Resend(process.env.RESEND_API_KEY);

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
    console.info(
      `Reminder skipped because its schedule is in the past: ${options.registrationId}`,
    );

    return null;
  }

  const eventDate = formatEventDate(options.startDateTime);

  const eventTime = formatEventTime(options.startDateTime);

  const isOnline = options.meetingType === "online";

  if (isOnline && !options.meetingLink) {
    throw new Error("Online event is missing its meeting link");
  }

  if (!isOnline && !options.venue) {
    throw new Error("In-person event is missing its location");
  }

  const html = isOnline
    ? onlineReminderTemplate({
        name: options.name,
        registrationId: options.registrationId,
        eventName: options.eventName,
        eventDate,
        eventTime,
        meetingLink: options.meetingLink!,
      })
    : inPersonReminderTemplate({
        name: options.name,
        registrationId: options.registrationId,
        eventName: options.eventName,
        eventDate,
        eventTime,
        venue: options.venue!,
      });

  const subject = isOnline
    ? `Reminder: ${options.eventName} is tomorrow`
    : `Reminder: ${options.eventName} is in 5 days`;

  const result = await reminderResend.emails.send(
    {
      from:
        process.env.RESEND_FROM_EMAIL ||
        "RedTrace-D Sentinel Events <events@mail.rtdsentinel.com>",

      to: [options.to],

      // Your real Zoho mailbox
      replyTo: process.env.EVENT_REPLY_TO || "support@rtdsentinel.com",

      subject,

      html,

      scheduledAt: options.scheduledAt.toISOString(),
    },

    {
      idempotencyKey: options.idempotencyKey,
    },
  );

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (!result.data?.id) {
    throw new Error("Resend did not return a scheduled email ID");
  }

  return {
    id: result.data.id,
  };
}
