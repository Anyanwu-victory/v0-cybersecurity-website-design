// ...existing code...
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

const toUrl = (img: any) => (img ? urlFor(img).url() : "/placeholder.svg")

const normalizeEventPayment = (event: any) => {
  const legacyPrice = typeof event.price === "string" ? event.price : ""
  const numericPrice = typeof event.price === "number"
    ? event.price
    : Number(legacyPrice.replace(/[^0-9.]/g, "")) || 0
  const eventCategory = event.eventCategory
    || (legacyPrice.toLowerCase().includes("free") || numericPrice === 0 ? "free" : "paid")

  return {
    ...event,
    eventCategory,
    price: eventCategory === "paid" ? numericPrice : undefined,
    currency: event.currency || "NGN",
  }
}

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
      ...normalizeEventPayment(ev),
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
      ...normalizeEventPayment(ev),
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

  async fetchContactMethods() {
    const doc = await client.fetch(`*[_type == "contact"][0]{ contactMethods }`)
    return (doc?.contactMethods || []).map((c: any) => ({
      icon: c.icon,
      type: c.type,
      detail: c.detail,
      color: c.color,
      href: c.href,
    }))
  },

  async fetchSocials() {
    const doc = await client.fetch(`*[_type == "contact"][0]{ socials }`)
    return (doc?.socials || []).map((s: any) => ({
      name: s.name,
      href: s.href,
      icon: s.icon,
    }))
  },

  async fetchContact() {
    const doc = await client.fetch(
      `*[_type == "contact"][0]{ title, description, contactMethods, socials }`
    )
    return doc || { title: null, description: null, contactMethods: [], socials: [] }
  },

  async fetchSiteSettings() {
    const doc = await client.fetch(
      `*[_type == "siteSetting"][0]{ homePageIntroSectionText, aboutCompanyText, missionText, visionText, values }`
    )
    return doc || { homePageIntroSectionText: null, aboutCompanyText: null, missionText: null, visionText: null, values: [] }
  },

  async fetchServices() {
    const res = await client.fetch(
      `*[_type == "service"] | order(title asc){..., "slug": slug.current}`
    )
    return (res || []).map((s: any) => ({
      slug: s.slug,
      title: s.title,
      description: s.description,
      icon: s.icon,
      color: s.color,
      glowClass: s.glowClass,
    }))
  },

  // Fetch published article summaries for the homepage and Insights index.
  async fetchArticles(limit?: number) {
    const limitClause = typeof limit === "number" ? `[0...${Math.max(0, limit)}]` : ""
    const res = await client.fetch(
      `*[_type == "article" && defined(slug.current) && publishedAt <= now()]
        | order(featured desc, publishedAt desc) ${limitClause} {
          _id, title, "slug": slug.current, category, excerpt, author,
          publishedAt, featured, featuredImage
        }`
    )
    // Convert Sanity images into URLs while preserving their accessible labels.
    return (res || []).map((article: any) => ({
      ...article,
      imageUrl: article.featuredImage ? toUrl(article.featuredImage) : "/placeholder.svg",
      imageAlt: article.featuredImage?.alt || article.title,
    }))
  },

  // Fetch one complete published article for its dynamic detail page.
  async fetchArticleBySlug(slug: string) {
    const article = await client.fetch(
      `*[_type == "article" && slug.current == $slug && publishedAt <= now()][0] {
        _id, title, "slug": slug.current, category, excerpt, body, author,
        publishedAt, featuredImage, seoTitle, seoDescription
      }`,
      {slug}
    )
    // Return null for unknown or unpublished slugs so Next.js can show its 404 page.
    if (!article) return null
    return {
      ...article,
      imageUrl: article.featuredImage ? toUrl(article.featuredImage) : "/placeholder.svg",
      imageAlt: article.featuredImage?.alt || article.title,
    }
  },

  
}
// ...existing code...
