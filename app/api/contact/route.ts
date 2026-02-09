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

    const { name, email, message, company } = await request.json()

    // 🛑 Honeypot (spam protection)
    if (company) {
      return NextResponse.json({ success: true })
    }

    // Validation
    if (!name || !email || !message) {
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
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL!],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: adminEmailTemplate({ name, email, message }),
    })

    // 2️⃣ Auto-reply to user
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your message',
      html: autoReplyTemplate(name),
    })

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