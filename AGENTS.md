# AGENTS.md

Guidance for AI coding agents (any model or tool) working in this repository. Human contributors should start with [Readme.md](Readme.md).

## Project

Personal portfolio site for Saikat Roy (Full Stack Software Engineer).

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. No other runtime dependencies.
- **Output:** fully static export (`output: "export"` → `out/`). There is no server, no API routes, no server actions, no middleware, no ISR, and no runtime environment variables.
- **Hosting:** Netlify, push-to-deploy from `master` (see [netlify.toml](netlify.toml): `next build`, publish `out/`, Node 24).
- **Live URL:** https://saikatroy.netlify.app

## Commands

Requires **Node.js ≥ 20.9** (Netlify uses Node 24). On an older Node, ESLint crashes and `next build` refuses to run. If `npm install` ran under an old Node, delete `node_modules` and reinstall: Tailwind v4's native binary (`@tailwindcss/oxide`) gets skipped otherwise.

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run lint     # eslint (flat config, eslint-config-next)
npm run build    # static export to out/ — this is what Netlify deploys
npx serve out    # preview the exact static build
```

Docker alternative (no host Node needed): `docker compose up dev` (port 3000) or `docker compose up preview` (lint + build + serve `out/`, port 4000). `Dockerfile`/`docker-compose.yml` are for local use only. Netlify does not use them.

There is no test suite. **`npm run lint` and `npm run build` must both pass** before a change is considered done. A successful build is the main check that nothing breaks static export.

## Next.js version warning

This repo uses Next.js 16, which has breaking changes from older versions (APIs, conventions, file layout). Don't rely on memory of Next 13/14/15. Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/` (after `npm install`) and follow any deprecation notices.

## Repository map

```
app/                 Routes (App Router)
  layout.tsx         Root layout: metadata defaults, no-flash theme script, JSON-LD, GA, Messenger widget
  page.tsx           "/"               home page, all sections
  portfolio-page/    "/portfolio-page" full project listing
  blog/              "/blog"           placeholder (no posts yet)
  robots.ts, sitemap.ts                static (force-static) metadata routes
components/
  sections/          One component per home-page section (Hero, About, Skills, Resume, Portfolio, Services, Testimonials, Contact)
  ui/                Small presentational primitives (Button, Card, Badge, Section, Typewriter, icons)
  theme/             Hand-rolled dark/light/system theme (script + provider + toggle)
  Header, Footer, ProjectCard, JsonLd, MessengerChat
data/                ALL site content as typed TS objects (see below)
lib/                 fonts.ts (next/font), nav.ts (nav links), useSpotlight.ts (hover effect hook)
public/              Static assets: images/, cv/, og/, llms.txt, Google verification file
```

Import alias: `@/*` maps to the repo root (e.g. `@/data/profile`).

## Editing content

All content lives in `data/*.ts`. These files are typed (`data/types.ts`) and contain no presentation code. **Change content here, not in JSX.**

| File | Controls |
| --- | --- |
| `data/profile.ts` | Name, roles, bio, contact info, `yearsExperience`, `freelanceAvailable` |
| `data/experience.ts` | Work history, education, certifications |
| `data/skills.ts` | Skill groups (also feeds JSON-LD `knowsAbout`) |
| `data/projects.ts` | GitHub repos and client work. `featured: true` puts an entry on the home page |
| `data/services.ts` | Services offered |
| `data/testimonials.ts` | Review screenshots |
| `data/site.ts` | Site URL, title, description, GA ID, social links |

Notes:

- `data/projects.ts` is a **hand-curated snapshot**, not a live GitHub feed. Star counts are static. Don't add GitHub API calls: there's no server, and client-side fetching would add a dependency on rate limits.
- Hero stats are derived from data: "Projects shipped" is `projects.length` and "GitHub stars" is the sum of `stars`. Editing `projects.ts` changes those numbers.
- `profile.yearsExperience` is a hard-coded string. It isn't computed from `softwareSinceYear`.
- **`public/llms.txt` duplicates profile, skills and experience content by hand.** When you change those `data/` files, update `llms.txt` to match.
- New images go under `public/images/...`. `next/image` runs with `unoptimized: true` (static export has no resizing), so resize and compress images *before* adding them. Keep them roughly under 200 KB.

## Hard constraints (don't break these)

1. **Static export only.** Never introduce anything that needs a server at runtime: route handlers, server actions, `cookies()`/`headers()`, dynamic routes without `generateStaticParams`, middleware, or image optimization. Metadata routes must keep `export const dynamic = "force-static"`.
2. **URLs are frozen for SEO.** Keep the routes `/`, `/portfolio-page` and `/blog`, and the home anchors `#about #skills #resume #portfolio #services #testimonials #contact`, exactly as they are. Keep `trailingSlash: false` in `next.config.ts`.
3. **Netlify Forms.** The contact `<form name="contact" data-netlify="true">` in `components/sections/Contact.tsx` must render **unconditionally in the static HTML** (never behind a client-only mount, `useEffect` gate or dynamic import). Netlify detects forms by crawling the built HTML. Keep the hidden `form-name` input and the `bot-field` honeypot, and keep field `name`s stable.
4. **Content visible without JS.** Never hide real content by default and reveal it with JavaScript (e.g. IntersectionObserver fade-ins). A previous scroll-reveal was removed because content stayed invisible when hydration was slow or failed.
5. **`public/googlee86a7ed265752fd7.html`** is a Google Search Console verification file. Don't modify, move or reformat it.
6. **Theme logic exists in two places that must stay in sync:** `components/theme/theme-script.ts` (an inline blocking script that sets `html.dark` before first paint) and `components/theme/ThemeProvider.tsx` (React state for the toggle). Both use the `localStorage` key `theme` with values `light | dark`, and absence means `system`. If you change one, change the other.
7. **Per-page metadata.** Every page exports its own `metadata` with a distinct title, description, `alternates.canonical` and OpenGraph. Don't let new pages fall back to the root defaults. When you add a route, add it to `app/sitemap.ts` too.

## Conventions

- **Stay dependency-light.** Don't add UI kits, animation libraries, state managers, `next-themes`, icon packs, etc., for anything a small hand-rolled component or hook can do. A new runtime dependency needs a strong justification.
- **Animation:** CSS transitions, hover states and native `scroll-behavior: smooth` only.
- **Styling:** Tailwind utility classes plus the CSS custom-property tokens in `app/globals.css` (e.g. `var(--color-accent)`, `var(--color-text-muted)`, `var(--color-border)`). Use these tokens instead of hard-coded colors so light and dark themes both work. Dark mode is class-based (`html.dark`).
- **Fonts:** `lib/fonts.ts` via `next/font/google`. Load only the weights actually used, and don't switch to the Google Fonts CDN.
- **Server components by default.** Add `"use client"` only to components that need state, effects or event handlers (currently the theme files, Contact, Typewriter, MessengerChat, Header, and the spotlight-hover components).
- **Structured data:** JSON-LD comes from `components/JsonLd.tsx`, which is built from `data/`. Pages below the root add a `BreadcrumbJsonLd`.
- **Intentional third-party scripts:** Google Analytics (`G-1HEC9Z70SZ`, in `app/layout.tsx`) and the Facebook Messenger widget (`components/MessengerChat.tsx`) were carried over from the old site on purpose. Load both with `strategy="lazyOnload"`. Don't remove them without being asked.
- Match the existing code style: functional components, named exports, TypeScript types from `data/types.ts`, and short comments that explain *why*, not *what*.

## Verifying a change

1. `npm run lint`: no errors.
2. `npm run build`: succeeds, and `out/` contains `index.html`, `portfolio-page.html`, `blog.html`, `sitemap.xml` and `robots.txt`.
3. For anything touching the contact form, check that `out/index.html` still contains `<form name="contact"` with `data-netlify="true"`.
4. For UI changes, run `npx serve out` and check both light and dark themes plus a narrow (mobile) viewport.

## Agent instruction files

`AGENTS.md` (this file) is the tool-agnostic source of truth. `CLAUDE.md` holds the same project guidance for Claude Code, plus a `<!-- BEGIN:nextjs-agent-rules -->` block that `next dev` rewrites automatically. Don't hand-edit inside those markers. If you change project rules here, update `CLAUDE.md` to match.

## Git and deploy

- `master` is production. Every push deploys to the live site, so work on a branch and open a PR unless told otherwise.
- Don't commit `out/`, `.next/`, `node_modules/` or `.env*` (already in `.gitignore`).
