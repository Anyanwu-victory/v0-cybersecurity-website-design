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

  // Treat arrays containing only empty Sanity strings as sections without content.
  const hasLearningOutcomes = event.learningOutcomes?.some((outcome) => outcome?.trim()) ?? false
  // Require at least one meaningful agenda value before showing its section and heading.
  const hasAgenda = event.agenda?.some((item) =>
    Boolean(item?.time?.trim() || item?.title?.trim() || item?.duration?.trim() || item?.description?.trim()),
  ) ?? false
  // Require a usable speaker record rather than rendering an empty Speakers section.
  const hasSpeakers = event.speakers?.some((speaker) => speaker?.name?.trim()) ?? false
  // Treat empty role entries as missing Who Should Attend content.
  const hasRoles = event.roles?.some((role) => role?.trim()) ?? false

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


      {/* Breadcrumb: Home · Events · Event Title */}
      <nav aria-label="Breadcrumb" className="mb-8 pl-4 lg:pl-20 mt-12">
        <ol className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-[#E11D2E]">
              Home
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link href="/events" className="hover:text-[#E11D2E]">
              Events
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="max-w-[20ch] md:max-w-[60ch] truncate text-white/90">
            {event.title}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <EventHero
        event={event}
        onAddCalendar={handleAddCalendar}
        onOpenRegisterModal={() => setShowModal(true)}
      />

      {/* Learning Outcomes */}
      {hasLearningOutcomes && (
        <LearningOutcomes outcomes={event.learningOutcomes} />
      )}

      {/* Agenda */}
      {hasAgenda && <Agenda items={event.agenda} />}

      {/* Speakers */}
      {hasSpeakers && <Speakers speakers={event.speakers} />}

      {/* Who Should Attend */}
      {hasRoles && <RolesCard roles={event.roles} />}

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
  );
}
