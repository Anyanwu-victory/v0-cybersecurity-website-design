'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  title: string;
}

export default function CTA({ title }: CTAProps) {
  return (
    <section className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-3xl border border-[#E11D2E]/30 bg-gradient-to-br from-[#E11D2E]/10 via-transparent to-[#7C3AED]/10 p-12 md:p-16"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 bg-[#E11D2E]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 bg-[#7C3AED]/20 blur-3xl" />

        <div className="relative z-10 space-y-8 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-between md:gap-8">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to get started with {title}?
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Let's discuss your security needs and how our team can help you build a stronger security posture.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 md:mt-0 flex-shrink-0"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-8 py-4 font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:neon-glow-red"
              >
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-sm text-muted-foreground">
              💡 Tip: Include specific challenges or goals to get a tailored assessment.
            </p>
            <div className="flex gap-2 text-sm">
              <span className="rounded-full bg-[#E11D2E]/20 px-4 py-2 text-[#E11D2E] font-semibold">
                Response Time: 24-48h
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
