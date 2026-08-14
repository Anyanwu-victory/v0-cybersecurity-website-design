import { Resend } from "resend";

export function parseEventPrice(price?: number | string): number {
  if (typeof price === "number") return Number.isFinite(price) ? price : 0;
  if (!price || price.toLowerCase().includes("free")) return 0;
  const amount = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) ? amount : 0;
}

export function eventRequiresPayment(
  eventCategory?: string,
  price?: number | string,
) {
  if (eventCategory === "paid") return true;
  if (eventCategory === "free") return false;
  return parseEventPrice(price) > 0;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] || character);
}

export async function sendRegistrationEmail(options: {
  email: string;
  fullName: string;
  eventTitle: string;
  amount: number;
  currency?: string;
}) {
  if (!process.env.RESEND_API_KEY) return false;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const isPaid = options.amount > 0;
  const result = await resend.emails.send({
    from: "Event Registration <onboarding@resend.dev>",
    to: options.email,
    subject: isPaid
      ? `Payment Confirmed - ${options.eventTitle}`
      : `Registration Confirmed - ${options.eventTitle}`,
    html: `
      <h2>${isPaid ? "Payment Confirmed" : "Event Registration Confirmed"}</h2>
      <p>Hi ${escapeHtml(options.fullName)},</p>
      <p>Your registration for <strong>${escapeHtml(options.eventTitle)}</strong> is confirmed.</p>
      ${isPaid ? `<p><strong>Amount paid:</strong> ${escapeHtml(options.currency || "NGN")} ${options.amount.toLocaleString()}</p>` : ""}
      <p>We look forward to seeing you there.</p>
    `,
  });
  if (result.error) throw new Error(result.error.message);
  return true;
}
