import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { formatDate, getAllPosts } from "@/lib/posts";

export async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section
      id="writing"
      eyebrow="Writing"
      title="Latest from the blog"
      description="Practical notes from building and running backends."
      className="bg-[var(--color-bg-elevated)]"
    >
      <div className="reveal-items grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="surface-panel group flex flex-col rounded-xl p-6 transition-colors hover:border-[var(--color-accent)]"
          >
            <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
            </p>
            <h3 className="mt-3 flex-1 font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>
            <p className="mt-4 text-sm font-medium text-[var(--color-accent)]">Read post &rarr;</p>
          </Link>
        ))}
      </div>
      <Link href="/blog" className="mt-8 inline-flex text-sm font-semibold text-[var(--color-accent)] hover:underline">
        All posts &rarr;
      </Link>
    </Section>
  );
}
