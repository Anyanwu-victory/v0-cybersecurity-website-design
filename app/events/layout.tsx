import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Cybersecurity Events & Intelligence Briefings",
  description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, conferences, and executive briefings.",
  openGraph: {
    title: "Cybersecurity Events & Intelligence Briefings | RedTrace-D Sentinel",
    description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, conferences, and executive briefings.",
    url: "https://www.rtdsentinel.com/events",
  },
}

export default function EventsLayout({ children }: { children: ReactNode }) {
  return children
}

