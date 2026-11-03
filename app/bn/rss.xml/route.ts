import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

// Bangla feed, rendered at build time into out/bn/rss.xml.
export const dynamic = "force-static";

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getAllPosts("bn");
  const items = posts
    .map((post) => {
      const url = `${site.url}/bn/blog/${post.slug}`;
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
    <title>${escape(`${profile.name} · ব্লগ`)}</title>
    <link>${site.url}/bn/blog</link>
    <description>${escape("Django, PostgreSQL, Docker এবং বাংলাদেশের পেমেন্ট গেটওয়ে নিয়ে বাংলা ব্লগ।")}</description>
    <language>bn</language>
    <atom:link href="${site.url}/bn/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
