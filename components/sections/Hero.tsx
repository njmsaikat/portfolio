import Image from "next/image";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

const heroSocials = socialLinks.filter((s) => s.icon === "github" || s.icon === "linkedin");


// Splits the headline so its last two words get the gradient treatment.
const words = profile.headline.split(" ");
const headlineStart = words.slice(0, -2).join(" ");
const headlineEnd = words.slice(-2).join(" ");

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
      <div aria-hidden className="hero-glow absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:pb-28">
        <div>
          {profile.freelanceAvailable && (
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                Available for freelance work · {profile.location} ({profile.timezone})
              </span>
            </p>
          )}

          <p className="mt-7 font-[family-name:var(--font-technical)] text-sm text-[var(--color-text-muted)]">
            Hi, I&apos;m {profile.name}, {profile.jobTitle} at{" "}
            <a
              href={profile.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-text)] underline decoration-[var(--color-border)] underline-offset-4 hover:decoration-[var(--color-accent)]"
            >
              {profile.company}
            </a>
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {headlineStart} <span className="text-gradient">{headlineEnd}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)]">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#contact">Hire me</ButtonLink>
            <ButtonLink href="/resume" variant="secondary">
              View résumé
            </ButtonLink>
            <div className="ml-1 flex gap-2">
              {heroSocials.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-[var(--color-border)] pt-6">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</dt>
                <dd className="font-[family-name:var(--font-technical)] text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="gradient-ring rounded-[1.75rem] p-[1.5px] shadow-[0_30px_80px_-30px_var(--glow)]">
            <Image
              src={profile.photo}
              alt={`${profile.name}, ${profile.jobTitle} at ${profile.company}, in Dhaka`}
              width={960}
              height={1200}
              sizes="(max-width: 1024px) 384px, 440px"
              fetchPriority="high"
              loading="eager"
              className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
            />
          </div>
          <div className="surface-panel absolute -left-4 bottom-10 hidden rounded-xl px-4 py-3 shadow-lg sm:block lg:-left-10">
            <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
              Stack
            </p>
            <p className="mt-0.5 text-sm font-medium">Django · DRF · PostgreSQL</p>
          </div>
          <div className="surface-panel absolute -right-3 top-8 hidden rounded-xl px-4 py-3 shadow-lg sm:block lg:-right-6">
            <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
              Ships to
            </p>
            <p className="mt-0.5 text-sm font-medium">Docker · AWS · DigitalOcean</p>
          </div>
        </div>
      </div>
    </section>
  );
}
