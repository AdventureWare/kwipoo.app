<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type ScaffoldSection = {
    title: string;
    description: string;
  };

  type ReleaseChannel = {
    title: string;
    description: string;
  };

  type ReleaseEntry = {
    version: string;
    date: string;
    summary: string;
    notes: string[];
  };

  const releaseTitle = "Kwipoo Release History | App Updates and Changelog";
  const releaseDescription =
    "Follow the Kwipoo app release history for shipped updates, version notes, and changelog details as they become available.";

  const scaffoldSections: ScaffoldSection[] = [
    {
      title: "Version-by-version timeline",
      description:
        "Each release will get a dated entry so product changes can be reviewed in order.",
    },
    {
      title: "Plain-language release notes",
      description:
        "Updates will be grouped by what changed, why it matters, and what to look for after updating.",
    },
    {
      title: "Stable shareable archive",
      description:
        "This page is being structured as a permanent history, not a short-lived launch announcement.",
    },
  ];

  const releaseChannels: ReleaseChannel[] = [
    {
      title: "Major launches",
      description:
        "Milestones, broad product shifts, and feature families worth calling out at the top level.",
    },
    {
      title: "Regular improvements",
      description:
        "Smaller product refinements, workflow updates, and polish that still affects day-to-day use.",
    },
    {
      title: "Fixes and reliability work",
      description:
        "Targeted bug fixes and quality improvements that deserve a durable changelog record.",
    },
  ];

  const releaseEntries: ReleaseEntry[] = [];

  const releaseStructuredData = toSeoJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Kwipoo Release History",
        url: toAbsoluteMarketingUrl("/releases"),
        description: releaseDescription,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Release History", path: "/releases" },
      ]),
    ],
  });

  // The structured data is rendered in <svelte:head>; this keeps ESLint from
  // treating the value as unused in script scope.
  void releaseStructuredData;
</script>

<svelte:head>
  <title>{releaseTitle}</title>
  <meta name="description" content={releaseDescription} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={releaseTitle} />
  <meta property="og:description" content={releaseDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={toAbsoluteMarketingUrl("/releases")} />
  <meta name="twitter:title" content={releaseTitle} />
  <meta name="twitter:description" content={releaseDescription} />
  <script type="application/ld+json">{releaseStructuredData}</script>
</svelte:head>

<div class="grid gap-10 pb-10">
  <header class="grid gap-5">
    <nav
      aria-label="Breadcrumb"
      class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      <a href={resolve("/")} class="transition-colors hover:text-color">Home</a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Release History</span>
    </nav>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.9fr)]">
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          App Releases
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Release history for shipped product updates.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          This page is being prepared as the public changelog archive for
          Kwipoo. Once enabled, it will collect release notes, version summaries,
          and user-facing updates in one place.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            Current Status
          </p>
          <h2 class="text-[1.4rem] font-semibold leading-tight text-surface-950">
            Scaffolded behind a feature flag.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            The route exists, but it is intentionally disabled until release
            content and publishing flow are ready.
          </p>
        </div>

        <div class="rounded-[1.15rem] border border-primary-200 bg-white/80 p-4">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Flag
          </p>
          <p class="mt-2 font-mono text-sm text-surface-950">
            PUBLIC_FEATURE_RELEASE_HISTORY
          </p>
        </div>
      </aside>
    </div>
  </header>

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Planned Structure
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        The page is ready for real release content.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The initial scaffold focuses on durable structure so release notes can be
        added without revisiting navigation, metadata, or route gating.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each scaffoldSections as section (section.title)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <h3 class="text-[1.2rem] font-semibold leading-tight text-surface-950">
            {section.title}
          </h3>
          <p class="mt-3 text-[0.98rem] leading-7 text-brand-body">
            {section.description}
          </p>
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
    <article
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Release Coverage
      </p>
      <div class="mt-4 grid gap-4">
        {#each releaseChannels as channel (channel.title)}
          <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
            <h3 class="text-[1.08rem] font-semibold text-surface-950">
              {channel.title}
            </h3>
            <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
              {channel.description}
            </p>
          </div>
        {/each}
      </div>
    </article>

    <article
      class="card rounded-[1.5rem] border border-dashed border-surface-300 bg-brand-panel p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        First Entries
      </p>
      {#if releaseEntries.length === 0}
        <div class="mt-4 space-y-3">
          <h3 class="text-[1.3rem] font-semibold leading-tight text-surface-950">
            No public release entries yet.
          </h3>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Once this feature is enabled, this column can turn into the first
            published release cards or a reverse-chronological timeline.
          </p>
        </div>
      {:else}
        <div class="mt-4 grid gap-4">
          {#each releaseEntries as entry (entry.version)}
            <section class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                {entry.date}
              </p>
              <h3 class="mt-2 text-[1.15rem] font-semibold text-surface-950">
                {entry.version}
              </h3>
              <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
                {entry.summary}
              </p>
              <ul class="mt-3 grid gap-2 pl-5 text-[0.96rem] leading-7 text-brand-body">
                {#each entry.notes as note (note)}
                  <li class="list-disc">{note}</li>
                {/each}
              </ul>
            </section>
          {/each}
        </div>
      {/if}
    </article>
  </section>
</div>
