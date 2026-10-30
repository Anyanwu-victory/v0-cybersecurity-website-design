"use client";

import { ArrowDownRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import HomepageCTA from "@/components/HomepageCTA";
import InsightsSection from "@/components/insights-section";

type ServiceCard = {
  title: string;
  description: string;
  icon?: string;
  color?: string;
};

type HomeContentProps = {
  services: ServiceCard[];
  articles: any[];
};

export default function HomeContent({ services, articles }: HomeContentProps) {
  return (
    <main className="-mt-24 overflow-hidden bg-[#f3f1ec] text-[#191a18]">
      <section className="relative min-h-[760px] px-5 pb-20 pt-40 sm:px-8 lg:min-h-[820px] lg:px-16 lg:pb-28 lg:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(225,29,46,0.07),transparent_27rem)]" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a51c29]">
              <span className="h-px w-8 bg-[#a51c29]" />
              RedTrace-D Sentinel · Cybersecurity
            </p>
            <h1 className="max-w-[760px] font-serif text-[clamp(3.4rem,7.3vw,6.9rem)] leading-[0.96] tracking-[-0.055em]">
              Security that makes sense.
            </h1>
            <p className="mt-8 max-w-[570px] text-lg leading-8 text-[#555650] sm:text-xl sm:leading-9">
              Find the weakness. Understand the risk. Know what to do next.
              We help teams make practical security decisions about the
              technology they depend on.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#a51c29] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#80131e]"
              >
                Talk to our team <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#343530] transition-colors hover:text-[#a51c29]"
              >
                Explore what we do <ArrowDownRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            aria-label="Our approach to security work"
            className="relative mx-auto w-full max-w-[460px] border border-[#d6d2c9] bg-[#ebe8e1] p-7 sm:p-10 lg:mt-10"
          >
            <div className="mb-12 flex items-center justify-between border-b border-[#d2cec5] pb-4 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#71716b]">
              <span>How we work</span>
              <span>RTDS / 01</span>
            </div>
            <ol className="space-y-8">
              {[
                ["01", "Look closely", "Test the systems and assumptions that matter."],
                ["02", "Explain clearly", "Put findings in context, without the jargon."],
                ["03", "Move forward", "Prioritize fixes your team can act on."],
              ].map(([number, title, description]) => (
                <li key={number} className="grid grid-cols-[42px_1fr] gap-4">
                  <span className="pt-1 font-mono text-xs text-[#a51c29]">{number}</span>
                  <div>
                    <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#62635d]">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex items-center gap-2 border-t border-[#d2cec5] pt-4 text-xs text-[#777770]">
              <span className="h-2 w-2 rounded-full bg-[#a51c29]" />
              Practical security, from assessment to action
            </div>
            <span aria-hidden="true" className="absolute -bottom-4 -right-4 -z-0 h-20 w-20 border-b border-r border-[#a51c29]/45" />
          </motion.aside>
        </div>
        <div className="relative mx-auto mt-20 flex max-w-[1280px] items-center justify-between border-t border-[#d7d4cc] pt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#777770]">
          <span>Independent thinking. Clear next steps.</span>
          <span className="hidden sm:inline">Scroll to explore ↓</span>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#e9e6df] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 border-b border-[#d0ccc3] pb-12 md:grid-cols-[0.7fr_1.3fr] md:items-end">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a51c29]">What we do</p>
            <div>
              <h2 className="max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Good security starts with the right questions.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5e5f59]">
                From finding weaknesses to building safer products, our work is focused on making digital systems more resilient.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            {services.map((service, idx) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(idx % 2, 1) * 0.08 }}
                className="group border-b border-[#d0ccc3] py-8 md:odd:pr-10 md:even:pl-10 md:even:pr-0 lg:py-10"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#a51c29]">{String(idx + 1).padStart(2, "0")}</span>
                  <ArrowRight className="h-4 w-4 text-[#a7a49c] transition-transform group-hover:translate-x-1 group-hover:text-[#a51c29]" />
                </div>
                <h3 className="font-serif text-2xl tracking-tight sm:text-[1.75rem]">{service.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[#62635d]">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <InsightsSection articles={articles} />
      <HomepageCTA />
    </main>
  );
}
