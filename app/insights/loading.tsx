import Loader from "@/components/Loader"

// Show the shared circular loader while Sanity supplies the article archive.
export default function InsightsLoading() {
  return <Loader fullPage label="Loading insights" />
}
