import type {Metadata} from "next"
import type {ReactNode} from "react"

// Supply a clear fallback title for service-detail routes.
export const metadata: Metadata = {
  title: {absolute: "Services | RedTrace-D Sentinel"},
  description: "Explore RedTrace-D Sentinel cybersecurity and digital protection services.",
}

// Preserve each existing service page while providing section metadata.
export default function ServicesLayout({children}: {children: ReactNode}) {
  return children
}
