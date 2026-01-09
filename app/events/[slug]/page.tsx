import { events } from "@/lib/data"
import EventDetailsClient from "./event-details-client"

export const generateStaticParams = () => {
  return events.map((event) => ({
    slug: event.slug,
  }))
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const event = events.find((e) => e.slug === params.slug)
  return {
    title: event?.title || "Event",
    description: event?.description || "",
  }
}

export default function EventDetailsPage({ params }: { params: { slug: string } }) {
  const event = events.find((e) => e.slug === params.slug)
  return <EventDetailsClient event={event} params={params} />
}
