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
  const [configurationError, setConfigurationError] = useState('')

  useEffect(() => {
    // Read only stable event identifiers and display text from the URL.
    const eventId = searchParams.get('event')
    const eventSlug = searchParams.get('slug')
    const eventTitle = searchParams.get('eventTitle')
    const registrationKey = `event-registration:${eventId}`
    const storedRegistration = eventId ? sessionStorage.getItem(registrationKey) : null

    if (!eventId || !eventSlug) {
      router.push('/events')
      return
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    if (!publicKey) {
      setConfigurationError('Paystack is not configured. Please contact support.')
      setLoading(false)
      return
    }

    if (!storedRegistration) {
      setConfigurationError('Your registration details expired. Please complete the form again.')
      setLoading(false)
      return
    }

    const registration = JSON.parse(storedRegistration)
    const parsedAmount = Number(registration.eventPrice)

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setConfigurationError('The payment amount is invalid. Please return to the event and try again.')
      setLoading(false)
      return
    }

    // Paystack returns this metadata in the signed charge.success webhook.
    const paystackConfig = {
      reference: crypto.randomUUID(),
      email: registration.email,
      amount: parsedAmount * 100, // Convert to kobo (Paystack uses smallest currency unit)
      publicKey,
      currency: registration.eventCurrency || 'NGN',
      metadata: {
        eventId,
        eventSlug,
        eventTitle,
        fullName: registration.fullName,
        phone: registration.phone,
        company: registration.company || '',
        profession: registration.profession,
        custom_fields: [
          {
            display_name: 'Event',
            variable_name: 'event',
            value: eventTitle,
          },
          {
            display_name: 'Attendee Name',
            variable_name: 'attendee_name',
            value: registration.fullName,
          },
        ],
      },
    }

    setConfig(paystackConfig)
    setLoading(false)
  }, [searchParams, router])

  const handleSuccess = async (reference: any) => {
    if (!reference?.reference) {
      alert('Paystack did not return a payment reference. Please contact support.')
      return
    }
    console.log('✅ Payment successful:', reference)

    const registrationKey = `event-registration:${config.metadata.eventId}`
    sessionStorage.removeItem(registrationKey)
    const successUrl = new URL('/events/register/success', window.location.origin)
    successUrl.searchParams.set('id', reference.reference)
    successUrl.searchParams.set('event', config.metadata.eventId)
    router.push(successUrl.toString())
  }

  const handleClose = () => {
    console.log('❌ Payment closed')
    // User closed the payment modal
    const cancelUrl = new URL('/events/register/cancelled', window.location.origin)
    // Cancellation returns to the public event slug rather than the internal business ID.
    cancelUrl.searchParams.set('slug', config.metadata.eventSlug)
    router.push(cancelUrl.toString())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E11D2E]" />
      </div>
    )
  }

  if (configurationError || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <h1 className="mb-2 text-xl font-semibold">Payment unavailable</h1>
          <p className="text-sm text-muted-foreground">{configurationError}</p>
        </div>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Complete Payment
            </h1>
            <p className="text-muted-foreground">
              Secure checkout powered by Paystack
            </p>
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
              {/* <DollarSign className="w-5 h-5 text-[#E11D2E]" /> */}
              <h1 className="w-5 h-5 text-[#E11D2E]"> ₦</h1>
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
  );
}
