'use client'

import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the checkout content component to disable SSR for it
// and prevent window-related errors from react-paystack during the build process
const CheckoutContent = dynamic(() => import('./checkout-content'), {
  ssr: false,
})

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#E11D2E]" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}