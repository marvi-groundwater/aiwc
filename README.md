# AIWC — Australia India Water Centre

The Centre's website: 15 pages, 108 researcher profiles and 33 partner
institutions, built as static HTML and published to GitHub Pages.

Content from [aiwc.org.au](https://aiwc.org.au) — same words, different
argument. The old site was a menu; this one reads as a case: shared problem →
shared premise → evidence of scale → the four programmes → the people → the
moment → the invitation.

## How the site is built

Every page is one file in `content/pages/` — `{ menuName, slug, order,
published, template, parent, intro, heroImage, blocks[] }`. Researchers and
partners are one file each in `content/people/` and `content/partners/`. The
build renders all of it into `_site/`, one real URL per document:

```bash
npm run build     # content/ -> _site/ (156 documents)
npm run verify    # structure, links, images, CMS coverage
npm test          # drives the researcher directory against the built HTML
npm run check     # all three
npm run serve     # build + serve on :8913
```

**`index.html` is the chrome template only** — head, CSS, rail, footer. It
contains no page content. The build strips external scripts and renders every
panel from data through `src/templates.mjs`, so there is exactly one rendering
path and the CMS preview cannot drift from the real page.

### Base path — the thing to get right

There is no `CNAME`, so this is a GitHub *project* page served from
`https://marvi-groundwater.github.io/aiwc/`. Every absolute URL therefore
carries `/aiwc`, taken from `base` in `content/site.json`.

Adding a `CNAME` file switches the whole site to domain-root URLs
automatically — `loadSite()` in `src/registry.mjs` ignores `base` the moment a
`CNAME` exists. Nothing else needs changing.

To preview the project-page layout locally, serve the parent of `_site` with
`_site` linked as `aiwc/`, or just visit `http://127.0.0.1:8913/aiwc/` after
`npm run serve` from a directory arranged that way.

## Editing

The CMS lives at `/admin/` (Decap, GitHub backend, via the org's OAuth broker).
Three collections mirror `content/`: **Pages**, **Researchers**, **Partner
institutions**. A page is a header plus content **blocks** you add and drag to
reorder; each block type shows only its own fields.

`npm run verify` fails if a block type exists in `src/templates.mjs` but has no
CMS editor, or vice versa — an un-editable block would be silently dropped the
first time someone saved that page.

## Structure

```
index.html              chrome template (design system lives here)
src/
  registry.mjs          what exists: pages, people, partners, URLs, base path
  templates.mjs         every block renderer + the three page templates
  app.mjs               browser behaviour: drawer, directory filter, reveal
scripts/
  build.mjs             content/ -> _site/
  verify.mjs            structural checks
  test-directory.mjs    drives the built directory page in a DOM
  migrate/              one-time import from aiwc.org.au (provenance only)
content/
  site.json             name, URL, base path, languages
  pages/*.json          15 navigable pages
  people/*.json         108 researcher profiles
  partners/*.json       33 partner institutions
assets/                 portraits, logos, photography
admin/                  Decap CMS
```

## Translation

The build is multi-language capable — `languages` in `content/site.json` drives
it, and pages render at `/<lang>/…` with `hreflang` alternates. It currently
ships **English only**: shipping a language switcher that yields English
content would be worse than not offering one, so the switcher is removed from
the chrome whenever `languages` has a single entry.

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds, verifies, runs the
directory test, and publishes `_site/` to GitHub Pages.

Pages must be set to **Source: GitHub Actions** (not "deploy from a branch").

## Known gaps

- **Photography is thin.** The best source images are eight conference photos
  at 1280×720; the four programme images are 500×300. The home page hero is
  therefore typographic over an SVG rather than a stretched JPEG. Better
  photography would lift the whole site more than any code change.
- **Two researcher profiles have no biography** (`howard-fallowfield`,
  `dr-prabhat-kumar-singh`) — those fields are blank on aiwc.org.au. `npm run
  verify` prints them as a warning each run.
- **Symposium PDFs are linked, not mirrored** — they still resolve to
  aiwc.org.au and will break if that site goes away.
