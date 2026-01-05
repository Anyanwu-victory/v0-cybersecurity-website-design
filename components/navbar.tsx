"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Home, Info, Calendar, Mail, Menu } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-[80px]">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg">
              
              <Image
                src="/images/logo_design_1.png"
                alt="RT-DS Red Logo"
                width={0}
                height={0}
                className="rounded-2xl w-9 h-9"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter text-glow-red">
              RT-DS
            </span>
          </Link>
          


          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-primary/80 hover:neon-glow-red"
            >
              Connect
            </Link>
          </div>

          {/* Mobile Toggle */}
          {/* <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="h-6 w-6" />
          </button> */}
          <Link
              href="/contact"
              className="md:hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-primary/80 hover:neon-glow-red"
            >
              Connect
            </Link>
        </div>
      </nav>

      {/* Mobile Nav (Bottom bar style for modern feel) */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-white/10 bg-background/90 p-4 backdrop-blur-lg md:hidden">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 text-[10px]",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
