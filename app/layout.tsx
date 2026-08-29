import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Footer from "@/components/footer"
import NavbarGlass from "@/components/navbarGlass"  
import SiteShell from "@/components/site-shell"
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
  // Resolve canonical and social URLs against the deployed production origin.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rtdsentinel.com"),
  title: { default: "RT-DS | Cybersecurity & Digital Forensics", template: "%s | RT-DS" },
  description: "Securing the Future, One Trace at a Time. Enterprise-grade threat detection and response.",
  applicationName: "RedTrace-D Sentinel",
  keywords: ["cybersecurity", "digital forensics", "security awareness", "vulnerability management"],
  authors: [{ name: "RedTrace-D Sentinel" }],
  creator: "RedTrace-D Sentinel",
  publisher: "RedTrace-D Sentinel",
  openGraph: {
    type: "website", locale: "en_NG", siteName: "RedTrace-D Sentinel",
    title: "RT-DS | Cybersecurity & Digital Forensics",
    description: "Securing the Future, One Trace at a Time.",
    images: [{ url: "/images/redtraced_logo.jpeg", alt: "RedTrace-D Sentinel" }],
  },
  twitter: {
    card: "summary_large_image", title: "RT-DS | Cybersecurity & Digital Forensics",
    description: "Securing the Future, One Trace at a Time.", images: ["/images/redtraced_logo.jpeg"],
  },
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
        {/* Studio bypasses this public navbar/footer shell inside SiteShell. */}
        <SiteShell navbar={<NavbarGlass />} footer={<Footer />}>
          {children}
        </SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
