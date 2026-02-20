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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Summit Series",
    "EMEA",
    "Less than an hour",
  ]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(true);
  const [durationsOpen, setDurationsOpen] = useState(true);
  const [datesOpen, setDatesOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([
    "Less than an hour",
  ]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
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

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedTypes([]);
    setSelectedDurations([]);
    setSelectedDates([]);
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration)
        ? prev.filter((d) => d !== duration)
        : [...prev, duration],
    );
  };

  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
  };

  const FilterSidebar = () => (
    <div className="rounded-2xl border border-white/10 bg-card p-6 md:sticky md:top-24">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Filter By
      </h2>

      {/* Type Filter */}
      <div className="mb-6 border-b border-white/5 pb-6">
        <button
          onClick={() => setTypeOpen(!typeOpen)}
          className="flex w-full items-center justify-between mb-4 font-semibold"
        >
          Type
          {typeOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {typeOpen && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes("in-person")}
                onChange={() => toggleType("in-person")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Upcoming in person
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes("digital")}
                onChange={() => toggleType("digital")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Upcoming digital
              </span>
            </label>
            {/* <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedTypes.includes("on-demand")}
                onChange={() => toggleType("on-demand")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                On demand
              </span>
            </label> */}
          </div>
        )}
      </div>

      {/* Regions Filter */}
      <div className="mb-6 border-b border-white/5 pb-6">
        <button
          onClick={() => setDurationsOpen(!durationsOpen)}
          className="flex w-full items-center justify-between mb-4 font-semibold"
        >
          Duration
          {durationsOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {durationsOpen && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDurations.includes("Less than an hour")}
                onChange={() => toggleDuration("Less than an hour")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Less than an hour
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDurations.includes("1-2 hours")}
                onChange={() => toggleDuration("1-2 hours")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                1-2 hours
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDurations.includes("2-4 hours")}
                onChange={() => toggleDuration("2-4 hours")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                2-4 hours
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Date Filter */}
      <div className="mb-6 border-b border-white/5 pb-6">
        <button
          onClick={() => setDatesOpen(!datesOpen)}
          className="flex w-full items-center justify-between mb-4 font-semibold"
        >
          Date
          {datesOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {datesOpen && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDates.includes("past-60-plus")}
                onChange={() => toggleDate("past-60-plus")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Past 60+ days
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDates.includes("past-60")}
                onChange={() => toggleDate("past-60")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Past 60 days
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDates.includes("30-60-away")}
                onChange={() => toggleDate("30-60-away")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                30-60 days away
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedDates.includes("60-plus-away")}
                onChange={() => toggleDate("60-plus-away")}
                className="h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                60+ days away
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  );

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
        <aside className="hidden md:block w-full md:w-64 lg:w-80 shrink-0">
          <FilterSidebar />
        </aside>

        <AnimatePresence>
          {filterMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterMenuOpen(false)}
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-background z-50 overflow-y-auto md:hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Filters</h2>
                    <button
                      onClick={() => setFilterMenuOpen(false)}
                      className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1">
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setFilterMenuOpen(true)}
              className="md:hidden flex items-center justify-center rounded-xl border border-white/10 bg-card px-4 hover:bg-white/5 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {activeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => removeFilter(filter)}
                  className="flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
                >
                  {filter}
                  <X className="h-3 w-3" />
                </button>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

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
