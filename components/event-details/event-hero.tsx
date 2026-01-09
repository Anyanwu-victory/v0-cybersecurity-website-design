"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

interface EventHeroProps {
  event: {
    title: string
    tag: string
    description: string
    date: string
    time: string
    location: string
    audience: string
    price: string
  }
  onRegister: () => void
  onAddCalendar: () => void
}

export function EventHero({ event, onRegister, onAddCalendar }: EventHeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#E11D2E]/20 to-[#38BDF8]/20" />

      <div className="relative container mx-auto px-4 py-24 lg:px-[80px]">
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
                <div className="font-semibold">{event.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#E11D2E]" />
              <div className="text-sm">
                <div className="font-semibold">{event.price}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onRegister}
              className="rounded-xl bg-[#E11D2E] px-8 py-3 font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:shadow-lg hover:shadow-[#E11D2E]/50"
            >
              Register Now
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
