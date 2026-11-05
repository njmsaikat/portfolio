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
      [
        "@shikijs/rehype",
        {
          themes: { light: "github-light", dark: "github-dark-dimmed" },
          // The two theme colours below 4.5:1 on their code backgrounds (orange
          // in github-light, comments in github-dark-dimmed), nudged to pass.
          colorReplacements: {
            "github-light": { "#e36209": "#bc4c00" },
            "github-dark-dimmed": { "#768390": "#8d99a6" },
          },
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
