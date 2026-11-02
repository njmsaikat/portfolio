import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { formatDate, getAllPosts } from "@/lib/posts";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on Django, PostgreSQL, Docker and running commerce backends in production, by Saikat Roy.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Saikat Roy",
    description: "Practical notes on Django, PostgreSQL, Docker and running commerce backends in production.",
    url: `${site.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
        ]}
      />
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <p className="eyebrow">Blog</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Notes from the backend</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">
          Practical write-ups on Django, PostgreSQL, Docker and keeping production systems running. Subscribe via{" "}
          <a href="/rss.xml" className="text-[var(--color-accent)] hover:underline">
            RSS
          </a>
          .
        </p>

        {posts.length === 0 ? (
          <p className="mt-14 text-[var(--color-text-muted)]">No posts yet. Check back soon.</p>
        ) : (
          <ol className="mt-14 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block py-8">
                  <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
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
