// lib/email-templates/auto-reply.ts
export const autoReplyTemplate = (name: string) =>`
  <!DOCTYPE html>
  <html>
    <body
      style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
        color: #111111;
      "
    >

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          background-color: #f4f4f4;
          padding: 30px 15px;
        "
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
                border: 1px solid #e2e2e2;
              "
            >

              <!-- Header -->
              <tr>
                <td
                  align="center"
                  style="
                    padding: 30px 30px 20px;
                    border-top: 6px solid #d71920;
                  "
                >

                  <!-- Optional Logo -->
                  <img
                    src="https://rtdsentinel.com/images/redtraced_logo.jpeg"
                    alt="RedTrace-D Sentinel"
                    width="180"
                    style="
                      display: block;
                      width: 180px;
                      max-width: 100%;
                      height: auto;
                      margin: 0 auto;
                    "
                  />

                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 10px 40px 35px;">

                  <h2
                    style="
                      margin: 0 0 22px;
                      color: #d71920;
                      font-size: 25px;
                      line-height: 1.3;
                      text-align: center;
                    "
                  >
                    Thank You for Contacting Us
                  </h2>

                  <p
                    style="
                      margin: 0 0 16px;
                      font-size: 16px;
                      line-height: 1.7;
                      color: #111111;
                    "
                  >
                    Hi ${name},
                  </p>

                  <p
                    style="
                      margin: 0 0 18px;
                      font-size: 16px;
                      line-height: 1.7;
                      color: #333333;
                    "
                  >
                    Thank you for reaching out to
                    <strong style="color: #124a8a;">
                      RedTrace-D Sentinel.
                    </strong>
                    We’ve received your message and our team will get back
                    to you as soon as possible.
                  </p>

                  <!-- Information Box -->
                  <div
                    style="
                      margin: 24px 0;
                      padding: 16px 18px;
                      background-color: #f4f7fb;
                      border-left: 4px solid #124a8a;
                      border-radius: 6px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 15px;
                        line-height: 1.6;
                        color: #333333;
                      "
                    >
                      If your enquiry is urgent, simply reply directly to
                      this email and our team will assist you.
                    </p>
                  </div>

                  <p
                    style="
                      margin: 28px 0 0;
                      font-size: 16px;
                      line-height: 1.7;
                      color: #111111;
                    "
                  >
                    Best regards,<br />
                    <strong style="color: #d71920;">
                      RT-DS Team
                    </strong>
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td
                  align="center"
                  style="
                    background-color: #124a8a;
                    padding: 22px 30px;
                  "
                >
                  <p
                    style="
                      margin: 0 0 6px;
                      color: #ffffff;
                      font-size: 13px;
                      line-height: 1.5;
                    "
                  >
                    RedTrace-D Sentinel
                  </p>

                  <p
                    style="
                      margin: 0 0 10px;
                      color: #ffffff;
                      font-size: 12px;
                      line-height: 1.5;
                    "
                  >
                    Securing the future, one trace at a time.
                  </p>

                  <p
                    style="
                      margin: 0;
                      color: #d9e3ef;
                      font-size: 11px;
                      line-height: 1.5;
                    "
                  >
                    This is an automated response confirming that we
                    received your message.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
  </html>
`;
