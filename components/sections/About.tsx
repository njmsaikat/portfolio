import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";

const facts = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { label: "Location", value: profile.location },
  { label: "Degree", value: profile.degree },
  { label: "Freelance", value: profile.freelanceAvailable ? "Available" : "Not available" },
  { label: "Languages", value: profile.languages.map((l) => l.name).join(", ") },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A bit about me"
      description="Backend-leaning, full stack, and comfortable owning a project end to end."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-[var(--color-text-muted)]">
          {profile.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <dl className="surface-panel grid grid-cols-1 gap-5 rounded-lg p-6 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-[family-name:var(--font-technical)] text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm font-medium">
                {fact.href ? (
                  <a href={fact.href} className="hover:text-[var(--color-accent)]">
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
