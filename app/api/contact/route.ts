import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { adminEmailTemplate } from "@/lib/email-templates/admin"
import { autoReplyTemplate } from "@/lib/email-templates/auto-reply"


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Replace with your verified domain: 'Contact Form <contact@yourdomain.com>'
      to: ['victanyanwu306@gmail.com'], // Replace with your company email
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
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
                  <span class="label">Operator Name:</span>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <span class="label">Email:</span>
                  <div class="value">${email}</div>
                </div>
                <div class="field">
                  <span class="label">Mission Details:</span>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
                <p style="margin-top: 30px; color: #666; font-size: 14px;">
                  This email was sent from the contact form on your website.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });
    
    /** 2️⃣ Auto-reply to USER */
    await resend.emails.send({
      from: "Your Company <noreply@yourdomain.com>",
      to: [email],
      subject: "We received your message",
      html: autoReplyTemplate(name),
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data 
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

