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

## Updating content

All real content lives under [`data/`](data) as plain TypeScript objects/arrays — edit these files and the site updates everywhere they're used (including the JSON-LD structured data). No component code needs to change for a content update.

| File | What it controls |
| --- | --- |
| `data/profile.ts` | Name, bio, contact info, location |
| `data/experience.ts` | Work experience, education, certifications |
| `data/skills.ts` | Skill groups shown in the Skills section |
| `data/projects.ts` | Featured/all projects (GitHub repos and client work) |
| `data/services.ts` | Services offered |
| `data/testimonials.ts` | Client review screenshots |
| `data/site.ts` | Site-wide metadata, social links, GA ID |

To add or swap an image, drop the file under `public/images/...` and reference its path (e.g. `/images/projects/my-project.png`) from the relevant entry in `data/projects.ts`.

## Deploying

No change to the existing workflow: push to `master` and Netlify builds and deploys automatically, using the settings in [`netlify.toml`](netlify.toml) (`next build`, publishing the `out/` directory). There's no separate deploy step to run manually.

## Stack notes

- Next.js App Router with `output: 'export'` — a fully static site, no server-side functionality.
- No UI/animation dependencies beyond Next/React/Tailwind — dark/light/system theme and scroll behavior are hand-rolled to keep the dependency footprint minimal.
- Netlify Forms powers the contact form; its `<form>` markup must stay unconditionally rendered (not behind a client-only mount) for Netlify's static-HTML form detection to pick it up on deploy.
