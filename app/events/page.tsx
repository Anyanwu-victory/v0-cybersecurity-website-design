import EventsContent from "./events-content"
import { sanity } from "@/lib/sanity"

export const revalidate = 900

// Keep the route entry small while the interactive Events UI lives separately.
export default async function EventsPage() {
  let events = []
  try {
    events = await sanity.fetchEvents()
  } catch {
    // Keep the page renderable if the CMS is temporarily unavailable.
  }

  return <EventsContent initialEvents={events} />
}
