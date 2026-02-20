"use client"

import { motion } from "framer-motion"

interface RolesProps {
  roles: string[]
}

export function RolesCard({ roles }: RolesProps) {
  return (
    <section className="container mx-auto px-4 py-20 lg:px-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="mb-12 text-4xl font-bold">Who Should Attend</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-xl border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-3 text-center font-semibold text-[#38BDF8] hover:border-[#38BDF8]/60 hover:bg-[#38BDF8]/20 transition-all"
            >
              {role}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
