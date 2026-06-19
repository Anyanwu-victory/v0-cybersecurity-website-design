'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { XCircle } from 'lucide-react'

function CancelledContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const eventId = searchParams.get('eventId')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-8">
          Your payment was cancelled. You can try again or contact support if you need help.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push(`/events/${eventId}`)}
            className="px-6 py-3 bg-[#E11D2E] text-white rounded-lg hover:bg-[#E11D2E]/90"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/events')}
            className="px-6 py-3 border border-white/10 rounded-lg hover:bg-white/5"
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CancelledPage() {
  return (
    <Suspense>
      <CancelledContent />
    </Suspense>
  )
}