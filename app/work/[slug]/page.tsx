import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";
import { caseStudies } from "@/data/caseStudies";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: { absolute: study.metaTitle },
    description: study.metaDescription,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      title: study.metaTitle,
      description: study.metaDescription,
      url: `${site.url}/work/${slug}`,
    },
  };
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();
  const others = caseStudies.filter((s) => s.slug !== slug);
  const showcased = (study.projects ?? [])
    .map((name) => projects.find((p) => p.name === name))
    .filter((p) => p !== undefined);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Work", url: `${site.url}/portfolio-page` },
          { name: study.company, url: `${site.url}/work/${slug}` },
        ]}
      />

      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
            <Link href="/portfolio-page" className="hover:text-[var(--color-accent)]">
              Work
            </Link>{" "}
            / <span className="text-[var(--color-text)]">Case study</span>
          </nav>
          <p className="mt-8 font-[family-name:var(--font-technical)] text-sm text-[var(--color-text-muted)]">
            {study.role} ·{" "}
            {study.companyUrl ? (
              <a
                href={study.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-accent)]"
              >
                {study.company}
              </a>
            ) : (
              study.company
            )}{" "}
            · {study.period}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{study.title}</h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-[var(--color-text-muted)]">
            {study.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <dl className={`mt-12 grid gap-6 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2 ${study.metrics.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {study.metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-[var(--color-text-muted)]">{m.label}</dt>
                <dd className="font-[family-name:var(--font-technical)] text-3xl font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Heading eyebrow="My work" title={study.builtTitle} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {study.built.map((item) => (
            <li key={item.name} className="surface-panel rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold">{item.name}</h3>
                {item.status && (
                  <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-[family-name:var(--font-technical)] text-[11px] text-[var(--color-text-muted)]">
                    {item.status}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <Heading
              eyebrow={study.architectureTitle ? "Approach" : "Architecture"}
              title={study.architectureTitle ?? "How it's built"}
            />
            <p className="mt-5 text-[var(--color-text-muted)]">{study.architecture}</p>
            <h3 className="mt-10 font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              Tech stack
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Heading eyebrow="Role" title="My role" />
            <p className="mt-5 text-[var(--color-text-muted)]">{study.roleDetail}</p>
            {study.closing && (
              <>
                <h3 className="mt-10 text-lg font-semibold">{study.closing.title}</h3>
                <p className="mt-2 text-[var(--color-text-muted)]">{study.closing.text}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {study.quotes && study.quotes.length > 0 && (
        <section className="border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Heading eyebrow="Reviews" title="What clients say" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {study.quotes.map((q) => (
                <li key={q.text} className="surface-panel flex flex-col rounded-xl p-6">
                  <p aria-label={`${q.rating} out of 5 stars`} className="text-[var(--color-warm)]">
                    {"★".repeat(q.rating)}
                  </p>
                  <blockquote className="mt-3 flex-1 text-[var(--color-text)]">&ldquo;{q.text}&rdquo;</blockquote>
                  <p className="mt-4 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                    {q.source}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {showcased.length > 0 && (
        <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Heading eyebrow="Portfolio" title="Selected client work" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {showcased.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {study.press.length > 0 && (
        <section className="border-t border-[var(--color-border)]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <Heading eyebrow="Press" title="In the news" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {study.press.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-panel group flex h-full flex-col rounded-xl p-5 transition-colors hover:border-[var(--color-accent)]"
                  >
                    <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                      {item.outlet} · {item.date}
                    </span>
                    <span className="mt-2 font-medium group-hover:text-[var(--color-accent)]">{item.title} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="surface-panel flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Building something similar?</h2>
              <p className="mt-1 text-[var(--color-text-muted)]">Tell me what you&apos;re building and I&apos;ll get back to you.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/#contact">Start a conversation</ButtonLink>
              <ButtonLink href={study.cta.href} variant="secondary">
                {study.cta.label}
              </ButtonLink>
            </div>
          </div>
          {others.length > 0 && (
            <div className="mt-14">
              <p className="eyebrow">More case studies</p>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {others.map((s) => (
                  <CaseStudyCard key={s.slug} study={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
