import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/caseStudies";
import { site } from "@/data/site";
import type { Project } from "@/data/types";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Saikat Roy's work: case studies from YOUR Campus and SnacKeeper, live products like HisabBD, open-source Django tooling, and Shopify/WordPress client sites.",
  alternates: { canonical: "/portfolio-page" },
  openGraph: {
    title: "Portfolio | Saikat Roy",
    description: "Case studies, live products, open-source repositories and client work by Saikat Roy.",
    url: `${site.url}/portfolio-page`,
  },
};

const groups: { title: string; studies?: true; type?: Project["type"] }[] = [
  { title: "Case studies", studies: true },
  { title: "Products I've built", type: "product" },
  { title: "Open source", type: "github" },
  { title: "Client work", type: "client" },
];

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
            Case studies, products I&apos;ve built, open-source repositories and client work, in one place. Production
            code for employers and clients stays private. The case studies and{" "}
            <Link href="/#resume" className="text-[var(--color-accent)] hover:underline">
              experience
            </Link>{" "}
            section give the fuller picture.
          </p>
        </div>

        {groups.map((group) => (
          <div key={group.title} className="mt-16">
            <h2 className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              {group.title}
            </h2>
            {group.studies ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {caseStudies.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}
              </div>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects
                  .filter((p) => p.type === group.type)
                  .map((project) => (
                    <ProjectCard key={project.name} project={project} />
                  ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
