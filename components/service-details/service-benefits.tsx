'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ServiceBenefitsProps {
  benefits: string[];
}

export default function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <section className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">Why Choose This Service</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-[#E11D2E]/50 hover:bg-white/10"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mt-1 flex-shrink-0"
              >
                <CheckCircle className="h-6 w-6 text-[#E11D2E]" />
              </motion.div>
              <p className="text-lg leading-7 text-muted-foreground">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
