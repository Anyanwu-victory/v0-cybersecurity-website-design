import React from "react";

const siteUrl = "https://www.rtdsentinel.com";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RedTrace-D Sentinel",
    alternateName: "RTDS",
    url: siteUrl,
    logo: `${siteUrl}/images/redtraced_logo.jpeg`,
    sameAs: [
      "https://www.linkedin.com/company/redtrace-d-sentinel",
      "https://twitter.com/rtdsentinel",
      "https://instagram.com/rtdsentinel",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+2348106283100",
      contactType: "customer support",
      email: "support@rtdsentinel.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RedTrace-D Sentinel",
    url: siteUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: any }) {
  const pageUrl = `${siteUrl}/insights/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt || article.seoDescription,
    image: article.imageUrl ? [article.imageUrl] : [`${siteUrl}/images/redtraced_logo.jpeg`],
    datePublished: article.publishedAt,
    dateModified: article._updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author || "RedTrace-D Sentinel Team",
    },
    publisher: {
      "@type": "Organization",
      name: "RedTrace-D Sentinel",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/redtraced_logo.jpeg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
