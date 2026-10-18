import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cybersecurity Events & Intelligence Briefings",
  description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, conferences, and executive briefings.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Cybersecurity Events & Intelligence Briefings | RedTrace-D Sentinel",
    description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, conferences, and executive briefings.",
    url: "https://www.rtdsentinel.com/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Events & Intelligence Briefings | RedTrace-D Sentinel",
    description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, conferences, and executive briefings.",
  },
}

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children
}

