"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, ArrowUpRight, Shield } from "lucide-react"
import Link from "next/link"
import { events } from "@/lib/data"

export default function Events() {
  return (
    <div className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Intelligence Briefings</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join our experts at these upcoming workshops, conferences, and seminars to stay ahead of the evolving threat
          landscape.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            asChild
          >
            <Link
              href={`/events/${event.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition-all hover:border-[#E11D2E]/40"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full bg-[#E11D2E]/10 px-3 py-1 text-xs font-bold text-[#E11D2E] uppercase tracking-wider">
                  {event.tag}
                </span>
                <div className="text-muted-foreground group-hover:text-[#E11D2E] transition-colors">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>

              <h3 className="mb-4 text-2xl font-bold group-hover:text-glow-red transition-all">{event.title}</h3>
              <p className="mb-8 text-muted-foreground">{event.description}</p>

              <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-[#E11D2E]" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-[#38BDF8]" />
                  {event.location}
                </div>
              </div>

              <button className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 py-3 font-semibold transition-all hover:bg-[#E11D2E] hover:text-white">
                Learn More & Register
              </button>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured CTA */}
      <div className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#38BDF8]/20 p-12 text-center border border-white/10">
        <Shield className="mx-auto mb-6 h-12 w-12 text-[#E11D2E] neon-glow-red" />
        <h2 className="mb-4 text-3xl font-bold">Request a Private Briefing</h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Need a specialized session for your executive team? We provide custom cybersecurity awareness and strategy
          briefings for global organizations.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3 font-bold text-black transition-transform hover:scale-105"
        >
          Inquire Now
        </Link>
      </div>
    </div>
  )
}
