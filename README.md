# Australia India Water Centre website

The redesigned AIWC public website brings the Centre’s bilateral water research, education, training, people, partners and knowledge archive into one responsive, accessible experience.

## Content coverage

- 22 original WordPress pages and 140 posts are preserved as first-class routes.
- 241 WordPress originals, the single external legacy image, and five media-library documents are stored locally in `public/media`.
- Every discovered AIWC YouTube video, partner map and public document link is available through `/media-library`.
- Historical category, attachment-category, attachment-tag, author and media-permalink routes remain available for continuity.
- The generated source ledger is `app/data/site-content.json`; `scripts/prepare-legacy-content.mjs` documents how the public WordPress snapshot was normalised.

## GitHub Pages

The complete static website is committed in `docs/`. Its publish entry point is `docs/index.html`; the root `index.html` is a working fallback that points at the same package.

To publish without a custom workflow:

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select the production branch, then select **/docs**.
4. Save and wait for GitHub Pages to report the public URL.

The export uses only HTML, CSS, fonts and local media, so it does not need Node.js or an application server after publication. It uses relative paths and therefore works both at a repository URL such as `username.github.io/repository/` and at a later custom domain.

Regenerate the package after content or design changes with:

```bash
npm run pages:build
```

Do not add `docs/CNAME` until the DNS cutover to `aiwc.org.au` is approved and scheduled.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

The site uses Next.js App Router components with vinext/Vite and the existing Cloudflare Sites project configuration. It has no CMS, authentication or persistent runtime data dependency.
