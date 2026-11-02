import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

// Rendered once at build time into out/rss.xml (static export supports GET-only route handlers).
export const dynamic = "force-static";

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.tags.map((tag) => `      <category>${escape(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${profile.name} · Blog`)}</title>
    <link>${site.url}/blog</link>
    <description>${escape("Practical notes on Django, PostgreSQL, Docker and running commerce backends in production.")}</description>
    <language>en</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
