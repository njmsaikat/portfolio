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
}

export interface Post extends PostMeta {
  slug: string;
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readingMinutes(slug: string): number {
  const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const words = source.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function getPost(slug: string): Promise<Post> {
  const { metadata } = (await import(`@/content/blog/${slug}.mdx`)) as { metadata: PostMeta };
  return { ...metadata, slug, readingMinutes: readingMinutes(slug) };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await Promise.all(getPostSlugs().map(getPost));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
