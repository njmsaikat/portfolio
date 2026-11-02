import Link from "next/link";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/site";
import { navItems, resumeLink } from "@/lib/nav";
import { SocialIcon } from "./ui/SocialIcon";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)] print:hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-[var(--color-text-muted)]">{profile.headline}</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${profile.email}`} className="text-[var(--color-accent)] hover:underline">
              {profile.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[...navItems, resumeLink, { href: "/portfolio-page", label: "All projects" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Elsewhere</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                <SocialIcon icon={link.icon} className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
          <a
            href="/rss.xml"
            className="mt-4 inline-block text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            RSS feed
          </a>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)]">
        <p className="mx-auto max-w-6xl px-6 py-5 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} {profile.name} · Built with Next.js, statically exported, hosted on Netlify.
        </p>
      </div>
    </footer>
  );
}
