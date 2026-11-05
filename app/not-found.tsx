import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

// Replaces Next's default 404, whose inline styles follow the OS colour scheme
// and ignore the site's theme (white text on the light theme for visitors whose
// OS is in dark mode). Exported as out/404.html; Netlify serves it for unknown
// URLs, and Next adds noindex automatically.
export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 pb-16 pt-28 sm:pt-32">
      <p className="font-[family-name:var(--font-technical)] text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-text-muted)]">
        This page doesn&apos;t exist or has moved. These are good places to start:
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          Blog
        </ButtonLink>
        <ButtonLink href="/portfolio-page" variant="secondary">
          Portfolio
        </ButtonLink>
      </div>
    </section>
  );
}
