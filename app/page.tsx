"use client";

import { cn } from "@/lib/utils";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { services, socials, homePageIntroSectionText } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="cyber-grid relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="absolute  inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-[#0B0E14]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl space-y-2"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E11D2E]/30 bg-[#E11D2E]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#E11D2E] uppercase">
            <Zap className="h-3 w-3" />
            Vulnerability Insight & Response
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-wide sm:text-7xl md:text-8xl">
            Securing the{" "}
            <span className="bg-gradient-to-r from-[#E11D2E] to-[#38BDF8] bg-clip-text text-transparent">
              Future
            </span>
            , <br />
            One Trace at a Time
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl leading-9">
            RTDS (RedTrace-D Security) helps individuals, startups, and
            organizations stay ahead of cyber threats by finding vulnerabilities
            early and building security into everything they create
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#E11D2E] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:neon-glow-red sm:w-auto"
            >
              Connect With Us
              <ArrowRight className="h-5 w-5" />
            </Link>

            <div className="flex gap-4">
              {socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
                >
                  <social.icon className="h-6 w-6 text-white" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Decorative Circuit Lines */}
        <div className="hidden md:flex pointer-events-none absolute left-0 top-1/2 h-px w-64 -translate-y-1/2 bg-gradient-to-r from-[#E11D2E]/50 to-transparent" />
        <div className="hidden md:flex pointer-events-none absolute right-0 top-1/2 h-px w-64 -translate-y-1/2 bg-gradient-to-l from-[#38BDF8]/50 to-transparent" />
      </section>

      {/* Features Grid */}
      <section
        id="services"
        className="container mx-auto px-4 py-24 lg:px-[80px]"
      >
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground leading-8">
            Our expert team utilizes cutting-edge forensics and automated threat
            hunting to keep your assets unreachable by adversaries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 transition-all hover:border-[#E11D2E]/50 hover:bg-white/5"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="block"
              >
                <div
                  className={cn(
                    "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted transition-all group-hover:scale-110",
                    service.color
                  )}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground leading-6 ">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E11D2E] group-hover:gap-3 transition-all">
                  Explore More <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Intro section */}
      <section className="relative pt-20 pb-[500px] md:p-0">
        <div className="relative">
          <img
            src="/images/logo_design_1.png"
            alt="logo Image"
            loading="lazy"
            className="w-full h-auto object-center object-cover  opacity-20"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }} // Not in view
            whileInView={{ opacity: 1, y: 0 }} // In view
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% is visible
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="absolute top-96 inset-0 flex items-center justify-center md:top-0"
          >
            <div
              className="bg-gradient-to-b from-transparent via-background/50 to-[#0B0E14] 
                    backdrop-blur-sm rounded-lg p-8 max-w-sm text-center md:p-12 
                    md:max-w-3xl mx-auto "
            >
              <div className="text-[#E11D2E] text-6xl mb-4"> "</div>
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8 ">
                {homePageIntroSectionText}
              </p>
              <div className="text-[#E11D2E] text-6xl mt-4"> " </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="container mx-auto px-4 py-24 lg:px-[80px]">
        <div className="mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-[#E11D2E]/20 to-[#0b0e14]/20 p-12 text-center border border-white/10">
         <div className="flex flex-col text-white   px-20 mx-auto w-full items-center justify-between max-w-screen-xl">
            <div className="w-full mb-6 text-center md:text-left md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {" "}
                RedTrace-D Security
              </h2>
              <p className="font-light md:text-xl">
                {" "}
                Every digital footprint leaves a trace. We help you control that
                trace—by building smarter, safer, and more resilient digital
                experiences
              </p>
            </div>

            <div className="w-full flex justify-center md:justify-end mt-8 md:mt-12">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg
               bg-[#E11D2E] md:px-8 px-4 py-4 text-lg font-bold text-white transition-all hover:bg-[#E11D2E]/90 hover:neon-glow-red sm:w-auto"
              >
                Work with RTDS
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
