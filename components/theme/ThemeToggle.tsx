"use client";

import { ReactElement } from "react";
import { useTheme } from "./ThemeProvider";

const order = ["system", "light", "dark"] as const;

const icons: Record<(typeof order)[number], ReactElement> = {
  system: (
    <path d="M4 5h16v11H4zM8 20h8M12 16v4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" strokeWidth="1.6" fill="none" />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  dark: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
};

const labels: Record<(typeof order)[number], string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${labels[theme]}. Click to change.`}
      title={labels[theme]}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-elevated)]"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" stroke="currentColor" fill="none">
        {icons[theme]}
      </svg>
    </button>
  );
}
