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
  location: string
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
