# Kwipoo Website

This repository is the public marketing website for Kwipoo. It is separate from the product application. Prioritize landing-page content, brand presentation, CTA flows, legal pages, and route-safe site behavior. Do not treat this repo like the app itself.

## First Read

- `README.md`
- `docs/design-ui-guidelines.md`
- `src/lib/config/site.ts`
- `src/routes/+page.svelte`
- `src/lib/components/layouts/navigation/*`
- `src/lib/components/layouts/sections/*`

## Project Map

- `src/routes/+page.svelte`: homepage metadata plus most marketing content data.
- `src/lib/components/layouts/navigation/`: header and footer.
- `src/lib/components/layouts/sections/`: reusable landing-page sections.
- `src/routes/privacy-policy/+page.svelte`: privacy page.
- `src/routes/terms-and-conditions/+page.svelte`: terms page.
- `static/assets/`: marketing imagery and logos.
- `src/lib/config/site.ts`: shared URLs, support email, and site constants.

## Working Rules

- Reuse `src/lib/config/site.ts` for app URLs, public-site URLs, and support contact data instead of hardcoding new copies.
- Public release history content is synced from the app repo's generated feed; use `npm run releases:sync` when app release records change and keep `src/lib/content/releases.generated.ts` committed.
- Use `resolve()` for internal route links and `asset()` for static asset URLs referenced from Svelte components.
- Keep edits scoped. This repo is mostly copy, layout, and asset wiring.
- Preserve the current visual language unless the user asks for a redesign.
- For design-heavy work, read `docs/design-ui-guidelines.md` before editing. It is the repo's design brief for hierarchy, spacing, CTA behavior, and responsive expectations.
- Prefer improving design through tokens, reusable patterns, and clearer component structure rather than one-off hardcoded colors or spacing.
- Treat `320px` to `390px` mobile widths as a real target, not an afterthought. Responsive work should account for narrow phones, tablet widths, and desktop.
- Treat legal copy as high-risk content. Make mechanical fixes freely, but do not invent policy or terms language unless the user explicitly asks for legal copy work.
- When a task is really about the application, say so and keep the change in the website layer only.
- For user-facing changes intended for release, add a Changesets entry with `npm run changeset` unless the change is clearly docs-only, CI-only, or internal repo maintenance.
- If the task is to promote `develop` into `main`, do not push a merge commit directly to `main`. Create a linear branch from `origin/main`, replay the `develop`-only commits onto it, and open a PR to `main` instead.
- Keep release-promotion commit messages conventional-commit compliant and prefer `Rebase and merge` when landing that PR.
- After a Changesets release PR merges to `main`, prefer the automated sync PR back into `develop` over manual cherry-picks of `chore: version packages`, unless that automation has clearly failed.

## UI Workflow

- For meaningful UI work, inspect the relevant route plus nearby shared components, `src/app.css`, and the closest existing pattern before adding new layout or styling.
- Before coding, briefly state the intended visual hierarchy, primary action, and how the layout should reflow from mobile to tablet to desktop.
- Build mobile-first. Reuse existing containers, cards, buttons, tokens, and spacing rhythm before introducing one-off widths, gaps, or breakpoint behavior.
- Treat touch and pointer input as separate checks. Keep primary actions reachable without hover, and keep tap targets comfortable on small screens.
- After implementation, review the rendered result for hierarchy, spacing, alignment, grouping, density, and CTA priority, not just for code correctness.
- When feasible, prefer screenshot or rendered-preview review across `320px`, `390px`, `768px`, `1024px`, and `1440px` instead of relying only on source inspection.

## Validation

- Run `npm run check`
- Run `npm run lint`
- Run `npm run releases:sync` or `npm run releases:check` when touching the `/releases` content pipeline
- For meaningful UI or layout changes, run `npm run test:e2e`
- When the change is responsive-layout sensitive, make sure mobile coverage is part of the run, especially the narrow-mobile project
- If the Svelte MCP server is available:
  - use `list-sections` first for Svelte/SvelteKit documentation discovery
  - fetch all relevant docs with `get-documentation`
  - run `svelte-autofixer` on every edited `.svelte` file until it returns no issues or suggestions
- If the MCP tools are not exposed in the current runtime, fall back to local validation and note that in the handoff.

## Local Skill

- Use `.agents/skills/marketing-site-maintainer` for recurring work in this repo.
- Use `.agents/skills/marketing-site-ui-builder` when implementing or refactoring marketing-site UI, layout, or responsive behavior.
- Use `.agents/skills/marketing-site-design-review` for visual design, UX polish, and responsive-layout work.
