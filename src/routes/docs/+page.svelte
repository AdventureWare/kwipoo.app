<script lang="ts">
  import { resolve } from "$app/paths";
  import DocsTableOfContents from "$lib/components/ui/docs-table-of-contents.svelte";
  import {
    docsLandingTocItems,
    docsPages,
    getDocsCategoryGroups,
    getDocsHref,
  } from "$lib/content/docs";
  import FeatureStatusBadge from "$lib/components/ui/feature-status-badge.svelte";
  import { APP_LOGIN_URL, SITE_NAME } from "$lib/config/site";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  const resolvePath = resolve as unknown as (path: string) => string;

  const categoryGroups = getDocsCategoryGroups();
  const startHerePages =
    categoryGroups.find((group) => group.category === "Start here")?.pages ??
    [];
  const featuredPages = docsPages.filter((page) =>
    ["things", "sets", "events", "social"].includes(page.slug),
  );

  function resolveDocsHref(slug: string): string {
    return resolvePath(getDocsHref(slug));
  }

  const docsTitle =
    "Kwipoo Documentation | Inventory, Storage, and Packing Guides";
  const docsDescription =
    "Browse setup guides, feature overviews, and reference pages for organizing your inventory in Kwipoo.";
  const docsStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Kwipoo Documentation",
        url: toAbsoluteMarketingUrl("/docs"),
        description: docsDescription,
        about: docsPages.map((page) => page.title),
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
      ]),
    ],
  };
</script>

<svelte:head>
  <title>{docsTitle}</title>
  <meta name="description" content={docsDescription} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={docsTitle} />
  <meta property="og:description" content={docsDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={toAbsoluteMarketingUrl("/docs")} />
  <meta name="twitter:title" content={docsTitle} />
  <meta name="twitter:description" content={docsDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(docsStructuredData)}
  </svelte:element>
</svelte:head>

<header class="space-y-4">
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
  >
    <a href={resolve("/")} class="transition-colors hover:text-color"> Home </a>
    <span aria-hidden="true">/</span>
    <span class="text-brand-body">Docs</span>
  </nav>

  <p
    class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
  >
    Documentation
  </p>
  <h1
    class="text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.2rem]"
  >
    Documentation
  </h1>
  <p class="max-w-4xl text-lg leading-8 text-brand-body">
    Start here if you are setting up Kwipoo for the first time or need a quick
    refresher on how the inventory model fits together. These guides cover the
    core structure first, then the features that build on it.
  </p>
</header>

<article class="mt-8 grid gap-10">
  <section id={docsLandingTocItems[0].id} class="grid gap-5">
    <p class="text-lg leading-8 text-color">
      If you are new, begin with the setup guides. Once the basics are clear,
      jump to the feature pages that match how you actually use Kwipoo.
    </p>

    <div class="xl:hidden">
      <DocsTableOfContents items={docsLandingTocItems} />
    </div>

    <div
      class="brand-outline-card card rounded-[1.5rem] border border-brand-border bg-brand-panel/80 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Recommended flow
      </p>
      <p class="mt-3 text-[1.15rem] leading-7 text-color">
        Most people get the clearest start by creating an account, then setting
        up Places, Spots, and Things before moving on to Sets, Events, and
        sharing features.
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={`#${docsLandingTocItems[1].id}`}
          class="btn btn-sm preset-filled-primary-500 w-auto text-surface-950"
        >
          Start here
        </a>
        <a
          href={`#${docsLandingTocItems[2].id}`}
          class="btn btn-sm w-auto border border-brand-border bg-brand-canvas text-surface-950 hover:bg-brand-panel"
        >
          Browse topics
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </div>
  </section>

  <section id={docsLandingTocItems[1].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Start Here
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Start with the basics.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        These guides explain the setup and terminology the rest of the docs
        assume.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      {#each startHerePages as docPage (docPage.slug)}
        <a
          href={resolveDocsHref(docPage.slug)}
          class="brand-outline-card card card-hover flex h-full flex-col gap-3 rounded-[1.35rem] border border-brand-border bg-brand-canvas/92 p-5 shadow-sm hover:border-primary-300"
        >
          <div class="flex flex-wrap items-center gap-2">
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              {docPage.eyebrow}
            </p>
            {#if docPage.badge}
              <FeatureStatusBadge badge={docPage.badge} />
            {/if}
          </div>
          <h3
            class="text-[1.25rem] font-semibold leading-tight text-color"
          >
            {docPage.title}
          </h3>
          <p class="text-[0.98rem] leading-6 text-brand-body">
            {docPage.summary}
          </p>
        </a>
      {/each}

      <a
        href={APP_LOGIN_URL}
        class="card card-hover flex h-full flex-col gap-3 rounded-[1.35rem] border border-primary-300 bg-primary-50 p-5 shadow-sm hover:border-primary-400"
      >
        <p
          class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
      >
        Product Access
      </p>
      <h3 class="text-[1.25rem] font-semibold leading-tight text-surface-950">
        Keep Kwipoo open while you read.
      </h3>
      <p class="text-[0.98rem] leading-6 text-brand-body">
        It is easier to follow the guides with the app open in another tab so
        you can check your setup as you go.
      </p>
      </a>
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </section>

  <section id={docsLandingTocItems[2].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Browse Topics
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Browse by topic.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        These groups match the docs sidebar, so the landing page and the rest
        of the library stay organized the same way.
      </p>
    </div>

    <div class="grid gap-5">
      {#each categoryGroups as group (group.category)}
        <section
          class="brand-outline-card card rounded-[1.5rem] border border-brand-border bg-brand-panel/80 p-6 shadow-sm"
        >
          <div class="space-y-3 border-b border-brand-border pb-5">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              {group.category}
            </p>
            <h3
              class="text-[1.35rem] font-semibold leading-tight text-color"
            >
              {group.description}
            </h3>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            {#each group.pages as docPage (docPage.slug)}
              <a
                href={resolveDocsHref(docPage.slug)}
                class="brand-outline-card card card-hover rounded-[1.2rem] border border-brand-border bg-brand-canvas/92 p-4 hover:border-primary-300"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <p
                    class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
                  >
                    {docPage.eyebrow}
                  </p>
                  {#if docPage.badge}
                    <FeatureStatusBadge badge={docPage.badge} />
                  {/if}
                </div>
                <h4
                  class="mt-2 text-[1.1rem] font-semibold leading-tight text-color"
                >
                  {docPage.title}
                </h4>
                <p class="mt-2 text-[0.95rem] leading-6 text-brand-body">
                  {docPage.summary}
                </p>
              </a>
            {/each}
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          </div>
        </section>
      {/each}
    </div>
  </section>

  <section id={docsLandingTocItems[3].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Continue Reading
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Go deeper where you need it.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        If you are past the initial setup, these are good next reads for item
        tracking, reusable kits, event planning, and coordination with other
        people.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      {#each featuredPages as docPage (docPage.slug)}
        <a
          href={resolveDocsHref(docPage.slug)}
          class="brand-outline-card card card-hover rounded-[1.2rem] border border-brand-border bg-brand-canvas/92 p-5 shadow-sm hover:border-primary-300"
        >
          <div class="flex flex-wrap items-center gap-2">
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              {docPage.eyebrow}
            </p>
            {#if docPage.badge}
              <FeatureStatusBadge badge={docPage.badge} />
            {/if}
          </div>
          <h3
            class="mt-2 text-[1.15rem] font-semibold leading-tight text-color"
          >
            {docPage.title}
          </h3>
          <p class="mt-2 text-[0.95rem] leading-6 text-brand-body">
            {docPage.summary}
          </p>
        </a>
      {/each}
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </section>
</article>
