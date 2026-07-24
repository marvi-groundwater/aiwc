# Australia India Water Centre website

The redesigned AIWC public website brings the Centre’s bilateral water research, education, training, people, partners and knowledge archive into one responsive, accessible experience.

## Revise the website with a chat

You do not need to program to request a website change.

1. Open this repository in Codex or GitHub Copilot.
2. Describe the result you want in ordinary language. Include the page name,
   approved wording and any image or document.
3. Ask the assistant to implement the change and run the complete website
   check.
4. Review the preview or pull request, then merge it into `main`.

The repository includes an assistant guide for the project purpose, AIWC’s
editorial and visual direction, where content is stored, and the checks that
must pass. A structured **Request a website change** form is also available
under the repository’s **Issues** tab for colleagues who prefer to submit a
brief.

Example requests:

- “On the Contact page, update the enquiry text with this approved wording.”
- “Add this event to the homepage using the attached photograph.”
- “Make the Our People introduction shorter without changing any names or
  roles.”
- “Explain the purpose of this project and show me where the homepage content
  is maintained.”

## Content coverage

- 22 original WordPress pages and 140 posts are preserved as first-class routes.
- 241 WordPress originals, the single external legacy image, and five media-library documents are stored locally in `public/media`.
- Every discovered AIWC YouTube video, partner map and public document link is available through `/media-library`.
- Historical category, attachment-category, attachment-tag, author and media-permalink routes remain available for continuity.
- The generated source ledger is `app/data/site-content.json`; `scripts/prepare-legacy-content.mjs` documents how the public WordPress snapshot was normalised.

## Automatic GitHub Pages publishing

Every change merged into `main` is built, checked and published by
`.github/workflows/deploy-pages.yml`. In the repository’s **Settings → Pages**,
set **Source** to **GitHub Actions** once. After that, editors only need to
merge an approved change; publishing is automatic.

The complete static website is also committed in `docs/`. Its publish entry
point is `docs/index.html`; the root `index.html` is a working local fallback.
The export uses only HTML, CSS, fonts and local media, so the published site
does not need an application server. Relative paths allow it to work both at a
repository URL such as `aiwc2020.github.io/aiwc-website/` and at a later custom
domain.

The chat assistant runs the same full build and link/media verification with:

```bash
npm run pages:check
```

Do not add `docs/CNAME` until the DNS cutover to `aiwc.org.au` is approved and scheduled.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm test
```

The site uses Next.js App Router components with vinext/Vite. It has no CMS,
authentication or persistent runtime data dependency; GitHub and the
repository-aware chat assistant provide the editing and approval workflow.
