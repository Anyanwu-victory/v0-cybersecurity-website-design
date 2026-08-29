import type {Metadata} from "next"
import ArticleCard from "@/components/article-card"
import {sanity} from "@/lib/sanity"

// Give the Insights archive a focused search-engine description.
export const metadata: Metadata = {
  title: "Security Insights",
  description: "Expert perspectives on cybersecurity, digital forensics, technology, and practical protection.",
}

// Render every published Sanity article in a responsive archive.
export default async function InsightsPage() {
  const articles = await sanity.fetchArticles()

  return (
    <main className="min-h-screen px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Establish a clear editorial introduction above the article collection. */}
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#E11D2E]">
            RT-DS Intelligence
          </p>
          <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">Security Insights</h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Practical guidance and expert perspectives on cybersecurity, technology, and digital protection.
          </p>
        </header>

        {/* Display a helpful empty state until the first article is published. */}
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-card p-10 text-center text-muted-foreground">
            No insights have been published yet. Please check back soon.
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: any) => <ArticleCard key={article._id} article={article} />)}
          </div>
        )}
      </div>
    </main>
  )
}
