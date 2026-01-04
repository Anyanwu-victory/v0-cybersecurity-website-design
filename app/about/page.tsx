"use client"

import Link from "next/link"

import { motion } from "framer-motion"
import { Target, Eye, ShieldCheck, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

const values = [
  { icon: Target, title: "Precision", description: "Every trace tells a story. We decode it with surgical precision." },
  {
    icon: Eye,
    title: "Transparency",
    description: "Open communication and detailed reporting on every vulnerability found.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Unwavering commitment to ethical hacking and client confidentiality.",
  },
]

const team = [
  {
    name: "Dr. Elena Vance",
    role: "Chief Security Architect",
    bio: "Former intelligence analyst specialized in advanced persistent threat (APT) research.",
    avatar: "/professional-cybersecurity-expert-woman.jpg",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Forensics",
    bio: "Expert in cross-platform digital artifact recovery and memory forensics.",
    avatar: "/cybersecurity-professional-man.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Red Team Lead",
    bio: "Offensive security specialist with over 15 years in cloud infrastructure penetration testing.",
    avatar: "/tech-female-leader-portrait.jpg",
  },
  {
    name: "Jaxson Reed",
    role: "SOC Operations Director",
    bio: "Pioneer in automated incident response systems and 24/7 threat hunting.",
    avatar: "/cybersecurity-man-expert.jpg",
  },
]

export default function About() {
  return (
    <div className="py-24">
      {/* Mission Section */}
      <section className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              We Trace. We Defend. <br />
              <span className="text-primary">We Secure.</span>
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Founded in 2021, RT-DS (Response Technology & Digital Security) emerged from a collective of elite
              security researchers dedicated to solving the most complex digital puzzles.
            </p>
            <p className="mb-8 text-muted-foreground">
              Our vision is to build a future where digital innovation isn't hampered by the fear of compromise. By
              staying "One Trace Ahead," we provide the clarity and armor businesses need to thrive in a hostile cyber
              climate.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Breaches Prevented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-muted-foreground uppercase tracking-widest">Active Monitoring</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl border border-white/10 bg-card p-4 neon-glow-blue"
          >
            <Image
              src="/images/logo-20design-281-29.jpeg"
              alt="RT-DS Red Logo"
              width={600}
              height={600}
              className="rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto mt-32 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <v.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto mt-32 px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">The Elite Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Meet the architects of your digital defense. Our team combines decades of experience from intelligence
            agencies, global finance, and tech giants.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                    className="rounded-full bg-white/10 p-2 backdrop-blur hover:bg-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="#"
                    className="rounded-full bg-white/10 p-2 backdrop-blur hover:bg-primary transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-primary uppercase tracking-tight">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
