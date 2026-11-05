import Link from "next/link";
import { SERIES, getSeriesParts, type Post } from "@/lib/posts";

const LABELS = {
  en: { series: "Series", partOf: (n: string, total: string) => `Part ${n} of ${total}`, current: "you're reading this" },
  bn: { series: "সিরিজ", partOf: (n: string, total: string) => `পর্ব ${n} (মোট ${total}টি)`, current: "এখন পড়ছেন" },
} as const;

/** Lists every published part of the post's series, with the current one marked. Renders nothing outside a series. */
export async function SeriesNav({ post }: { post: Post }) {
  const parts = await getSeriesParts(post);
  if (!post.series || parts.length < 2) return null;

  const t = LABELS[post.lang];
  const num = (n: number) => (post.lang === "bn" ? n.toLocaleString("bn-BD") : String(n));
  const base = post.lang === "bn" ? "/bn/blog" : "/blog";
  const index = parts.findIndex((p) => p.slug === post.slug);

  return (
    <nav aria-label={t.series} className="surface-panel mt-16 rounded-xl p-5">
      <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
        {t.series} · {t.partOf(num(index + 1), num(parts.length))}
      </p>
      <p className="mt-1 font-semibold">{SERIES[post.series.id][post.lang]}</p>
      <ol className="mt-3 space-y-2 text-sm">
        {parts.map((p, i) => (
          <li key={p.slug} className="flex gap-3">
            <span className="w-4 shrink-0 text-right font-[family-name:var(--font-technical)] text-[var(--color-text-muted)]">
              {num(i + 1)}
            </span>
            {p.slug === post.slug ? (
              <span aria-current="page" className="font-medium">
                {p.title} <span className="text-[var(--color-text-muted)]">({t.current})</span>
              </span>
            ) : (
              <Link href={`${base}/${p.slug}`} className="text-[var(--color-accent)] hover:underline">
                {p.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
