import { events } from "@/lib/data"
import EventDetailsClient from "./event-details-client"

export const generateStaticParams = () => {
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  return {
    title: event?.title || "Event",
    description: event?.description || "",
  }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)
  return <EventDetailsClient event={event} params={{ slug }} />
}
