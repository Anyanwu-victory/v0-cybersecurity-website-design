import { randomUUID } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { appendRegistration, registrationExists } from "@/lib/google-sheets";
import { assertEventSheetConfiguration, getEventBySlug, registrationIsOpen } from "@/lib/event-record";
import { eventRequiresPayment, sendRegistrationEmail } from "@/lib/event-registration";
import { scheduleRegistrationReminder } from "@/lib/reminder-scheduler";

interface RegistrationRequest {
  eventSlug?: string;
  eventId?: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  profession: string;
}

function createRegistrationId() {
  return `REG-${new Date().getFullYear()}-${randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json();
    const eventSlug = body.eventSlug || body.eventId;
    if (!eventSlug || !body.fullName || !body.email || !body.phone || !body.profession) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }

    const event = await getEventBySlug(eventSlug);
    if (!event) return NextResponse.json({ success: false, message: "Event not found" }, { status: 404 });
    assertEventSheetConfiguration(event);

    if (!registrationIsOpen(event)) {
      return NextResponse.json({ success: false, message: "Registration is not open for this event" }, { status: 403 });
    }
    if (eventRequiresPayment(event.eventCategory, event.price)) {
      return NextResponse.json({ success: false, message: "Payment is required for this event" }, { status: 402 });
    }
    if (await registrationExists(event, email)) {
      return NextResponse.json(
        { success: false, message: "This email is already registered for the event" },
        { status: 409 },
      );
    }

    const registrationId = createRegistrationId();
    await appendRegistration(event, {
      registrationId,
      fullName: body.fullName.trim(),
      email,
      phone: body.phone.trim(),
      profession: body.profession,
      company: body.company?.trim() || "",
      registrationType: "Free",
      amount: 0,
      currency: "",
      paymentStatus: "Not Required",
      paymentReference: "",
      registeredAt: new Date().toISOString(),
    });

    let emailSent = false;
    try {
      emailSent = await sendRegistrationEmail({
        email,
        fullName: body.fullName.trim(),
        eventTitle: event.title,
        amount: 0,
      });
    } catch (emailError) {
      console.error("Registration saved but confirmation email failed:", emailError);
    }

    // Reminder failure is isolated so a saved free registration still succeeds.
    await scheduleRegistrationReminder({
      eventId: event.eventId,
      registrationId,
      registrantEmail: email,
      registrantName: body.fullName.trim(),
      event,
    }).catch((reminderError) => {
      console.error("Registration saved but reminder scheduling failed:", reminderError);
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      eventId: event.eventId,
      registrationId,
      emailSent,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process registration" },
      { status: 500 },
    );
  }
}
