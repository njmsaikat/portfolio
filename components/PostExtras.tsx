import { FaqJsonLd } from "@/components/JsonLd";
import type { Post } from "@/lib/posts";

// Answer-first summary and FAQ for posts that set `summary` / `faqs` in their
// metadata. Both help readers and AI assistants find the answer quickly, and
// the FAQ also ships as FAQPage structured data.
const LABELS = {
  en: { summary: "In short", faqs: "Common questions" },
  bn: { summary: "সংক্ষেপে", faqs: "সাধারণ প্রশ্ন" },
} as const;

export function PostSummary({ post }: { post: Post }) {
  if (!post.summary) return null;
  return (
    <aside className="mt-8 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent-soft)] p-5">
      <p className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-accent)]">
        {LABELS[post.lang].summary}
      </p>
      <p className="mt-2 leading-relaxed">{post.summary}</p>
    </aside>
  );
}

export function PostFaqs({ post }: { post: Post }) {
  if (!post.faqs?.length) return null;
  return (
    <section className="mt-16" aria-labelledby="post-faqs">
      <FaqJsonLd faqs={post.faqs} />
      <h2 id="post-faqs" className="text-2xl font-semibold tracking-tight">
        {LABELS[post.lang].faqs}
      </h2>
      <dl className="mt-6 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {post.faqs.map((faq) => (
          <div key={faq.question} className="py-5">
            <dt className="font-semibold">{faq.question}</dt>
            <dd className="mt-2 text-[var(--color-text-muted)]">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
