// ...existing code...
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const toUrl = (img: any) => (img ? urlFor(img).url() : "/placeholder.svg")

const formatDate = (dateString: string | Date): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

const formatTime = (dateString: string | Date): string => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
}

const formatTimeRange = (startDateTime?: string | Date, endDateTime?: string | Date): string => {
  if (!startDateTime && !endDateTime) return ""
  if (!endDateTime && startDateTime) return formatTime(startDateTime)
  if (!startDateTime && endDateTime) return formatTime(endDateTime)
  if (startDateTime && endDateTime) {
    const start = formatTime(startDateTime)
    const end = formatTime(endDateTime)
    return `${start} - ${end}`
  }
  return ""
}
export const sanity = {
  client,
  urlFor,
  async fetchEvents() {
    const res = await client.fetch(
      `*[_type == "event"] | order(date asc){
        ..., 
        "slug": slug.current, 
        speakers[]-> {_id, name, role, organization, bio, avatar}
      }`
    )
    return (res || []).map((ev: any) => ({
      ...ev,
      date: formatDate(ev.date),
      time: formatTimeRange(ev.startDateTime, ev.endDateTime),
      roles: ev.roles ?? [],
      speakers: (ev.speakers || []).map((s: any) => ({ ...s, avatar: toUrl(s.avatar) })),
    }))
  },

  async fetchEventBySlug(slug: string) {
    const ev = await client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{
        ..., 
        "slug": slug.current, 
        speakers[]-> {_id, name, role, organization, bio, avatar}
      }`,
      { slug }
    )
    if (!ev) return null
    return {
      ...ev,
      date: formatDate(ev.date),
      time: formatTimeRange(ev.startDateTime, ev.endDateTime),
      roles: ev.roles ?? [],
      speakers: (ev.speakers || []).map((s: any) => ({ ...s, avatar: toUrl(s.avatar) })),
    }
  },

  async fetchSlugs() {
    const res = await client.fetch(`*[_type == "event" && defined(slug.current)]{ "slug": slug.current }`)
    return (res || []).map((r: any) => r.slug)
  },

  async fetchTeamMembers() {
    const res = await client.fetch(`*[_type == "teamMember"]{name, role, bio, avatar, socials}`)
    return (res || []).map((m: any) => ({ ...m, avatar: toUrl(m.avatar) }))
  },
}
// ...existing code...