# Portfolio

A static portfolio built with Astro. The hero is a typo-tolerant search over the page's own entries. Every row is rendered at build time, so the page works without JavaScript, and one small module filters the rows when scripts are on.

## Commands

- `npm run dev` starts the dev server.
- `npm run build` writes the static site to `dist/`.
- `npm test` runs the search and mosaic unit tests with `node --test`.
- `npx astro check` type-checks the project.

## Content

`src/data/portfolio.ts` is the single registry. The hero rows and the search index derive from `entries`, and the other sections reference entries by id.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which tests, builds and publishes to GitHub Pages. Enable Pages with the GitHub Actions source in the repository settings first.

The site URL and base path default to `https://flame338.github.io` and `/portfolio`. Override them with the `SITE_URL` and `BASE_PATH` environment variables, for example when moving to a custom domain.
