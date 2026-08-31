import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { appendRegistration, findRegistration, registrationExists } from "@/lib/google-sheets";
import { assertEventSheetConfiguration, getEventById } from "@/lib/event-record";
import { eventRequiresPayment, parseEventPrice, sendRegistrationEmail } from "@/lib/event-registration";
import { scheduleRegistrationReminder } from "@/lib/reminder-scheduler";

// Signature verification requires Node's crypto implementation.
export const runtime = "nodejs";

// Compare Paystack's signature without leaking timing information.
function validSignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha512", secret).update(payload).digest("hex");
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

// Generate a readable, non-sequential registration identifier.
function createRegistrationId() {
  return `REG-${new Date().getFullYear()}-${randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

// Convert signed Paystack charge.success events into paid event registrations.
export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return NextResponse.json({ message: "Webhook unavailable" }, { status: 500 });

  // The signature must be calculated from the untouched request body.
  const payload = await request.text();
  const signature = request.headers.get("x-paystack-signature") || "";
  if (!signature || !validSignature(payload, signature, secret)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const webhook = JSON.parse(payload);
  if (webhook.event !== "charge.success") return NextResponse.json({ received: true });

  const payment = webhook.data;
  const reference = String(payment.reference || "");
  const eventId = String(payment.metadata?.eventId || "");
  if (!reference || !eventId) {
    return NextResponse.json({ message: "Missing payment identifiers" }, { status: 400 });
  }

  const event = await getEventById(eventId);
  if (!event) return NextResponse.json({ message: "Event not found" }, { status: 400 });
  assertEventSheetConfiguration(event);

  // Repeated webhook deliveries should not create repeated registration rows.
  if (await findRegistration(event, reference)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const metadata = payment.metadata || {};
  const fullName = String(metadata.fullName || "").trim();
  const phone = String(metadata.phone || "").trim();
  const company = String(metadata.company || "").trim();
  const profession = String(metadata.profession || "").trim();
  const email = String(payment.customer?.email || "").trim().toLowerCase();
  if (!fullName || !phone || !profession || !email) {
    return NextResponse.json({ message: "Incomplete registration metadata" }, { status: 400 });
  }

  const amount = parseEventPrice(event.price);
  const currency = (event.currency || "NGN").toUpperCase();
  if (
    !eventRequiresPayment(event.eventCategory, event.price)
    || amount <= 0
    || Number(payment.amount) / 100 !== amount
    || String(payment.currency || "").toUpperCase() !== currency
    || payment.status !== "success"
  ) {
    return NextResponse.json({ message: "Payment does not match an open paid event" }, { status: 400 });
  }

  // Apply the per-event duplicate rule before appending the paid registration.
  if (await registrationExists(event, email, reference)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const registrationId = createRegistrationId();
  await appendRegistration(event, {
    registrationId,
    fullName,
    email,
    phone,
    profession,
    company,
    registrationType: "Paid",
    amount,
    currency,
    paymentStatus: "Paid",
    paymentReference: reference,
    registeredAt: new Date().toISOString(),
  });

  // Email failure must not undo an already recorded payment registration.
  try {
    await sendRegistrationEmail({ email, fullName, eventTitle: event.title, amount, currency });
  } catch (error) {
    //console.error("Webhook registration saved but email failed:", error);
  }

  // Reminder failure is isolated so a saved paid registration remains confirmed.
  await scheduleRegistrationReminder({
    eventId: event.eventId,
    registrationId,
    registrantEmail: email,
    registrantName: fullName,
    event,
  }).catch((reminderError) => {
    //console.error("Paid registration saved but reminder scheduling failed:", reminderError);
  });

  return NextResponse.json({ received: true, registrationId });
}
