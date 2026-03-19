# Design And UI Guidelines

This document is the default design brief for the Kwipoo marketing website. Read it before making meaningful UI, layout, or visual-polish changes.

## Product Feel

- Kwipoo should feel practical, friendly, and lightly playful.
- The site should communicate order, calm, and readiness, not enterprise heaviness.
- The visual tone should support the idea of keeping life organized without making the product feel sterile.

## Visual Direction

- Use the existing teal-and-warm-gold palette as the default brand language.
- Keep the Monoton typeface limited to the wordmark or small accent moments. Do not use it for body copy or large content blocks.
- Use Jost for headings, body copy, and UI text.
- Prefer bright surfaces, soft neutral panels, rounded corners, and clear spacing over dense, high-contrast layouts.

## Layout Rules

- Optimize for strong first-impression hierarchy on the homepage:
  - clear headline
  - short supporting copy
  - obvious primary CTA
  - product image or interface proof nearby
- Keep sections visually distinct through rhythm, contrast, and spacing, not just by stacking more cards.
- Avoid long uninterrupted walls of text on marketing sections. Break content into digestible blocks.
- Maintain generous whitespace between sections. The page should feel paced, not cramped.

## CTA Rules

- One primary CTA should dominate each major section.
- Secondary links or actions should stay visually quieter than the main CTA.
- CTA labels should be action-oriented and concrete.
- Avoid placing multiple equally loud buttons side by side unless there is a strong reason.

## Imagery And Product Proof

- Product screenshots should feel intentional and supported by the layout, not dropped in as loose assets.
- Use consistent radius, shadow, and panel treatment around screenshots.
- Avoid stretching, cropping awkwardly, or mixing too many visual styles of imagery on one page.
- When a section makes a product claim, pair it with either product UI, a strong icon, or a concrete structural cue.

## Typography

- Headlines should stay compact and scannable.
- Body copy should usually sit in the comfortable reading range, not oversized by default.
- Keep line lengths readable, especially on large screens.
- Legal pages should prioritize readability and structure over marketing expression.

## Responsive UX

- Mobile layouts must keep the main CTA visible and easy to tap.
- Do not hide key proof or calls to action only on mobile.
- Cards and image/text sections should stack cleanly without awkward leftover margins.
- Tap targets should remain comfortable on small screens.

## Responsive Standards

- Review meaningful layout work at a minimum of `320px`, `390px`, `768px`, `1024px`, and `1440px`.
- Avoid horizontal scrolling unless the UI is intentionally a carousel or other horizontal pattern.
- Keep hero content readable on small screens without forcing the user to scan through oversized empty space.
- Prefer single-column stacking on narrow screens before introducing cramped two-column compromises.
- Keep headings, screenshots, and CTA groups inside a predictable content width so they do not feel edge-to-edge or cramped.
- Preserve at least one piece of product proof on mobile when the section depends on visual credibility.

## Forms And Inputs

- Default to a single-column form layout on narrow screens.
- Keep labels visible instead of relying on placeholder-only inputs.
- Stack submit buttons below fields on mobile unless the form is trivially small.
- Keep help text, validation text, and required-state messaging directly attached to their field.
- Do not create side-by-side fields on mobile if either field becomes hard to scan or tap.
- Submit states, errors, and success states must remain obvious without relying on hover.

## Accessibility And Interaction

- Preserve strong text/background contrast.
- Hover states should have visible feedback, but motion should remain subtle.
- Focus styles must stay visible on interactive elements.
- Decorative styling should never make headings, body text, or CTA labels harder to read.

## Review Checklist

Before finishing design-related work, check these:

- Is the most important message visible without scanning the whole page?
- Is there a single clear next action in each section?
- Does the page still feel airy and intentional on both desktop and mobile?
- Is there any horizontal overflow at common mobile widths?
- Are important screenshots, forms, and CTAs still usable at `320px` to `390px` widths?
- Are screenshot treatments, shadows, radii, and spacing consistent?
- Did the change improve clarity, polish, or usability rather than just add decoration?
- Did you run `npm run test:e2e` for meaningful UI/layout changes?
