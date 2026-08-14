import Link from "next/link"
import { ArrowLeft, Home, ShieldAlert } from "lucide-react"

// Branded fallback for URLs that do not match an available application route.
export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-20">
      {/* Soft brand glows keep the error state consistent with the rest of the site. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#E11D2E]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E11D2E]/30 bg-[#E11D2E]/10">
          <ShieldAlert className="h-10 w-10 text-[#E11D2E]" aria-hidden="true" />
        </div>

        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.3em] text-[#38BDF8]">
          Error 404
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Page not found</h1>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground">
          The page may have moved, been removed, or the address may be incorrect.
        </p>

        {/* Give visitors clear recovery paths instead of leaving them at a dead end. */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E11D2E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#E11D2E]/90"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go to homepage
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold transition-colors hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Browse events
          </Link>
        </div>
      </div>
    </section>
  )
}
