# AIWC website assistant guide

## Project purpose

This repository is the public website for the Australia India Water Centre
(AIWC). The Centre connects Australian and Indian researchers, educators,
government, industry and communities to improve water security through
research, education, training and outreach.

Most requests in this repository will come from people who are describing a
website change in plain language. Turn those requests into a complete,
verified website update. Do not expect the requester to identify files,
frameworks or commands.

## Editorial and design direction

- Present AIWC as a professional bilateral scientific institution.
- Keep the visual language elegant, editorial and water-inspired: deep
  blue-green, river blue, mineral neutrals and restrained warm accents.
- Balance scientific credibility with an art-directed design-studio finish.
- Treat Australia and India as equal partners. Avoid decorative cultural
  stereotypes.
- Use specific, clear language. Do not invent projects, people, statistics,
  dates, partners or outcomes.
- Preserve the visible sidebar navigation on desktop and the accessible menu
  on smaller screens. Menu labels do not use numbers.
- Preserve readable contrast, keyboard navigation, semantic headings,
  descriptive image text and responsive layouts.
- Prefer the original AIWC media already stored in `public/media`. `public/og.png`
  is the preferred signature image when a strong Australia–India water visual
  is needed.

## Where to make changes

- `app/page.tsx`: homepage wording, featured programs and featured stories.
- `app/components/SiteChrome.tsx`: global sidebar, mobile menu and footer.
- `app/globals.css` and `app/scientific.css`: visual system and responsive
  styling.
- `app/data/content.ts`: navigation and helpers for the preserved archive.
- `app/data/site-content.json`: imported AIWC pages, posts, people and media
  records. Change only the requested record and keep its structure intact.
- `public/media`: local photographs and documents.
- `docs`: generated GitHub Pages output. Never hand-edit this directory.

## Required workflow

1. Read the relevant existing page and nearby styles before changing it.
2. Make the smallest coherent source change that fully satisfies the request.
3. Keep existing routes and local media working.
4. Run `npm run pages:check`. This rebuilds `docs` and verifies all preserved
   pages, media and links.
5. Review the generated page when the change affects layout or colour.
6. Commit the source and generated `docs` together.

The GitHub Pages workflow deploys the verified `docs` package whenever a
change reaches `main`.

