import { Shield } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tighter">RT-DS</span>
            </Link>
            <p className="text-sm text-muted-foreground">Securing the Future, One Trace at a Time.</p>
          </div>

          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Ops
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Incident Support
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em]">
          © 2026 RT-DS GLOBAL SECURITY OPERATIONS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
