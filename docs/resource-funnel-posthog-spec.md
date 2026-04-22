# Resource Funnel PostHog Spec

This document defines the smallest useful PostHog dashboard for the resource-guide acquisition funnel.

Use it when creating new insights, rebuilding the dashboard in a shared project, or delegating analytics setup to another agent.

This spec is intentionally narrow. It only covers the website-side guide funnel:

- guide landings
- hub selection behavior
- in-guide related-guide behavior
- guide-to-app handoffs

Use [resource-funnel-weekly-review.md](./resource-funnel-weekly-review.md) to operate the review loop after these insights exist.

## Dashboard

- Recommended name: `Resource Funnel Overview`
- Recommended owner: website or growth owner
- Default window: last 7 days
- Secondary comparison view: last 28 days

## Insight 1: Primary Guide Landings

- Name: `Primary guide landings`
- Question: which guides are attracting entry traffic?
- Chart: trends, daily
- Event:
  - `$pageview`
- Filter:
  - `source = marketing_site`
  - `path` is one of:
    - `/resources/home-inventory-that-stays-updated`
    - `/resources/stop-buying-duplicates-you-already-have-at-home`
    - `/resources/organize-storage-bins-find-things-later`
    - `/resources/repeatable-packing-system-trips-camping-events`
    - `/resources/households-families-roommates`
- Breakdown:
  - `path`

Interpretation:

- Use this as the top-of-funnel demand view.
- Do not treat it as a success metric by itself.

## Insight 2: Resources Hub Guide Selection

- Name: `Resources hub guide selections`
- Question: what do visitors choose first from the hub?
- Chart: bar chart
- Event:
  - `resource_guide_selected`
- Filter:
  - `location = resources_hub`
- Breakdown:
  - `content_slug`

Optional second view:

- same query, breakdown by `content_audience`

Interpretation:

- This is the cleanest measure of title and summary pull from the hub.
- If a priority guide is under-selected here, tighten the hub card before creating more content around that topic.

## Insight 3: In-Guide Related Selections

- Name: `In-guide related selections`
- Question: which guides pull people deeper into the resource library?
- Chart: bar chart
- Event:
  - `resource_guide_selected`
- Filter:
  - `location` is one of:
    - `resource_guide_inline_related`
    - `resource_guide_bottom_related`
- Breakdown:
  - `parent_content_slug`

Optional second view:

- same query, breakdown by `content_slug`

Interpretation:

- High volume here means the parent guide is generating workflow curiosity.
- This is not the same as conversion. Use it to understand guide-to-guide momentum.

## Insight 4: Guide-To-Guide Path Matrix

- Name: `Guide-to-guide path matrix`
- Question: which parent guides feed which next guides?
- Chart: table
- Event:
  - `resource_guide_selected`
- Filter:
  - `location` is one of:
    - `resource_guide_inline_related`
    - `resource_guide_bottom_related`
- Visible columns:
  - `parent_content_slug`
  - `content_slug`
  - count

Optional sort:

- descending by count

Interpretation:

- This is the best view for finding natural topic clusters.
- Use it to decide which guides should cross-link more directly or share distribution packages.

## Insight 5: Guide `Start Free` Handoffs

- Name: `Guide Start Free handoffs`
- Question: which guides are actually producing app handoffs?
- Chart: bar chart
- Event:
  - `marketing_cta_clicked`
- Filter:
  - `location` is one of:
    - `resource_guide_header`
    - `resource_guide_bottom`
  - `label = Start Free`
  - `kind = signup`
- Breakdown:
  - `content_slug`

Optional second view:

- same query, breakdown by `location`

Interpretation:

- This is the primary website-side acquisition metric for resource guides.
- If volume is good but concentrated in only one or two guides, push distribution there first.

## Insight 6: Guide `Start Free` Handoff Rate

- Name: `Guide Start Free handoff rate`
- Question: which guides are converting their traffic into handoffs best?
- Chart: table or formula insight
- Numerator:
  - `marketing_cta_clicked`
  - filters:
    - `location` is one of `resource_guide_header`, `resource_guide_bottom`
    - `label = Start Free`
    - `kind = signup`
- Denominator:
  - `$pageview`
  - filters:
    - `source = marketing_site`
    - `path` mapped to guide pages
- Breakdown:
  - guide page path or `content_slug`, depending on how the insight is easiest to build in the current project

Interpretation:

- This is the priority ranking view for deciding `push` versus `tighten`.
- A guide with low traffic and high handoff rate often deserves more distribution before more copy work.

## Insight 7: Guide Handoffs By Source

- Name: `Guide handoffs by source`
- Question: which distribution sources produce qualified guide traffic?
- Chart: table
- Event:
  - `marketing_cta_clicked`
- Filter:
  - `location` is one of:
    - `resource_guide_header`
    - `resource_guide_bottom`
  - `label = Start Free`
  - `kind = signup`
- Breakdown:
  - `utm_source`

Optional second view:

- same query, breakdown by `utm_medium`
- same query, breakdown by `utm_campaign`

Interpretation:

- Use this to judge channel quality, not just channel volume.
- If a source drives guide visits but does not show up here, the problem may be message-match or intent quality.

## Optional Insight 8: CTA Position Split

- Name: `Guide CTA position split`
- Question: does the header or bottom CTA do more work?
- Chart: stacked bar or table
- Event:
  - `marketing_cta_clicked`
- Filter:
  - `location` is one of:
    - `resource_guide_header`
    - `resource_guide_bottom`
  - `label = Start Free`
  - `kind = signup`
- Breakdown:
  - `location`

Optional second view:

- same query with a second breakdown by `content_slug`

Interpretation:

- Strong header performance suggests the page already has enough above-the-fold trust.
- Strong bottom performance suggests the guide needs the proof and body content before acting.

## Build Order

Create the dashboard in this order:

1. `Primary guide landings`
2. `Resources hub guide selections`
3. `Guide Start Free handoffs`
4. `Guide Start Free handoff rate`
5. `In-guide related selections`
6. `Guide-to-guide path matrix`
7. `Guide handoffs by source`

That order gets the highest-signal views first.

## Weekly Use

When the dashboard exists, answer these questions every week:

- Which one guide earned more distribution?
- Which one guide needs tighter copy before more promotion?
- Which guide-to-guide path shows the strongest workflow intent?
- Which source is driving the best guide-to-app handoffs?

## Do Not Add Yet

Avoid widening this dashboard until the current guide funnel is working.

Do not add:

- vanity social engagement tiles
- broad website-wide click volume
- app activation tiles that are not tied back to resource-guide handoffs yet
- too many secondary guides in the primary views
