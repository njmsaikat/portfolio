import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { servicePages } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { formatDate, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.page.slug }));
}

export const dynamicParams = false;

function findService(slug: string) {
  return servicePages.find((s) => s.page.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const { page } = service;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${site.url}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  const { page } = service;

  const related = page.relatedProjects
    .map((name) => projects.find((p) => p.name === name))
    .filter((p) => p !== undefined);
  const posts = await Promise.all((page.relatedPosts ?? []).map(getPost));
  const others = servicePages.filter((s) => s.page.slug !== slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Services", url: `${site.url}/services` },
          { name: page.headline, url: `${site.url}/services/${slug}` },
        ]}
      />
      <ServiceJsonLd name={page.headline} description={page.metaDescription} slug={slug} />
      <FaqJsonLd faqs={page.faqs} />

      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
            <Link href="/services" className="hover:text-[var(--color-accent)]">
              Services
            </Link>{" "}
            / <span className="text-[var(--color-text)]">{page.headline}</span>
          </nav>
          <div className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <ServiceIcon icon={service.icon} className="h-6 w-6" />
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {page.headline}
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-[var(--color-text-muted)]">
            {page.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/#contact">Discuss your project</ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View résumé
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="eyebrow">What you get</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">How I can help</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {page.deliverables.map((d, i) => (
            <li key={d.title} className="surface-panel rounded-xl p-6">
              <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{d.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <h3 className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            Tools I use for this
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(related.length > 0 || posts.length > 0) && (
        <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <p className="eyebrow">Proof</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Related work</h2>
            {related.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            )}
            {posts.length > 0 && (
              <ul className="mt-8 space-y-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="surface-panel group flex flex-col gap-1 rounded-xl p-5 transition-colors hover:border-[var(--color-accent)] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="font-medium group-hover:text-[var(--color-accent)]">
                        <span className="text-[var(--color-text-muted)]">Blog: </span>
                        {post.title}
                      </span>
                      <span className="shrink-0 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                        {formatDate(post.date)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Common questions</h2>
          <dl className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 text-[var(--color-text-muted)]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="surface-panel flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Have a project like this?</h2>
              <p className="mt-1 text-[var(--color-text-muted)]">Tell me what you&apos;re building and I&apos;ll get back to you.</p>
            </div>
            <ButtonLink href="/#contact">Start a conversation</ButtonLink>
          </div>
          <p className="mt-10 font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            Other services
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((s) => (
              <li key={s.page.slug}>
                <Link href={`/services/${s.page.slug}`} className="text-sm font-medium text-[var(--color-accent)] hover:underline">
                  {s.page.headline} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
