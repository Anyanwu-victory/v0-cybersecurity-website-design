import { emailLayout } from "../email-layout";
import { escapeHtml } from "../email-utils";

export function inPersonReminderTemplate(options: {
  name: string;
  registrationId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venue: string;
}) {
  const name = escapeHtml(options.name);
  const registrationId = escapeHtml(options.registrationId);
  const eventName = escapeHtml(options.eventName);
  const eventDate = escapeHtml(options.eventDate);
  const eventTime = escapeHtml(options.eventTime);
  const venue = escapeHtml(options.venue);

  return emailLayout({
    title: `Reminder: ${eventName}`,

    preheader: `${eventName} is in 5 days. Review your event details and venue.`,

    content: `
      <div style="text-align:center;margin-bottom:26px;">

        <span
          style="
            display:inline-block;
            background-color:#eff6ff;
            color:#124A8A;
            padding:7px 14px;
            border-radius:20px;
            font-size:12px;
            font-weight:700;
            text-transform:uppercase;
            letter-spacing:0.5px;
          "
        >
          Event Reminder
        </span>

        <h1
          style="
            margin:18px 0 8px;
            font-size:27px;
            line-height:1.3;
            color:#111827;
          "
        >
          Your Event Is In 5 Days
        </h1>

        <p
          style="
            margin:0;
            color:#6b7280;
            font-size:15px;
            line-height:1.6;
          "
        >
          Here are the details you need to prepare.
        </p>

      </div>


      <p
        style="
          margin:0 0 16px;
          font-size:16px;
          line-height:1.7;
          color:#111827;
        "
      >
        Hello ${name},
      </p>

      <p
        style="
          margin:0 0 22px;
          font-size:16px;
          line-height:1.7;
          color:#374151;
        "
      >
        This is a friendly reminder that you are registered for
        <strong style="color:#124A8A;">
          ${eventName}
        </strong>.
      </p>


      <!-- EVENT DETAILS -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          margin:24px 0;
          background-color:#f8fafc;
          border-left:4px solid #E11D2E;
          border-radius:8px;
        "
      >
        <tr>
          <td style="padding:20px 22px;">

            <p
              style="
                margin:0 0 14px;
                color:#111827;
                font-size:14px;
                font-weight:700;
                text-transform:uppercase;
                letter-spacing:0.5px;
              "
            >
              Event Details
            </p>

            <p
              style="
                margin:0 0 10px;
                font-size:15px;
                line-height:1.6;
                color:#374151;
              "
            >
              <strong>Date:</strong>
              ${eventDate}
            </p>

            <p
              style="
                margin:0 0 10px;
                font-size:15px;
                line-height:1.6;
                color:#374151;
              "
            >
              <strong>Time:</strong>
              ${eventTime}
            </p>

            <p
              style="
                margin:0 0 10px;
                font-size:15px;
                line-height:1.6;
                color:#374151;
              "
            >
              <strong>Venue:</strong>
              ${venue}
            </p>

            <p
              style="
                margin:0;
                font-size:15px;
                line-height:1.6;
                color:#374151;
              "
            >
              <strong>Registration ID:</strong>
              ${registrationId}
            </p>

          </td>
        </tr>
      </table>


      <!-- PREPARATION NOTE -->
      <div
        style="
          padding:18px 20px;
          background-color:#eff6ff;
          border-radius:8px;
          margin:26px 0;
        "
      >
        <p
          style="
            margin:0 0 8px;
            color:#124A8A;
            font-size:14px;
            font-weight:700;
          "
        >
          Before the event
        </p>

        <p
          style="
            margin:0;
            color:#374151;
            font-size:14px;
            line-height:1.6;
          "
        >
          Please review the venue details and plan to arrive early enough
          to complete any required check-in before the event begins.
        </p>
      </div>


      <p
        style="
          margin:28px 0 0;
          font-size:16px;
          line-height:1.7;
          color:#374151;
        "
      >
        Please make the necessary preparations. We look forward to seeing you.
      </p>

      <p
        style="
          margin:22px 0 0;
          font-size:16px;
          line-height:1.7;
          color:#111827;
        "
      >
        Regards,<br />
        <strong style="color:#E11D2E;">
          RedTrace-D Sentinel
        </strong>
      </p>
    `,
  });
}
