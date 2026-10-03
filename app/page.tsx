"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Lock, Search, Presentation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconUser, IconDeviceDesktop } from "@tabler/icons-react";
import { sanity } from "@/lib/sanity";
import HomepageCTA from "@/components/HomepageCTA";
import InsightsSection from "@/components/insights-section";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  // Store the latest Sanity articles used by the homepage insights section.
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    const ICON_MAP: Record<string, any> = {
      Shield,
      Presentation,
      Search,
      Lock,
      IconUser,
      IconDeviceDesktop,
    };

    // fetch services and site settings in parallel
    Promise.all([
      sanity.fetchServices(),
      sanity.fetchSiteSettings(),
      sanity.fetchArticles(9),
    ]).then(([servicesRes, settings, articlesRes]: any) => {
      if (!mounted) return;
      const mapped = (servicesRes || []).map((s: any) => ({
        ...s,
        icon: ICON_MAP[s.icon] || Shield,
      }));
      setServices(mapped);
      setSiteSettings(settings);
      // Retain enough recent articles for useful category filtering in the homepage section.
      setArticles(articlesRes || []);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="cyber-grid relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="absolute  inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-[#0B0E14]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl space-y-6"
        >
          {/* <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono font-medium tracking-wider text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#E11D2E] animate-pulse" />
            REDTRACE-D SENTINEL // INTELLIGENCE & DEFENSE
          </div> */}

          <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl leading-[1.08] sm:leading-[1.08]">
            Securing the <span className="text-[#E11D2E]">Future</span>
            <br />
            One Trace at a Time
          </h1>


          <p className="mx-auto max-w-xl md:max-w-md lg:max-w-xl text-base text-slate-400 text-sm md:text-md font-normal leading-relaxed">
            RTDS (RedTrace-D Sentinel) helps individuals, startups, and
            organizations stay ahead of cyber threats by finding vulnerabilities
            early and building security into everything they create.
          </p>

          <div className="pt-4 inline-flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#c81625] sm:w-auto"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Decorative subtle ambient accents */}
        <div className="hidden md:block pointer-events-none absolute left-0 top-1/2 h-px w-48 -translate-y-1/2 bg-gradient-to-r from-[#E11D2E]/20 to-transparent" />
        <div className="hidden md:block pointer-events-none absolute right-0 top-1/2 h-px w-48 -translate-y-1/2 bg-gradient-to-l from-white/10 to-transparent" />
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
        {/* //href={`/services/${service.slug}`} */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 transition-all hover:border-[#E11D2E]/50 hover:bg-white/5 "
            >
              <div
                className={cn(
                  "mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted transition-all group-hover:scale-110",
                  // only include as a Tailwind class when it's already a valid class (eg. starts with "text-")
                  service.color && !/#/.test(String(service.color))
                    ? service.color
                    : undefined,
                )}
                // if a raw hex was stored (eg. "#E11D2E" or "[#E11D2E]"), extract and apply as inline color
                style={(() => {
                  const col = service.color;
                  if (!col) return undefined;
                  const m = String(col).match(/#([0-9A-Fa-f]{3,8})/);
                  if (m) return { color: `#${m[1]}` };
                  return undefined;
                })()}
              >
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground leading-6 ">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Show the latest CMS-managed security articles before the closing CTA. */}
      <InsightsSection articles={articles} />

      {/* Featured CTA */}
      <HomepageCTA />
    </div>
  );
}
