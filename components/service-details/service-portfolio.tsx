'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  result: string;
  methodology: string;
}

interface ServicePortfolioProps {
  portfolio: PortfolioItem[];
}

export default function ServicePortfolio({ portfolio }: ServicePortfolioProps) {
  return (
    <section className="container mx-auto px-4 py-24 lg:px-[80px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-12 text-3xl font-bold md:text-5xl">Portfolio & Case Studies</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-[#E11D2E]/50"
            >
              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-px w-20 bg-gradient-to-l from-[#E11D2E]/50 to-transparent" />
              <div className="absolute right-0 top-0 h-20 w-px bg-gradient-to-b from-[#E11D2E]/50 to-transparent" />

              <div className="relative space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold leading-6">{item.title}</h3>
                  <motion.div
                    whileHover={{ rotate: 45, scale: 1.1 }}
                    className="flex-shrink-0"
                  >
                    <ArrowUpRight className="h-5 w-5 text-[#E11D2E]" />
                  </motion.div>
                </div>

                <p className="text-sm text-[#38BDF8] font-semibold">{item.client}</p>

                <p className="text-base leading-6 text-muted-foreground">{item.result}</p>

                <div className="pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Methodology: {item.methodology}
                  </p>
                </div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className="absolute inset-0 bg-[#E11D2E]/20 blur-3xl"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
