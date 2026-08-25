// lib/email-templates/admin.ts
export const adminEmailTemplate = ({
  name,
  email,
  service,
  message,
}: {
  name: string
  email: string
  service: string
  message: string
}) => `
  <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 10px;
              }
              .header {
                background-color: #E11D2E;
                color: white;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: bold;
                color: #E11D2E;
                display: block;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Contact Form Submission</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">Sender Name:</span>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${email}</div>
                </div>
                <!-- Show the Sanity service selected in the contact form. -->
                <div class="field">
                  <span class="label">Service:</span>
                  <div class="value">${service}</div>
                </div>
                <div class="field">
                  <span class="label">Message Details:</span>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  This email was sent from the contact form on your website - RedTrace-D Security.
                </p>
              </div>
            </div>
          </body>
        </html>
`
