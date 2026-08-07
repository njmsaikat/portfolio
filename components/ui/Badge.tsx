import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2.5 py-1 font-[family-name:var(--font-technical)] text-xs text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}
