import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { success: false, message: 'Reference is required' },
        { status: 400 }
      )
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TEST_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (data.status && data.data.status === 'success') {
      console.log('✅ Payment verified:', data.data)

      return NextResponse.json({
        success: true,
        message: 'Payment verified',
        data: {
          amount: data.data.amount / 100, // Convert from kobo
          reference: data.data.reference,
          paidAt: data.data.paid_at,
          customer: data.data.customer,
        },
      })
    } else {
      console.error('❌ Payment verification failed:', data)
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      )
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, message: 'Verification error', error: error.message },
      { status: 500 }
    )
  }
}