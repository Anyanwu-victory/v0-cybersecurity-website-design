import { type NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/google-sheets";

interface RegistrationRequest {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  profession: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json();
    
    console.log("📝 Registration request received:", {
      eventId: body.eventId,
      email: body.email,
    });

    // Validation
    if (!body.eventId || !body.fullName || !body.email || !body.phone || !body.profession) {
      console.error("❌ Missing required fields");
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.error("❌ Invalid email format:", body.email);
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare registration data
    const registrationData = {
      timestamp: new Date().toISOString(),
      eventId: body.eventId,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      company: body.company || "",
      profession: body.profession,
      status: "pending",
    };

    // Save to Google Sheets
    await appendToSheet(registrationData);

    console.log("✅ Registration successful for:", body.email);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        email: body.email,
        eventId: body.eventId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    console.error("Error message:", error.message);

    // Handle specific errors
    if (error.message?.includes("Permission denied") || error.code === 403) {
      return NextResponse.json(
        { message: "Database permission error. Please contact support." },
        { status: 500 }
      );
    }

    if (error.message?.includes("Sheet not found") || error.code === 404) {
      return NextResponse.json(
        { message: "Database configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      { 
        message: "Failed to process registration. Please try again.",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}