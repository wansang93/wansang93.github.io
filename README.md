# wansang93.github.io

Personal site, blog, and project archive.

- **Current** — Next.js 15 + TypeScript + Tailwind + MDX, deployed to GitHub Pages.
- **2021 archive** — original Bootstrap portfolio, preserved at [`/project/webpage/2021/`](https://wansang93.github.io/project/webpage/2021/). Sources live in [public/project/webpage/2021/](public/project/webpage/2021/).

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
```

Static output goes to `out/`. The legacy site under `public/project/webpage/2021/` is copied to `out/project/webpage/2021/` automatically by Next.js.

## Deploy

Push to `master`. GitHub Actions builds and deploys to Pages (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

> Repo Settings → Pages → **Source: GitHub Actions** must be enabled once.

## Structure

```text
.
├── src/
│   ├── app/              # routes (App Router)
│   └── components/       # shared UI
├── content/              # MDX posts (to be added)
├── public/
│   ├── .nojekyll
│   └── project/
│       └── webpage/
│           └── 2021/     # legacy 2021 site (read-only archive)
├── next.config.mjs
└── .github/workflows/    # CI / deploy
```

## History

- **2021-01** — first version (Bootstrap portfolio)
- **2026-06** — rebuilt with Next.js; 2021 site archived under [`/project/webpage/2021/`](public/project/webpage/2021/)
