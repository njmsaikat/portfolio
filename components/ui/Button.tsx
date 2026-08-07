import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]";

const variants = {
  primary: "text-white shadow-[0_0_0_0_var(--color-accent-soft)] hover:shadow-[0_0_24px_4px_var(--color-accent-soft)]",
  secondary:
    "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
};

const primaryStyle = { backgroundImage: "var(--gradient-accent)" };

type Variant = keyof typeof variants;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "primary" ? primaryStyle : undefined}
      {...props}
    />
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "primary" ? primaryStyle : undefined}
      {...props}
    />
  );
}
