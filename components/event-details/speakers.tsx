"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Speaker {
  id: number
  name: string
  role: string
  organization: string
  bio: string
  avatar: string
}

interface SpeakersProps {
  speakers: Speaker[]
}

export function Speakers({ speakers }: SpeakersProps) {
  return (
    <section className="container mx-auto px-4 py-20 lg:px-[80px]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="mb-12 text-4xl font-bold">Speakers</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-3xl border border-white/10 bg-card 
              p-6 hover:border-[#E11D2E]/40 transition-all"
            >
              <div className="mb-4 overflow-hidden rounded-2xl  bg-white/5">
                <Image
                  src={speaker.avatar || "/placeholder.svg"}
                  alt={speaker.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover object-center
                   group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="mb-1 text-xl font-bold">{speaker.name}</h3>
              <p className="mb-2 text-sm text-[#E11D2E] font-semibold">{speaker.role}</p>
              <p className="mb-4 text-sm text-muted-foreground">{speaker.organization}</p>
              <p className="text-sm text-muted-foreground">{speaker.bio}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
