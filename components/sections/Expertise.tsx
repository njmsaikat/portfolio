import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { focusAreas } from "@/data/focus";

export function Expertise() {
  return (
    <Section
      id="expertise"
      eyebrow="What I build"
      title="Software that keeps real businesses running"
      description="Vending machines, laundry rooms and online stores have one thing in common: when the backend is down, nobody gets served. That's the work I specialise in."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {focusAreas.map((area) => {
          const external = area.href?.startsWith("http");
          return (
            <Card
              key={area.title}
              className={`flex h-full flex-col ${area.size === "large" ? "md:min-h-72" : ""}`}
              outerClassName={
                area.size === "large" ? "md:col-span-2 md:row-span-2" : area.size === "wide" ? "md:col-span-3" : ""
              }
            >
              <p className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
                {area.eyebrow}
              </p>
              <h3 className={`mt-3 font-semibold tracking-tight ${area.size === "large" ? "text-2xl sm:text-3xl" : "text-lg"}`}>
                {area.title}
              </h3>
              <p
                className={`mt-3 flex-1 text-[var(--color-text-muted)] ${area.size === "large" ? "max-w-xl text-base" : "text-sm"}`}
              >
                {area.description}
              </p>
              {area.size === "large" && (
                <ul className="mt-8 grid grid-cols-3 gap-3">
                  {area.tags.map((tag, i) => (
                    <li
                      key={tag}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4"
                    >
                      <span className="font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]">
                        0{i + 1}
                      </span>
                      <p className="mt-6 text-sm font-medium sm:text-base">{tag}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <ul className={`flex flex-wrap gap-2 ${area.size === "large" ? "hidden" : ""}`}>
                  {area.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-accent)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                {area.href && (
                  <Link
                    href={area.href}
                    prefetch={false}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                    aria-label={`Learn more: ${area.title}`}
                  >
                    {external ? "Visit ↗" : area.href.startsWith("/work/") ? "Read case study →" : "See work →"}
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
