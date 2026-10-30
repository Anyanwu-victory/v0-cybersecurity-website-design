// components/EventStructuredData.tsx
import { siteUrl } from "@/lib/site";

export function EventStructuredData({ event }: { event: any }) {
  const structured = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDateTime,
    endDate: event.endDateTime,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      event.eventType === "online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    location:
      event.eventType === "online"
        ? {
            "@type": "VirtualLocation",
            url: event.meetingLink,
          }
        : {
            "@type": "Place",
            name: event.location,
            address: event.location,
          },
    organizer: {
      "@type": "Organization",
      name: "RedTrace-D Sentinel",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: event.eventCategory === "free" ? "0" : event.price,
      priceCurrency: event.currency || "NGN",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/events/${event.slug}`,
      validFrom: new Date().toISOString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }}
    />
  );
}
