import { noFlashThemeScript } from "./theme-script";

// Inline blocking script that sets the theme class before first paint (no
// flash of the wrong theme). It must render identically on the server and the
// client so hydration reuses the server's <script> node: rendering it on the
// server only shifts every later <head> child and causes a hydration mismatch.
// (React may still log "Encountered a script tag" in dev if a hot reload forces
// it to re-create the element; that copy never runs and is harmless.)
export function ThemeScript() {
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />;
}
