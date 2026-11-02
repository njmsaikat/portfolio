import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "@/components/JsonLd";
import { PrintButton } from "@/components/PrintButton";
import { profile } from "@/data/profile";
import { site, socialLinks } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { certifications, education, experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Saikat Roy, Software Engineer at YOUR Campus in Dhaka: Django and REST API backends, DevOps for smart vending and campus commerce platforms, and Shopify/WordPress development.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Résumé | Saikat Roy",
    description: "Experience, skills, education and certifications of Saikat Roy, Django backend engineer.",
    url: `${site.url}/resume`,
    type: "profile",
  },
};

const resumeLinks = socialLinks.filter((l) => ["github", "linkedin", "stackoverflow"].includes(l.icon));

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-[var(--color-border)] pb-2 font-[family-name:var(--font-technical)] text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Résumé", url: `${site.url}/resume` },
        ]}
      />
      <ProfilePageJsonLd />

      <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16 print:max-w-none print:p-0">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-sm text-[var(--color-text-muted)]">
            Tip: &ldquo;Download PDF&rdquo; opens the print dialog. Choose &ldquo;Save as PDF&rdquo;.
          </p>
          <PrintButton />
        </div>

        <article className="surface-panel rounded-2xl p-8 sm:p-12 print:rounded-none print:border-0 print:p-0">
          <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src={profile.photoSquare}
              alt={`Portrait of ${profile.name}`}
              width={112}
              height={112}
              className="h-24 w-24 rounded-2xl object-cover sm:h-28 sm:w-28 print:h-20 print:w-20"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
              <p className="mt-1 text-lg">
                {profile.jobTitle} · {profile.roles.slice(1).join(" · ")}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-text-muted)]">
                <li>{profile.location}</li>
                <li>
                  <a href={`mailto:${profile.email}`} className="hover:text-[var(--color-accent)]">
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${profile.phone}`} className="hover:text-[var(--color-accent)]">
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a href={site.url} className="hover:text-[var(--color-accent)]">
                    {site.url.replace("https://", "")}
                  </a>
                </li>
                {resumeLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-[var(--color-accent)]">
                      {link.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <section className="mt-10 print:mt-6">
            <Heading>Summary</Heading>
            <p className="mt-4 text-[var(--color-text-muted)]">
              {profile.headline} {profile.bio[0]}
            </p>
          </section>

          <section className="mt-10 print:mt-6">
            <Heading>Experience</Heading>
            <ol className="mt-4 space-y-6">
              {experience.map((entry) => (
                <li key={entry.company} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">
                      {entry.role} ·{" "}
                      {entry.companyUrl ? (
                        <a href={entry.companyUrl} className="text-[var(--color-accent)] hover:underline">
                          {entry.company}
                        </a>
                      ) : (
                        entry.company
                      )}
                    </h3>
                    <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                      {entry.start} – {entry.end}
                    </p>
                  </div>
                  <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">{entry.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 print:mt-6">
            <Heading>Skills</Heading>
            <dl className="mt-4 grid gap-3 sm:grid-cols-[10rem_1fr]">
              {skillGroups.map((group) => (
                <div key={group.category} className="contents">
                  <dt className="text-sm font-semibold">{group.category}</dt>
                  <dd className="text-sm text-[var(--color-text-muted)]">{group.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 print:mt-6 print:gap-6">
            <section className="break-inside-avoid">
              <Heading>Education</Heading>
              <p className="mt-4 font-semibold">{education.degree}</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {education.institution} · {education.start} – {education.end}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-[var(--color-text-muted)]">
                {education.achievements.map((a) => (
                  <li key={a}>• {a}</li>
                ))}
              </ul>
            </section>

            <section className="break-inside-avoid">
              <Heading>Languages</Heading>
              <ul className="mt-4 space-y-1 text-sm">
                {profile.languages.map((l) => (
                  <li key={l.name}>
                    <span className="font-semibold">{l.name}</span>{" "}
                    <span className="text-[var(--color-text-muted)]">· {l.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-10 break-inside-avoid print:mt-6">
            <Heading>Certifications</Heading>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <span className="font-medium">{cert.title}</span>
                  {(cert.issuer || cert.year) && (
                    <span className="text-[var(--color-text-muted)]">
                      {" "}
                      · {[cert.issuer, cert.year].filter(Boolean).join(", ")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 break-inside-avoid print:mt-6">
            <Heading>Publications</Heading>
            <ul className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
              {education.publications.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
