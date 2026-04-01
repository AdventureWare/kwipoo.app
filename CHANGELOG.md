# kwipoo.app

## 0.0.17

### Patch Changes

- 9077699: Keep the public release history synced to newer app versions by falling back to app release drafts and changelog entries when the derived website feed is stale.

## 0.0.16

### Patch Changes

- 3302859: Send website signup handoffs into the app's default first-time onboarding flow instead of skipping ahead to Places, and add clearer login and open-app paths for returning users on the main website CTA surfaces.

## 0.0.15

### Patch Changes

- 3ccb27a: Add a public delete-account request page and link it from the footer.

## 0.0.14

### Patch Changes

- 6534e49: Add a public delete-data request page and link it from the footer.

## 0.0.13

### Patch Changes

- 897330d: Enable the docs section by default unless `PUBLIC_FEATURE_DOCS` explicitly disables it.
- 897330d: Expand the reusable feature badge system so docs and marketing surfaces can show labels like Coming Soon, New, and Updated in addition to Beta and Premium.
- 897330d: Update feature status badges so Sets, Events, Social, and Profile are marked as beta.
- 897330d: Update the homepage feature sections so their Learn More buttons open the matching documentation pages.
- 897330d: Add a local mock Premium checkout flow that can be used to walk through the purchase experience.
- 897330d: Keep unfinished resources and release-history pages out of indexing and centralize footer social links in shared site config.
- 897330d: Add Premium signup wiring with configurable checkout and signup handoff URLs.
- 897330d: Add a draft pricing page scaffold with placeholder Free, Premium, and Custom plan content.
- 897330d: Remove the Support link from the shared site header navigation.
- 897330d: Add Coming Soon badges to the Articles, Videos, and Tutorials cards on the Resources page.
- 897330d: Clean up placeholder-style wording on the Resources landing page so the page reads more like finished marketing copy.
- 897330d: Add the first audience-specific guides to the Resources section for outdoor gear, households, and travel-heavy routines.
- 897330d: Include live resource pages in the public sitemap so search engines can discover the enabled Resources section.
- 897330d: Point the main marketing-site acquisition CTAs to the signup flow instead of the generic login screen.
- 897330d: Refresh the homepage, header, and footer with more polished layout framing, richer section hierarchy, and refined visual treatments across key marketing surfaces.
- 897330d: Add a public support page and link it from the shared site navigation.
- 897330d: Add reusable feature status badges for docs and homepage feature sections.
- 897330d: Update the docs to use the current visibility labels: Public, Friends Only, and Owner Only.

## 0.0.12

### Patch Changes

- ecd6bad: Update the public docs pages to follow the feature documentation source more closely, including section-level workflow guidance, field tables, and richer formatting for feature details.
- ecd6bad: Align the marketing site's Skeleton theme tokens and shared UI colors with the app's Kwipoo teal brand palette.
- ecd6bad: Make the marketing docs route and navigation depend on a public feature flag, and document local flag overrides for development and testing.
- ecd6bad: Refresh the docs landing page with a documentation-style layout and topic navigation.
- ecd6bad: Improve docs and navigation button/card text contrast by using neutral foreground colors on branded and dark surfaces.
- ecd6bad: Improve docs readability by shifting the documentation landing page, article content, and docs navigation back to neutral text tokens instead of accent-heavy copy styling.
- ecd6bad: Improve SEO and AI discoverability with richer metadata, structured data, crawl files, and homepage FAQ content.
- ecd6bad: Replace the docs directory accordion with a persistent Skeleton sidebar navigation menu.
- ecd6bad: Refactor the marketing site UI wrappers to use Skeleton button, badge, and card primitives with the existing Kwipoo theme colors.
- ecd6bad: Refresh SEO and AI discovery metadata, including richer structured data, cleaner sitemap rules, and updated `llms.txt` summaries for the current docs and marketing content.
- ecd6bad: Rebuild the marketing site header with Skeleton navigation primitives while preserving the existing CTA flow and responsive link behavior.

## 0.0.11

### Patch Changes

- 27fb291: Install Skeleton for Svelte and start using Skeleton components and utilities in the documentation experience.
- 78facdb: Polish the public marketing site with improved homepage responsiveness, cleaner legal-page links and copy, and repo automation for release management.
- 27fb291: Add a new website documentation section with a docs landing page, feature guide stubs, and navigation links.
- 27fb291: Rework the website documentation into a directory-style browsing experience with a shared docs sidebar, clearer topic grouping, and stronger page-to-page navigation.
- 27fb291: Disable the public documentation section behind a site feature flag and remove docs navigation links while it is turned off.
