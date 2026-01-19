'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceProcessProps {
  process: string[];
}

export default function ServiceProcess({ process }: ServiceProcessProps) {
  return (
    <section className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">Our Process</h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 hidden h-full w-1 bg-gradient-to-b from-[#E11D2E] via-[#38BDF8] to-[#7C3AED] md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`md:flex md:items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E11D2E] text-sm font-bold text-white">
                        {idx + 1}
                      </div>
                      <h3 className="text-xl font-bold">{step}</h3>
                    </div>
                  </div>
                </div>

                {/* Dot connector */}
                <div className="hidden md:flex md:w-0 md:items-center md:justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#0B0E14] bg-white/10">
                    <ArrowRight className="h-5 w-5 text-[#E11D2E]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
