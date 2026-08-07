import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Saikat Roy's blog on backend development, Django, and web engineering — new posts coming soon.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Saikat Roy",
    description: "Saikat Roy's blog on backend development, Django, and web engineering.",
    url: `${site.url}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
        ]}
      />
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes on backend engineering
          </h1>
          <p className="mt-3 text-[var(--color-text-muted)]">
            This is where I&apos;ll be writing about backend development, Django, and the web.
            No posts yet — check back soon.
          </p>
        </div>

        <div className="surface-panel mx-auto mt-14 max-w-2xl overflow-hidden rounded-lg">
          <div className="relative h-56 w-full">
            <Image src="/images/blog/html.webp" alt="" fill className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
