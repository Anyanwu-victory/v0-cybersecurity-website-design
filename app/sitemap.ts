import type { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity";
import { siteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/events",
    "/insights",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  try {
    const [events, articles] = await Promise.all([
      sanity.client.fetch<{ slug: string; _updatedAt: string; date: string }[]>(
        `*[_type == "event" 
          && defined(slug.current) 
          && registrationStatus in ["active", "closed"]
        ]{ "slug": slug.current, _updatedAt, date }`,
      ),
      sanity.client.fetch<{ slug: string; _updatedAt: string }[]>(
        `*[_type == "article" 
          && defined(slug.current) 
          && publishedAt <= now()
        ]{ "slug": slug.current, _updatedAt }`,
      ),
    ]);

    const now = new Date();

    const dynamicEntries: MetadataRoute.Sitemap = [
      ...events.map((event) => ({
        url: `${siteUrl}/events/${event.slug}`,
        lastModified: new Date(event._updatedAt),
        changeFrequency: "weekly" as const,
        priority: new Date(event.date) > now ? 0.9 : 0.6,
      })),
      ...articles.map((article) => ({
        url: `${siteUrl}/insights/${article.slug}`,
        lastModified: new Date(article._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];

    return [...staticEntries, ...dynamicEntries];
  } catch (error) {
    return staticEntries;
  }
}

