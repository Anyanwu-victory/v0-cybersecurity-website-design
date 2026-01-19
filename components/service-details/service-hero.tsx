'use client';

import React from "react"

import { motion } from 'framer-motion';

interface ServiceHeroProps {
  service: {
    title: string;
    fullContent: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  };
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const Icon = service.icon;

  return (
    <section className="cyber-grid relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-[#0B0E14]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl space-y-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#E11D2E]/20 backdrop-blur-sm"
        >
          <Icon className={`h-10 w-10 ${service.color}`} />
        </motion.div>

        <h1 className="text-5xl font-extrabold tracking-wide sm:text-6xl md:text-7xl">
          {service.title}
        </h1>

        <p className="mx-auto max-w-3xl text-lg text-muted-foreground md:text-xl leading-8">
          {service.fullContent}
        </p>
      </motion.div>
    </section>
  );
}
