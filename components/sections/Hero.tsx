import Image from "next/image";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/site";
import { projects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Typewriter } from "@/components/ui/Typewriter";

const heroSocials = socialLinks.filter((s) => s.icon === "github" || s.icon === "linkedin");

const totalStars = projects.reduce((sum, p) => (p.type === "github" ? sum + p.stars : sum), 0);
const stats = [
  { label: "Years shipping software", value: profile.yearsExperience },
  { label: "Projects shipped", value: String(projects.length) },
  { label: "GitHub stars", value: String(totalStars) },
];

export function Hero() {
  return (
    <section className="grid-bg relative border-b border-[var(--color-border)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 text-center sm:py-32 md:flex-row md:text-left">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
              Available for freelance work
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-3 font-[family-name:var(--font-technical)] text-lg text-[var(--color-text-muted)] sm:text-xl">
            <Typewriter words={profile.roles} />
          </p>
          <p className="mx-auto mt-6 max-w-xl text-[var(--color-text-muted)] md:mx-0">
            {profile.bio[0]}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <ButtonLink href="/#contact" variant="primary">
              Get in Touch
            </ButtonLink>
            <ButtonLink href="/#portfolio" variant="secondary">
              View Projects
            </ButtonLink>
          </div>

          <div className="mt-8 flex justify-center gap-4 md:justify-start">
            {heroSocials.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>

          <dl className="mt-10 flex justify-center gap-8 md:justify-start">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-[family-name:var(--font-technical)] text-2xl font-semibold text-[var(--color-text)]">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative shrink-0">
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={256}
            height={256}
            priority
            className="surface-panel h-52 w-52 rounded-2xl object-cover sm:h-64 sm:w-64"
          />
        </div>
      </div>
    </section>
  );
}
