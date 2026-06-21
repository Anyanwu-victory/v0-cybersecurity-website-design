import { Shield } from "lucide-react"
import Link from "next/link"
import { socials, services } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 lg:px-[80px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">

          <div className="flex flex-col  gap-4 md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-[#E11D2E]" />
              <span className="text-2xl font-bold tracking-tighter">RT-DS</span>
            </Link>
            <p className="text-sm text-muted-foreground">Securing the Future, One Trace at a Time.</p>
            <p className="text-sm text-muted-foreground">email: <a href="mailto:rtdsecure004@gmail.com">rtdsecure004@gmail.com</a></p>
            <p className="text-sm text-muted-foreground">call us: <a href="tel:+2348106283100">+2348106283100</a></p>
          </div>

          {/* services link - under consideration */}

          {/* <div className="flex flex-col items-start gap-4 md:items-start">
            <span className="text-lg font-bold tracking-tighter">Services</span>

            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-[#E11D2E] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>


          </div> */}



          <div className="flex gap-4">
            {socials.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
              >
                <social.icon className="h-6 w-6 text-white" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em]">
          © 2026 RT-DS GLOBAL SECURITY OPERATIONS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
