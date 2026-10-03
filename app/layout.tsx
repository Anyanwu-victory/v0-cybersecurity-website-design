import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import Footer from "@/components/footer"
import NavbarGlass from "@/components/navbarGlass"
import SiteShell from "@/components/site-shell"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd"
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rtdsentinel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RedTrace-D Sentinel | Enterprise Cybersecurity, Threat Detection & Training",
    template: "%s | RedTrace-D Sentinel",
  },
  description:
    "Securing the Future, One Trace at a Time. Enterprise-grade threat detection, digital forensics, incident response, and cybersecurity awareness training.",
  applicationName: "RedTrace-D Sentinel",
  keywords: [
    "cybersecurity events",
    "threat detection",
    "digital forensics",
    "security awareness training",
    "CISO advisory",
    "incident response",
    "RedTrace-D Sentinel",
    "RTDS",
  ],
  authors: [{ name: "RedTrace-D Sentinel", url: siteUrl }],
  creator: "RedTrace-D Sentinel",
  publisher: "RedTrace-D Sentinel",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "RedTrace-D Sentinel",
    title: "RedTrace-D Sentinel | Enterprise Cybersecurity & Threat Intelligence",
    description: "Securing the Future, One Trace at a Time. Enterprise-grade threat detection and response.",
    images: [
      {
        url: `${siteUrl}/images/redtraced_logo.jpeg`,
        width: 1200,
        height: 630,
        alt: "RedTrace-D Sentinel Cybersecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RedTrace-D Sentinel | Enterprise Cybersecurity & Threat Intelligence",
    description: "Securing the Future, One Trace at a Time. Enterprise-grade threat detection and response.",
    images: [`${siteUrl}/images/redtraced_logo.jpeg`],
  },
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/images/favicon.ico", type: "image/x-icon" },
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SiteShell navbar={<NavbarGlass />} footer={<Footer />}>
          {children}
        </SiteShell>
        <Analytics />
      </body>
    </html>
  )
}

