import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleSummary, formatArticleCategory, formatArticleDate } from "@/lib/articles";

interface InsightsSectionProps {
  articles: ArticleSummary[];
}

export default function InsightsSection({ articles }: InsightsSectionProps) {
  if (articles.length === 0) return null;
  const visibleArticles = articles.slice(0, 3);

  return (
    <section className="bg-[#f3f1ec] px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-col gap-6 border-b border-[#d7d4cc] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#a51c29]">From the team</p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Notes on staying secure.</h2>
          </div>
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-[#343530] transition-colors hover:text-[#a51c29]">
            All insights <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => (
            <article key={article._id} className="group flex flex-col border-t border-[#d7d4cc] pt-4">
              <Link href={`/insights/${article.slug}`} className="relative mb-5 block aspect-[1.55] overflow-hidden bg-[#e5e2db]">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </Link>
              <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#777770]">
                <span className="text-[#a51c29]">{formatArticleCategory(article.category)}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
              </div>
              <h3 className="font-serif text-2xl leading-snug tracking-tight">
                <Link href={`/insights/${article.slug}`} className="transition-colors group-hover:text-[#a51c29]">{article.title}</Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#62635d]">{article.excerpt}</p>
              <Link href={`/insights/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#343530] hover:text-[#a51c29]">
                Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
