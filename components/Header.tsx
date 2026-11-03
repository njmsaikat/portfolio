"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, resumeLink } from "@/lib/nav";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The floating glass pill tightens slightly once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-0 px-3 sm:px-6 print:hidden">
      <div
        className={`glass relative top-3 mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 transition-all duration-300 sm:px-4 ${
          scrolled ? "py-1.5" : "py-2.5"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 text-sm font-semibold">
          <Image
            src={profile.photoSquare}
            alt=""
            width={30}
            height={30}
            className="h-7.5 w-7.5 rounded-full object-cover ring-2 ring-[var(--glass-edge)]"
          />
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="rounded-full px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={resumeLink.href}
            className="sheen hidden rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[var(--color-accent-contrast)] transition hover:brightness-110 sm:inline-flex"
          >
            {resumeLink.label}
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" stroke="currentColor" fill="none" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="glass relative top-3 mx-auto mt-2 max-w-6xl rounded-3xl px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...navItems, resumeLink].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
