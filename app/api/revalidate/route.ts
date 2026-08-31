// app/api/revalidate/route.ts
// Sanity calls this endpoint every time content is published or updated

import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // ── 1. Verify the request is genuinely from Sanity ─────────────────────
  const secret = req.headers.get("x-webhook-secret");
  if (secret !== SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type, slug } = body;
    const eventSlug = slug?.current;

    console.log(
      `Revalidating for type: ${_type}${eventSlug ? ` slug: ${eventSlug}` : ""}`,
    );

    // ── 2. Revalidate based on which Sanity document type changed ──────────
    const normalizedType = _type === 'contact'
      ? 'contactMember'
      : _type === 'siteSetting'
        ? 'siteSettings'
        : _type

    if (_type === 'contact' || _type === 'contactMember' || _type === 'service') {
      revalidatePath('/', 'layout')
    }

    if (_type === 'service') {
      revalidatePath('/contact', 'page')
    }

    if (_type === 'siteSetting' || _type === 'siteSettings') {
      revalidatePath('/', 'page')
    }

    switch (normalizedType) {
      case "event":
        // Events appear on home (upcoming section), events listing,
        // individual event page, and sitemap
        revalidatePath("/", "page");
        revalidatePath("/events", "page");
        revalidatePath("/events/[slug]", "page");
        if (eventSlug) revalidatePath(`/events/${eventSlug}`, "page");
        revalidatePath("/sitemap.xml");
        break;

      case "speaker":
        // Speakers are referenced on individual event pages
        revalidatePath("/events/[slug]", "page");
        revalidatePath("/events", "page");
        break;

      case "article":
      case "post":
      case "insight":
        // Insights/articles appear on insights listing and individual pages
        revalidatePath("/insights", "page");
        revalidatePath("/insights/[slug]", "page");
        if (eventSlug) revalidatePath(`/insights/${eventSlug}`, "page");
        revalidatePath("/sitemap.xml");
        break;

      case "siteSettings":
      case "settings":
        // Site-wide settings affect every page
        revalidatePath("/", "layout");
        break;

      case "teamMember":
        revalidatePath("/about", "page");
        break;

      case "contactMember":
      case "contactInfo":
        revalidatePath("/contact", "page");
        break;

      case "stat":
      case "statistic":
        revalidatePath("/", "page");
        revalidatePath("/about", "page");
        break;

      case "service":
        revalidatePath("/", "page");
        break;

      case "testimonial":
        revalidatePath("/", "page");
        break;

      case "faq":
        revalidatePath("/about", "page");
        break;

      case "hero":
      case "heroSection":
        revalidatePath("/", "page");
        break;

      case 'event':
        revalidatePath('/', 'page')
        revalidatePath('/events', 'page')
        revalidatePath('/events/[slug]', 'page')
        break

      case 'article':
        revalidatePath('/', 'page')
        revalidatePath('/insights', 'page')
        revalidatePath('/insights/[slug]', 'page')
        break

      case 'speaker':
        revalidatePath('/events/[slug]', 'page')
        break

      default:
        // Unknown type — revalidate everything to be safe
        console.log(`Unknown type "${_type}" — revalidating all pages`);
        revalidatePath("/", "layout");
        break;
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: eventSlug || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 },
    );
  }
}
