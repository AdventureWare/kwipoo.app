# kwipoo.app

## 0.0.13

### Patch Changes

- 1f04f34: Enable the docs section by default unless `PUBLIC_FEATURE_DOCS` explicitly disables it.
- 1f04f34: Update the homepage feature sections so their Learn More buttons open the matching documentation pages.
- 335c339: Update the docs to use the current visibility labels: Public, Friends Only, and Owner Only.

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
