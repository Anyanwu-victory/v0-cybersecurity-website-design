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
      title: "Start Time",
      type: "datetime",
    }),

    defineField({
      name: "endDateTime",
      title: "End Time",
      type: "datetime",
    }),

    defineField({
      name: "registrationDeadline",
      title: "Registration Deadline",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Online", value: "online" },
          { title: "In-Person", value: "in-person" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Online events need a remote-access link.
    defineField({
      name: "meetingLink",
      title: "Meeting Link",
      type: "url",
      description: "Zoom, Google Meet, or StreamYard link. Add before sending reminders.",
      hidden: ({ parent }) => parent?.eventType !== "online",
      validation: (Rule) => Rule.custom((meetingLink, context) => {
        // Require the link only when the editor selects the online event type.
        const event = context.parent as { eventType?: string };
        return event?.eventType === "online" && !meetingLink
          ? "A meeting link is required for online events"
          : true;
      }),
    }),

    // In-person events need a physical venue.
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Physical address for in-person events.",
      hidden: ({ parent }) => parent?.eventType !== "in-person",
      validation: (Rule) => Rule.custom((location, context) => {
        // Require the venue only when the editor selects the in-person event type.
        const event = context.parent as { eventType?: string };
        return event?.eventType === "in-person" && !location
          ? "A location is required for in-person events"
          : true;
      }),
    }),

    defineField({
      name: "eventCategory",
      title: "Event Category",
      type: "string",
      options: {
        list: [
          { title: "Paid", value: "paid" },
          { title: "Free", value: "free" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eventId",
      title: "Permanent Event ID",
      description: "Stable business identifier. Do not change it after registrations begin (example: EVT-2026-001).",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^EVT-\d{4}-\d{3,6}$/, {
            name: "event ID",
            invert: false,
          })
          .error("Use the format EVT-YYYY-NNN, for example EVT-2026-001")
          .custom(async (value, context) => {
            if (!value) return true;
            const documentId = String(context.document?._id || "").replace(/^drafts\./, "");
            const duplicateCount = await context
              .getClient({ apiVersion: "2026-02-16" })
              .fetch<number>(
                `count(*[_type == "event" && eventId == $value && !(_id in [$publishedId, $draftId])])`,
                {
                  value,
                  publishedId: documentId,
                  draftId: `drafts.${documentId}`,
                },
              );
            return duplicateCount === 0 || "This Event ID is already assigned to another event";
          }),
    }),

    defineField({
      name: "sheetTabName",
      title: "Google Sheets Tab Name",
      description: "Permanent registration-tab name. Normally use the same value as Event ID.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^EVT-\d{4}-\d{3,6}$/, {
            name: "sheet tab name",
            invert: false,
          })
          .error("Use the format EVT-YYYY-NNN, for example EVT-2026-001")
          .custom(async (value, context) => {
            if (!value) return true;
            const documentId = String(context.document?._id || "").replace(/^drafts\./, "");
            const duplicateCount = await context
              .getClient({ apiVersion: "2026-02-16" })
              .fetch<number>(
                `count(*[_type == "event" && sheetTabName == $value && !(_id in [$publishedId, $draftId])])`,
                {
                  value,
                  publishedId: documentId,
                  draftId: `drafts.${documentId}`,
                },
              );
            return duplicateCount === 0 || "This Sheet tab name is already assigned to another event";
          }),
    }),

    defineField({
      name: "registrationStatus",
      title: "Registration Status",
      type: "string",
      initialValue: "draft",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Active", value: "active" },
          { title: "Closed", value: "closed" },
          { title: "Archived", value: "archived" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      description: "Enter the amount in the main currency unit, for example 1000 for NGN 1,000.",
      type: "number",
      hidden: ({ parent }) => parent?.eventCategory !== "paid",
      validation: (Rule) => Rule.custom((price, context) => {
        const event = context.parent as { eventCategory?: string };
        if (event?.eventCategory === "paid" && (typeof price !== "number" || price <= 0)) {
          return "A positive price is required for paid events";
        }
        return true;
      }),
    }),

    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "NGN",
      hidden: ({ parent }) => parent?.eventCategory !== "paid",
      options: {
        list: [
          { title: "Nigerian Naira (NGN)", value: "NGN" },
          { title: "US Dollar (USD)", value: "USD" },
          { title: "Ghanaian Cedi (GHS)", value: "GHS" },
        ],
      },
      validation: (Rule) => Rule.custom((currency, context) => {
        const event = context.parent as { eventCategory?: string };
        return event?.eventCategory === "paid" && !currency
          ? "Currency is required for paid events"
          : true;
      }),
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
