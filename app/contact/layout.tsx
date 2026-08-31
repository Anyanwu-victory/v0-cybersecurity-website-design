import type {Metadata} from "next"
import type {ReactNode} from "react"

// Give the contact experience a distinct title and canonical address.
export const metadata: Metadata = {
  title: {absolute: "Contact | RedTrace-D Sentinel"},
  description: "Contact RedTrace-D Sentinel about cybersecurity services, events, and security support.",
  alternates: {canonical: "/contact"},
}

// Preserve the existing Contact page UI while supplying route metadata.
export default function ContactLayout({children}: {children: ReactNode}) {
  return children
}
