"use client"

import { cn } from "@/lib/utils"

import { Shield, Lock, Search, Zap, ArrowRight, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    title: "Threat Detection",
    description:
      "Real-time monitoring and AI-driven analysis to identify complex attack patterns before they breach your perimeter.",
    icon: Shield,
    color: "text-[#E11D2E]",
    glowClass: "neon-glow-red",
  },
  {
    title: "Digital Forensics",
    description:
      "Deep-dive analysis of security incidents to recover data, trace origins, and build legally sound forensic reports.",
    icon: Search,
    color: "text-[#38BDF8]",
    glowClass: "neon-glow-blue",
  },
  {
    title: "Cyber Defense",
    description:
      "Hardening infrastructure with zero-trust architecture and automated response protocols for maximum resilience.",
    icon: Lock,
    color: "text-[#7C3AED]",
    glowClass: "neon-glow-purple",
  },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="cyber-grid relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E11D2E]/30 bg-[#E11D2E]/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#E11D2E] uppercase">
            <Zap className="h-3 w-3" />
            Vulnerability Insight & Response
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
            Securing the{" "}
            <span className="bg-gradient-to-r from-[#E11D2E] to-[#38BDF8] bg-clip-text text-transparent">Future</span>,{" "}
            <br />
            One Trace at a Time
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            RT-DS provides enterprise-grade cybersecurity intelligence, specialized in digital trace analysis and
            proactive defense for the modern digital landscape.
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
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Decorative Circuit Lines */}
        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-64 -translate-y-1/2 bg-gradient-to-r from-[#E11D2E]/50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-px w-64 -translate-y-1/2 bg-gradient-to-l from-[#38BDF8]/50 to-transparent" />
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">Mission-Critical Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our expert team utilizes cutting-edge forensics and automated threat hunting to keep your assets unreachable
            by adversaries.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 transition-all hover:border-[#E11D2E]/50 hover:bg-white/5",
                service.glowClass,
              )}
            >
              <div
                className={cn(
                  "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted transition-all group-hover:scale-110",
                  service.color,
                )}
              >
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E11D2E]">
                Explore Tech <ArrowRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
