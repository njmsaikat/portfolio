// Decorative drifting colour fields that give glass surfaces something to blur.
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`aurora ${className}`}>
      <span />
      <span />
      <span />
    </div>
  );
}
