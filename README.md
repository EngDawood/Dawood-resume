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

## Personal site: a live MCP console

The hero is a working console that calls Dawood's public MCP servers straight from the visitor's browser:

- **Search papers:** `search_papers` on [paper-search-mcp.engdawood.com](https://github.com/EngDawood/paper-search-mcp-server), showing the exact JSON-RPC request, each source's real response time and the results.
- **Storyset illustrations:** `search`, then `extract_palette` + `recolor_svg` on [storyset-mcp.engdawood.com](https://github.com/EngDawood/MCP-STORYSET) to recolor an illustration live.

`src/scripts/mcp.ts` is a small Streamable HTTP client (works with stateless and session servers). The page is first rendered with the last real responses (`src/data/demo.json`, captured by `scripts/fetch-demo.mjs` at build time), so the console is never empty and falls back gracefully if a server is unreachable.

Below it: live numbers, projects as cards with a function-style signature line (real data or screenshots of the live sites in `public/shots/`), experience, technologies and contact. Typeset in [Thmanyah](https://font.thmanyah.com) from the CDN of [`@dawod/thmanyah-font-web`](https://www.npmjs.com/package/@dawod/thmanyah-font-web) (never re-hosted). Follows the system light/dark preference with a toggle, and respects `prefers-reduced-motion`.

An earlier art-direction (a Sana'a stained-glass "qamariya") is kept on the `design/qamariya` branch.

## Live numbers

`scripts/fetch-stats.mjs` and `scripts/fetch-demo.mjs` run before every build. The first writes `src/data/stats.json`:

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
