"use client"

import type {ReactNode} from "react"
import {usePathname} from "next/navigation"

interface SiteShellProps {
  children: ReactNode
  navbar: ReactNode
  footer: ReactNode
}

// Keep the public website chrome out of Sanity Studio's application workspace.
export default function SiteShell({children, navbar, footer}: SiteShellProps) {
  const pathname = usePathname()
  const isStudioRoute = pathname === "/studio" || pathname.startsWith("/studio/")

  // Studio controls its own full-screen layout and must not inherit public navigation.
  if (isStudioRoute) return <>{children}</>

  // Public routes retain the shared navbar, flexible content area, and footer.
  return (
    <>
      {navbar}
      <main className="flex-grow">{children}</main>
      {footer}
    </>
  )
}
