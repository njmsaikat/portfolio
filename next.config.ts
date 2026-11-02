import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

// Blog posts are MDX files in content/blog, compiled at build time (no client
// JS for markdown or highlighting). Plugins are given as strings because
// Turbopack can't receive JS functions from the config.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      "rehype-slug",
      ["@shikijs/rehype", { themes: { light: "github-light", dark: "github-dark-dimmed" } }],
    ],
  },
});

export default withMDX(nextConfig);
