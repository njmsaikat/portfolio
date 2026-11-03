import type { CSSProperties } from "react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Aurora } from "@/components/ui/Aurora";
import { TiltCard } from "@/components/ui/TiltCard";

// Stagger for the .rise / .float CSS animations.
const delay = (d: string) => ({ "--d": d }) as CSSProperties;

const heroSocials = socialLinks.filter((s) => s.icon === "github" || s.icon === "linkedin");

// Splits the headline so its last two words get the gradient treatment.
const words = profile.headline.split(" ");
const headlineStart = words.slice(0, -2).join(" ");
const headlineEnd = words.slice(-2).join(" ");

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-border)]">
      <div aria-hidden className="grid-bg mask-fade absolute inset-0" />
      <Aurora />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-28 sm:pt-36 lg:grid-cols-[1.25fr_1fr] lg:pb-28">
        <div>
          {profile.freelanceAvailable && (
            <p className="glass rise inline-flex items-center gap-2 rounded-full px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                Available for freelance work · {profile.location} ({profile.timezone})
              </span>
            </p>
          )}

          <p className="rise mt-7 font-[family-name:var(--font-technical)] text-sm text-[var(--color-text-muted)]" style={delay("80ms")}>
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
          <h1 className="rise mt-3 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl" style={delay("160ms")}>
            {headlineStart} <span className="text-gradient">{headlineEnd}</span>
          </h1>
          <p className="rise mt-6 max-w-xl text-lg text-[var(--color-text-muted)]" style={delay("260ms")}>
            {profile.intro}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={delay("360ms")}>
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
                  className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          <dl className="rise mt-12 flex max-w-xl flex-wrap gap-x-10 gap-y-5 border-t border-[var(--color-border)] pt-6" style={delay("460ms")}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</dt>
                <dd className="font-[family-name:var(--font-technical)] whitespace-nowrap text-xl font-semibold sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <TiltCard>
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
          </TiltCard>
          <div className="glass glass-strong float absolute -left-4 bottom-10 hidden rounded-2xl px-4 py-3 sm:block lg:-left-10" style={delay("1.2s")}>
            <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
              Stack
            </p>
            <p className="mt-0.5 text-sm font-medium">Django · DRF · PostgreSQL</p>
          </div>
          <div className="glass glass-strong float absolute -right-3 top-8 hidden rounded-2xl px-4 py-3 sm:block lg:-right-6">
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
