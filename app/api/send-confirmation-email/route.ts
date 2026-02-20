import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface EmailRequest {
  email: string
  eventTitle: string
  fullName?: string
  isPaid?: boolean
  amount?: number
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json()
    const { email, eventTitle, fullName, isPaid, amount } = body

    if (!email || !eventTitle) {
      return NextResponse.json(
        { error: 'Missing email or eventTitle' },
        { status: 400 }
      )
    }

    const emailContent = isPaid
      ? `
        <h2>Payment Confirmed - Event Registration</h2>
        <p>Hi ${fullName || 'there'},</p>
        <p>Thank you for registering and completing your payment for:</p>
        <p><strong>${eventTitle}</strong></p>
        <p><strong>Amount Paid:</strong> ₦${amount?.toLocaleString()}</p>
        <p>Your registration is confirmed and you're all set to attend the event!</p>
        <p>Check your email for event details and agenda.</p>
        <p>See you there!</p>
        <p>Best regards,<br/>RT-DS Team</p>
      `
      : `
        <h2>Event Registration Confirmed</h2>
        <p>Hi ${fullName || 'there'},</p>
        <p>Thank you for registering for:</p>
        <p><strong>${eventTitle}</strong></p>
        <p>Your registration is confirmed!</p>
        <p>Check your email for event details, agenda, and important information.</p>
        <p>See you there!</p>
        <p>Best regards,<br/>RT-DS Team</p>
      `

    await resend.emails.send({
      from: 'Event Registration <onboarding@resend.dev>',
      to: email,
      subject: isPaid
        ? `Payment Confirmed - ${eventTitle}`
        : `Registration Confirmed - ${eventTitle}`,
      html: emailContent,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Event Registration] Email send error:', error)

    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}