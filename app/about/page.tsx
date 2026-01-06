"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target } from "lucide-react";
import { IconBrandLinkedin, IconBrandX , IconWorld} from "@tabler/icons-react";
import {
  aboutCompanyText,
  breachesPrevented,
  activeMonitoringHours,
  values,
  team,
  missionText,
  visionText,
} from "@/lib/data";

export default function About() {
  return (
    <div className="py-24">
      {/* Mission Section */}
      <section className="container mx-auto px-4 lg:px-[80px]">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              We Trace. We Defend. <br />
              <span className="text-[#E11D2E]">We Secure.</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground whitespace-pre-line">
              {aboutCompanyText}
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-[#E11D2E]">
                  {breachesPrevented}+
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">
                  Breaches Prevented
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#38BDF8]">
                  {activeMonitoringHours}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">
                  Active Monitoring
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl border border-white/10 bg-card p-4 neon-glow-blue justify-center"
          >
            <Image
              src="/images/logo_design_1.png"
              alt="RT-DS Red Logo"
              width={600}
              height={600}
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto mt-32 px-4 lg:px-[80px]">
        <div className="grid gap-12 mb-16 md:grid-cols-[1fr_auto_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 neon-glow-red">
              <Target className="h-6 w-6 text-primary" />
            </div>

            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>

            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {missionText}
            </p>
          </motion.div>

          {/* Divider */}
         <div className="hidden md:flex items-center">
  <div className="h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
</div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 neon-glow-red">
              <IconWorld className="h-6 w-6 text-primary" />
            </div>

            <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>

            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {visionText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto mt-32 px-4 lg:px-[80px]">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E11D2E]/10">
                <v.icon className="h-8 w-8 text-[#E11D2E]" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto mt-32 px-4 lg:px-[80px]">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            The Elite Team
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Meet the architects of your digital defense. Our team combines
            decades of experience from intelligence agencies, global finance,
            and tech giants.
          </p>
        </div>

        <div
          className="
  grid gap-6
  max-w-7xl mx-auto
  grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
  place-content-center
"
        >
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-card"
            >
              <div className="relative aspect-square overflow-hidden grayscale transition-all duration-500 group-hover:grayscale-0">
                <Image
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <Link
                    href="#"
                    className="rounded-full bg-white/10 p-2 backdrop-blur hover:bg-[#E11D2E] transition-colors"
                  >
                    <IconBrandLinkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-white/10 p-2 backdrop-blur hover:bg-[#E11D2E] transition-colors"
                  >
                    <IconBrandX className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-[#E11D2E] uppercase tracking-tight">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
