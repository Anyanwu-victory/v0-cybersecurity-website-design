import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NavbarGlass from "@/components/navbarGlass"  
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "RT-DS | Cybersecurity & Digital Forensics",
  description: "Securing the Future, One Trace at a Time. Enterprise-grade threat detection and response.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/favicon-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/images/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: "/images/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col `}>
        <NavbarGlass />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
