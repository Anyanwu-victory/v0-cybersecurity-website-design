import { defineType, defineField } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Contact Info",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title / Headline",
      type: "string",
      initialValue: "Establish Secure Comms.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      initialValue: "Whether you're currently facing a security incident or looking to harden your infrastructure, our specialists are ready to assist.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactMethods",
      title: "Contact Methods",
      type: "array",
      of: [
        {
          type: "object",
          name: "contactMethod",
          title: "Contact Method",
          fields: [
            {
              name: "type",
              title: "Method Type (e.g. Contact Email, Direct Hotline)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "detail",
              title: "Detail (e.g. email, phone, location details)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Link/Href (e.g. mailto:email, tel:phone, map URL)",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Icon Name (e.g. Mail, Phone, MapPin)",
              type: "string",
              options: {
                list: [
                  { title: "Mail", value: "Mail" },
                  { title: "Phone", value: "Phone" },
                  { title: "Map Pin", value: "MapPin" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "color",
              title: "Tailwind Color Class/Hex (e.g. [#E11D2E], [#38BDF8], [#7C3AED])",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          title: "Social Link",
          fields: [
            {
              name: "name",
              title: "Platform Name (e.g. LinkedIn, Tiktok, X, Instagram)",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "LinkedIn" },
                  { title: "Tiktok", value: "Tiktok" },
                  { title: "X", value: "X" },
                  { title: "Instagram", value: "Instagram" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "href",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
});
