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
7. Review the rendered UI like a human, not just the code:
   - hierarchy: what reads first, second, and last
   - spacing and rhythm: whether blocks feel intentionally grouped
   - alignment: whether text, cards, media, and actions line up cleanly
   - action clarity: whether the primary CTA is obviously primary
   - density: whether any section feels cramped, noisy, or overfilled
   - responsiveness: whether the layout still works at `320px`, `390px`, `768px`, `1024px`, and `1440px`
   - interaction modes: whether touch and pointer users both get a usable experience
   - consistency: whether the change still looks native to the rest of the site
8. When feasible, use screenshot or rendered-preview review before signing off. Source inspection alone is not enough for spacing, hierarchy, or awkward intermediate breakpoints.
9. Validate with:
   - `svelte-autofixer` on edited `.svelte` files when available
   - `npm run check`
   - `npm run lint`
   - `npm run test:e2e`

## Failure Shields

- Do not turn the website into an app dashboard aesthetic.
- Do not add one-off colors, spacing, or shadows when a reusable pattern would work.
- Do not bury the primary CTA under equally loud secondary actions.
- Do not optimize only for desktop; mobile readability and tap behavior are required.
- Do not pretend code review replaces human visual judgment; call out when a rendered pass is still needed.
