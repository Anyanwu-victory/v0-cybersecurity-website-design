import { NextRequest, NextResponse } from 'next/server'

interface PaymentVerificationRequest {
  reference: string
  email: string
  eventId: string
  eventTitle: string
  fullName: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentVerificationRequest = await request.json()
    const { reference, email, eventId, eventTitle, fullName } = body

    if (!reference || !email) {
      return NextResponse.json(
        { error: 'Missing reference or email', success: false },
        { status: 400 }
      )
    }

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const paystackData = await paystackResponse.json()

    if (!paystackData.status || paystackData.data.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment verification failed', success: false },
        { status: 400 }
      )
    }

    // Send confirmation email
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-confirmation-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        eventTitle,
        fullName,
        isPaid: true,
        amount: paystackData.data.amount / 100,
      }),
    }).catch((err) => console.error('[v0] Email send error:', err))

    return NextResponse.json(
      {
        success: true,
        message: 'Payment verified successfully',
        reference,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Payment verification error:', error)

    return NextResponse.json(
      {
        error: 'Payment verification failed',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
