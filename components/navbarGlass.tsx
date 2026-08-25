"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Keep navigation destinations aligned with routes that exist in this application.
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
]

export default function NavbarGlass() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Apply the reference navbar's stronger glass treatment after the page starts scrolling.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close the responsive drawer whenever navigation completes.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Lock page scrolling and support Escape while the off-canvas menu is open.
  useEffect(() => {
    if (!isMenuOpen) return
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  // Parent routes remain highlighted on their dynamic child pages.
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <>
      {/* A transparent sticky wrapper leaves visible space around the suspended glass panel. */}
      <header className="pointer-events-none sticky top-3 z-50 w-full px-3 sm:top-4 sm:px-5 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className={cn(
            "pointer-events-auto mx-auto flex h-[72px] w-full max-w-[1380px] items-center justify-between rounded-full border px-5 transition-all duration-300 sm:px-8 lg:h-[82px] lg:px-10 xl:px-14",
            isScrolled
              ? "border-white/15 bg-[rgba(244, 246, 250, 0.82)] shadow-[0_18px_55px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
              : "border-white/15 bg-[rgba(8,11,18,0.82)] shadow-[0_14px_45px_rgba(0,0,0,0.3)] backdrop-blur-xl",
          )}
        >
          {/* RT-DS branding replaces the reference site's logo while retaining its placement. */}
          <Link
            href="/"
            className="group relative z-10 flex shrink-0 items-center gap-2.5"
            aria-label="RT-DS home"
          >
            <Image
              src="/images/logo_design_1.png"
              alt="RT-DS Logo"
              width={56}
              height={56}
              priority
              className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14 lg:w-14"
            />
            <span className="text-lg font-bold tracking-[-0.04em] text-white sm:text-xl">
              RT-DS
            </span>
          </Link>


    
             {/* <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-11"></div> */}
          {/* Laptop links sit beside the logo while the CTA remains pushed to the far right. */}
          <div className="mr-auto hidden items-center gap-8 lg:ml-10 lg:flex xl:ml-14 xl:gap-10">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-3 text-sm font-semibold tracking-wide transition-colors duration-300",
                    active ? "text-[#E11D2E]" : "text-white/65 hover:text-white",
                  )}
                >
                  {link.name}
                  {/* <span
                    className={cn(
                      "absolute inset-x-0 bottom-1 h-0.5 origin-left bg-[#E11D2E] transition-transform duration-300",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  /> */}
                </Link>
              );
            })}
          </div>

          {/* The desktop CTA stays visually separate from the main link group. */}
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-[#E11D2E] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c91828] hover:shadow-[0_10px_30px_rgba(225,29,46,0.3)] lg:inline-flex"
          >
            Connect
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Phones and tablets use the same accessible off-canvas menu trigger. */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="responsive-navigation"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#E11D2E]/60 hover:bg-[#E11D2E]/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* The reference-style drawer overlays content instead of occupying a permanent bottom bar. */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm"
            />

            <motion.aside
              id="responsive-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col border-l border-white/10 bg-[#080b12] px-6 pb-8 pt-5 shadow-[-24px_0_70px_rgba(0,0,0,0.45)] sm:px-9"
            >
              {/* Drawer header repeats the brand and gives touch users a large close target. */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <Link
                  href="/"
                  className="flex items-center gap-2.5"
                  aria-label="RT-DS home"
                >
                  <Image
                    src="/images/logo_design_1.png"
                    alt="RT-DS Logo"
                    width={48}
                    height={48}
                    className="h-11 w-11 object-contain"
                  />
                  <span className="text-lg font-bold tracking-[-0.04em] text-white">
                    RT-DS
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#E11D2E]/60 hover:bg-[#E11D2E]/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Large stacked links reproduce the reference off-canvas navigation rhythm. */}
              <div className="flex flex-1 flex-col justify-center py-8">
                <div className="flex flex-col">
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 28 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + index * 0.06 }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "group flex items-center justify-between border-b border-white/10 py-5 text-3xl font-semibold tracking-[-0.04em] transition-colors sm:text-4xl",
                            active
                              ? "text-[#E11D2E]"
                              : "text-white hover:text-[#E11D2E]",
                          )}
                        >
                          <span>{link.name}</span>
                          <ArrowUpRight className="h-5 w-5 opacity-40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* The CTA remains available at the bottom on both phones and tablets. */}
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E11D2E] px-6 py-4 text-base font-bold text-white transition-colors hover:bg-[#c91828]"
              >
                Connect with us
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
