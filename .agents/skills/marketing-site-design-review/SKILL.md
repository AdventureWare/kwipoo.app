---
name: marketing-site-design-review
description: Use when reviewing or improving the visual design, responsive layout, UX polish, content hierarchy, CTA clarity, or interaction quality of the Kwipoo marketing website. Encodes the repo's design brief and validation workflow for desktop and mobile UI work.
---

# Marketing Site Design Review

Use this skill for design-heavy work in the Kwipoo marketing website.

## First Read

- `AGENTS.md`
- `README.md`
- `docs/design-ui-guidelines.md`
- `src/routes/+page.svelte`

## Workflow

1. Read the relevant route and shared section components before changing anything.
2. Use `docs/design-ui-guidelines.md` as the source of truth for hierarchy, section rhythm, CTA behavior, imagery treatment, and responsive polish.
3. Prefer improving the existing design language over replacing it with a generic new aesthetic.
4. Make design decisions through reusable patterns:
   - consistent spacing
   - token-backed colors
   - stable typography choices
   - repeatable screenshot/card treatment
5. Review mobile seriously, including narrow-phone widths. Do not accept designs that only work comfortably at tablet or desktop sizes.
6. Keep marketing copy scannable. Reduce density before adding more visual chrome.
7. Validate with:
   - `svelte-autofixer` on edited `.svelte` files when available
   - `npm run check`
   - `npm run lint`
   - `npm run test:e2e`

## Failure Shields

- Do not turn the website into an app dashboard aesthetic.
- Do not add one-off colors, spacing, or shadows when a reusable pattern would work.
- Do not bury the primary CTA under equally loud secondary actions.
- Do not optimize only for desktop; mobile readability and tap behavior are required.
