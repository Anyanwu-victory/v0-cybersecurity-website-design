// lib/types.ts
export interface Event {
  slug: string
  tag: string
  title: string
  description: string
  date: string
  time: string
  location: string
  audience: string
  price: string
  learningOutcomes: string[]
  agenda: {
    time: string
    title: string
    duration: string
    description: string
  }[]
  speakers: {
    id: number
    name: string
    role: string
    organization: string
    bio: string
    avatar: string
  }[]
  roles: string[]
}
