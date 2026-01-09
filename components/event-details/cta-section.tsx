"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

interface CTASectionProps {
  onRegister: () => void
}

export function CTASection({ onRegister }: CTASectionProps) {
  return (
    <section className="container mx-auto px-4 py-20 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#38BDF8]/20 p-12 text-center border border-white/10"
      >
        <Shield className="mx-auto mb-6 h-12 w-12 text-[#E11D2E] neon-glow-red" />
        <h2 className="mb-4 text-4xl font-bold">Secure Your Spot</h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Limited seats available. Early bird registrants receive exclusive access to session recordings and networking
          materials.
        </p>
        <button
          onClick={onRegister}
          className="inline-block rounded-full bg-[#E11D2E] px-8 py-4 font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50"
        >
          Register Now
        </button>
      </motion.div>
    </section>
  )
}
