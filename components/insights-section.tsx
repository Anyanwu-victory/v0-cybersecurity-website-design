"use client"

import Link from "next/link"
import {useMemo, useState} from "react"
import {ArrowRight} from "lucide-react"
import {motion} from "framer-motion"
import ArticleCard from "@/components/article-card"
import {ArticleSummary, formatArticleCategory} from "@/lib/articles"

interface InsightsSectionProps {
  articles: ArticleSummary[]
}

// Recreate the reference site's editorial rhythm using RT-DS styling and content.
export default function InsightsSection({articles}: InsightsSectionProps) {
  // Track the visitor's selected editorial category without changing the URL.
  const [activeCategory, setActiveCategory] = useState("all")
  // Build the filter choices from categories that actually contain published articles.
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(articles.map((article) => article.category)))],
    [articles],
  )
  // Keep the visual section compact by showing at most three matching previews.
  const visibleArticles = useMemo(
    () => articles.filter((article) => activeCategory === "all" || article.category === activeCategory).slice(0, 3),
    [activeCategory, articles],
  )

  // Avoid displaying an empty editorial section before any article is published.
  if (articles.length === 0) return null

  return (
    <section className="container relative mx-auto border-y border-white/5 bg-white/[0.015] px-4 py-24 lg:px-[80px]">
      {/* Add subtle brand lighting without competing with article imagery. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#E11D2E]/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#38BDF8]/5 blur-3xl" />
      </div>

      {/* Use the outer homepage container as the single desktop width constraint. */}
      <div className="relative w-full">
        {/* Introduce the section and provide a clear route to the complete archive. */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#E11D2E]">
              Blogs
            </p>
            <h2 className="text-2xl font-bold leading-tight md:text-4xl">
              Expert Insights on Security, Technology &amp; Protection
            </h2>
          </div>
        </div>

        {/* Let visitors narrow homepage previews to the categories currently available. */}
        <div
          className="mb-9 flex flex-wrap gap-2"
          aria-label="Filter insights by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === category
                  ? "border-[#E11D2E] bg-[#E11D2E] text-white"
                  : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/25 hover:text-white"
              }`}
            >
              {category === "all"
                ? "All posts"
                : formatArticleCategory(category)}
            </button>
          ))}
        </div>

        {/* Progressively reveal one, two, or three columns across device sizes. */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ArticleCard article={article} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center mx-auto">
          <Link
            href="/insights"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold transition-colors hover:border-[#E11D2E]/60 hover:text-[#E11D2E]"
          >
            View all insights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
