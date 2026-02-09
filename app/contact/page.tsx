"use client"

import { motion } from "framer-motion"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link";
import { socials, contactMethods } from "@/lib/data";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", message: "" });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 lg:px-[80px]">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Info Side */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="mb-6 text-4xl font-bold md:text-6xl">
            Establish Secure <span className="text-[#E11D2E]">Comms.</span>
          </h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Whether you're currently facing a security incident or looking to harden your infrastructure, our
            specialists are ready to assist.
          </p>

          <div className="space-y-8">
            {contactMethods.map((method, idx) => (
              <div key={idx} className="flex items-start gap-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${method.color}/10`}>
                  <method.icon className={`h-6 w-6 text-${method.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{method.type}</h3>
                  <a href={method.href} className="text-muted-foreground"> {method.detail}</a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Social Intelligence
            </h4>
            <div className="flex gap-4">
              {socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-[#E11D2E]"
                >
                  <social.icon className="h-5 w-5" />
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
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Operator Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#E11D2E]/50 focus:ring-1 focus:ring-[#E11D2E]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Secure Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#E11D2E]/50 focus:ring-1 focus:ring-[#E11D2E]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Mission Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Briefly describe the security challenge or inquiry..."
                required
                disabled={status === 'loading'}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-[#E11D2E]/50 focus:ring-1 focus:ring-[#E11D2E]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Success Message */}
            {status === 'success' && (
              <div className="flex items-center gap-3 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-400">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] py-4 text-lg font-bold text-white transition-all hover:neon-glow-red disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {status === 'loading' ? (
                <>
                  Sending...
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Transmission Send
                  <Send className="h-5 w-5" />
                </>
              )}
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