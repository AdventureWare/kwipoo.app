# Resource Acquisition Shortlist

This document turns the current resource library into a small acquisition system instead of treating every guide as equally important.

## Primary Guides

### 1. Home inventory

- Guide: `home-inventory-that-stays-updated`
- User problem: "I want a home inventory, but I do not want to catalog my whole life."
- Best channels: search, Pinterest-style visual discovery, founder LinkedIn posts, practical household communities
- Message angle: start small, organize real storage locations, prevent duplicate buying without turning this into homework
- CTA path: guide -> `Start Free` -> first high-friction category or storage zone

### 2. Duplicate buying

- Guide: `stop-buying-duplicates-you-already-have-at-home`
- User problem: "I keep rebuying chargers, batteries, tools, supplies, or pantry items because checking feels harder than buying."
- Best channels: search, short-form social posts, household/frugal-living communities, email roundups
- Message angle: checking should be easier than rebuying
- CTA path: guide -> `Start Free` -> first repeat-buy category

### 3. Storage bins

- Guide: `organize-storage-bins-find-things-later`
- User problem: "My bins turned into mystery boxes."
- Best channels: search, before/after storage content, moving and decluttering communities
- Message angle: label for retrieval, not just for packing speed
- CTA path: guide -> `Start Free` -> first Place and Spot setup

### 4. Repeatable packing

- Guide: `repeatable-packing-system-trips-camping-events`
- User problem: "I keep rebuilding the same packing list from memory."
- Best channels: search, outdoor/travel social content, gear and camping communities, seasonal travel email sequences
- Message angle: reusable setups beat one-off checklists
- CTA path: guide -> `Start Free` -> first Set for the most repeated trip

### 5. Shared household inventory

- Guide: `households-families-roommates`
- User problem: "Several people use the same stuff, but nobody trusts where it is."
- Best channels: search, roommate/family organization content, household coordination topics
- Message angle: shared household source of truth without one person carrying it in their head
- CTA path: guide -> `Start Free` -> first shared household category

## Secondary Guides

- `how-to-inventory-a-storage-unit`
  - Best for search and moving/storage workflows.
- `moving-inventory-checklist-boxes-storage-and-essentials`
  - Best for move-planning and seasonal reset pushes.

These should support the primary guides, not lead the acquisition plan.

## Channel Mapping

### Search-first

- Prioritize: home inventory, duplicate buying, storage bins, repeatable packing
- Goal: meet active problem demand with practical, specific phrasing
- CTA style: direct, low-drama, problem-solution framing

### Social reuse

- Source material should come from the primary guides, not from net-new topic brainstorming.
- Break each primary guide into:
  - one short problem post
  - one practical "how to start" post
  - one mistake-to-avoid post
  - one "why Kwipoo helps here" post

### Lifecycle email

- Reuse the same guide set in onboarding and activation:
  - new household user -> home inventory / duplicate buying
  - storage-heavy user -> storage bins / storage unit
  - outdoor or trip-oriented user -> repeatable packing

## Measurement

Resource guide CTA analytics now support guide-level attribution on `marketing_cta_clicked` for guide CTAs:

- `content_slug`
- `content_title`
- `content_audience`

That means the key question is now answerable in analytics:

- Which guides produce the most `Start Free` handoffs?
- Which audiences convert from guide CTA to app handoff most often?
- Which guides attract traffic but fail to drive handoffs?

Resource-hub discovery is now measurable separately through `resource_guide_selected`, so you can distinguish:

- which guides get chosen from the hub
- which guide pages actually turn those visits into `Start Free` handoffs

In-guide guide discovery is now measurable too, so you can also distinguish:

- which guides attract internal follow-on clicks from inside another guide
- which guides act as strong feeder pages into other household workflows
- which guide-to-guide paths show real intent before an app handoff

## Weekly Review

Every week, rank the primary guides by:

1. Landing traffic
2. `Start Free` CTA clicks
3. CTA click rate per landing
4. Which audience/problem framing produced the clicks

If a guide gets traffic but weak handoff rates, tighten the intro, proof block, or CTA framing before creating more content around that topic.

Use `docs/resource-funnel-weekly-review.md` as the operating runbook for that review.
