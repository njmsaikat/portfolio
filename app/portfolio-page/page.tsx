import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "The full list of Saikat Roy's open-source GitHub repositories and client web projects, spanning Django/Python backends, React/Next.js frontends, and WordPress/Shopify builds.",
  alternates: { canonical: "/portfolio-page" },
  openGraph: {
    title: "Portfolio | Saikat Roy",
    description:
      "The full list of Saikat Roy's open-source GitHub repositories and client web projects.",
    url: `${site.url}/portfolio-page`,
  },
};

export default function PortfolioPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Portfolio", url: `${site.url}/portfolio-page` },
        ]}
      />
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Portfolio</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">All projects</h1>
          <p className="mt-3 text-[var(--color-text-muted)]">
            Open-source repositories and client work, in one place. Most production work is under
            private repositories or NDA — see the{" "}
            <a href="/#resume" className="text-[var(--color-accent)] hover:underline">
              experience
            </a>{" "}
            and{" "}
            <a href="/#skills" className="text-[var(--color-accent)] hover:underline">
              skills
            </a>{" "}
            sections for the fuller picture.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
