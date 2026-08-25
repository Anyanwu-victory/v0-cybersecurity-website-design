import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { adminEmailTemplate } from '@/lib/email-templates/admin'
import { autoReplyTemplate } from '@/lib/email-templates/auto-reply'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: Request) {
  try {
    // method check
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }

    // The selected Sanity service accompanies the visitor's contact message.
    const { name, email, service, message, company } = await request.json()

    // 🛑 Honeypot (spam protection)
    if (company) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }
   

    // 1️⃣ Admin notification
    await resend.emails.send({
      from: 'RTD Sentinel <contact@mail.rtdsentinel.com>',
      to: [process.env.ADMIN_EMAIL!],
      replyTo: email,
      subject: `A New Inquiry from RTD-Sentinel Website - ${name}`,
      html: adminEmailTemplate({ name, email, service, message }),
    })

    // 2️⃣ Auto-reply to user -- need a domain for this to work, so it's currently just a placeholder 
    await resend.emails.send({
      from: 'RTD Sentinel <contact@mail.rtdsentinel.com>',
      to: [email],
      subject: 'We received your message',
      html: autoReplyTemplate(name),
    })
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    })
  } catch (error) {
    console.error('Email error:', error)

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
