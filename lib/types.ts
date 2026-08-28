// lib/types.ts
export interface Event {
  eventId: string
  sheetTabName: string
  slug: string
  tag: string
  title: string
  description: string
  date: string
  time: string
  // Preserve Sanity's ISO timestamps for calendar-file generation.
  startDateTime?: string
  endDateTime?: string
  // Online events use a meeting link, while in-person events use a location.
  location?: string
  meetingLink?: string
  eventType: "virtual" | "in-person"
  registrationDeadline: string
  registrationStatus: "draft" | "active" | "closed" | "archived"
  audience: string
  eventCategory: "free" | "paid"
  price?: number
  currency?: "NGN" | "USD" | "GHS"
  learningOutcomes: string[]
  agenda: {
    time: string
    title: string
    duration: string
    description: string
    resourcesList?: {
      type: string
      link: string
    }[]
  }[]
  speakers: {
    _id: string
    name: string
    role: string
    organization: string
    bio: string
    avatar: string
  }[]
  roles: string[]
}
