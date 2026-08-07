import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";

export function Portfolio() {
  return (
    <Section
      id="portfolio"
      eyebrow="Portfolio"
      title="Featured work"
      description="A mix of open-source repositories and client projects. Most of my production work at YOUR Campus and for freelance clients lives in private repositories under NDA — the skills and experience above reflect that work even where the code itself can't be shown."
      className="bg-[var(--color-bg-elevated)]"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          View all projects &rarr;
        </Link>
      </div>
    </Section>
  );
}
