import Loader from "@/components/Loader"

// Global fallback used when a route does not define a closer loading boundary.
export default function Loading() {
  return <Loader fullPage label="Loading page" />
}
