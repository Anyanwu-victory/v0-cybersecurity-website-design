import { defineType, defineField } from "sanity";

export const speakerType = defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
    }),

    defineField({
      name: "organization",
      title: "Organization",
      type: "string",
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
    }),

    defineField({
      name: "avatar",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "isTeamMember",
      title: "Is Internal Team Member?",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Platform", type: "string" },
            { name: "href", title: "URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});