import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd, BlogPostingJsonLd } from "@/components/JsonLd";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { servicePages } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const url = `${site.url}/blog/${slug}`;
  return {
    // seoTitle is already sized for search results, so skip the " | Saikat Roy" template suffix.
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.url],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);
  const relatedServices = servicePages.filter((s) => s.page.relatedPosts?.includes(slug));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
          { name: post.title, url: `${site.url}/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd post={post} />

      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">
          &larr; All posts
        </Link>
        <header className="mt-8 border-b border-[var(--color-border)] pb-8">
          <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">{post.description}</p>
        </header>

        <div className="prose mt-10">
          <Content />
        </div>

        {relatedServices.length > 0 && (
          <aside className="mt-16 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] p-5">
            <p className="text-sm font-semibold">Need help with this in your own project?</p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
              {relatedServices.map((s) => (
                <li key={s.page.slug}>
                  <Link href={`/services/${s.page.slug}`} className="text-sm font-medium text-[var(--color-accent)] hover:underline">
                    {s.page.headline} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <footer className="surface-panel mt-6 flex items-center gap-4 rounded-xl p-5">
          <Image src={profile.photoSquare} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {profile.jobTitle} at {profile.company}. I build Django backends for commerce platforms.{" "}
              <Link href="/#contact" className="text-[var(--color-accent)] hover:underline">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}
