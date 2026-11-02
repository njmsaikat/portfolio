import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/caseStudies";
import { featuredProjects } from "@/data/projects";

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Featured work"
      description="Case studies from the platforms I build professionally, and products I've designed and shipped on my own."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>

      <h3 className="mt-16 font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
        Products I&apos;ve built
      </h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/portfolio-page"
          prefetch={false}
          className="text-sm font-semibold text-[var(--color-accent)] hover:underline"
        >
          All projects, open source and client work &rarr;
        </Link>
      </div>
    </Section>
  );
}
