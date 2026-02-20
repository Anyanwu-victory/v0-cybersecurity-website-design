import { defineType, defineField } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
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
      name: "date",
      title: "Event Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "startDateTime",
      type: "datetime",
    }),

    defineField({
      name: "endDateTime",
      type: "datetime",
    }),

    defineField({
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Virtual", value: "virtual" },
          { title: "In-Person", value: "in-person" },
        ],
      },
    }),

    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
    }),

    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),

    defineField({
      name: "audience",
      title: "Target Audience",
      type: "string",
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
    }),

    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "blockContent",
    }),

    defineField({
      name: "learningOutcomes",
      title: "Learning Outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),

    // Agenda Section
    defineField({
      name: "agenda",
      title: "Agenda",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "time", title: "Time/Date", type: "string" },
            { name: "title", title: "Session Title", type: "string" },
            { name: "duration", title: "Duration", type: "string" },
            { name: "description", title: "Description", type: "text" },

            defineField({
              name: "resourcesList",
              title: "Resources",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "type", title: "Resource Type", type: "string" },
                    { name: "link", title: "Resource Link", type: "url" },
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),

    // Speakers (Reference to team members)
    defineField({
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "speaker" }],
        },
      ],
    }),

    // defineField({
    //   name: "roles",
    //   title: "Suitable Roles",
    //   type: "array",
    //   of: [{ type: "string" }],
    // }),

    defineField({
      name: "calendarLink",
      title: "Calendar Link",
      type: "url",
    }),
  ],
});
