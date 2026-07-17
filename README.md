# Australia India Water Centre website

The redesigned AIWC public website brings the Centre’s bilateral water research, education, training, people, partners and knowledge archive into one responsive, accessible experience.

## Content coverage

- 22 original WordPress pages and 140 posts are preserved as first-class routes.
- 241 WordPress originals, the single external legacy image, and five media-library documents are stored locally in `public/media`.
- Every discovered AIWC YouTube video, partner map and public document link is available through `/media-library`.
- Historical category, attachment-category, attachment-tag, author and media-permalink routes remain available for continuity.
- The generated source ledger is `app/data/site-content.json`; `scripts/prepare-legacy-content.mjs` documents how the public WordPress snapshot was normalised.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

The site uses Next.js App Router components with vinext/Vite and the existing Cloudflare Sites project configuration. It has no CMS, authentication or persistent runtime data dependency.
