# Portfolio

A static portfolio built with Astro. The hero is a typo-tolerant search over the page's own entries. Every row is rendered at build time, so the page works without JavaScript, and one small module filters the rows when scripts are on.

## Commands

- `npm run dev` starts the dev server.
- `npm run build` writes the static site to `dist/`.
- `npm test` runs the unit tests with `node --test`.
- `npx astro check` type-checks the project.

## Content

Work entries live in `src/data/portfolio.ts`. Projects live in `projects/<slug>/portfolio.md` and are read at build time. The search rows, the Projects section and each project page all derive from those two sources, through `src/lib/entries.ts` and `src/lib/projects.ts`.

## Adding a project

A project is a folder `projects/<slug>/` with a `portfolio.md` at its root. The folder name is the slug, so the page lives at `/projects/<slug>/`.

Add the file to the project's own repo, then add that repo here as a submodule:

```sh
git submodule add https://github.com/<owner>/<repo> projects/<slug>
git commit -m "Add <title>"
git push
```

A project without a public repo can be a plain folder at the same path. Its page then omits the "shown at" row and the "built from portfolio.md" line.

`portfolio.md` starts with front matter. The build rejects unknown keys, and a missing or misspelled field stops it with an error that names the file. The body is Markdown. Start it with `##` headings, because the page already has its own `h1`. Headings at that level become the "on this page" list.

| Field      | Required | Meaning                                                                  |
| ---------- | -------- | ------------------------------------------------------------------------ |
| `title`    | yes      | The project name.                                                        |
| `line`     | yes      | One sentence with no trailing period. Shown in search and in lists.      |
| `language` | yes      | Shown as the search tag and in the facts list.                           |
| `status`   | yes      | One of `active`, `in-progress`, `working`, `paused`, `finished`.       |
| `featured` | no       | `true` gives the project a card. Defaults to `false`.                  |
| `keywords` | yes      | A list of extra search terms.                                            |
| `source`   | no       | A URL. Adds a Source button and row.                                     |
| `numbers`  | no       | Up to three `value` and `caption` pairs for the band under the header.   |
| `summary`  | yes      | Two or three sentences. Used on the card and as the meta description.    |

Quote a `value` that is a bare number, such as `"150"`, so YAML keeps it as text.

The list is sorted by last commit, newest first. A submodule reports the date of its own latest commit and shows the revision it is pinned at. A plain folder reports the last commit that touched it in this repo, so deploys check out full history.

`.github/workflows/update-projects.yml` runs daily, and on demand. It runs `git submodule update --remote`. If a submodule moved, it commits "Update project submodules", pushes, and starts the deploy workflow. With no submodules, or nothing new, it does nothing.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which tests, builds and publishes to GitHub Pages. Enable Pages with the GitHub Actions source in the repository settings first.

The site URL and base path default to `https://flame338.github.io` and `/portfolio`. Override them with the `SITE_URL` and `BASE_PATH` environment variables, for example when moving to a custom domain.
