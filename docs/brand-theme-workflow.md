# Brand Theme Workflow

Kwipoo now treats the app theme as the source of truth for the shared brand palette.

## Files

- `src/lib/styles/kwipoo-brand-theme.generated.css`
  - generated file
  - contains the shared Skeleton-compatible brand ramps copied from the app theme
- `src/app.css`
  - imports the generated brand theme
  - keeps website-only surface, panel, border, and semantic tokens
- `scripts/sync-app-theme.mjs`
  - reads the app theme CSS file
  - extracts the shared brand variables
  - rewrites the generated website theme file

## Normal workflow

1. Update the source theme in the app repo.
2. In this repo, run `npm run theme:sync`.
3. Review the site visually.
4. Run `npm run check`, `npm run lint`, and `npm run test:e2e:narrow` for layout-sensitive changes.

## Theme path

By default the sync script reads:

`/Users/colinfreed/Kwipoo/kwipoo-teal-theme.css`

If that path changes, pass the path explicitly:

```sh
KWIPOO_APP_THEME_FILE="/path/to/kwipoo-teal-theme.css" npm run theme:sync
```

## Why this split exists

The brand ramps should stay consistent across the app and website.

The website still needs its own semantic layer for:

- warm/light marketing surfaces
- readable body text on those surfaces
- screenshot framing and decorative accents
- CTA contrast tuned for the marketing site

That means:

- shared brand tokens come from the app
- website presentation tokens stay local to the website
