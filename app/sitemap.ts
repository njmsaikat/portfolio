import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/posts";
import { servicePages } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { hasPost } from "@/lib/posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const bnPosts = await getAllPosts("bn");
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
    ...caseStudies.map((s) => ({
      url: `${site.url}/work/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${site.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Product pages exist once a product has a `slug` (/projects/<slug>).
    ...projects.flatMap((p) =>
      p.type === "product" && "slug" in p && typeof p.slug === "string"
        ? [
            {
              url: `${site.url}/projects/${p.slug}`,
              lastModified: new Date(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
            },
          ]
        : [],
    ),
    { url: `${site.url}/portfolio-page`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${site.url}/blog`,
      lastModified: latestPost ? new Date(latestPost) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: { en: `${site.url}/blog`, bn: `${site.url}/bn/blog` } },
    },
    {
      url: `${site.url}/bn/blog`,
      lastModified: bnPosts[0] ? new Date(bnPosts[0].updated ?? bnPosts[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: { languages: { en: `${site.url}/blog`, bn: `${site.url}/bn/blog` } },
    },
  ];

  // Posts with a counterpart in the other language list both versions as hreflang alternates.
  const withAlternates = (slug: string) =>
    hasPost(slug, "en") && hasPost(slug, "bn")
      ? { alternates: { languages: { en: `${site.url}/blog/${slug}`, bn: `${site.url}/bn/blog/${slug}` } } }
      : {};

  return [
    ...pages,
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...withAlternates(post.slug),
    })),
    ...bnPosts.map((post) => ({
      url: `${site.url}/bn/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...withAlternates(post.slug),
    })),
  ];
}
