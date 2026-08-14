import Loader from "@/components/Loader"

// Displayed while the events route waits for its Sanity content.
export default function EventsLoading() {
  return <Loader fullPage label="Loading events" />
}
