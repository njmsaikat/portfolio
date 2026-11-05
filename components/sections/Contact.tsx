"use client";

import { FormEvent, useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/ui/Aurora";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { projectTypes } from "@/data/contact";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const linkedin = socialLinks.find((s) => s.icon === "linkedin");

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

// Live Dhaka time, so visitors know when to expect a reply. Server HTML shows
// the time zone only; the clock fills in after hydration.
function useDhakaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dhaka", hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Links like /?project=payments#contact (from the service pages) preselect a
// project type. The server snapshot is null, so the exported HTML (which
// Netlify Forms crawls) always has the form with the first type checked; the
// URL is read on the client after hydration. A visitor's own click wins.
const noSubscribe = () => () => {};
function usePreselectedProjectType() {
  const key = useSyncExternalStore(
    noSubscribe,
    () => new URLSearchParams(window.location.search).get("project"),
    () => null,
  );
  const [chosen, setChosen] = useState<string | null>(null);
  const preselected = projectTypes.find((t) => t.key === key)?.label;
  return [chosen ?? preselected ?? projectTypes[0].label, setChosen] as const;
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = usePreselectedProjectType();
  const [copied, setCopied] = useState(false);
  const dhakaTime = useDhakaTime();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = { "form-name": "contact" };
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--color-border)] py-20 sm:py-28">
      <Aurora />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something <span className="text-gradient">that runs.</span>
          </h2>
          <p className="mt-4 max-w-md text-[var(--color-text-muted)]">
            Have a backend to build, a store to fix or a system to keep alive? Tell me about it and I&apos;ll get back to
            you.
          </p>

          <p className="glass mt-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.freelanceAvailable ? "Available for new projects" : "Currently booked"}
            <span className="text-[var(--color-text-muted)]">
              · Dhaka {dhakaTime ? `${dhakaTime} ` : ""}({profile.timezone})
            </span>
          </p>

          <ul className="mt-8 space-y-3">
            <li className="glass flex items-center justify-between gap-3 rounded-2xl px-5 py-4">
              <div className="min-w-0">
                <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
                  Email
                </p>
                <a href={`mailto:${profile.email}`} className="block truncate font-medium hover:text-[var(--color-accent)]">
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="shrink-0 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                aria-live="polite"
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </li>
            <li className="glass rounded-2xl px-5 py-4">
              <p className="font-[family-name:var(--font-technical)] text-[11px] uppercase tracking-wide text-[var(--color-text-muted)]">
                Phone
              </p>
              <a href={`tel:${profile.phone}`} className="font-medium hover:text-[var(--color-accent)]">
                {profile.phone}
              </a>
            </li>
            {linkedin && (
              <li>
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex items-center justify-between rounded-2xl px-5 py-4"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon icon="linkedin" className="h-5 w-5 text-[var(--color-accent)]" />
                    <span className="font-medium">Connect on LinkedIn</span>
                  </span>
                  <span className="text-[var(--color-text-muted)] transition-transform group-hover:translate-x-1">↗</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="glass reveal rounded-[2rem] p-6 sm:p-8">
          {status === "success" ? (
            <div className="flex min-h-[26rem] flex-col items-center justify-center text-center" role="status">
              <svg viewBox="0 0 52 52" className="h-16 w-16 text-[var(--color-accent)]" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="26" cy="26" r="24" opacity="0.25" />
                <path
                  d="M15 27l7 7 15-16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: "check-draw 0.6s 0.15s ease-out forwards" }}
                />
              </svg>
              <h3 className="mt-5 text-xl font-semibold">Message sent</h3>
              <p className="mt-2 max-w-xs text-[var(--color-text-muted)]">
                Thanks for reaching out. I&apos;ll read it and get back to you.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            // Rendered in the static HTML on purpose: Netlify Forms detects the
            // form (and its fields) by crawling the exported HTML at deploy time.
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>

              <fieldset>
                <legend className="text-sm font-medium">What do you need help with?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {projectTypes.map(({ label }) => (
                    <label key={label} className="cursor-pointer">
                      <input
                        type="radio"
                        name="project_type"
                        value={label}
                        checked={projectType === label}
                        onChange={() => setProjectType(label)}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-sm text-[var(--color-text-muted)] transition-all peer-checked:border-[var(--color-accent)] peer-checked:bg-[var(--color-accent-soft)] peer-checked:text-[var(--color-accent)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] hover:border-[var(--color-accent)]">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="field">
                  <input id="name" name="name" type="text" required placeholder=" " autoComplete="name" />
                  <label htmlFor="name">Your name</label>
                </div>
                <div className="field">
                  <input id="email" name="email" type="email" required placeholder=" " autoComplete="email" />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="field">
                <textarea id="message" name="message" rows={5} required placeholder=" " />
                <label htmlFor="message">Tell me about the project</label>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button type="submit" disabled={status === "submitting"} className="min-w-40">
                  {status === "submitting" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>Send message →</>
                  )}
                </Button>
                <p className="text-xs text-[var(--color-text-muted)]">Your message comes straight to me.</p>
              </div>

              <div aria-live="polite" className="text-sm">
                {status === "error" && (
                  <p className="text-red-600 dark:text-red-400">
                    Something went wrong. Please email me directly at {profile.email}.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
