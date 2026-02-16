import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const toUrl = (img: any) => (img ? urlFor(img).url() : "/placeholder.svg")

export const sanity = {
  client,
  urlFor,
  async fetchEvents() {
    const res = await client.fetch(
      `*[_type == "event"] | order(date asc){
        ..., "slug": slug.current, speakers[]-> {name, role, organization, bio, avatar}
      }`
    )
    return (res || []).map((ev: any) => ({
      ...ev,
      speakers: (ev.speakers || []).map((s: any) => ({ ...s, avatar: toUrl(s.avatar) })),
    }))
  },

  async fetchEventBySlug(slug: string) {
    const ev = await client.fetch(
      `*[_type == "event" && slug.current == $slug][0]{
        ..., "slug": slug.current, speakers[]-> {name, role, organization, bio, avatar}
      }`,
      { slug }
    )
    if (!ev) return null
    return {
      ...ev,
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