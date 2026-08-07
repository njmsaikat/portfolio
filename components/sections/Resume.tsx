import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { certifications, education, experience } from "@/data/experience";

export function Resume() {
  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="Experience & education"
      description="Where I've worked, and how I got here."
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            Work Experience
          </h3>
          <ol className="mt-6 space-y-8 border-l border-[var(--color-border)] pl-6">
            {experience.map((entry) => (
              <li key={entry.company} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)]"
                />
                <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                  {entry.start} &ndash; {entry.end}
                </p>
                <h4 className="mt-1 text-base font-semibold">
                  {entry.role} &middot;{" "}
                  {entry.companyUrl ? (
                    <a
                      href={entry.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-accent)] underline decoration-1 underline-offset-2"
                    >
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                </h4>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">{entry.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              Education
            </h3>
            <p className="mt-3 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
              {education.start} &ndash; {education.end}
            </p>
            <p className="mt-1 font-medium">{education.degree}</p>
            <a
              href={education.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              {education.institution}
            </a>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{education.note}</p>
            <ul className="mt-3 space-y-1 text-sm text-[var(--color-text-muted)]">
              {education.achievements.map((achievement) => (
                <li key={achievement}>&bull; {achievement}</li>
              ))}
            </ul>

            <p className="mt-4 font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              Publications
            </p>
            <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-muted)]">
              {education.publications.map((pub) => (
                <li key={pub}>&bull; {pub}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              Certifications
            </h3>
            <ul className="mt-3 space-y-4">
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <p className="font-medium">{cert.title}</p>
                  {(cert.issuer || cert.year) && (
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {cert.issuer}
                      {cert.issuer && cert.year && " · "}
                      {cert.year}
                    </p>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--color-accent)] hover:underline"
                    >
                      Verify credential
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}
