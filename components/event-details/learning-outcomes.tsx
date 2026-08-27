"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface LearningOutcomesProps {
  outcomes: string[]
}

export function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  // Protect this reusable section when it is called without meaningful Sanity content.
  if (!outcomes?.some((outcome) => outcome?.trim())) return null

  return (
    <section className="container mx-auto px-4 py-20 lg:px-[80px]">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="mb-12 text-4xl font-bold">Objectives</h2>
        <div className="space-y-4">
          {outcomes.map((outcome, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-4 rounded-lg border border-white/5 bg-white/5 p-4"
            >
              <CheckCircle className="h-6 w-6 min-w-6 text-[#E11D2E] mt-1" />
              <p className="text-lg">{outcome}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
