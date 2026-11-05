# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Saikat Roy (Software Engineer at YOUR Campus; positioning: "I build the backends behind real-world commerce"), built with Next.js (App Router, TypeScript, Tailwind CSS v4), statically exported (`output: "export"`) and deployed on Netlify from the `master` branch (push-to-deploy, unchanged from before this stack migration — see the Netlify badge in [Readme.md](Readme.md)). There is no server-side functionality anywhere in this app; everything must remain compatible with a pure static export.

## Commands

```bash
npm install
npm run dev      # dev server at localhost:3000
npm run build    # static export to out/ (what Netlify deploys)
npm run lint     # eslint
npm run check-links  # after a build: every internal link and #anchor in out/ resolves
```

There is no test suite. CI (`.github/workflows/ci.yml`) runs lint, build and check-links on every branch push and PR — master deploys immediately, so a red check means don't merge. `npx serve out` previews the exact static build Netlify will serve.

## Architecture

- **Content is centralized in `data/*.ts`** (typed, presentation-free) — `profile.ts`, `focus.ts`, `experience.ts`, `skills.ts`, `projects.ts`, `services.ts`, `testimonials.ts`, `site.ts`. Components import from here; there is no CMS. Update content by editing these files, not JSX. `data/projects.ts` is a manually curated snapshot of real GitHub repos and client work (not a live GitHub API feed) — update it by hand when featuring new work. All claims must stay grounded in these files (no invented metrics or promises).
- **Blog posts are MDX** in `content/blog/<slug>.mdx`, each exporting `metadata` (shape: `PostMeta` in `lib/posts.ts`), compiled at build time by `@next/mdx` (plugins as strings in `next.config.ts`, required by Turbopack). Adding a file automatically feeds `/blog`, `/blog/<slug>`, its OG image, `/rss.xml`, the sitemap and the home "Latest from the blog" section.
- **Routes** (`app/`): `/` (home, all sections), `/portfolio-page` (full project listing), `/blog` + `/blog/[slug]`, `/resume` (print-styled HTML résumé — the browser's "Save as PDF" is the downloadable CV), `/services` + `/services/[slug]` (one page per service in `data/services.ts` that has a `page`), `/work/[slug]` (case studies from `data/caseStudies.ts`), `/rss.xml`. `/`, `/portfolio-page` and `/blog` are unchanged from the pre-migration static site to preserve indexed URLs; don't rename any route without a strong SEO reason — and if one must change, add a 301 in `public/_redirects` (Netlify; `next.config` redirects don't run in a static export).
- **Section anchors on the home page are also preserved** from the old site: `#about #skills #resume #portfolio #services #testimonials #contact` (newer: `#expertise #writing`). Each corresponds to a component in `components/sections/`.
- **OG images** are generated at build time (`app/**/opengraph-image.tsx` via `lib/og.tsx`, all `force-static`). A page that sets its own `openGraph` metadata loses the root image, so it needs its own `opengraph-image.tsx`. The export writes them without a file extension; `netlify.toml` serves them as `image/png`.
- **`public/images/saikat-roy.jpg` keeps the old photo's filename on purpose** (the URL is indexed). Strip EXIF/GPS from any new photo before adding it.
- **GitHub Pages** (`njmsaikat.github.io/portfolio`) only serves `github-pages/` redirect stubs to the Netlify site, deployed by `.github/workflows/github-pages-redirect.yml` (Pages source must be "GitHub Actions").
- **Theme system is hand-rolled**, not a library (`next-themes` was deliberately not added — kept out to minimize dependencies for a toggle this simple). `components/theme/theme-script.ts` is an inline blocking script, rendered by `components/theme/ThemeScript.tsx` in `app/layout.tsx` — identically on server and client so hydration reuses the server's node (a server-only render shifts the `<head>` children and causes a hydration mismatch) — that sets `class="dark"` on `<html>` before first paint (no flash of wrong theme); `components/theme/ThemeProvider.tsx` mirrors that logic in React state for the toggle UI. Both must stay in sync if the persistence logic changes.
- **No animation library.** Only CSS transitions/hover states, native `scroll-behavior: smooth`, and React's built-in `<ViewTransition>` route cross-fade (all respecting `prefers-reduced-motion`). A prior scroll-reveal (IntersectionObserver-based fade-in) was removed after it was found to leave content permanently invisible whenever JavaScript failed to hydrate in time — don't reintroduce a pattern that hides real content by default pre-JS.
- **Contact form** (`components/sections/Contact.tsx`) relies on Netlify Forms' static-HTML detection: the `<form name="contact" data-netlify="true">` must always render unconditionally in the exported HTML (never behind a client-only mount gate), or Netlify's post-build crawler won't register it. Project types live in `data/contact.ts`; a link to `/?project=<key>#contact` (via `contactHref()`, used by every service page) preselects one after hydration, while the exported HTML keeps the first option checked.
- **Fonts** load via `next/font/google` (`lib/fonts.ts`) with only the weights actually used, self-hosted at build time — don't add the full Google Fonts weight range back.
- **Images** use `next/image` with `unoptimized: true` (required under static export — there's no on-demand resizing), so source images under `public/images/` should already be resized and saved as WebP before adding them (the two portrait JPGs are the exception). Netlify runs `npm run build`; its `postbuild` (`scripts/optimize-og.mjs`) shrinks the generated OG PNGs.
- `next.config.ts` sets `trailingSlash: false` — keep it that way, changing it would alter every route's URL (e.g. `/portfolio-page` → `/portfolio-page/`).

## Conventions

- Don't add a UI/animation/state-management dependency for something a ~20-line hand-rolled hook or component can do (see the theme system and the removed scroll-reveal above) — this project deliberately stays dependency-light.
- Keep per-page `metadata` exports distinct (title/description/OG) rather than falling back to the root layout's defaults for every page — this was a specific fix over the old static site, which served identical metadata on every page.
- Google Analytics (`G-1HEC9Z70SZ`, wired in `app/layout.tsx`) is intentionally carried over from the old site. The Facebook Messenger widget was removed: Meta shut down the Chat Plugin on 2024-05-09, so don't re-add it. Custom events go through `trackEvent()` in `lib/analytics.ts` (it queues via the `dataLayer`, since gtag loads lazily): `generate_lead` on a successful contact submit (with `project_type`, no personal data) and `resume_download` on the résumé's PDF button.
- Custom CSS in `app/globals.css` belongs in `@layer base`/`@layer components` — unlayered rules override every Tailwind utility (this previously broke card hover borders and print styles).
- Confidentiality rules from Saikat: case studies stay high-level (products, public numbers, role, high-level architecture, stack — no internal design/infra/security/partner detail); payments are "payment gateway integration", never a "wallet"; **never name freelance clients** anywhere (text, card titles, image filenames, links); no big platform numbers in the hero.
- `AGENTS.md` is the tool-agnostic version of this guidance; keep the two in sync.
- **Keep `<head>` free of React-rendered children** (`app/layout.tsx` renders `ThemeScript` and `SiteJsonLd` at the start of `<body>`). Netlify's edge injects a newline + promotional HTML comment into `<head>` on every page (no documented opt-out); React hydrates head `<script>`s by position, so anything there fails hydration (React #418) and resets the theme. Metadata (`metadata` exports) is safe because React matches meta/link tags by key.
- Google Search Console is verified two ways: `metadata.verification.google` in `app/layout.tsx` and the file below — keep both.
- `public/googlee86a7ed265752fd7.html` is a Google Search Console verification file — must stay byte-for-byte unmodified.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
