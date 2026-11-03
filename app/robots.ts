import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

// Everything is public and meant to be found, including by AI crawlers.
const aiCrawlers = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "CCBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
