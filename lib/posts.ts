import fs from "node:fs";
import path from "node:path";

// Each post is content/blog/<slug>.mdx exporting `metadata: PostMeta`.
// Read at build time only (static export) — never imported by client code.
export interface PostMeta {
  title: string;
  // Optional shorter <title> for search results (~60 chars); `title` stays the on-page heading.
  seoTitle?: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  tags: string[];
  // Answer-first summary (1–3 sentences) shown as an "In short" box under the header.
  summary?: string;
  // Questions people actually search; rendered after the post and as FAQPage JSON-LD.
  // Answers must be grounded in the post itself.
  faqs?: { question: string; answer: string }[];
  // Part of a multi-post series (ids in SERIES below); drives the series box under the post.
  series?: { id: SeriesId; part: number };
}

// Series titles per language. A post joins a series via `metadata.series`, so
// the box listing every part updates itself when a new part is added.
export const SERIES = {
  "bd-payment-gateways": {
    en: "Bangladesh payment gateways for developers",
    bn: "ডেভেলপারদের জন্য বাংলাদেশের পেমেন্ট গেটওয়ে",
  },
} as const;
export type SeriesId = keyof typeof SERIES;

export type Lang = "en" | "bn";

export interface Post extends PostMeta {
  slug: string;
  readingMinutes: number;
  lang: Lang;
}

// English posts: content/blog/<slug>.mdx. Bangla posts: content/blog-bn/<slug>.mdx
// (same slug as the English original; either may exist without the other).
const DIRS: Record<Lang, string> = {
  en: path.join(process.cwd(), "content/blog"),
  bn: path.join(process.cwd(), "content/blog-bn"),
};

export function getPostSlugs(lang: Lang = "en"): string[] {
  const dir = DIRS[lang];
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Raw MDX source of a post, including the `export const metadata` block. */
export function getPostSource(slug: string, lang: Lang = "en"): string {
  return fs.readFileSync(path.join(DIRS[lang], `${slug}.mdx`), "utf8");
}

/** MDX body with the leading `export const metadata = {...};` block removed (for Markdown mirrors). */
export function getPostBody(slug: string, lang: Lang = "en"): string {
  const source = getPostSource(slug, lang);
  const end = source.search(/^};?\s*$/m);
  return (source.startsWith("export const metadata") && end !== -1
    ? source.slice(source.indexOf("\n", end) + 1)
    : source
  ).trim();
}

export function hasPost(slug: string, lang: Lang): boolean {
  return fs.existsSync(path.join(DIRS[lang], `${slug}.mdx`));
}

function readingMinutes(slug: string, lang: Lang): number {
  const words = getPostSource(slug, lang).split(/\s+/).filter(Boolean).length;
  // Bangla reads a little slower per word than English.
  return Math.max(1, Math.round(words / (lang === "bn" ? 180 : 220)));
}

/** English post (kept single-argument so it stays safe to pass to `.map`). */
export function getPost(slug: string): Promise<Post> {
  return getLocalizedPost(slug, "en");
}

export async function getLocalizedPost(slug: string, lang: Lang): Promise<Post> {
  const { metadata } =
    lang === "bn"
      ? ((await import(`@/content/blog-bn/${slug}.mdx`)) as { metadata: PostMeta })
      : ((await import(`@/content/blog/${slug}.mdx`)) as { metadata: PostMeta });
  return { ...metadata, slug, lang, readingMinutes: readingMinutes(slug, lang) };
}

export async function getAllPosts(lang: Lang = "en"): Promise<Post[]> {
  const posts = await Promise.all(getPostSlugs(lang).map((slug) => getLocalizedPost(slug, lang)));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string, lang: Lang = "en"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Every published part of the post's series in the same language, in order (empty if not in a series). */
export async function getSeriesParts(post: Post): Promise<Post[]> {
  if (!post.series) return [];
  const id = post.series.id;
  return (await getAllPosts(post.lang))
    .filter((p) => p.series?.id === id)
    .sort((a, b) => a.series!.part - b.series!.part);
}

