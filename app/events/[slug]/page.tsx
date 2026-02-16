import EventDetailsClient from "./event-details-client"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { sanity } from "@/lib/sanity"

export const generateStaticParams = async () => {
  const slugs = await client.fetch(`*[_type == "event" && defined(slug.current)]{ "slug": slug.current }`)
  return (slugs || []).map((s: any) => ({ slug: s.slug }))
}

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const event = await client.fetch(`*[_type == "event" && slug.current == $slug][0]{title, description}`, { slug })
  return {
    title: event?.title || "Event",
    description: event?.description || "",
  }
}

export default async function EventDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const ev = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
      ..., "slug": slug.current, speakers[]-> {name, role, organization, bio, avatar}
    }`,
    { slug }
  )

  const event = ev
    ? {
        ...ev,
        speakers: (ev.speakers || []).map((s: any) => ({
          ...s,
          avatar: s?.avatar ? urlFor(s.avatar).url() : "/placeholder.svg",
        })),
      }
    : undefined

  return <EventDetailsClient event={event} params={{ slug }} />
}