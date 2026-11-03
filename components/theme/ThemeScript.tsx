"use client";

import { noFlashThemeScript } from "./theme-script";

// Server-render only. The browser runs this inline script from the initial
// HTML, before first paint (no flash of the wrong theme). On the client we
// render nothing: a <script> created by React never executes and makes React 19
// warn ("Encountered a script tag while rendering React component"), and
// React 19 hydration skips the leftover <script> node in <head> without a mismatch.
export function ThemeScript() {
  if (typeof window !== "undefined") return null;
  return <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />;
}
