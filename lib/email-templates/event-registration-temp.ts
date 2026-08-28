// lib/email-templates/email-registration.ts
export interface RegistrationEmailOptions {
  fullName: string
  eventTitle: string
  amount: number
  currency?: string
}

export function registrationConfirmationTemplate(opts: RegistrationEmailOptions) {
  const isPaid = opts.amount > 0
  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    } as Record<string, string>)[character] || character)

  return `<!DOCTYPE html>
    <html>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #111111;
      ">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f5f5f5; padding: 30px 15px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  border: 1px solid #e5e5e5;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding: 30px 30px 20px;
                      border-top: 6px solid #e00000;
                    "
                  >
                    <img
                      src="cid:rtd-logo"
                      alt="RedTrace-D Sentinel"
                      width="180"
                      style="
                        display: block;
                        width: 180px;
                        max-width: 100%;
                        height: auto;
                      "
                    />
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td style="padding: 10px 40px 35px;">

                    <h2
                      style="
                        margin: 0 0 20px;
                        color: #e00000;
                        font-size: 26px;
                        line-height: 1.3;
                        text-align: center;
                      "
                    >
                      Registration Confirmed
                    </h2>

                    <p
                      style="
                        margin: 0 0 16px;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #111111;
                      "
                    >
                      Hi ${escapeHtml(opts.fullName)},
                    </p>

                    <p
                      style="
                        margin: 0 0 20px;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #333333;
                      "
                    >
                      Your registration for
                      <strong style="color: #0b2a5b;">
                        ${escapeHtml(opts.eventTitle)}
                      </strong>
                      has been confirmed.
                    </p>

                    ${
                      isPaid
                        ? `
                        <div
                          style="
                            background-color: #f4f7fb;
                            border-left: 4px solid #0b2a5b;
                            padding: 16px 18px;
                            margin: 20px 0;
                            border-radius: 6px;
                          "
                        >
                          <p
                            style="
                              margin: 0;
                              font-size: 15px;
                              color: #111111;
                              line-height: 1.6;
                            "
                          >
                            <strong>Payment Received</strong><br />
                            Amount:
                            <strong style="color: #e00000;">
                              ${escapeHtml(opts.currency || "NGN")}
                              ${opts.amount.toLocaleString()}
                            </strong>
                          </p>
                        </div>
                        `
                        : ""
                    }

                    <p
                      style="
                        margin: 20px 0 0;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #333333;
                      "
                    >
                      Event details and access information will be shared
                      with you closer to the event date.
                    </p>

                    <p
                      style="
                        margin: 20px 0 0;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #333333;
                      "
                    >
                      We look forward to seeing you there.
                    </p>

                    <p
                      style="
                        margin: 28px 0 0;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #111111;
                      "
                    >
                      Regards,<br />
                      <strong style="color: #e00000;">
                        RedTrace-D Sentinel
                      </strong>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #0b2a5b;
                      padding: 24px 30px;
                    "
                  >
                    <p
                      style="
                        margin: 0 0 8px;
                        color: #ffffff;
                        font-size: 13px;
                        line-height: 1.5;
                      "
                    >
                      RedTrace-D Sentinel
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 12px;
                        line-height: 1.5;
                      "
                    >
                      Securing the future, one trace at a time.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>`
}
