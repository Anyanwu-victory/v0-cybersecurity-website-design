// lib/email-templates/auto-reply.ts
export const autoReplyTemplate = (name: string) => `
  <div style="font-family: Arial; padding: 20px;">
    <h2>Thank you for contacting us 👋</h2>

    <p>Hi ${name},</p>

    <p>
      Thank you for reaching out. We’ve received your message and our team
      will get back to you as soon as possible.
    </p>

    <p>
      If your enquiry is urgent, feel free to reply directly to this email.
    </p>

    <br />

    <p>
      Best regards,<br/>
      <strong>RT-DS Team</strong>
    </p>

    <hr />
    <small>This is an automated response.</small>
  </div>
`
