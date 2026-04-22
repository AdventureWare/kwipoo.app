# Resource Funnel Weekly Review

This runbook turns the current resource-guide analytics into a repeatable weekly operating loop.

Use [resource-funnel-posthog-spec.md](./resource-funnel-posthog-spec.md) when you need to create or rebuild the supporting PostHog views first.

Use it to answer four questions:

1. Which guides attract interest from the resources hub?
2. Which guides pull visitors deeper into the resource library?
3. Which guides drive `Start Free` handoffs into the app?
4. Which guides deserve more distribution, tighter copy, or less attention?

## Event Set

Review these events together:

- `$pageview`
  - use for guide landing volume
- `resource_guide_selected`
  - use for internal discovery behavior
  - locations:
    - `resources_hub`
    - `resource_guide_inline_related`
    - `resource_guide_bottom_related`
- `marketing_cta_clicked`
  - use for app handoffs from guides
  - primary guide locations:
    - `resource_guide_header`
    - `resource_guide_bottom`

## Key Properties

These fields should be the main breakdowns:

- `content_slug`
- `content_title`
- `content_audience`
- `location`

Use these only when reviewing in-guide flow:

- `parent_content_slug`
- `parent_content_title`
- `parent_content_audience`

Use UTM fields when comparing distribution quality:

- `utm_source`
- `utm_medium`
- `utm_campaign`

## Weekly Output

Produce one short table for the primary guides:

- `home-inventory-that-stays-updated`
- `stop-buying-duplicates-you-already-have-at-home`
- `organize-storage-bins-find-things-later`
- `repeatable-packing-system-trips-camping-events`
- `households-families-roommates`

For each guide, capture:

- guide landings
- hub selections
- in-guide related-guide selections
- `Start Free` clicks
- `Start Free` click rate per landing
- strongest traffic source
- strongest audience/problem angle
- recommendation: `push`, `tighten`, or `hold`

## Review Steps

### 1. Check landing demand

Goal: identify which guides are getting real entry traffic.

Look at guide pageviews and rank the primary guides by landings for the last 7 days and last 28 days.

Questions:

- Which guides are attracting meaningful traffic now?
- Which guides are flat even after recent distribution?
- Which guides have traffic spikes tied to a specific source or campaign?

## 2. Check hub selection behavior

Goal: understand what visitors choose when they land on `/resources`.

Filter:

- event: `resource_guide_selected`
- location: `resources_hub`

Break down by:

- `content_slug`
- `content_audience`

Questions:

- Which guides are winning the first click from the hub?
- Which titles and audience framings are pulling attention?
- Which priority guides are under-selected and may need title or summary changes?

## 3. Check in-guide discovery behavior

Goal: understand which guides act as feeder pages into other guides.

Filter:

- event: `resource_guide_selected`
- location: `resource_guide_inline_related` and `resource_guide_bottom_related`

Break down by:

- `parent_content_slug`
- `content_slug`
- `location`

Questions:

- Which guides naturally move people deeper into the library?
- Which related-guide placements are doing the work: inline or bottom?
- Which guide-to-guide paths suggest real workflow intent?

Interpretation:

- Strong in-guide clicks plus weak `Start Free` often means the topic is interesting but the current guide does not yet create enough product urgency.
- Strong in-guide clicks from one parent guide to another can justify a content cluster or a tighter CTA bridge between those two topics.

## 4. Check app handoff behavior

Goal: identify which guides actually produce acquisition handoffs.

Filter:

- event: `marketing_cta_clicked`
- location: `resource_guide_header` and `resource_guide_bottom`
- label: `Start Free`

Break down by:

- `content_slug`
- `content_audience`
- `location`
- `utm_source` when available

Questions:

- Which guides drive the most `Start Free` clicks?
- Which guides convert best relative to landing volume?
- Does the header CTA or bottom CTA perform better for a given guide?

Interpretation:

- High landing volume + low `Start Free` means the intro, proof block, or CTA framing likely needs work.
- Low landing volume + strong `Start Free` rate means the guide is worth more distribution.
- Strong bottom CTA and weak header CTA can mean the visitor needs more proof before acting.

## 5. Make one decision per primary guide

Do not leave the review at observation level. End with one action for each primary guide.

Use only one of these decisions:

- `push`
  - traffic and handoff quality are good enough to justify more distribution
- `tighten`
  - the topic has demand, but the page needs messaging, proof, title, or CTA work
- `hold`
  - not enough evidence yet to spend more effort this week

## Decision Rules

Use these defaults unless you have stronger evidence:

- `push`
  - guide has meaningful traffic and above-average `Start Free` rate
- `tighten`
  - guide has traffic but weak `Start Free` rate
  - guide gets hub clicks but weak guide-page handoff
  - guide drives in-guide follow-on clicks but not app handoffs
- `hold`
  - guide has low traffic and weak discovery signals

## Good Weekly Questions

- Which one guide earned more distribution this week?
- Which one guide needs copy changes before more promotion?
- Which guide-to-guide path shows the strongest real-world workflow?
- Which audience framing is outperforming the others right now?

## Avoid

- Do not judge guides only by raw pageviews.
- Do not create new content before checking whether an existing guide should be tightened first.
- Do not treat all `resource_guide_selected` clicks as equal. Hub discovery and in-guide discovery mean different things.
- Do not expand channel activity if the best-performing guides still have weak `Start Free` handoff rates.

## Suggested Cadence

- Monday or Tuesday:
  - run the review for the last 7 days
- End of month:
  - compare the same views across the last 28 days
- After each major content push:
  - re-check the affected guide within 48 to 72 hours
