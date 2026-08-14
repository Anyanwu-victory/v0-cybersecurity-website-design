import { defineType, defineField } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Frontend icon identifier (e.g. Shield, Lock, Presentation, IconUser)",
    }),

    defineField({
      name: "color",
      title: "Tailwind Color Class / Hex",
      type: "string",
      description: "Example: text-[#E11D2E] or #E11D2E",
    }),

    defineField({
      name: "glowClass",
      title: "Glow CSS Class",
      type: "string",
      description: "Example: neon-glow-red",
    }),
  ],
});
