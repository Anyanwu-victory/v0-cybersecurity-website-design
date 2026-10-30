import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomepageCTA() {
  return (
    <section className="bg-[#191a18] px-5 py-20 text-[#f3f1ec] sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#e77b82]">Start a conversation</p>
          <h2 className="font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">Have a security question?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/65">Tell us what you’re working on. We’ll help you figure out the right next step.</p>
        </div>
        <Link href="/contact" className="inline-flex w-fit items-center gap-3 border border-white/35 px-6 py-4 text-sm font-semibold transition-colors hover:border-[#e77b82] hover:bg-[#a51c29]">
          Contact the team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
