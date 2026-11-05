import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, InputHTMLAttributes, TableHTMLAttributes } from "react";

// Required by @next/mdx in the App Router. Styling comes from the `.prose`
// wrapper in app/blog/[slug]/page.tsx; only behavior is customized here.
const components: MDXComponents = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("http") ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
  // GFM renders "- [ ]" as a disabled, unlabeled checkbox. In an article it's
  // only decoration (screen readers read the list item's text), so draw a box.
  input: (props: InputHTMLAttributes<HTMLInputElement>) =>
    props.type === "checkbox" ? (
      <span aria-hidden="true" className="task-box">
        {props.checked ? "✓" : null}
      </span>
    ) : (
      <input {...props} />
    ),
  // Wide tables scroll sideways on small screens (see .prose table), so make
  // them focusable: keyboard users can then scroll them with the arrow keys.
  table: (props: TableHTMLAttributes<HTMLTableElement>) => <table tabIndex={0} {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
