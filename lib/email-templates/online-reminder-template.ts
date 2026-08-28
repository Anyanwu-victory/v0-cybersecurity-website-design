import { emailLayout } from "../email-layout";
import { escapeHtml, safeUrl } from "../email-utils";

export function onlineReminderTemplate(options: {
  name: string;
  registrationId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  meetingLink: string;
}) {
  const name = escapeHtml(options.name);
  const registrationId = escapeHtml(options.registrationId);
  const eventName = escapeHtml(options.eventName);
  const eventDate = escapeHtml(options.eventDate);
  const eventTime = escapeHtml(options.eventTime);

  const meetingLink = safeUrl(options.meetingLink);
  const safeMeetingLink = escapeHtml(meetingLink);

  return emailLayout({
    title: `Reminder: ${eventName}`,

    preheader: `${eventName} starts tomorrow. Your access details are inside.`,

    content: `
      <div style="text-align:center;margin-bottom:26px;">

        <span
          style="
            display:inline-block;
            background-color:#fef2f2;
            color:#E11D2E;
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
          Your Online Event Is Tomorrow
        </h1>

        <p
          style="
            margin:0;
            color:#6b7280;
            font-size:15px;
            line-height:1.6;
          "
        >
          Everything you need to join is below.
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
              <strong>Date:</strong> ${eventDate}
            </p>

            <p
              style="
                margin:0 0 10px;
                font-size:15px;
                line-height:1.6;
                color:#374151;
              "
            >
              <strong>Time:</strong> ${eventTime}
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


      <!-- CTA -->
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="margin:28px 0;"
      >
        <tr>
          <td align="center">

            <a
              href="${safeMeetingLink}"
              target="_blank"
              style="
                display:inline-block;
                background-color:#E11D2E;
                color:#ffffff;
                padding:15px 28px;
                border-radius:8px;
                text-decoration:none;
                font-size:15px;
                font-weight:700;
              "
            >
              Join the Online Event
            </a>

          </td>
        </tr>
      </table>


      <p
        style="
          margin:0 0 24px;
          font-size:13px;
          line-height:1.6;
          color:#6b7280;
        "
      >
        If the button does not work, copy and paste this link into your browser:
        <br />

        <a
          href="${safeMeetingLink}"
          style="
            color:#124A8A;
            word-break:break-all;
          "
        >
          ${safeMeetingLink}
        </a>
      </p>


      <div
        style="
          padding:16px 18px;
          background-color:#eff6ff;
          border-radius:8px;
          margin-top:24px;
        "
      >
        <p
          style="
            margin:0;
            color:#374151;
            font-size:14px;
            line-height:1.6;
          "
        >
          We recommend joining a few minutes early to confirm your internet,
          audio and device setup before the session begins.
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
        We look forward to having you.
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
