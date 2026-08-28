import Image from "next/image"
import Link from "next/link"
import {ArrowUpRight, CalendarDays} from "lucide-react"
import {ArticleSummary, formatArticleCategory, formatArticleDate} from "@/lib/articles"

interface ArticleCardProps {
  article: ArticleSummary
}

// Render a reusable responsive preview for a single insight article.
export default function ArticleCard({article}: ArticleCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card transition-all
     duration-300 hover:-translate-y-1 hover:border-[#E11D2E]/45 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
      {/* Keep article artwork consistent even when source images have different dimensions. */}
      <Link href={`/insights/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Translucent dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Title on top of image */}
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <h3 className="text-2xl font-bold leading-tight text-white drop-shadow-sm">
            <span className="inline-block">
              {article.title}
            </span>
          </h3>
        </div>
      </Link>

      {/* Present the article metadata and summary below its image. */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em]">
          {/* <span className="rounded-full bg-[#E11D2E]/10 px-3 py-1.5 text-[#E11D2E]">
            {formatArticleCategory(article.category)}
          </span> */}
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            {formatArticleDate(article.publishedAt)}
          </span>
        </div>
        {/* Title is shown on the image above. Keep spacing for the summary. */}
        <div className="mb-3" />
        <p className="mb-6 line-clamp-3 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>
        <Link
          href={`/insights/${article.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#E11D2E]"
        >
          Read more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
