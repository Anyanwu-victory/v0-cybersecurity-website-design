'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Mail, Download, CreditCard, Receipt } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, Suspense } from 'react'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const eventTitle = searchParams.get('eventTitle')
  const isPaid = searchParams.get('paid') === 'true'
  const reference = searchParams.get('reference')
  const amount = searchParams.get('amount')

  useEffect(() => {
    // Send confirmation email
    if (email) {
      fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          eventTitle,
          isPaid,
          reference,
          amount,
        }),
      }).catch((error) => console.error('Failed to send email:', error))
    }
  }, [email, eventTitle, isPaid, reference, amount]);

  // handled the  Dowload receipt button click and contemplateing it, on the receipt. 
  const handleDownloadReceipt = async () => {
  const response = await fetch('/api/generate-receipt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      eventTitle,
      amount,
      reference,
      fullName: 'User Name', // Get from somewhere
    }),
  })

  const data = await response.json()
  
  // Download PDF
  const link = document.createElement('a')
  link.href = data.pdf
  link.download = `receipt-${reference}.pdf`
  link.click()
}

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#E11D2E]/20 blur-xl rounded-full"></div>
              <CheckCircle className="h-20 w-20 text-[#E11D2E] relative" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold mb-4"
          >
            {isPaid ? 'Payment Successful!' : 'Registration Confirmed!'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg mb-8"
          >
            {isPaid 
              ? `Your payment has been confirmed and you're all set for ${eventTitle || 'the event'}`
              : `Thank you for registering for ${eventTitle || 'the event'}`
            }
          </motion.p>

          {/* Payment Confirmation - Only show if paid */}
          {isPaid && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6 text-left"
            >
              <div className="flex items-start gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-green-400">Payment Confirmed</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment has been successfully processed
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white/5 rounded-lg p-4 space-y-2">
                {amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Amount Paid:</span>
                    <span className="font-semibold">₦{parseInt(amount).toLocaleString()}</span>
                  </div>
                )}
                {reference && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reference:</span>
                    <span className="font-mono text-xs">{reference}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="text-green-400 font-semibold">Paid</span>
                </div>
              </div>

              {/* Receipt Download Button */}
              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-sm font-semibold py-2 px-4 rounded-lg transition-colors">
                <Receipt className="h-4 w-4" />
                Download Receipt
              </button>
            </motion.div>
          )}

          {/* Confirmation Email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isPaid ? 0.6 : 0.5 }}
            className="bg-white/5 border border-[#38BDF8]/30 rounded-xl p-6 mb-8 text-left"
          >
            <div className="flex items-start gap-3 mb-4">
              <Mail className="h-5 w-5 text-[#38BDF8] mt-1 shrink-0" />
              <div>
                <p className="font-semibold">Confirmation Email Sent</p>
                <p className="text-sm text-muted-foreground">
                  {isPaid 
                    ? `Payment receipt and event details sent to ${email}`
                    : `A confirmation email has been sent to ${email}`
                  }
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Check your email for {isPaid ? 'your payment receipt, ' : ''}event details, agenda, and important information. Don't forget to add the event to your calendar!
            </p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isPaid ? 0.7 : 0.6 }}
            className="space-y-3"
          >
            <div className="bg-[#E11D2E]/10 border border-[#E11D2E]/30 rounded-lg p-4 text-left">
              <p className="text-sm font-semibold mb-2">What's Next?</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#E11D2E] mt-1">✓</span>
                  <span>Check your email for {isPaid ? 'payment receipt and ' : ''}event confirmation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E11D2E] mt-1">✓</span>
                  <span>Add the event to your calendar</span>
                </li>
                {isPaid && (
                  <li className="flex items-start gap-2">
                    <span className="text-[#E11D2E] mt-1">✓</span>
                    <span>Save your payment reference for your records</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-[#E11D2E] mt-1">✓</span>
                  <span>Join 5 minutes early for optimal experience</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isPaid ? 0.8 : 0.7 }}
            className="flex gap-4 mt-8"
          >
            <Link
              href="/events"
              className="flex-1 rounded-lg bg-[#E11D2E] px-4 py-3 font-semibold text-white transition-all hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50"
            >
              View All Events
            </Link>
            <Link
              href="/"
              className="flex-1 rounded-lg border border-[#38BDF8]/50 px-4 py-3 font-semibold text-[#38BDF8] transition-all hover:bg-[#38BDF8]/10"
            >
              Go to Home
            </Link>
          </motion.div>

          <p className="text-xs text-muted-foreground mt-6">
            Have questions? Contact us at support@davochi.com
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function RegistrationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E11D2E]"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}