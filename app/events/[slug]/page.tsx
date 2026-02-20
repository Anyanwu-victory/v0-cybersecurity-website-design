import EventDetailsClient from "./event-details-client"
import { sanity } from "@/lib/sanity"

// ✅ Enable dynamic rendering to fetch fresh data
export const dynamic = 'force-dynamic'

// ✅ Updated: params is now Promise<{ slug: string }>
export const generateMetadata = async ({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) => {
  try {
    const { slug } = await params // ✅ Must await params
    const event = await sanity.client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{title, description}`,
      { slug }
    )
    return {
      title: event?.title || "Event",
      description: event?.description || "",
    }
  } catch (err) {
    console.error("generateMetadata error:", err)
    return { title: "Event", description: "" }
  }
}

// ✅ Updated: params is now Promise<{ slug: string }>
export default async function EventDetailsPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  try {
    const { slug } = await params // ✅ Must await params
    const event = await sanity.fetchEventBySlug(slug)
    return <EventDetailsClient event={event ?? undefined} params={{ slug }} />
  } catch (err) {
    console.error("EventDetailsPage fetch error:", err)
    const { slug } = await params // ✅ Must await params even in catch
    return <EventDetailsClient event={undefined} params={{ slug }} />
  }
}