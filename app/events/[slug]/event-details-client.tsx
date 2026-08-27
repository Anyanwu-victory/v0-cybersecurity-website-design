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
import { generateICSContent } from "@/lib/calendar"
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
    // Prefer Sanity's exact start timestamp and fall back to the event date.
    const startDate = event.startDateTime || event.date
    if (Number.isNaN(new Date(startDate).getTime())) {
      // Avoid downloading a calendar file containing an invalid event date.
      alert("This event does not have a valid calendar date yet.")
      return
    }

    // Generate a universal calendar file from the event's Sanity content.
    const calendarContent = generateICSContent({
      title: event.title,
      description: event.description || "",
      startDate,
      endDate: event.endDateTime,
      location: event.location,
      meetingLink: event.meetingLink,
    })

    // Downloading an ICS file lets the visitor open it in their preferred calendar app.
    const calendarFile = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(calendarFile)
    const downloadLink = document.createElement("a")
    downloadLink.href = downloadUrl
    downloadLink.download = `${params.slug}.ics`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    URL.revokeObjectURL(downloadUrl)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6 lg:px-20">
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
      <Agenda items={event.agenda ?? []} />

      {/* Speakers */}
      {event.speakers.length > 0 && <Speakers speakers={event.speakers} />}

      {/* Who Should Attend */}
      <RolesCard roles={event.roles} />

      {/* Final CTA */}
      <CTASection
        eventId={event.eventId}
        eventSlug={params.slug}
        eventTitle={event.title}
        eventCategory={event.eventCategory}
        eventPrice={event.price}
        eventCurrency={event.currency}
        registrationDeadline={event.registrationDeadline}
        registrationStatus={event.registrationStatus}
        showModal={showModal}
        onOpenModal={() => setShowModal(true)}
        onCloseModal={() => setShowModal(false)}
      />
    </div>
  )
}
