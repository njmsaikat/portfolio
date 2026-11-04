# AGENTS.md

Guidance for AI coding agents (any model or tool) working in this repository. Human contributors should start with [Readme.md](Readme.md).

## Project

Personal portfolio site for Saikat Roy (Software Engineer at YOUR Campus). Positioning: "I build the backends behind real-world commerce" (smart vending, campus laundry/e-commerce, Shopify/WordPress stores).

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4. Blog posts are MDX via `@next/mdx` with `remark-gfm`, `rehype-slug` and `@shikijs/rehype`, all compiled at build time (no client JS for markdown or highlighting). No other runtime dependencies.
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
  layout.tsx         Root layout: metadata defaults, no-flash theme script, JSON-LD, GA, <ViewTransition>
  page.tsx           "/"               home page, all sections
  portfolio-page/    "/portfolio-page" full project listing
  resume/            "/resume"         HTML résumé, print-styled (browser "Save as PDF" is the PDF)
  services/          "/services"       service hub; services/[slug]/ renders each `page` in data/services.ts
  work/[slug]/       "/work/<slug>"    case studies from data/caseStudies.ts (/work itself 301s to /portfolio-page)
  blog/              "/blog"           post index; blog/[slug]/ renders content/blog/<slug>.mdx
  rss.xml/route.ts   "/rss.xml"        RSS feed (static GET route handler)
  opengraph-image.tsx                  build-time social images (also per page/post, via lib/og.tsx)
  robots.ts, sitemap.ts                static (force-static) metadata routes
components/
  sections/          One component per home-page section (Hero, Expertise, About, Skills, Resume, Portfolio, Services, Testimonials, LatestPosts, Contact)
  ui/                Small presentational primitives (Button, Card, Badge, Section, icons)
  theme/             Hand-rolled dark/light/system theme (script + provider + toggle)
  Header, Footer, ProjectCard, JsonLd, PrintButton
content/blog/        Blog posts as MDX, each exporting `metadata` (see lib/posts.ts PostMeta)
data/                ALL site content as typed TS objects (see below)
lib/                 fonts.ts, nav.ts, posts.ts (build-time post loader), og.tsx (OG image renderer), useSpotlight.ts
mdx-components.tsx   Required by @next/mdx in the App Router
github-pages/        Redirect stubs deployed to njmsaikat.github.io/portfolio (see below)
public/              Static assets: images/, cv/, og/, llms.txt, Google verification file
```

Import alias: `@/*` maps to the repo root (e.g. `@/data/profile`).

## Editing content

All content lives in `data/*.ts`. These files are typed (`data/types.ts`) and contain no presentation code. **Change content here, not in JSX.**

| File | Controls |
| --- | --- |
| `data/profile.ts` | Name, job title, headline/intro (hero), bio, contact info, photos, `yearsExperience`, `freelanceAvailable` |
| `data/caseStudies.ts` | Case studies at `/work/<slug>` (YOUR Campus, SnacKeeper, freelance) |
| `data/focus.ts` | "What I build" bento tiles on the home page (`size: "large"` = 2×2, `"wide"` = full row) |
| `data/experience.ts` | Work history, education, certifications |
| `data/skills.ts` | Skill groups (also feeds JSON-LD `knowsAbout`) |
| `data/projects.ts` | GitHub repos and client work. `featured: true` puts an entry on the home page |
| `data/services.ts` | Service cards; a service with a `page` also gets `/services/<slug>` (deliverables, stack, related projects/posts, FAQs) |
| `data/testimonials.ts` | Review screenshots |
| `data/site.ts` | Site URL, title, description, GA ID, social links |

Notes:

- `data/projects.ts` is a **hand-curated snapshot**, not a live GitHub feed. Star counts are static. Don't add GitHub API calls: there's no server, and client-side fetching would add a dependency on rate limits.
- **Service pages** are written for hiring searches ("Shopify developer for hire"). `metaTitle` is used as-is (no suffix) and `metaDescription` should stay ≤ 160 chars. `relatedProjects` must match `name`s in `projects.ts`, and `relatedPosts` lists blog slugs (those posts automatically link back to the service).
- Hero stats: "Client sites delivered" is the count of `type: "client"` entries in `projects.ts`; years comes from `profile.yearsExperience`.
- **Confidentiality (Saikat's explicit rules):** case studies stay at the level of products, public numbers, role, *high-level* architecture and tech stack. Never describe internal design, data flows, infrastructure, security or partner details. Payments are "payment gateway integration", never a "wallet". **Never name freelance clients** anywhere (text, card titles, image file names, links): client work uses generic titles like "Skincare store". Keep big platform numbers out of the hero; they belong in the case studies.
- **Content must stay factual.** Every claim on the site is grounded in `data/` (sourced from the résumé/LinkedIn export). Don't invent metrics, clients, technologies per job, or response-time promises.
- **Blog posts:** add `content/blog/<slug>.mdx` exporting `metadata` (`title`, optional `seoTitle` of about 60 chars for `<title>`, `description`, `date` as `yyyy-mm-dd`, optional `updated`, `tags`). The index, post page, OG image, RSS feed, sitemap and home "Latest from the blog" pick it up automatically. The slug is the URL, so don't rename published files.
- Profile photos: `public/images/saikat-roy.jpg` (4:5, 960×1200) keeps the **same filename as the old photo** because that URL is indexed; `saikat-roy-square.jpg` (600×600) is for avatars, OG images and JSON-LD. Strip EXIF/GPS metadata from any new photo.
- `profile.yearsExperience` is a hard-coded string. It isn't computed from `softwareSinceYear`.
- **`public/llms.txt` duplicates profile, skills and experience content by hand.** When you change those `data/` files, update `llms.txt` to match.
- New images go under `public/images/...` as **WebP** (resize first; aim for under ~60 KB). `next/image` runs with `unoptimized: true` (static export has no resizing). Exceptions: `saikat-roy.jpg` / `saikat-roy-square.jpg` stay JPG (indexed URL; `lib/og.tsx` can't read WebP).
- Netlify runs `npm run build`, whose `postbuild` step (`scripts/optimize-og.mjs`) palette-compresses the generated OG images in `out/` (~300 KB → ~70 KB each). Keep the build command as `npm run build`.

## Hard constraints (don't break these)

1. **Static export only.** Never introduce anything that needs a server at runtime: request-dependent route handlers, server actions, `cookies()`/`headers()`, dynamic routes without `generateStaticParams` (+ `dynamicParams = false`), middleware, or image optimization. Metadata routes, `opengraph-image` files and GET route handlers must keep `export const dynamic = "force-static"`.
2. **URLs are frozen for SEO.** Keep the routes `/`, `/portfolio-page`, `/blog`, `/blog/<slug>`, `/resume`, `/services`, `/services/<slug>` and `/work/<slug>`, and the home anchors `#about #skills #resume #portfolio #services #testimonials #contact` (plus the newer `#expertise #writing`), exactly as they are. Keep `trailingSlash: false` in `next.config.ts`. `next.config` redirects don't work in a static export; old or renamed URLs get a 301 in `public/_redirects` (Netlify). It already maps the removed `/cv/saikat-roy-cv.pdf` and the old site's `/portfolio-details(.html)`.
3. **Netlify Forms.** The contact `<form name="contact" data-netlify="true">` in `components/sections/Contact.tsx` must render **unconditionally in the static HTML** (never behind a client-only mount, `useEffect` gate or dynamic import). Netlify detects forms by crawling the built HTML. Keep the hidden `form-name` input and the `bot-field` honeypot, and keep field `name`s stable.
4. **Content visible without JS.** Never hide real content by default and reveal it with JavaScript (e.g. IntersectionObserver fade-ins). A previous scroll-reveal was removed because content stayed invisible when hydration was slow or failed.
5. **Nothing React-rendered inside `<head>`.** `ThemeScript` and `SiteJsonLd` live at the start of `<body>` because Netlify's edge injects a newline + comment into `<head>` on every page, which shifts position-matched head scripts and breaks hydration (React #418). Use `metadata` exports for head tags. Search Console is also verified via `metadata.verification.google` — keep it.
6. **`public/googlee86a7ed265752fd7.html`** is a Google Search Console verification file. Don't modify, move or reformat it.
7. **Theme logic exists in two places that must stay in sync:** `components/theme/theme-script.ts` (an inline blocking script that sets `html.dark` before first paint; rendered via `components/theme/ThemeScript.tsx`, identically on server and client — never server-only, which breaks `<head>` hydration) and `components/theme/ThemeProvider.tsx` (React state for the toggle). Both use the `localStorage` key `theme` with values `light | dark`, and absence means `system`. If you change one, change the other.
8. **Per-page metadata.** Every page exports its own `metadata` with a distinct title, description, `alternates.canonical` and OpenGraph. Don't let new pages fall back to the root defaults. When you add a route, add it to `app/sitemap.ts` too. A page that sets its own `openGraph` **loses the root OG image**, so give it an `opengraph-image.tsx` (see `app/resume/opengraph-image.tsx`).
9. **OG images are extensionless files** in the export (`/opengraph-image`, `/blog/<slug>/opengraph-image`). `netlify.toml` sets `Content-Type: image/png` for them; keep those header rules.

## Conventions

- **Stay dependency-light.** Don't add UI kits, animation libraries, state managers, `next-themes`, icon packs, etc., for anything a small hand-rolled component or hook can do. A new runtime dependency needs a strong justification.
- **Animation:** CSS transitions, hover states, native `scroll-behavior: smooth`, and React's built-in `<ViewTransition>` (route cross-fade in `app/layout.tsx`). All must respect `prefers-reduced-motion`.
- **Styling:** Tailwind utility classes plus the CSS custom-property tokens in `app/globals.css` (e.g. `var(--color-accent)`, `var(--color-accent-contrast)` for text on accent, `var(--color-text-muted)`, `var(--color-border)`). Use these tokens instead of hard-coded colors so light and dark themes both work. Dark mode is class-based (`html.dark`). Text-bearing elements use the solid accent; `--gradient-accent` is decorative only (contrast).
- **Custom CSS goes in `@layer base` or `@layer components`** in `globals.css`. Unlayered CSS beats every Tailwind utility regardless of specificity and silently disables utilities like `hover:border-*` or `print:*`.
- **Fonts:** `lib/fonts.ts` via `next/font/google`. Load only the weights actually used, and don't switch to the Google Fonts CDN.
- **Server components by default.** Add `"use client"` only to components that need state, effects or event handlers (currently the theme files, Contact, Header, PrintButton, and the spotlight-hover components Card/ProjectCard).
- **Structured data:** JSON-LD comes from `components/JsonLd.tsx`, which is built from `data/` (Person, WebSite, ProfilePage, BlogPosting). Pages below the root add a `BreadcrumbJsonLd`.
- **Third-party scripts:** only Google Analytics (`G-1HEC9Z70SZ`, in `app/layout.tsx`, `strategy="lazyOnload"`), carried over from the old site on purpose. The Facebook Messenger widget was removed because Meta shut down the Chat Plugin on 2024-05-09. Don't re-add it.
- Match the existing code style: functional components, named exports, TypeScript types from `data/types.ts`, and short comments that explain *why*, not *what*.

## Verifying a change

1. `npm run lint`: no errors.
2. `npm run build`: succeeds, and `out/` contains `index.html`, `portfolio-page.html`, `blog.html`, `resume.html`, one `blog/<slug>.html` per post, `rss.xml`, `sitemap.xml`, `robots.txt` and the `opengraph-image` files.
3. For anything touching the contact form, check that `out/index.html` still contains `<form name="contact"` with `data-netlify="true"`.
4. For UI changes, run `npx serve out` and check both light and dark themes plus a narrow (mobile) viewport. For `/resume`, also check print preview.
5. Every page's HTML should have its own `og:image`, canonical and `<title>`: `grep -o '<meta property="og:image"[^>]*' out/*.html`.

## GitHub Pages

`njmsaikat.github.io/portfolio` is **not** a second copy of the site. `.github/workflows/github-pages-redirect.yml` deploys only `github-pages/`: meta-refresh + canonical stubs (plus a JS `404.html` catch-all) that send each old URL to the same page on Netlify, so search engines consolidate on one domain. The repo's Pages source must be set to "GitHub Actions"; with "Deploy from branch", GitHub renders the README with Jekyll instead.

## Agent instruction files

`AGENTS.md` (this file) is the tool-agnostic source of truth. `CLAUDE.md` holds the same project guidance for Claude Code, plus a `<!-- BEGIN:nextjs-agent-rules -->` block that `next dev` rewrites automatically. Don't hand-edit inside those markers. If you change project rules here, update `CLAUDE.md` to match.

## Git and deploy

- `master` is production. Every push deploys to the live site, so work on a branch and open a PR unless told otherwise.
- Don't commit `out/`, `.next/`, `node_modules/` or `.env*` (already in `.gitignore`).
