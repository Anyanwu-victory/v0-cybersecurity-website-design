import { Shield } from "lucide-react";
import Link from "next/link";
import { sanity } from "@/lib/sanity";
import Image from "next/image";
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandTiktok,
  IconBrandInstagram,
} from "@tabler/icons-react";

const socialIconMap: Record<string, any> = {
  linkedin: IconBrandLinkedin,
  tiktok: IconBrandTiktok,
  x: IconBrandX,
  instagram: IconBrandInstagram,
};

export default async function Footer() {
  // Keep the global footer available when Sanity is temporarily unreachable.
  const contact = await sanity.fetchContact().catch((error) => {
    console.error("Footer contact fetch failed:", error);
    return { contactMethods: [], socials: [] };
  });
  // Load the current service catalogue from Sanity for footer navigation.
  const services = await sanity.fetchServices().catch((error) => {
    console.error("Footer services fetch failed:", error);
    return [];
  });
  const socials = contact.socials || [];
  const contactMethods = contact.contactMethods || [];
  const emailMethod = contactMethods.find((c: any) =>
    (c.href || "").toLowerCase().startsWith("mailto:"),
  );
  const phoneMethod = contactMethods.find((c: any) =>
    (c.href || "").toLowerCase().startsWith("tel:"),
  );

  return (
    <footer className="border-t border-white/10 bg-background py-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 lg:px-[80px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="flex flex-col  gap-2 md:items-start">
            <Link href="/" className="flex items-center ">
              <Image
                src="/images/RedTrace_Footer_logo.png"
                alt="RedTrace-D Sentinel Logo"
                width={280}
                height={70}
              />
            </Link>

            <p className="text-sm text-muted-foreground">
              Securing the Future, One Trace at a Time.
            </p>

            <div className="flex gap-4 mt-4">
              {socials.map((social: any, idx: number) => {
                const Icon =
                  socialIconMap[(social.name || "").toLowerCase()] || Shield;
                return (
                  <Link
                    key={idx}
                    href={social.href}
                    className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10"
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </Link>
                );
              })}
            </div>
            {/* <h1 className="font-bold text-lg text-white mt-3">Contact Us</h1>
            <p className="text-md text-muted-foreground">
              email:{" "}
              {emailMethod ? (
                <a href={emailMethod.href}>{emailMethod.detail}</a>
              ) : (
                <a href="mailto:support@rtdsentinel.com">
                  support@rtdsentinel.com
                </a>
              )}
            </p>
            <p className="text-md text-muted-foreground">
              call us:{" "}
              {phoneMethod ? (
                <a href={phoneMethod.href}>{phoneMethod.detail}</a>
              ) : (
                <a href="tel:+2348106283100">+2348106283100</a>
              )}
            </p> */}
          </div>

          {/* Quick link - under consideration */}

          <div className="flex flex-col items-start gap-4 md:items-start">
            <span className="text-lg font-bold tracking-tighter">
              Quick Links
            </span>

            <ul className="space-y-2 flex flex-col items-start gap-2">
            
              <Link
                href="/about"
                className="text-md text-muted-foreground hover:text-[#E11D2E] transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-md text-muted-foreground hover:text-[#E11D2E] transition-colors"
              >
                Blog
              </Link>
              
              <Link
                href="/contact"
                className="text-md text-muted-foreground hover:text-[#E11D2E] transition-colors"
              >
                Contact
              </Link>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg text-white ">Contact Us</h1>
            <p className="text-md text-muted-foreground">
              email:{" "}
              {emailMethod ? (
                <a href={emailMethod.href}>{emailMethod.detail}</a>
              ) : (
                <a href="mailto:support@rtdsentinel.com">
                  support@rtdsentinel.com
                </a>
              )}
            </p>
            <p className="text-md text-muted-foreground">
              call us:{" "}
              {phoneMethod ? (
                <a href={phoneMethod.href}>{phoneMethod.detail}</a>
              ) : (
                <a href="tel:+2348106283100">+2348106283100</a>
              )}
            </p>
          </div>
        </div>

        {/* Keep legal destinations discoverable from every public page. */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center sm:flex-row">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            © {new Date().getFullYear()} RedTrace D Sentinel Limited. All
            rights reserved.
          </p>
          <nav
            aria-label="Legal"
            className="flex items-center gap-5 text-xs text-muted-foreground"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Use
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
