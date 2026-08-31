import { Resend } from "resend";
import { NextResponse } from "next/server";
import { adminEmailTemplate } from "@/lib/email-templates/admin";
import { autoReplyTemplate } from "@/lib/email-templates/auto-reply";

const resendApiKey = process.env.RESEND_API_KEY;
const adminEmail = process.env.ADMIN_EMAIL;

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not configured");
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    if (!adminEmail) {
      // console.error("ADMIN_EMAIL is not configured");

      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const { name, email, service, message, company } = await request.json();

    // Honeypot
    if (company) {
      return NextResponse.json({ success: true });
    }

    // Required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // 1. Send website enquiry to RTD Sentinel
    const { error: adminError } = await resend.emails.send({
      from: "RedTrace-D Sentinel Website <website@mail.rtdsentinel.com>",
      to: [adminEmail],

      // Clicking Reply responds directly to the visitor
      replyTo: email,

      subject: `New Website Inquiry - ${name}`,

      html: adminEmailTemplate({
        name,
        email,
        service,
        message,
      }),
    });

    if (adminError) {
      // console.error("Admin notification failed:", adminError);

      return NextResponse.json(
        {
          error: "Unable to send your message. Please try again later.",
        },
        { status: 500 },
      );
    }

    // 2. Confirmation email to visitor
    const { error: replyError } = await resend.emails.send({
      from: "RedTrace-D Sentinel <contact@mail.rtdsentinel.com>",
      to: [email],

      // Customer replies go to the real Zoho mailbox
      replyTo: "support@rtdsentinel.com",

      subject: "We received your message",

      html: autoReplyTemplate(name),
    });

    // The enquiry was already received, so don't fail the
    // entire submission if only the acknowledgement fails.
    if (replyError) {
      // console.error("Auto-reply failed:", replyError);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    //  console.error("Contact form error:", error);

    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
