[![Netlify Status](https://api.netlify.com/api/v1/badges/6677c046-9e24-4942-97c6-0416253dfacb/deploy-status)](https://app.netlify.com/sites/saikatroy/deploys)

# Saikat Roy Portfolio

A statically-exported Next.js (App Router, TypeScript, Tailwind CSS) portfolio site, deployed on Netlify.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To produce the same static build Netlify deploys:

```bash
npm run build   # outputs to out/
npx serve out   # preview the static export locally
```

### With Docker (no local Node needed)

```bash
docker compose up dev       # dev server with hot reload → http://localhost:3000
docker compose up preview   # lint + static build, served like Netlify → http://localhost:4000
```

The first start installs dependencies into a Docker volume (a few minutes); later starts reuse it.

## Updating content

All real content lives under [`data/`](data) as plain TypeScript objects/arrays — edit these files and the site updates everywhere they're used (including the JSON-LD structured data). No component code needs to change for a content update.

| File | What it controls |
| --- | --- |
| `data/profile.ts` | Name, headline, bio, contact info, location, photos |
| `data/focus.ts` | "What I build" tiles on the home page |
| `data/experience.ts` | Work experience, education, certifications |
| `data/skills.ts` | Skill groups shown in the Skills section |
| `data/projects.ts` | Featured/all projects (GitHub repos and client work) |
| `data/services.ts` | Services offered; entries with a `page` also get their own page at `/services/<slug>` |
| `data/testimonials.ts` | Client review screenshots |
| `data/site.ts` | Site-wide metadata, social links, GA ID |

To add or swap an image, convert it to WebP first (aim for under ~60 KB; e.g. 960×600 at quality ~78), drop it under `public/images/...` and reference its path (e.g. `/images/projects/my-project.webp`) from the relevant entry in `data/projects.ts`. Images aren't resized at build time. Exception: `public/images/saikat-roy.jpg` and `saikat-roy-square.jpg` stay JPG (an indexed URL, and the OG image renderer can't read WebP).

The generated social images (`opengraph-image`) are shrunk automatically after every build by `scripts/optimize-og.mjs` (the npm `postbuild` step; Netlify runs `npm run build`).

### Writing a blog post

Create `content/blog/<slug>.mdx` (the filename becomes the URL `/blog/<slug>`) starting with:

```js
export const metadata = {
  title: "Full post title",
  seoTitle: "Shorter title for Google, ~60 characters", // optional
  description: "One or two sentences shown in search results and link previews.",
  date: "2026-11-02",
  tags: ["Django", "PostgreSQL"],
};
```

Then write Markdown below it. Code blocks are highlighted at build time. The blog index, RSS feed, sitemap, social preview image and the home page's "Latest from the blog" all update automatically.

### Résumé

`/resume` is generated from `data/`, so it's always current. Visitors get a PDF from its "Download PDF" button (the browser's print dialog → "Save as PDF").

## Deploying

No change to the existing workflow: push to `master` and Netlify builds and deploys automatically, using the settings in [`netlify.toml`](netlify.toml) (`next build`, publishing the `out/` directory). There's no separate deploy step to run manually. [CI](.github/workflows/ci.yml) runs lint, the build and an internal link check (`npm run check-links`) on every branch and PR first.

`https://njmsaikat.github.io/portfolio` redirects every old URL to this site. It's deployed by [the GitHub Pages workflow](.github/workflows/github-pages-redirect.yml) from [`github-pages/`](github-pages), and requires **Settings → Pages → Source: GitHub Actions** (one-time).

## Stack notes

- Next.js App Router with `output: 'export'` — a fully static site, no server-side functionality.
- No UI/animation dependencies beyond Next/React/Tailwind — dark/light/system theme and scroll behavior are hand-rolled to keep the dependency footprint minimal. The only additions are build-time MDX tooling for the blog (`@next/mdx`, `remark-gfm`, `rehype-slug`, `shiki`), which ship no JavaScript to visitors.
- Netlify Forms powers the contact form; its `<form>` markup must stay unconditionally rendered (not behind a client-only mount) for Netlify's static-HTML form detection to pick it up on deploy.
