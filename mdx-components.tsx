import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";

// Required by @next/mdx in the App Router. Styling comes from the `.prose`
// wrapper in app/blog/[slug]/page.tsx; only behavior is customized here.
const components: MDXComponents = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
