import type {MetadataRoute} from "next"

// Resolve crawler directives against the configured production domain.
export default function robots(): MetadataRoute.Robots {
  // Remove a trailing slash so generated crawler URLs never contain a double slash.
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://rtdsentinel.com").replace(/\/$/, "")
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep administrative Studio and server endpoints out of search indexes.
      disallow: ["/studio/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
