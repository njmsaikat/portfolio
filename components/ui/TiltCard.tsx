"use client";

import { ReactNode } from "react";
import { useTilt } from "@/lib/useTilt";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
