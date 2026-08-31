import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, UserRound } from "lucide-react";
import { formatArticleCategory, formatArticleDate } from "@/lib/articles";
import { sanity } from "@/lib/sanity";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Build page-specific SEO metadata from the corresponding Sanity article.
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await sanity.fetchArticleBySlug(slug);
  if (!article) return { title: "Insight not found" };
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: { images: article.imageUrl ? [article.imageUrl] : [] },
  };
}

// Extract readable text from Sanity's Portable Text blocks without adding another package.
const renderPortableText = (body: any[] = []) =>
  body.map((block: any) => {
    // Render embedded article images using their stored crop and accessible text.
    if (block._type === "image") {
      const imageUrl = sanity.urlFor(block).width(1200).fit("max").url();
      return (
        <figure
          key={block._key}
          className="my-10 overflow-hidden rounded-2xl border border-white/10"
        >
          <Image
            src={imageUrl}
            alt={block.alt || "Article illustration"}
            width={1200}
            height={750}
            className="h-auto w-full"
          />
        </figure>
      );
    }

    // Join text spans while retaining the semantic block style chosen by the editor.
    const text = (block.children || [])
      .map((child: any) => child.text)
      .join("");
    const key = block._key;
    if (block.style === "h2")
      return (
        <h2 key={key} className="mb-4 mt-10 text-3xl font-bold">
          {text}
        </h2>
      );
    if (block.style === "h3")
      return (
        <h3 key={key} className="mb-3 mt-8 text-2xl font-bold">
          {text}
        </h3>
      );
    if (block.style === "h4")
      return (
        <h4 key={key} className="mb-3 mt-7 text-xl font-bold">
          {text}
        </h4>
      );
    if (block.style === "blockquote")
      return (
        <blockquote
          key={key}
          className="my-8 border-l-4 border-[#E11D2E] pl-6 text-xl italic text-white/85"
        >
          {text}
        </blockquote>
      );
    return (
      <p
        key={key}
        className="mb-6 text-base leading-8 text-white/75 md:text-lg"
      >
        {text}
      </p>
    );
  });

// Render a published article or hand unknown slugs to the branded 404 page.
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await sanity.fetchArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen pb-24 pt-20 lg:px-8">
      {/* Breadcrumb: Home · Insights · Article Title */}
      <nav aria-label="Breadcrumb" className="mb-8 pl-8">
        <ol className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-[#E11D2E]">
              Home
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link href="/insights" className="hover:text-[#E11D2E]">
              Insights
            </Link>
          </li>
          <li aria-hidden>·</li>
          <li className="max-w-[20ch] md:max-w-[60ch] truncate text-white/90">{article.title}</li>
        </ol>
      </nav>

      <article>
        {/* Present article identity and metadata before the main artwork. */}
        <header className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#E11D2E]">
            {formatArticleCategory(article.category)}
          </p>
          <h1 className="mb-7 text-4xl font-bold leading-tight md:text-5xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatArticleDate(article.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              {article.author}
            </span>
          </div>
        </header>

        {/* Constrain the hero image and preserve its editorial crop. */}
        <div className="relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden border-y border-white/10 md:rounded-3xl md:border">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14]/35 to-transparent" />
        </div>

        {/* Render the editor-authored Portable Text body in a readable measure. */}
        <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
          {/* <p className="mb-10 border-b border-white/10 pb-10 text-sm font-medium leading-9 text-white/90">{article.excerpt}</p> */}
          {renderPortableText(article.body)}
        </div>
      </article>
    </main>
  );
}
