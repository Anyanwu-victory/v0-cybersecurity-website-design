import type {Metadata} from "next"
import Link from "next/link"

// Give the public terms page its own canonical search metadata.
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of the RedTrace-D Sentinel website and event-registration services.",
  alternates: {canonical: "/terms"},
}

// State the website's core usage and event-registration conditions in plain language.
export default function TermsPage() {
  return (
    <main className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#E11D2E]">Legal</p>
        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">Terms of Use</h1>
        <p className="mb-12 text-sm text-muted-foreground">Last updated: August 28, 2026</p>

        {/* Limit the terms to rules the current website and event flow can support. */}
        <div className="space-y-10 text-white/75">
          <section><h2 className="mb-3 text-2xl font-bold text-white">Using this website</h2><p className="leading-8">You may use this website for lawful informational, enquiry, and event-registration purposes. You must not interfere with its operation, attempt unauthorized access, submit malicious material, impersonate another person, or use automated means to abuse its forms or services.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Event information</h2><p className="leading-8">Event dates, times, speakers, venues, meeting links, availability, and other details may change. We will use the contact information supplied during registration to communicate material event updates where reasonably possible.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Registration and payment</h2><p className="leading-8">A free registration is confirmed only after the website records it successfully. A paid registration is confirmed only after the payment provider verifies payment and the website records the registration. A payment receipt by itself may not be proof that registration processing has completed.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Cancellations and refunds</h2><p className="leading-8">Any event-specific cancellation or refund conditions communicated during registration apply to that event. Contact us promptly if a successful payment is not followed by registration confirmation so the transaction can be reviewed.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Website content</h2><p className="leading-8">Website and Insights content is provided for general information and does not constitute a guarantee or professional advice tailored to a specific security environment. You remain responsible for decisions made using this information.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Availability and liability</h2><p className="leading-8">We aim to keep the website accurate and available but cannot guarantee uninterrupted or error-free operation. To the extent permitted by applicable law, we are not responsible for indirect losses resulting from reliance on website content or temporary service unavailability.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Contact</h2><p className="leading-8">Questions about these terms can be sent to <a className="text-[#38BDF8] hover:underline" href="mailto:support@rtdsentinel.com">support@rtdsentinel.com</a> or through our <Link className="text-[#38BDF8] hover:underline" href="/contact">contact page</Link>.</p></section>
        </div>
      </article>
    </main>
  )
}
