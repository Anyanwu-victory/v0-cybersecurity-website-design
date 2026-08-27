// Describe the article summary shared by homepage and listing cards.
export interface ArticleSummary {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  author: string
  publishedAt: string
  featured?: boolean
  imageUrl: string
  imageAlt: string
}

// Convert stored category values into visitor-friendly labels.
export const formatArticleCategory = (category: string) =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

// Display publication dates consistently across all article surfaces.
export const formatArticleDate = (publishedAt: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(publishedAt))
