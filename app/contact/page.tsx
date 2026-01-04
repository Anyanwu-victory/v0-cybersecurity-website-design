"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Twitter, Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Info Side */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Establish Secure <span className="text-primary">Comms.</span>
          </h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Whether you're currently facing a security incident or looking to harden your infrastructure, our
            specialists are ready to assist.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Encrypted Email</h3>
                <p className="text-muted-foreground">ops@rt-ds.secure</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Phone className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Direct Hotline</h3>
                <p className="text-muted-foreground">+1 (888) TRACE-OPS</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                <MapPin className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">HQ Coordinates</h3>
                <p className="text-muted-foreground">7th Fl, Cyber Hub, Austin TX, USA</p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Social Intelligence
            </h4>
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-white/10 bg-card p-8 md:p-12 shadow-2xl"
        >
          <form className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Operator Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Secure Email
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Mission Details
              </label>
              <textarea
                rows={5}
                placeholder="Briefly describe the security challenge or inquiry..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary py-4 text-lg font-bold text-white transition-all hover:neon-glow-red">
              Transmission Send
              <Send className="h-5 w-5" />
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By sending, you agree to our strict non-disclosure terms and privacy policy.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

import Link from "next/link"
