'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, CreditCard, Loader2, Mail, XCircle } from 'lucide-react'

interface RegistrationStatus {
  status: string
  registrationId: string
  eventTitle: string
  email: string
  isPaid: boolean
  amount: number
  currency: string
  paymentReference: string | null
}

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const eventId = searchParams.get('event')
  const [registration, setRegistration] = useState<RegistrationStatus | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id || !eventId) {
      setError('Missing event or registration reference.')
      return
    }

    let cancelled = false
    let attempts = 0
    let timer: ReturnType<typeof setTimeout> | undefined

    const loadRegistration = async () => {
      try {
        // The server resolves the stable event ID to its Sanity-controlled Sheet tab.
        const response = await fetch(
          `/api/registrations/${encodeURIComponent(id)}?event=${encodeURIComponent(eventId)}`,
          { cache: 'no-store' },
        )
        const data = await response.json()
        if (cancelled) return

        if (response.status === 200) {
          setRegistration(data)
          return
        }

        // Paystack may redirect before its webhook reaches the application.
        if (response.status === 202 && attempts < 12) {
          attempts += 1
          timer = setTimeout(loadRegistration, 2500)
          return
        }

        setError('We could not confirm this registration yet. Keep your payment reference and contact support.')
      } catch {
        if (!cancelled && attempts < 12) {
          attempts += 1
          timer = setTimeout(loadRegistration, 2500)
        } else if (!cancelled) {
          setError('Unable to load the registration. Please try again later.')
        }
      }
    }

    loadRegistration()
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [eventId, id])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <XCircle className="mx-auto mb-5 h-16 w-16 text-red-500" />
          <h1 className="mb-3 text-2xl font-bold">Registration not confirmed</h1>
          <p className="mb-6 text-muted-foreground">{error}</p>
          <Link href="/events" className="rounded-lg bg-[#E11D2E] px-5 py-3 font-semibold text-white">View events</Link>
        </div>
      </div>
    )
  }

  if (!registration) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-9 w-9 animate-spin text-[#E11D2E]" />
        <p className="text-muted-foreground">Confirming your registration…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-card p-8 text-center">
        <CheckCircle className="mx-auto mb-5 h-20 w-20 text-green-500" />
        <h1 className="mb-3 text-3xl font-bold">
          {registration.isPaid ? 'Payment and registration confirmed!' : 'Registration confirmed!'}
        </h1>
        <p className="mb-7 text-muted-foreground">
          You are registered for {registration.eventTitle}.
        </p>

        {registration.isPaid && (
          <div className="mb-5 rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-left">
            <div className="mb-3 flex items-center gap-2 font-semibold text-green-400">
              <CreditCard className="h-5 w-5" /> Payment confirmed
            </div>
            <p className="text-sm">
              Amount: {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: registration.currency || "NGN",
              }).format(registration.amount)}
            </p>
            <p className="mt-1 break-all text-xs text-muted-foreground">Reference: {registration.paymentReference}</p>
          </div>
        )}

        <div className="mb-7 rounded-xl border border-[#38BDF8]/30 bg-white/5 p-5 text-left">
          <div className="mb-2 flex items-center gap-2 font-semibold">
            <Mail className="h-5 w-5 text-[#38BDF8]" /> Confirmation email
          </div>
          <p className="text-sm text-muted-foreground">
            A confirmation email is being sent to {registration.email}.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/events" className="flex-1 rounded-lg bg-[#E11D2E] px-4 py-3 font-semibold text-white">View events</Link>
          <Link href="/" className="flex-1 rounded-lg border border-white/15 px-4 py-3 font-semibold">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default function RegistrationSuccessPage() {
  return <Suspense><SuccessPageContent /></Suspense>
}
