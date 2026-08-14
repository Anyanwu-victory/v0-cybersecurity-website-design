import { NextRequest, NextResponse } from "next/server";
import { findRegistration } from "@/lib/google-sheets";
import { assertEventSheetConfiguration, getEventById } from "@/lib/event-record";

// Hide most of the registrant's email before returning public status data.
function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return "";
  return `${name.slice(0, 2)}${"*".repeat(Math.max(1, name.length - 2))}@${domain}`;
}

// Resolve the event through Sanity, then search only its assigned registration tab.
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const eventId = request.nextUrl.searchParams.get("event");
  if (!eventId) {
    return NextResponse.json({ message: "Event ID is required" }, { status: 400 });
  }

  const event = await getEventById(eventId);
  if (!event) return NextResponse.json({ message: "Event not found" }, { status: 404 });
  assertEventSheetConfiguration(event);

  // A 202 response lets the paid success page wait for the Paystack webhook.
  const registration = await findRegistration(event, params.id);
  if (!registration) return NextResponse.json({ status: "processing" }, { status: 202 });

  const isPaid = registration.registrationType === "Paid" && registration.paymentStatus === "Paid";
  return NextResponse.json({
    status: registration.paymentStatus,
    registrationId: registration.registrationId,
    eventId: event.eventId,
    eventTitle: event.title,
    email: maskEmail(registration.email),
    isPaid,
    amount: isPaid ? registration.amount : 0,
    currency: isPaid ? registration.currency || event.currency || "NGN" : "",
    paymentReference: isPaid ? registration.paymentReference : null,
  });
}
