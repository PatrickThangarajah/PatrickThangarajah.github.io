# Patrick Thangarajah engineering portfolio

Static Astro portfolio for https://patrickthangarajah.github.io.

## Local development

Use Node 24, then run:

```sh
npm ci
npm run dev
```

Build and verify:

```sh
npm run build
npm test
CHROME_PATH=/path/to/google-chrome npm run audit
```

The audit requires accessibility and best-practices scores above 95 on every page in both themes. Audit output is written to the ignored `test-results/` directory.

## Content and assets

Page content is in `src/data/pages.json`. Figure metadata is in `src/data/assets.json`. See `asset-manifest.md` and `asset-manifest.json` for every final media path, caption, description, and provisional canvas.

Replace placeholder files in `public/` in place. Build-time SHA-256 checks automatically remove placeholder labels after the file bytes change. No code change is needed for a replacement at the same path and dimensions. Update metadata if an approved original has a different aspect ratio. Screen originals against the publication permissions before replacing them.

Videos require WebM, MP4, and a PNG poster. Keep each file well below 10 MB. Do not use Git LFS. Conceptual SVG canvases and video canvases remain provisional until the supplied exports are measured.

The two downloads are under `public/downloads/`. Set the shared `issueDate` once in `src/data/downloads.json` when the dated PDFs arrive. Check both PDFs for phone numbers and restricted imagery before publication.

Source Serif 4 and Source Sans 3 are self-hosted. Their SIL OFL 1.1 notices are retained in `public/fonts/`.

## GitHub Pages

Use the repository `PatrickThangarajah/PatrickThangarajah.github.io`, default branch `main`. In Settings → Pages, select GitHub Actions as the build source. Push the source to `main`; `.github/workflows/deploy.yml` builds, tests, audits, and deploys `dist/`.

Astro uses static output, the account-site URL, and no base path. The deployed site uses no backend, runtime secrets, or Notion API calls.
