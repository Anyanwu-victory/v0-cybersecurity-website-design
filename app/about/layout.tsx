import type {Metadata} from "next"
import type {ReactNode} from "react"

// Give the client-rendered About page route-specific browser metadata.
export const metadata: Metadata = {
  title: {absolute: "About | RedTrace-D Sentinel"},
  description: "Learn about RedTrace-D Sentinel, our mission, values, and cybersecurity team.",
  alternates: {canonical: "/about"},
}

// Preserve the existing About page UI while supplying metadata from a server layout.
export default function AboutLayout({children}: {children: ReactNode}) {
  return children
}
