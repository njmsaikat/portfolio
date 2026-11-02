"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navItems, resumeLink } from "@/lib/nav";
import { profile } from "@/data/profile";
import { ThemeToggle } from "./theme/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold">
          <Image
            src={profile.photoSquare}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-[var(--color-border)]"
          />
          {profile.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href={resumeLink.href}
            className="hidden rounded-lg border border-[var(--color-border)] px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:inline-flex"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" stroke="currentColor" fill="none" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-3">
            {[...navItems, resumeLink].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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
