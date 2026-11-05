// Project types offered in the contact form. `label` is what's submitted to
// Netlify Forms (keep existing labels stable so past submissions stay
// comparable); `key` is what links use to preselect one: /?project=<key>#contact.
export const projectTypes = [
  { key: "backend", label: "Backend / API" },
  { key: "payments", label: "Payment gateway" },
  { key: "shopify", label: "Shopify" },
  { key: "wordpress", label: "WordPress" },
  { key: "devops", label: "DevOps" },
  { key: "other", label: "Something else" },
] as const;

export type ProjectTypeKey = (typeof projectTypes)[number]["key"];

/** Home-page contact section with a project type preselected. */
export function contactHref(projectType?: ProjectTypeKey): string {
  return projectType ? `/?project=${projectType}#contact` : "/#contact";
}
