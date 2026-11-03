import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { formatDate, getAllPosts } from "@/lib/posts";
import { bn } from "@/lib/bn";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: bn.metaTitle,
  description: bn.metaDescription,
  alternates: {
    canonical: "/bn/blog",
    languages: { en: "/blog", bn: "/bn/blog", "x-default": "/blog" },
    types: { "application/rss+xml": [{ url: "/bn/rss.xml", title: "Saikat Roy · ব্লগ" }] },
  },
  openGraph: {
    title: `${bn.metaTitle} | Saikat Roy`,
    description: bn.metaDescription,
    url: `${site.url}/bn/blog`,
    locale: "bn_BD",
  },
};

export default async function BanglaBlogPage() {
  const posts = await getAllPosts("bn");

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: bn.home, url: site.url },
          { name: bn.blog, url: `${site.url}/bn/blog` },
        ]}
      />
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="eyebrow">{bn.blog}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">{bn.heading}</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">{bn.intro}</p>
        <p className="mt-3 text-sm">
          <Link href="/blog" lang="en" className="text-[var(--color-accent)] hover:underline">
            {bn.readInEnglish}
          </Link>
          {" · "}
          <a href="/bn/rss.xml" className="text-[var(--color-accent)] hover:underline">
            {bn.rss}
          </a>
        </p>

        {posts.length === 0 ? (
          <p className="mt-14 text-[var(--color-text-muted)]">{bn.empty}</p>
        ) : (
          <ol className="mt-14 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/bn/blog/${post.slug}`} className="group block py-8">
                  <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date, "bn")}</time> · {post.readingMinutes} {bn.minRead}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-[var(--color-text-muted)]">{post.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
