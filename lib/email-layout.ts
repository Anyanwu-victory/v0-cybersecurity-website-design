// lib/email/email-layout.ts

const LOGO_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/images/redtraced_logo.jpeg`
  : "https://rtdsentinel.com/images/redtraced_logo.jpeg";

export function emailLayout(options: {
  title: string;
  preheader?: string;
  content: string;
}) {
  const { title, preheader = "", content } = options;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background-color:#f4f6f8;
          font-family:Arial,Helvetica,sans-serif;
          color:#111827;
        "
      >

        ${
          preheader
            ? `
          <div
            style="
              display:none;
              max-height:0;
              overflow:hidden;
              opacity:0;
              color:transparent;
            "
          >
            ${preheader}
          </div>
        `
            : ""
        }

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="
            width:100%;
            background-color:#f4f6f8;
            padding:32px 16px;
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
                  width:100%;
                  max-width:600px;
                  background-color:#ffffff;
                  border:1px solid #e5e7eb;
                  border-radius:14px;
                  overflow:hidden;
                "
              >

                <!-- RED BRAND BAR -->
                <tr>
                  <td
                    style="
                      height:6px;
                      background-color:#E11D2E;
                      font-size:0;
                      line-height:0;
                    "
                  >
                    &nbsp;
                  </td>
                </tr>

                <!-- LOGO -->
                <tr>
                  <td
                    align="center"
                    style="
                      padding:30px 30px 18px;
                      background-color:#ffffff;
                    "
                  >
                    <img
                      src="${LOGO_URL}"
                      width="175"
                      alt="RedTrace-D Sentinel"
                      style="
                        display:block;
                        width:175px;
                        max-width:100%;
                        height:auto;
                        margin:0 auto;
                        border:0;
                      "
                    />
                  </td>
                </tr>

                <!-- EMAIL CONTENT -->
                <tr>
                  <td style="padding:8px 38px 38px;">
                    ${content}
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td
                    align="center"
                    style="
                      background-color:#124A8A;
                      padding:24px 30px;
                    "
                  >
                    <p
                      style="
                        margin:0 0 6px;
                        color:#ffffff;
                        font-size:14px;
                        font-weight:700;
                      "
                    >
                      RedTrace-D Sentinel
                    </p>

                    <p
                      style="
                        margin:0 0 12px;
                        color:#ffffff;
                        font-size:12px;
                        line-height:1.6;
                      "
                    >
                      Securing the future, one trace at a time.
                    </p>

                    <p
                      style="
                        margin:0;
                        color:#dbeafe;
                        font-size:11px;
                        line-height:1.5;
                      "
                    >
                      This is an automated event reminder.
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
}
