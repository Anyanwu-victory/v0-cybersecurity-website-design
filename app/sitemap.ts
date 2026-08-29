import type {MetadataRoute} from "next"
import {sanity} from "@/lib/sanity"

// Refresh the generated public URL inventory hourly as Sanity content changes.
export const revalidate = 3600

// Include core pages plus published event and article routes in search discovery.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Remove a trailing slash so every generated absolute URL has one path separator.
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rtdsentinel.com").replace(/\/$/, "")
  const staticPaths = ["", "/about", "/contact", "/events", "/insights", "/privacy", "/terms"]
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))

  try {
    // Query only routable Sanity documents so drafts and incomplete URLs are excluded.
    const [eventSlugs, articleSlugs] = await Promise.all([
      sanity.fetchSlugs(),
      sanity.client.fetch<string[]>(`*[_type == "article" && defined(slug.current) && publishedAt <= now()].slug.current`),
    ])
    const dynamicEntries: MetadataRoute.Sitemap = [
      ...eventSlugs.map((slug: string) => ({url: `${siteUrl}/events/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8})),
      ...articleSlugs.map((slug: string) => ({url: `${siteUrl}/insights/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7})),
    ]
    return [...staticEntries, ...dynamicEntries]
  } catch (error) {
    // Preserve a valid static sitemap if Sanity is temporarily unavailable.
    console.error("Dynamic sitemap content fetch failed:", error)
    return staticEntries
  }
}
