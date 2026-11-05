// GA4 events through the gtag snippet in app/layout.tsx. That script is loaded
// lazily, so this uses the same dataLayer shim instead of window.gtag: an event
// fired before gtag.js arrives is queued, not lost. If analytics is blocked,
// the push is harmless.
type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js reads Arguments objects from the dataLayer, exactly like the snippet's gtag().
  // The parameters exist only for the type signature; `arguments` is what gets pushed.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", name, params);
}
