'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

declare global {
  interface Window {
    PaystackPop: any
  }
}

export default function PaystackCheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const email = searchParams.get('email')
  const amount = searchParams.get('amount')
  const eventId = searchParams.get('eventId')
  const eventTitle = searchParams.get('eventTitle')
  const fullName = searchParams.get('fullName')

  useEffect(() => {
    if (!email || !amount || !eventId || !fullName) {
      setError('Missing required checkout information')
      setIsLoading(false)
      return
    }

    // Load Paystack script
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true

    script.onload = () => {
      setIsLoading(false)
      // Paystack script is loaded, user can now proceed with payment
      handlePayment()
    }

    script.onerror = () => {
      setError('Failed to load payment service. Please try again.')
      setIsLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [email, amount, eventId, fullName])

  const handlePayment = () => {
    const amountInKobo = Math.round(parseFloat(amount || '0') * 100)

    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount: amountInKobo,
        ref: `${eventId}-${Date.now()}`,
        onClose: () => {
          setError('Payment cancelled. Please try again.')
        },
        onSuccess: async (response: any) => {
          // Verify payment on backend
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: response.reference,
                email,
                eventId,
                eventTitle,
                fullName,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              // Redirect to success page
              router.push(
                `/events/register/success?email=${encodeURIComponent(email)}&eventTitle=${encodeURIComponent(eventTitle || '')}`
              )
            } else {
              setError(verifyData.message || 'Payment verification failed')
            }
          } catch (err) {
            setError('Failed to verify payment. Please contact support.')
          }
        },
      })

      handler.openIframe()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-[#E11D2E] mx-auto mb-4" />
          <p className="text-lg font-semibold">Loading payment service...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-[#E11D2E]/10 border border-[#E11D2E]/30 rounded-lg p-6 mb-6">
            <p className="text-lg font-semibold text-[#E11D2E] mb-2">Payment Error</p>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="rounded-lg bg-[#E11D2E] px-6 py-3 font-semibold text-white transition-all hover:bg-[#E11D2E]/90"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <p className="text-lg font-semibold mb-4">Completing your payment...</p>
        <p className="text-muted-foreground">
          You will be redirected to Paystack to complete your payment for {eventTitle}.
        </p>
      </motion.div>
    </div>
  )
}
