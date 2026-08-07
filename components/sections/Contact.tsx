"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/profile";

type Status = "idle" | "submitting" | "success" | "error";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's work together"
      description="Have a project in mind, or just want to say hello? Send a message and I'll get back to you."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="surface-panel overflow-hidden rounded-lg">
            <div className="relative h-40 w-full">
              <Image src="/images/map.jpg" alt={`Map of ${profile.location}`} fill className="object-cover" />
            </div>
          </div>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold">Location</dt>
              <dd className="text-[var(--color-text-muted)]">{profile.location}</dd>
            </div>
            <div>
              <dt className="font-semibold">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="text-[var(--color-accent)] hover:underline">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Phone</dt>
              <dd>
                <a href={`tel:${profile.phone}`} className="text-[var(--color-accent)] hover:underline">
                  {profile.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="surface-panel space-y-4 rounded-lg p-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-transparent px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>

            <div aria-live="polite" className="text-sm">
              {status === "success" && (
                <p className="text-emerald-600 dark:text-emerald-400">
                  Thanks — your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 dark:text-red-400">
                  Something went wrong. Please email me directly at {profile.email}.
                </p>
              )}
            </div>
        </form>
      </div>
    </Section>
  );
}
