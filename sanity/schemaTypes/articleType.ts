import {DocumentTextIcon} from "@sanity/icons"
import {defineField, defineType} from "sanity"

// Define the editable article documents that power the Insights pages.
export const articleType = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    // Use the title as the main article heading and slug source.
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10),
    }),
    // Keep article URLs readable and stable once an article is published.
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {source: "title", maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    // Supply the image used on cards and at the top of the article page.
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: {hotspot: true},
      fields: [
        // Store accessible alternative text with the image asset.
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    // Use a controlled category list so homepage filters remain consistent.
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          {title: "Cybersecurity", value: "cybersecurity"},
          {title: "Digital Forensics", value: "digital-forensics"},
          {title: "Security Awareness", value: "security-awareness"},
          {title: "Vulnerability Management", value: "vulnerability-management"},
          {title: "Technology", value: "technology"},
          {title: "Company News", value: "company-news"},
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    // Display a concise summary on article cards and in search previews.
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    // Reuse the existing Portable Text editor for the full article content.
    defineField({
      name: "body",
      title: "Article body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    // Keep author information simple until author profiles are needed.
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "RT-DS Team",
      validation: (Rule) => Rule.required(),
    }),
    // Control the visible publication date independently of document creation.
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    // Allow editors to prioritise selected articles on the homepage.
    defineField({
      name: "featured",
      title: "Feature on homepage",
      type: "boolean",
      initialValue: false,
    }),
    // Provide an optional title override for search and social previews.
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    // Provide an optional description override for search result snippets.
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  // Show useful publishing information in the Sanity article list.
  preview: {
    select: {title: "title", subtitle: "category", media: "featuredImage"},
  },
})
