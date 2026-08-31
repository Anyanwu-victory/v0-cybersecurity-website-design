import type {Metadata} from "next"
import type {ReactNode} from "react"

// Supply a fallback title for the Events index and registration routes.
export const metadata: Metadata = {
  title: {absolute: "Events | RedTrace-D Sentinel"},
  description: "Explore upcoming RedTrace-D Sentinel cybersecurity events, workshops, and training sessions.",
  alternates: {canonical: "/events"},
}

// Individual event pages can override this metadata with their Sanity event title.
export default function EventsLayout({children}: {children: ReactNode}) {
  return children
}
