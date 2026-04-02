# Public Documentation Workflow

This is the lightweight workflow for keeping the public `/docs` section aligned with the product as the app changes.

## Architecture

- Public docs are rendered by the website at `/docs`.
- Narrative product guidance stays in the website repo.
- Drift-prone entity and field details are sourced from the app repo.
- The website consumes a committed generated snapshot so it can build and deploy independently.

## Source Of Truth

### Website-owned

- `src/lib/content/docs/pages/`
  - Narrative explanations
  - feature walkthroughs
  - terminology
  - examples, tips, and related links
- `src/lib/content/docs/pages.ts`
  - thin barrel that preserves the existing import surface
- `src/lib/content/docs/pages/helpers.ts`
  - small helper layer for page typing and app-backed entity field sections
- `src/routes/docs/*`
  - docs route loading and rendering

### App-owned

- `app/docs/source/public-docs-reference.mjs`
  - public-facing entity and field metadata for `Things`, `Places`, `Spots`, `Sets`, and `Events`
  - the fields here are validated against live app schemas and forms
- `app/src/lib/schemas.ts`
  - field keys and core validation structure
- `app/src/lib/forms/*.svelte`
  - current user-facing labels and form presence

### Generated bridge

- `app/docs/derived/website/docs-reference.json`
  - generated app snapshot for website consumption
- `website/src/lib/content/docs/entity-reference.generated.ts`
  - generated website snapshot committed with the site

## Update Workflow

### Page module conventions

- Use `defineDocsPage(...)` for every page module in `website/src/lib/content/docs/pages/`.
- Use `createEntityFieldsSection(...)` when a section is just the canonical app-backed field table for `Things`, `Places`, `Spots`, `Sets`, or `Events`.
- Write a custom section object manually when the section needs custom bullets, subsections, examples, callouts, or page-specific explanatory copy.
- Keep the helpers small. If the content starts feeling hidden behind abstractions, prefer plain objects again.

### When app fields or entity structure change

1. Update the app schema and form as usual.
2. Update `app/docs/source/public-docs-reference.mjs` if the public docs table should change.
3. In `app/`, run `npm run docs:derive`.
4. In `website/`, run `npm run docs:sync`.
5. If the user-facing workflow changed, update the relevant page module in `website/src/lib/content/docs/pages/`.
6. Optional: run `app: npm run docs:impact -- --files <changed files...>` or `app: npm run docs:impact -- --base origin/develop` to see which public docs pages deserve review.

### When feature behavior changes but fields do not

1. Update the relevant page copy in `website/src/lib/content/docs/pages/`.
2. Leave the app docs reference alone unless the field table or core entity summary changed.

### When releasing

- The website already syncs release history from the app.
- Docs updates do not need their own release system.
- If docs are updated alongside a product change, land the app and website changes in the same workstream when possible.
- `website` dev/build now performs a best-effort sync for both release history and app docs reference when the sibling app checkout is available locally.

## Checks

### App

- `npm run docs:check`
  - verifies the generated app docs snapshot is committed
  - verifies referenced field keys still exist in the schema and form
- `npm run docs:impact`
  - reports which public docs entities are likely affected by app file changes
- This now runs in app CI.

### Website

- `npm run docs:check`
  - verifies the website snapshot matches the app snapshot when the app artifact is available
- `npm run test:unit`
  - verifies entity docs pages still consume the generated field tables

## Manual vs Automated

### Manual

- explanations of what features mean
- examples, best practices, and “when should I use this?” guidance
- deciding whether a product change is important enough to mention publicly

### Semi-automated

- entity field tables
- entity summaries and route/source metadata
- local sync from app repo into website repo

### Automated

- validation that documented fields still exist in the app schema and form
- generation of the app snapshot
- generation of the website snapshot

## Current File Layout

- `app/docs/source/public-docs-reference.mjs`
- `app/docs/derived/website/docs-reference.json`
- `website/src/lib/content/docs/entity-reference.ts`
- `website/src/lib/content/docs/entity-reference.generated.ts`
- `website/src/lib/content/docs/pages/`

## Practical Rule

If a change touches a core entity field, form, or the meaning of a feature, assume the docs need review in the same PR or branch. If the table is wrong, fix the app reference. If the explanation is wrong, fix the matching page module in `website/src/lib/content/docs/pages/`. If both changed, update both.
