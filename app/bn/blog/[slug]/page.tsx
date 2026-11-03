import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { formatDate, getLocalizedPost, getPostSlugs, hasPost } from "@/lib/posts";
import { bn } from "@/lib/bn";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

const EMPTY_SLUG = "_none";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const slugs = getPostSlugs("bn");
  // output: export rejects an empty list, so emit one placeholder route while there are no Bangla posts.
  return (slugs.length ? slugs : [EMPTY_SLUG]).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!hasPost(slug, "bn")) return { title: "Not found", robots: { index: false } };
  const post = await getLocalizedPost(slug, "bn");
  const url = `${site.url}/bn/blog/${slug}`;
  const hasEn = hasPost(slug, "en");
  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: `/bn/blog/${slug}`,
      ...(hasEn && { languages: { en: `/blog/${slug}`, bn: `/bn/blog/${slug}`, "x-default": `/blog/${slug}` } }),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      locale: "bn_BD",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.url],
      tags: post.tags,
    },
  };
}

export default async function BanglaPostPage({ params }: Props) {
  const { slug } = await params;
  if (!hasPost(slug, "bn")) notFound();
  const post = await getLocalizedPost(slug, "bn");
  const { default: Content } = await import(`@/content/blog-bn/${slug}.mdx`);
  const hasEn = hasPost(slug, "en");
  const url = `${site.url}/bn/blog/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: bn.home, url: site.url },
          { name: bn.blog, url: `${site.url}/bn/blog` },
          { name: post.title, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            inLanguage: "bn",
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            url,
            mainEntityOfPage: url,
            image: `${url}/opengraph-image`,
            keywords: post.tags.join(", "),
            author: { "@type": "Person", name: profile.name, url: site.url },
          }).replace(/</g, "\\u003c"),
        }}
      />

      <article className="mx-auto max-w-3xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <Link href="/bn/blog" className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
            &larr; {bn.allPosts}
          </Link>
          {hasEn && (
            <Link href={`/blog/${slug}`} lang="en" hrefLang="en" className="font-medium text-[var(--color-accent)] hover:underline">
              {bn.readInEnglish}
            </Link>
          )}
        </div>
        <header className="mt-8 border-b border-[var(--color-border)] pb-8">
          <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
            <time dateTime={post.date}>{formatDate(post.date, "bn")}</time> · {post.readingMinutes} {bn.minRead}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]">{post.description}</p>
        </header>

        <div className="prose mt-10">
          <Content />
        </div>

        <footer className="surface-panel mt-10 flex items-center gap-4 rounded-xl p-5">
          <Image src={profile.photoSquare} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {bn.authorNote}{" "}
              <Link href="/#contact" className="text-[var(--color-accent)] hover:underline">
                {bn.contact}
              </Link>
              .
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}
