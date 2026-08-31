// app/events/[slug]/page.tsx
import { notFound } from "next/navigation";
import { cache } from "react";
import EventDetailsClient from "./event-details-client";
import { EventStructuredData } from "@/components/EventStructuredData"; // ← add this import
import { sanity } from "@/lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const getEvent = cache(async (slug: string) => {
  return sanity.client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      title, description, "image": image.asset->url
    }`,
    { slug },
  );
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) return { title: "Event not found" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      url: `https://rtdsentinel.com/events/${slug}`,
      images: [{ url: event.image || "/og-image.jpg" }],
    },
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await sanity.fetchEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <EventStructuredData event={event} /> {/* ← add this line */}
      <EventDetailsClient event={event} params={{ slug }} />
    </>
  );
}
