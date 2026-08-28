import { Resend } from "resend";
import { registrationConfirmationTemplate } from "./email-templates/event-registration-temp";

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
}): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const isPaid = options.amount > 0;

  try {
   await resend.emails.send({
     from: "RedTrace-D Sentinel <events@mail.rtdsentinel.com>",
     to: options.email,
     subject: `Registration Confirmed - ${options.eventTitle}`,

     attachments: [
       {
         path: "https://rtdsentinel.com/images/redtraced_logo.jpeg",
         filename: "redtraceD.jpeg",
         contentId: "rtd-logo",
       },
     ],

     html: registrationConfirmationTemplate({
       fullName: options.fullName,
       eventTitle: options.eventTitle,
       amount: options.amount,
       currency: options.currency,
     }),
   });

    return true;
  } catch (err) {
    // Log and return false so callers can handle failure gracefully
    // eslint-disable-next-line no-console
    console.error("sendRegistrationEmail error:", err);
    return false;
  }
}

     