import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";
import { servicePages } from "@/data/services";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latestPost = posts[0]?.updated ?? posts[0]?.date;

  // Pages are rebuilt on every deploy, so the build time is their honest lastModified.
  const pages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/resume`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((s) => ({
      url: `${site.url}/services/${s.page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/portfolio-page`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${site.url}/blog`,
      lastModified: latestPost ? new Date(latestPost) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
