"use client"

import { motion } from "framer-motion"
import { Shield, Clock } from "lucide-react"
import { useMemo } from "react"

interface CTASectionProps {
  onRegister: () => void
  registrationDeadline?: string
}

export function CTASection({ onRegister, registrationDeadline }: CTASectionProps) {
  const isRegistrationClosed = useMemo(() => {
    if (!registrationDeadline) return false
    
    try {
      const deadline = new Date(registrationDeadline)
      const now = new Date()
      return now > deadline
    } catch {
      return false
    }
  }, [registrationDeadline])

  return (
    <section className="container mx-auto px-4 py-20 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#38BDF8]/20 p-12 text-center border border-white/10"
      >
        <Shield className="mx-auto mb-6 h-12 w-12 text-[#E11D2E] neon-glow-red" />
        <h2 className="mb-4 text-4xl font-bold">
          {isRegistrationClosed ? "Registration Closed" : "Secure Your Spot"}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          {isRegistrationClosed ? (
            <span className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              Registration deadline has passed. Thank you for your interest!
            </span>
          ) : (
            "Limited seats available. Early bird registrants receive exclusive access to session recordings and networking materials."
          )}
        </p>
        <button
          onClick={onRegister}
          disabled={isRegistrationClosed}
          className={`inline-block rounded-full px-8 py-4 font-bold text-white transition-all ${
            isRegistrationClosed
              ? "bg-gray-600 cursor-not-allowed opacity-50"
              : "bg-[#E11D2E] hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50"
          }`}
        >
          {isRegistrationClosed ? "Registration Closed" : "Register Now"}
        </button>
      </motion.div>
    </section>
  )
}
