---
name: marketing-site-maintainer
description: Use when editing the Kwipoo marketing website, including landing-page copy, CTA links, SEO metadata, navigation/footer changes, legal pages, and static marketing assets. Encodes the repo-specific structure, link hygiene, and validation workflow.
---

# Marketing Site Maintainer

This repo is the public website for Kwipoo, not the application itself.

## First Read

- `AGENTS.md`
- `README.md`
- `docs/design-ui-guidelines.md`
- `src/lib/config/site.ts`

## Workflow

1. Identify the surface area before editing:
   - homepage: `src/routes/+page.svelte`
   - shared layout: `src/lib/components/layouts/navigation/*`
   - section components: `src/lib/components/layouts/sections/*`
   - legal pages: `src/routes/privacy-policy/+page.svelte` and `src/routes/terms-and-conditions/+page.svelte`
2. Reuse `src/lib/config/site.ts` for URLs and support-contact values instead of introducing new hardcoded copies.
3. Use `resolve()` for internal routes and `asset()` for static assets referenced from Svelte components.
4. For design-sensitive work, follow `docs/design-ui-guidelines.md` for visual hierarchy, CTA prominence, typography, spacing, and responsive behavior.
5. Treat narrow-phone widths as a first-class target. Layouts, CTA groups, screenshots, and any future forms should remain readable and usable around `320px` to `390px`.
6. Keep marketing copy specific, consumer-facing, and consistent with existing claims. Do not invent unsupported product behavior.
7. Treat legal pages conservatively. Mechanical fixes are safe; substantive legal rewrites should be explicitly requested and clearly called out.
8. Validate with:
   - `svelte-autofixer` on every edited `.svelte` file when available
   - `npm run check`
   - `npm run lint`
   - `npm run test:e2e` for meaningful layout or visual changes

## Failure Shields

- Do not move product-app logic into this repo.
- Do not scatter duplicate URLs or support-email strings when `src/lib/config/site.ts` already owns them.
- Do not use plain relative asset paths inside components when `asset()` is the safer option.
- Do not make the site look like a generic dashboard or dark-mode-heavy SaaS template; this repo needs a warm, approachable marketing presentation.
- Do not silently rewrite legal meaning while cleaning up formatting or links.
