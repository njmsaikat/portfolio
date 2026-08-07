"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Project } from "@/data/types";
import { useSpotlight } from "@/lib/useSpotlight";

export function ProjectCard({ project }: { project: Project }) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  if (project.type === "github") {
    return (
      <Card className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{project.name}</h3>
          <span className="flex items-center gap-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
            {project.stars}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{project.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <Badge>{project.language}</Badge>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-accent)] hover:underline"
          >
            View on GitHub &rarr;
          </a>
        </div>
      </Card>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="surface-panel group relative flex h-full flex-col overflow-hidden rounded-lg transition-colors duration-200 hover:border-[var(--color-accent)]"
    >
      <div
        aria-hidden
        className="spotlight-overlay pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-44 w-full border-b border-[var(--color-border)]">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-[var(--color-text-muted)]">{project.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <Badge>{project.category}</Badge>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Visit site &rarr;
            </a>
          ) : (
            <span className="text-sm text-[var(--color-text-muted)]">No live link</span>
          )}
        </div>
      </div>
    </div>
  );
}
