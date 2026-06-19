'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PaystackButton } from 'react-paystack'
import { Loader2, CreditCard, User, Mail, DollarSign } from 'lucide-react'

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [config, setConfig] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get params from URL
    const email = searchParams.get('email')
    const amount = searchParams.get('amount')
    const eventId = searchParams.get('eventId')
    const eventTitle = searchParams.get('eventTitle')
    const fullName = searchParams.get('fullName')

    if (!email || !amount || !eventId) {
      router.push('/events')
      return
    }

    // Paystack config
    const paystackConfig = {
      reference: `${eventId}-${Date.now()}`,
      email,
      amount: parseInt(amount) * 100, // Convert to kobo (Paystack uses smallest currency unit)
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
      metadata: {
        eventId,
        eventTitle,
        fullName,
        custom_fields: [
          {
            display_name: 'Event',
            variable_name: 'event',
            value: eventTitle,
          },
          {
            display_name: 'Attendee Name',
            variable_name: 'attendee_name',
            value: fullName,
          },
        ],
      },
    }

    setConfig(paystackConfig)
    setLoading(false)
  }, [searchParams, router])

  const handleSuccess = async (reference: any) => {
    console.log('✅ Payment successful:', reference)

    try {
      // Verify payment on server
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference: reference.reference,
          eventId: config.metadata.eventId,
          email: config.email,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Update registration status to 'paid'
        await fetch('/api/update-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: config.email,
            eventId: config.metadata.eventId,
            status: 'paid',
            reference: reference.reference,
          }),
        })

        // Redirect to success page
        const successUrl = new URL('/events/register/success', window.location.origin)
        successUrl.searchParams.set('email', config.email)
        successUrl.searchParams.set('eventTitle', config.metadata.eventTitle)
        successUrl.searchParams.set('paid', 'true')
        successUrl.searchParams.set('reference', reference.reference)

        router.push(successUrl.toString())
      } else {
        throw new Error('Payment verification failed')
      }
    } catch (error) {
      console.error('Error verifying payment:', error)
      alert('Payment verification failed. Please contact support with your reference: ' + reference.reference)
    }
  }

  const handleClose = () => {
    console.log('❌ Payment closed')
    // User closed the payment modal
    const cancelUrl = new URL('/events/register/cancelled', window.location.origin)
    cancelUrl.searchParams.set('eventId', config.metadata.eventId)
    router.push(cancelUrl.toString())
  }

  if (loading || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E11D2E]" />
      </div>
    )
  }

  const componentProps = {
    ...config,
    text: 'Pay Now',
    onSuccess: handleSuccess,
    onClose: handleClose,
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container-custom max-w-2xl mx-auto px-6">
        <div className="bg-card border border-white/10 rounded-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Payment</h1>
            <p className="text-muted-foreground">Secure checkout powered by Paystack</p>
          </div>

          {/* Event Details */}
          <div className="bg-white/5 rounded-lg p-6 mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-[#E11D2E]" />
              <div>
                <p className="text-sm text-muted-foreground">Event</p>
                <p className="font-semibold">{config.metadata.eventTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-[#E11D2E]" />
              <div>
                <p className="text-sm text-muted-foreground">Attendee</p>
                <p className="font-semibold">{config.metadata.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#E11D2E]" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{config.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <DollarSign className="w-5 h-5 text-[#E11D2E]" />
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold">
                  ₦{(config.amount / 100).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <PaystackButton
            {...componentProps}
            className="w-full bg-[#E11D2E] hover:bg-[#E11D2E]/90 text-white font-semibold py-4 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-[#E11D2E]/50 flex items-center justify-center gap-2"
          />

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              🔒 Secure payment processing by Paystack
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
