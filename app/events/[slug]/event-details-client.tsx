"use client"

import { EventHero } from "@/components/event-details/event-hero"
import { LearningOutcomes } from "@/components/event-details/learning-outcomes"
import { Agenda } from "@/components/event-details/agenda"
import { Speakers } from "@/components/event-details/speakers"
import { RolesCard } from "@/components/event-details/roles"
import { CTASection } from "@/components/event-details/cta-section"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Event } from "@/lib/types"
import { useState } from "react"

export default function EventDetailsClient({ event, params }: { event: Event | undefined; params: { slug: string } }) {
  const [showModal, setShowModal] = useState(false)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <Link href="/events" className="text-[#E11D2E] hover:underline">
          Back to Events
        </Link>
      </div>
    )
  }

  const handleAddCalendar = () => {
    // Placeholder for calendar integration
    alert("Add to calendar feature coming soon!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6 lg:px-[80px]">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-[#E11D2E] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>
      </div>

      {/* Hero Section */}
      <EventHero
        event={event}
        onAddCalendar={handleAddCalendar}
        onOpenRegisterModal={() => setShowModal(true)}
      />

      {/* Learning Outcomes */}
      <LearningOutcomes outcomes={event.learningOutcomes} />

      {/* Agenda */}
      <Agenda items={event.agenda} />

      {/* Speakers */}
      {event.speakers.length > 0 && <Speakers speakers={event.speakers} />}

      {/* Who Should Attend */}
      <RolesCard roles={event.roles} />

      {/* Final CTA */}
      <CTASection
        eventId={params.slug}
        eventTitle={event.title}
        registrationDeadline={event.registrationDeadline}
        showModal={showModal}
        onOpenModal={() => setShowModal(true)}
        onCloseModal={() => setShowModal(false)}
      />
    </div>
  )
}
