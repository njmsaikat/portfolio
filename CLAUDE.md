# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Personal portfolio site for Saikat Roy (Full Stack Software Engineer), built with Next.js (App Router, TypeScript, Tailwind CSS v4), statically exported (`output: "export"`) and deployed on Netlify from the `master` branch (push-to-deploy, unchanged from before this stack migration — see the Netlify badge in [Readme.md](Readme.md)). There is no server-side functionality anywhere in this app; everything must remain compatible with a pure static export.

## Commands

```bash
npm install
npm run dev      # dev server at localhost:3000
npm run build    # static export to out/ (what Netlify deploys)
npm run lint     # eslint
```

There is no test suite. `npx serve out` previews the exact static build Netlify will serve.

## Architecture

- **Content is centralized in `data/*.ts`** (typed, presentation-free) — `profile.ts`, `experience.ts`, `skills.ts`, `projects.ts`, `services.ts`, `testimonials.ts`, `site.ts`. Components import from here; there is no CMS or MDX. Update content by editing these files, not JSX. `data/projects.ts` is a manually curated snapshot of real GitHub repos and client work (not a live GitHub API feed) — update it by hand when featuring new work.
- **Routes** (`app/`): `/` (home, all sections), `/portfolio-page` (full project listing), `/blog` (placeholder — no real posts yet). These paths are intentionally unchanged from the pre-migration static site to preserve existing indexed URLs; don't rename them without a strong SEO reason.
- **Section anchors on the home page are also preserved** from the old site: `#about #skills #resume #portfolio #services #testimonials #contact`. Each corresponds to a component in `components/sections/`.
- **Theme system is hand-rolled**, not a library (`next-themes` was deliberately not added — kept out to minimize dependencies for a toggle this simple). `components/theme/theme-script.ts` is an inline blocking script injected in `app/layout.tsx` that sets `class="dark"` on `<html>` before first paint (no flash of wrong theme); `components/theme/ThemeProvider.tsx` mirrors that logic in React state for the toggle UI. Both must stay in sync if the persistence logic changes.
- **No animation library.** Only CSS transitions/hover states and native `scroll-behavior: smooth`. A prior scroll-reveal (IntersectionObserver-based fade-in) was removed after it was found to leave content permanently invisible whenever JavaScript failed to hydrate in time — don't reintroduce a pattern that hides real content by default pre-JS.
- **Contact form** (`components/sections/Contact.tsx`) relies on Netlify Forms' static-HTML detection: the `<form name="contact" data-netlify="true">` must always render unconditionally in the exported HTML (never behind a client-only mount gate), or Netlify's post-build crawler won't register it.
- **Fonts** load via `next/font/google` (`lib/fonts.ts`) with only the weights actually used, self-hosted at build time — don't add the full Google Fonts weight range back.
- **Images** use `next/image` with `unoptimized: true` (required under static export — there's no on-demand resizing), so source images under `public/images/` should already be reasonably sized before adding them.
- `next.config.ts` sets `trailingSlash: false` — keep it that way, changing it would alter every route's URL (e.g. `/portfolio-page` → `/portfolio-page/`).

## Conventions

- Don't add a UI/animation/state-management dependency for something a ~20-line hand-rolled hook or component can do (see the theme system and the removed scroll-reveal above) — this project deliberately stays dependency-light.
- Keep per-page `metadata` exports distinct (title/description/OG) rather than falling back to the root layout's defaults for every page — this was a specific fix over the old static site, which served identical metadata on every page.
- The Facebook Messenger chat widget (`components/MessengerChat.tsx`) and Google Analytics (`G-1HEC9Z70SZ`, wired in `app/layout.tsx`) are intentionally carried over from the old site.
- `public/googlee86a7ed265752fd7.html` is a Google Search Console verification file — must stay byte-for-byte unmodified.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
