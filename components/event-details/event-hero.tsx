"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { useMemo } from "react";
import type { Event as EventType } from "../../lib/types";

interface EventHeroProps {
  event: EventType
  onAddCalendar: () => void
  onOpenRegisterModal?: () => void
}

export function EventHero({
  event,
  onAddCalendar,
  onOpenRegisterModal,
}: EventHeroProps) {

  const isRegistrationClosed = useMemo(() => {
    // Mirror the server's active-status requirement in the event UI.
    if (event.registrationStatus !== "active") return true
    if (!event.registrationDeadline) return false

    try {
      const deadline = new Date(event.registrationDeadline)
      const now = new Date()
      return now > deadline
    } catch {
      return false
    }
  }, [event.registrationDeadline, event.registrationStatus])

  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-[#E11D2E]/20 to-[#38BDF8]/20" />

      <div className="relative container mx-auto px-4 py-24 lg:px-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-[#E11D2E]/10 px-4 py-2 text-sm font-bold text-[#E11D2E] uppercase tracking-wider">
              {event.tag}
            </span>
            <div className="text-sm text-muted-foreground">{event.audience}</div>
          </div>

          <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl text-balance">{event.title}</h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">{event.description}</p>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#E11D2E]" />
              <div className="text-sm">
                <div className="font-semibold">{event.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#38BDF8]" />
              <div className="text-sm">
                <div className="font-semibold">{event.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#7C3AED]" />
              <div className="text-sm">
                <div className="font-semibold  capitalize">{event.eventType}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#E11D2E]" />
              <div className="text-sm">
                <div className="font-semibold">
                  {event.eventCategory === "free"
                    ? "Free"
                    : new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: event.currency || "NGN",
                        maximumFractionDigits: 2,
                      }).format(event.price || 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
           <button
              onClick={onOpenRegisterModal}
              disabled={isRegistrationClosed}
              className={`rounded-xl px-8 py-3 font-bold transition-all ${
                isRegistrationClosed
                  ? "bg-gray-600 text-white cursor-not-allowed opacity-50"
                  : "bg-[#E11D2E] text-white hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50"
              }`}
            >
              {isRegistrationClosed ? "Registration Closed" : "Register Now"}
            </button>
            
            <button
              onClick={onAddCalendar}
              className="rounded-xl border border-[#38BDF8]/50 px-8 py-3 font-semibold text-[#38BDF8] transition-all hover:bg-[#38BDF8]/10"
            >
              Add to Calendar
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
