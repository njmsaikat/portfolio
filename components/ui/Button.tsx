import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] disabled:opacity-60";

const variants = {
  // Solid accent (not the gradient) so button text always meets contrast.
  primary:
    "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-[0_0_0_0_var(--color-accent-soft)] hover:shadow-[0_0_28px_6px_var(--color-accent-soft)] hover:brightness-110",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
};

type Variant = keyof typeof variants;

// next/link renders a plain <a> for external URLs too, so internal routes
// (e.g. /resume) get client-side navigation without a second component.
export function ButtonLink({
  variant = "primary",
  className = "",
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  return <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
