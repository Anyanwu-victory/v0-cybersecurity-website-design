import { notFound } from "next/navigation";
import { cache } from "react";
import EventDetailsClient from "./event-details-client";
import { EventStructuredData } from "@/components/EventStructuredData";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { sanity } from "@/lib/sanity";
import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const getEvent = cache(async (slug: string) => {
  return sanity.fetchEventBySlug(slug);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) return { title: "Event Not Found" };

  const pageUrl = `${siteUrl}/events/${slug}`;
  const imageUrl = event.imageUrl || `${siteUrl}/images/redtraced_logo.jpeg`;

  return {
    title: `${event.title} | Cybersecurity Event`,
    description: event.description || "Join RedTrace-D Sentinel for this exclusive cybersecurity briefing.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${event.title} | Cybersecurity Event`,
      description: event.description,
      url: pageUrl,
      type: "website",
      images: [{ url: imageUrl, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Cybersecurity Event`,
      description: event.description,
      images: [imageUrl],
    },
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Events", url: `${siteUrl}/events` },
          { name: event.title, url: `${siteUrl}/events/${slug}` },
        ]}
      />
      <EventStructuredData event={event} />
      <EventDetailsClient event={event} params={{ slug }} />
    </>
  );
}

