import type { Metadata } from "next";
import Link from "next/link";
import { AboutPageJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ButtonLink } from "@/components/ui/Button";
import { about } from "@/data/about";
import { education, experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { site, socialLinks } from "@/data/site";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: { absolute: about.metaTitle },
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: about.metaTitle,
    description: about.metaDescription,
    url: `${site.url}/about`,
  },
};

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </>
  );
}

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ]}
      />
      <AboutPageJsonLd />
      <FaqJsonLd faqs={about.faqs} />

      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-32">
          <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-accent)]">
              Home
            </Link>{" "}
            / <span className="text-[var(--color-text)]">About</span>
          </nav>
          <p className="mt-8 font-[family-name:var(--font-technical)] text-sm text-[var(--color-text-muted)]">
            {profile.jobTitle} ·{" "}
            <a
              href={profile.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-accent)]"
            >
              {profile.company}
            </a>{" "}
            · {profile.location}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            About {profile.name}
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg text-[var(--color-text-muted)]">
            {about.intro.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/#contact">Get in touch</ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View résumé
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Heading eyebrow="Career" title="Experience" />
        <ol className="mt-10 space-y-5">
          {experience.map((job) => (
            <li key={`${job.company}-${job.start}`} className="surface-panel rounded-xl p-6">
              <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                {job.start} – {job.end}
              </p>
              <h3 className="mt-2 font-semibold">
                {job.role} ·{" "}
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent)]"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">{job.description}</p>
              {job.caseStudy && (
                <Link
                  href={job.caseStudy}
                  className="mt-3 inline-block text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  Read the case study &rarr;
                </Link>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Focus" title="What I work on" />
            <ul className="mt-6 list-disc space-y-3 pl-5 text-[var(--color-text-muted)]">
              {about.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <Heading eyebrow="Skills" title="Skills summary" />
            <dl className="mt-6 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <dt className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                    {group.category}
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <Heading eyebrow="Education" title={education.degree} />
            <p className="mt-4 text-[var(--color-text-muted)]">
              <a
                href={education.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-accent)]"
              >
                {education.institution}
              </a>{" "}
              · {education.start} – {education.end} · {education.note}
            </p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[var(--color-text-muted)]">
              {education.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <Heading eyebrow="Elsewhere" title="Profiles" />
            <ul className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="surface-panel inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <SocialIcon icon={link.icon} className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <Heading eyebrow="FAQ" title="Common questions" />
          <dl className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {about.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-semibold">{faq.question}</dt>
                <dd className="mt-2 text-[var(--color-text-muted)]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
