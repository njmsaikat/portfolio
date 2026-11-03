"use client";

import { useRef, PointerEvent } from "react";

// Subtle 3D tilt toward the pointer. Mouse/pen only (no touch jitter), and a
// no-op when the visitor prefers reduced motion. Max angle in degrees.
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T | null>(null);

  const onPointerMove = (e: PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return { ref, onPointerMove, onPointerLeave };
}
