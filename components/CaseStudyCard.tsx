import Link from "next/link";
import { CaseStudy } from "@/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="surface-panel group relative flex h-full flex-col overflow-hidden rounded-xl p-6 transition-colors hover:border-[var(--color-accent)] sm:p-8"
    >
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-1 flex-col">
        <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
          Case study · {study.company}
        </p>
        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-[var(--color-accent)]">
          {study.title}
        </h3>
        <p className="mt-3 flex-1 text-sm text-[var(--color-text-muted)]">{study.summary}</p>
        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-5">
          {study.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs text-[var(--color-text-muted)]">{m.label}</dt>
              <dd className="font-[family-name:var(--font-technical)] text-xl font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>
        <span className="mt-6 text-sm font-semibold text-[var(--color-accent)]">Read case study &rarr;</span>
      </div>
    </Link>
  );
}
