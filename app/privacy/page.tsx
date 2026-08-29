import type {Metadata} from "next"
import Link from "next/link"

// Describe the policy accurately in search results without exposing operational details.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RedTrace-D Sentinel collects, uses, and protects information submitted through this website.",
  alternates: {canonical: "/privacy"},
}

// Publish a plain-language privacy notice for contact and event-registration data.
export default function PrivacyPage() {
  return (
    <main className="px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#E11D2E]">Legal</p>
        <h1 className="mb-4 text-4xl font-extrabold md:text-6xl">Privacy Policy</h1>
        <p className="mb-12 text-sm text-muted-foreground">Last updated: August 28, 2026</p>

        {/* Keep policy sections readable and specific to the website's current data flows. */}
        <div className="space-y-10 text-white/75">
          <section><h2 className="mb-3 text-2xl font-bold text-white">Information we collect</h2><p className="leading-8">We collect information you submit through event-registration and contact forms, including your name, email address, telephone number, profession, company, selected service, and message. For paid events, we retain the payment status and transaction reference supplied by our payment provider; we do not collect or store your complete card details.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">How we use information</h2><p className="leading-8">We use submitted information to manage event registrations, verify payments, send confirmations and event reminders, respond to enquiries, prevent duplicate registrations, maintain operational records, and protect the website from misuse.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Service providers</h2><p className="leading-8">We use service providers to operate this website, including Sanity for website content, Google Sheets for registration records, Paystack for payment processing, Resend for transactional email, and Vercel for hosting and website analytics. These providers process limited information as required to deliver their services.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Retention and security</h2><p className="leading-8">We retain information only while it is reasonably needed for the purposes described above, our operational records, or applicable obligations. We use access controls and reputable service providers to protect information, but no internet transmission or storage system can be guaranteed completely secure.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Your choices</h2><p className="leading-8">You may request access to, correction of, or deletion of your personal information, subject to any information we must retain for legitimate operational or legal reasons. You may also ask us to stop sending non-essential communications.</p></section>
          <section><h2 className="mb-3 text-2xl font-bold text-white">Contact us</h2><p className="leading-8">For privacy questions or requests, email <a className="text-[#38BDF8] hover:underline" href="mailto:support@rtdsentinel.com">support@rtdsentinel.com</a> or use our <Link className="text-[#38BDF8] hover:underline" href="/contact">contact page</Link>.</p></section>
        </div>
      </article>
    </main>
  )
}
