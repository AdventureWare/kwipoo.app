# Kwipoo Website

Public-facing marketing website for Kwipoo, built with SvelteKit. This repo is for landing-page content, brand presentation, CTA flows, and legal pages. It is not the product application itself.

## Stack

- Svelte 5
- SvelteKit 2
- Tailwind CSS 4
- TypeScript
- Phosphor Svelte

## Local Development

```sh
npm install
npm run dev
```

Useful validation commands:

```sh
npm run test:unit
npm run theme:sync
npm run check
npm run lint
npm run build
npm run test:e2e:smoke
```

## Feature Flags

Feature flags live in `src/lib/config/feature-flags.ts`.

- Use `PUBLIC_FEATURE_*` environment variables for flags that need to be read by both routes and Svelte components.
- Boolean env values accept `1`, `true`, `yes`, `on`, `0`, `false`, `no`, and `off`.
- `docs` defaults to `true` and can be overridden with `PUBLIC_FEATURE_DOCS`.
- `resources` defaults to `true` and can be overridden with `PUBLIC_FEATURE_RESOURCES`.
- `pricing` defaults to `false` and can be overridden with `PUBLIC_FEATURE_PRICING`.
- `releaseHistory` defaults to `false` and can be overridden with `PUBLIC_FEATURE_RELEASE_HISTORY`.
- Public flags are appropriate for UI and route gating. They are not appropriate for secrets or server-only access control.

Create a local `.env` from `.env.example` when you want to override a flag locally.

## Premium Signup Wiring

- `PUBLIC_PREMIUM_CHECKOUT_URL` can point at a hosted checkout or billing page when Premium payment is ready.
- `PUBLIC_PREMIUM_SIGNUP_URL` can point at an app signup or upgrade screen when account creation should happen before payment.
- If both values are blank, the Premium flow falls back to support contact so the CTA still has a live destination.
- For local testing, you can point `PUBLIC_PREMIUM_CHECKOUT_URL` at `/pricing/premium/mock-checkout` to exercise the mock purchase flow end to end.
- The marketing site should own the handoff and messaging, not the source of truth for billing state or subscription entitlements.

## Analytics

- Marketing analytics are optional and configured through public env vars.
- `PUBLIC_ANALYTICS_PROVIDER=posthog` enables the shared analytics layer.
- `PUBLIC_POSTHOG_KEY` is the PostHog project key used by the adapter.
- `PUBLIC_POSTHOG_HOST` overrides the PostHog API host and defaults to `https://us.i.posthog.com`.
- `PUBLIC_ANALYTICS_SCRIPT_URL` can load the provider script if it is not already present on `window`.
- The shared client layer tracks pageviews centrally from `src/routes/+layout.svelte` and supports CTA event hooks through the shared button component.

## Project Structure

- `docs/design-ui-guidelines.md`: design and UX brief for future contributors and agents.
- `src/routes/+page.svelte`: homepage metadata and the main marketing-content arrays.
- `src/lib/components/layouts/navigation/`: header and footer.
- `src/lib/components/layouts/sections/`: homepage sections such as hero, problem/solution, and switchbacks.
- `src/routes/privacy-policy/+page.svelte`: privacy policy page.
- `src/routes/terms-and-conditions/+page.svelte`: terms and conditions page.
- `static/assets/`: screenshots, product imagery, and brand assets.
- `src/lib/config/site.ts`: source of truth for site/app URLs and support contact info.

## Content Conventions

- This site should speak as the marketing site for Kwipoo, not as the application runtime.
- Reuse values from `src/lib/config/site.ts` for repeated URLs and contact information.
- Use `resolve()` for internal links and `asset()` for static assets referenced from Svelte components.
- Use `docs/design-ui-guidelines.md` as the source of truth for visual hierarchy, section rhythm, CTA behavior, and responsive polish.
- Treat `320px` to `390px` widths as a required review surface for layout, CTA visibility, screenshot treatment, and any future forms.
- Be conservative with the legal pages. They are static-content heavy and should get human review for substantive wording changes.

## Brand Theme

- Shared brand ramps live in `src/lib/styles/kwipoo-brand-theme.generated.css`.
- That file is generated from the app theme source, not edited by hand.
- Run `npm run theme:sync` after changing the app theme.
- The website keeps its own semantic surface and presentation tokens in `src/app.css`.
- See `docs/brand-theme-workflow.md` for the maintenance workflow.

## AI Agent Workflow

1. Read `AGENTS.md`, then `src/lib/config/site.ts`, then the route/component files you plan to touch.
2. Read `docs/design-ui-guidelines.md` for any design/UI/UX change.
3. Use `.agents/skills/marketing-site-maintainer` for general website work and `.agents/skills/marketing-site-design-review` for visual design or UX polish.
4. After changing Svelte files, run `svelte-autofixer` if the Svelte MCP tools are available.
5. Finish with `npm run check`, `npm run lint`, and `npm run test:unit`.
6. For meaningful layout or visual changes, run `npm run test:e2e:smoke` locally and keep `npm run test:e2e` for broader cross-viewport coverage.
7. Treat responsive work as incomplete until desktop, mobile, and narrow-mobile behavior have been checked.

## CI/CD

- GitHub Actions validates pushes and pull requests to `develop` and `main`.
- The `Quality` workflow runs Prettier, ESLint, Svelte typechecking, and fast Vitest checks on every protected-branch push and pull request.
- The `E2E` workflow runs a production build plus desktop Playwright smoke tests on pull requests, then expands to desktop, mobile, and narrow-mobile smoke coverage on pushes to `develop` and `main`.
- Commit messages are checked against the repository's conventional-commit policy.
- Deployment is expected to flow through Netlify using this repo and `netlify.toml` rather than a separate GitHub deploy workflow.

## Releases

- This repo uses Changesets to manage website version bumps on the private `kwipoo.app` package.
- For any user-facing change that should be included in the next release, run `npm run changeset` and commit the generated file in `.changeset/`.
- `main` runs a release workflow that opens or updates a version PR using Changesets.
- Merge that release PR to apply the version bump and changelog updates after the underlying changes are already on `main`.
- After that release PR lands on `main`, GitHub Actions automatically opens a follow-up PR that syncs the generated `chore: version packages` commit back into `develop`.
- CI-only, docs-only, and repo-maintenance changes do not always need a changeset.

## Promoting `develop` to `main`

- Treat `main` as a protected release branch, not a branch that accepts direct pushes or local merge commits.
- `main` currently requires changes to land through a pull request and rejects merge commits on the branch.
- When the goal is to move the current `develop` state to `main`, create a linear branch from `origin/main`, replay the `develop`-only commits onto it, and open a PR into `main`.
- After that `main` PR merges, let the automated release PR land and then let the automated `develop` sync PR bring the version bump back downstream.
- Before opening that PR, confirm the promotion branch matches `develop` at the tree level, for example with `git diff --stat develop..HEAD`.
- Keep commit messages conventional-commit compliant because `commitlint` runs on protected-branch PRs and pushes.
- When merging the PR, prefer `Rebase and merge`. If `Squash and merge` is used instead, edit the squash commit title so it still follows the conventional-commit format.
- Do not leave a local-only merge commit on `main` after a rejected push. Reset local `main` back to `origin/main` and continue from the PR branch instead.

## Current Notes

- The public site URL is `https://kwipoo.app`.
- The CTA/login destination currently points at the app URL configured in `src/lib/config/site.ts`.
- The design brief for agents lives in `docs/design-ui-guidelines.md`.
- The legal pages still contain some long generated sections and should receive a human legal/content review before relying on them as final copy.
