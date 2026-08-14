"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  Shield,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { sanity } from "@/lib/sanity";

export default function Events() {
 
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(true);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  // Prevent body scroll when mobile filter menu is open
  useEffect(() => {
    if (filterMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [filterMenuOpen]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () => {
      sanity
        .fetchEvents()
        .then((res) => {
          if (!mounted) return;
          setEvents(res);
        })
        .catch((err) => {
          console.error("Sanity fetch events error:", err);
        });
    };

    // Fetch on mount
    fetchData();

    // Refetch every 30 seconds to catch new events
    const interval = setInterval(fetchData, 30000);

    // Refetch when tab regains focus
    const handleFocus = () => fetchData();
    window.addEventListener("focus", handleFocus);

    return () => {
      mounted = false;
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };


  
  return (
    <div className="container mx-auto px-4 py-24 lg:px-20">
      {/* existing UI unchanged; event cards map over `events` state below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Intelligence Briefings
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Join our experts at these upcoming workshops, conferences, and
          seminars to stay ahead of the evolving threat landscape.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8">

        <div className="flex-1">

         
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden rounded-3xl"
              >
                <Link
                  href={`/events/${event.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition-all hover:-translate-y-1  hover:border-[#E11D2E]/40"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-[#E11D2E]/10 px-3 py-1 text-xs font-bold text-[#E11D2E] uppercase tracking-wider">
                      {event.tag}
                    </span>
                    <div className="text-muted-foreground group-hover:text-[#E11D2E] transition-colors">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold group-hover:text-glow-red transition-all">
                    {event.title}
                  </h3>
                  <p className="mb-8 flex-1 text-muted-foreground line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-6 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-[#E11D2E]" />
                      {event.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 text-[#38BDF8]" />
                      {event.location}
                    </div>
                  </div>

                  <button className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 py-3 font-semibold transition-all hover:bg-[#E11D2E] hover:text-white">
                    Learn More
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 overflow-hidden rounded-3xl bg-linear-to-r from-[#E11D2E]/20 to-[#0b0e14]/20 p-12 text-center border border-white/10">
        <Shield className="mx-auto mb-6 h-12 w-12 text-[#E11D2E] neon-glow-red" />
        <h2 className="mb-4 text-3xl font-bold">Request a Private Briefing</h2>
        <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
          Need a specialized session for your executive team? We provide custom
          cybersecurity awareness and strategy briefings for global
          organizations.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3 font-bold text-black transition-transform hover:scale-105"
        >
          Inquire Now
        </Link>
      </div>
    </div>
  );
}
