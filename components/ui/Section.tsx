import { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-[var(--color-border)] py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {description && <p className="mt-3 text-[var(--color-text-muted)]">{description}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
