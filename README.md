# Dawood Saleh · Resume

Two sites in one Astro build, both in Arabic and English:

| URL | What | Language |
|---|---|---|
| `/` | Professional resume (ATS-friendly, printable) | Arabic |
| `/ar/` | Professional resume | Arabic |
| `/en/` | Professional resume | English |
| `/personal/` | Interactive personal site | Arabic |
| `/personal/ar/` | Interactive personal site | Arabic |
| `/personal/en/` | Interactive personal site | English |

For a job application that asks for an English CV, send `https://resume.engdawood.com/en/`. To get a PDF, open the page and press **Print / PDF** (the print stylesheet produces clean A4 pages).

## Professional resume

Single column, real text, semantic headings, links printed as readable URLs, set in Arial. No animation, no mode switch: the language comes from the URL only.

## Personal site: "Qamariya"

Built around the qamariya, the stained-glass arched window of Sana'a houses. Every image is drawn in code and typeset in [Thmanyah](https://font.thmanyah.com) (loaded from the CDN of [`@dawod/thmanyah-font-web`](https://www.npmjs.com/package/@dawod/thmanyah-font-web), never re-hosted).

- **Light model:** a lamp (a radial gradient moved by CSS variables) sits behind the glass. Coloured panes use `mix-blend-mode: multiply`, so they filter the light the way real stained glass does. The plaster lattice is whatever the pane mask leaves uncovered.
- **Hero:** the outer ring of the window has one pane per project. Hover shows the name, click opens it.
- **Twelve windows:** one poster per project (`src/components/personal/Poster.astro`). Hovering lights the window from the cursor.
- **Day / night:** night is the window seen from the street (dark lattice, lamp-lit glass); day is seen from inside (white gypsum, sunlit glass).
- Respects `prefers-reduced-motion`. No JS framework; the interaction script is `src/scripts/personal.ts`.

## Live numbers

`scripts/fetch-stats.mjs` runs before every build and writes `src/data/stats.json`:

- Telegram subscribers of `@hr_yemen` (read from `t.me/hr_yemen`)
- Monthly npm downloads of `@dawod/thmanyah-font-web`

The deploy workflow also runs **daily**, so the numbers refresh without a commit. If a source is down, the last known value is kept. The npm number is refreshed again in the browser on the personal site.

> GitHub disables scheduled workflows after 60 days with no repository activity. If the numbers stop updating, re-enable the workflow under Actions.

## Content

All resume content lives in `src/data/resume.ts` (both languages). Personal-site copy is in `src/data/personal.ts`.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # fetches stats, then builds to dist/
```

## Deploy and domain

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`, daily, and on demand.

One-time setup:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. To serve it at `resume.engdawood.com`: remove the custom domain from the old repository (`astro-theme-resume`) first, then add it here under **Settings → Pages → Custom domain**. The DNS record (`CNAME resume → engdawood.github.io`) already exists, so nothing changes at the DNS provider. Re-run the workflow afterwards; it detects the domain and builds with the right base path automatically.
