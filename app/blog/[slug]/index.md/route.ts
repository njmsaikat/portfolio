import { getPost, getPostBody, getPostSlugs } from "@/lib/posts";
import { site } from "@/data/site";

// Markdown mirror of each English post at /blog/<slug>/index.md, for LLMs and tools.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const md = `# ${post.title}

> ${post.description}

- Author: Saikat Roy (${site.url})
- Published: ${post.date}${post.updated ? `\n- Updated: ${post.updated}` : ""}
- Tags: ${post.tags.join(", ")}
- Canonical: ${site.url}/blog/${slug}

${getPostBody(slug)}
`;
  return new Response(md, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
