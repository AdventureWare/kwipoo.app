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
npm run check
npm run lint
npm run build
npm run test:e2e:smoke
```

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
