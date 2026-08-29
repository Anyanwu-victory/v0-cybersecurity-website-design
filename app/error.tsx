"use client"

import {useEffect} from "react"
import Link from "next/link"
import {AlertTriangle, RefreshCw} from "lucide-react"

// Provide a recoverable production error state for unexpected route failures.
export default function ErrorPage({error, reset}: {error: Error & {digest?: string}; reset: () => void}) {
  useEffect(() => {
    // Retain a diagnostic record without displaying internal details to visitors.
    console.error("Unexpected page error:", error)
  }, [error])

  return (
    <section className="flex min-h-[65vh] items-center justify-center px-4 py-20 text-center">
      <div className="max-w-lg rounded-3xl border border-white/10 bg-card p-8 md:p-12">
        <AlertTriangle className="mx-auto mb-6 h-12 w-12 text-[#E11D2E]" aria-hidden="true" />
        <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-8 leading-7 text-muted-foreground">We could not load this page. Please try again, or return to the homepage if the problem continues.</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-6 py-3 font-semibold text-white hover:bg-[#E11D2E]/90"><RefreshCw className="h-4 w-4" />Try again</button>
          <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3 font-semibold hover:bg-white/5">Go home</Link>
        </div>
      </div>
    </section>
  )
}
