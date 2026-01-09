"use client"

import { motion } from "framer-motion"

interface AgendaItem {
  time: string
  title: string
  duration: string
  description: string
}

interface AgendaProps {
  items: AgendaItem[]
}

export function Agenda({ items }: AgendaProps) {
  return (
    <section className="container mx-auto px-4 py-20 lg:px-[80px]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="mb-12 text-4xl font-bold">Agenda & Schedule</h2>
        <div className="relative space-y-8 pl-8 md:pl-12">
          {/* Timeline line */}
          <div className="absolute left-3 top-0 h-full w-1 bg-gradient-to-b from-[#E11D2E] to-[#38BDF8] md:left-5" />

          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-6 top-2 h-3 w-3 rounded-full bg-[#E11D2E] md:-left-8" />

              <div className="rounded-lg border border-white/10 bg-white/5 p-6 hover:border-[#E11D2E]/40 transition-colors">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="text-lg font-bold text-[#E11D2E]">{item.time}</span>
                  <span className="rounded-full bg-[#38BDF8]/10 px-3 py-1 text-xs text-[#38BDF8] font-semibold">
                    {item.duration}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                {item.description && <p className="text-muted-foreground">{item.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
