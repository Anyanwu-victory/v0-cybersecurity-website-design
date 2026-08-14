"use client"

import { motion } from "framer-motion"
import { Shield, Clock, X } from "lucide-react"
import { useMemo, useState } from "react"
import {EventRegistrationForm} from "@/components/form/EventRegistrationForm"


interface CTASectionProps {
  eventId: string
  eventSlug: string
  eventTitle?: string
  eventCategory: "free" | "paid"
  eventPrice?: number
  eventCurrency?: string
  registrationDeadline?: string
  registrationStatus: "draft" | "active" | "closed" | "archived"
  showModal?: boolean
  onOpenModal?: () => void
  onCloseModal?: () => void
}

export function CTASection({
  eventId,
  eventSlug,
  eventTitle,
  eventCategory,
  eventPrice,
  eventCurrency,
  registrationDeadline,
  registrationStatus,
  showModal: externalShowModal,
  onOpenModal,
  onCloseModal,
}: CTASectionProps) {
  const [internalShowModal, setInternalShowModal] = useState(false)
  const showModal = externalShowModal ?? internalShowModal
  const handleOpenModal = onOpenModal ?? (() => setInternalShowModal(true))
  const handleCloseModal = onCloseModal ?? (() => setInternalShowModal(false))

  const isRegistrationClosed = useMemo(() => {
    // Only active events may open the registration modal.
    if (registrationStatus !== "active") return true
    if (!registrationDeadline) return false

    try {
      const deadline = new Date(registrationDeadline)
      const now = new Date()
      return now > deadline
    } catch {
      return false
    }
  }, [registrationDeadline, registrationStatus])

  const handleSuccess = () => {
    handleCloseModal()
  }

  return (
    <>
      <section className="container mx-auto px-4 py-20 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl bg-linear-to-r from-[#E11D2E]/20 to-[#38BDF8]/20 p-12 text-center border border-white/10"
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
            onClick={handleOpenModal}
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

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <EventRegistrationForm
              eventId={eventId}
              eventSlug={eventSlug}
              eventTitle={eventTitle}
              eventCategory={eventCategory}
              eventPrice={eventPrice}
              eventCurrency={eventCurrency}
              onSuccess={handleSuccess}
              onClose={() => handleCloseModal()}
            />
          </motion.div>
        </div>
      )}
    </>
  )
}
