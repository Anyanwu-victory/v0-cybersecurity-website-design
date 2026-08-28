import Loader from "@/components/Loader"

// Show the shared loader while the selected Sanity article is resolved.
export default function ArticleLoading() {
  return <Loader fullPage label="Loading article" />
}
