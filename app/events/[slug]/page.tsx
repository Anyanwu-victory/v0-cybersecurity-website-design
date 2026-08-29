import { notFound } from "next/navigation"
import EventDetailsClient from "./event-details-client"
import { sanity } from "@/lib/sanity"

// Fetch fresh event documents instead of serving a stale static event page.
export const dynamic = "force-dynamic"

// Build page metadata from the same Sanity event slug used by the route.
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  try {
    const { slug } = await params
    const event = await sanity.client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{title, description}`,
      { slug },
    )
    return {
      title: event?.title || "Event not found",
      description: event?.description || "The requested event could not be found.",
    }
  } catch (error) {
    //console.error("Event metadata fetch failed:", error)
    return { title: "Event", description: "Event details" }
  }
}

// Render an event or delegate unknown slugs to the application's custom 404 page.
export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await sanity.fetchEventBySlug(slug)

  // This produces a real 404 response instead of a normal page containing an error message.
  if (!event) notFound()

  return <EventDetailsClient event={event} params={{ slug }} />
}
