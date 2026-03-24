---
name: marketing-site-ui-builder
description: Use when implementing or refactoring Kwipoo marketing-site UI, layout structure, responsive behavior, or CTA presentation. Focuses on planning hierarchy before coding, reusing existing patterns, and shipping layouts that hold up from narrow mobile through desktop.
---

# Marketing Site UI Builder

Use this skill for meaningful UI implementation work in the Kwipoo marketing website.

## First Read

- `AGENTS.md`
- `docs/design-ui-guidelines.md`
- `src/app.css`
- the route and shared components you plan to edit

## Workflow

1. Inspect the closest existing pattern before writing code:
   - shared buttons, cards, navigation, and section wrappers
   - nearby spacing and content-width choices
   - the semantic brand tokens in `src/app.css`
2. Before editing, briefly state:
   - what should read first
   - what the primary action is
   - how the layout should reflow from mobile to tablet to desktop
3. Build mobile-first and scale up:
   - prefer stacked layouts before dense multi-column compromises
   - keep primary actions visible and easy to tap on narrow screens
   - avoid hover-only access to important actions or information
4. Reuse system patterns before adding custom styling:
   - existing container widths and horizontal padding
   - existing card, screenshot, and button treatments
   - semantic `brand-*`, `surface-*`, and `primary/secondary` tokens
5. Check visual structure after implementation:
   - heading-to-body contrast
   - section spacing rhythm
   - alignment between text blocks, cards, and actions
   - clean reflow at `320px`, `390px`, `768px`, `1024px`, and `1440px`

## Failure Shields

- Do not invent a new layout pattern when the repo already has a close fit.
- Do not introduce arbitrary spacing or width values without checking nearby patterns first.
- Do not let secondary actions compete visually with the primary CTA.
- Do not accept a layout that only feels balanced at desktop widths.
