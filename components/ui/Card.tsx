"use client";

import { ReactNode } from "react";
import { useSpotlight } from "@/lib/useSpotlight";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, onMouseMove } = useSpotlight<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="surface-panel group relative overflow-hidden rounded-lg transition-colors duration-200 hover:border-[var(--color-accent)]"
    >
      <div
        aria-hidden
        className="spotlight-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className={`relative p-6 ${className}`}>{children}</div>
    </div>
  );
}
