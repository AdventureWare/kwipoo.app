# Brand Theme Workflow

Kwipoo now treats the product-level brand contract as the source of truth for the shared brand palette.

## Files

- `../coordination/contracts/kwipoo-brand-theme.tokens.json`
  - product-level source of truth for shared brand ramps and semantic brand tokens
- `../scripts/sync-shared-brand-theme.mjs`
  - generates the shared theme artifacts for both repos
- `src/lib/styles/kwipoo-brand-theme.generated.css`
  - generated file
  - contains the shared Skeleton-compatible brand ramps generated from the product contract
- `src/app.css`
  - imports the generated brand theme
  - keeps website-only semantic mappings and presentation rules
- `scripts/sync-app-theme.mjs`
  - delegates to the product-level sync script so `npm run theme:sync` still works from this repo

## Normal workflow

1. Update `coordination/contracts/kwipoo-brand-theme.tokens.json`.
2. From `Kwipoo/`, run `node scripts/sync-shared-brand-theme.mjs`.
3. Or from `website/`, run `npm run theme:sync`.
4. Review the site visually.
5. Run `npm run check`, `npm run lint`, and `npm run test:e2e:narrow` for layout-sensitive changes.

## Why this split exists

The brand ramps should stay consistent across the app and website, while each repo still controls its own layout and product-context decisions.

That means:

- shared brand tokens come from the product-level contract
- website presentation tokens stay local to the website
