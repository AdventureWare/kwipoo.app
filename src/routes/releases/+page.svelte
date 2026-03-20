<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type ReleasePageSection = {
    title: string;
    description: string;
  };

  type ReleaseNoteEntry = {
    version: string;
    date: string;
    summary: string;
    changes: string[];
  };

  const releaseTitle = "Kwipoo Release History | App Updates and Changelog";
  const releaseDescription =
    "Follow the Kwipoo app release history for shipped updates, version notes, and changelog details as they become available.";

  const releasePageSections: ReleasePageSection[] = [
    {
      title: "Version and date",
      description:
        "Each release note will clearly show the version number and when it shipped.",
    },
    {
      title: "What changed",
      description:
        "New features, improvements, and fixes can be grouped into short readable bullets.",
    },
    {
      title: "Important notes",
      description:
        "If a release needs setup details or follow-up guidance, that can live inside the entry.",
    },
  ];

  const placeholderReleaseNote: ReleaseNoteEntry = {
    version: "Version 0.0.0",
    date: "Release date",
    summary:
      "Each release note can open with a short summary of the update and why it matters.",
    changes: [
      "New features and improvements will be listed here.",
      "Bug fixes and polish can be called out in separate bullets.",
      "Important follow-up notes or upgrade guidance can be added at the end of the entry.",
    ],
  };

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
        Release Notes Format
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        A simple page for version-by-version updates.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The goal here is straightforward: publish a release, add a short entry,
        and make the main changes easy to scan.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each releasePageSections as section (section.title)}
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

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Placeholder Entry
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        Example release note layout.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        This placeholder shows the basic shape of a release notes entry while
        the page is still gated off.
      </p>
    </div>

    <article
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      <div class="flex flex-wrap items-start justify-between gap-4 border-b border-surface-200 pb-5">
        <div class="space-y-2">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
          >
            {placeholderReleaseNote.date}
          </p>
          <h3 class="text-[1.5rem] font-semibold leading-tight text-surface-950">
            {placeholderReleaseNote.version}
          </h3>
        </div>
        <span
          class="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700"
        >
          Placeholder
        </span>
      </div>

      <p class="mt-5 text-[1rem] leading-7 text-brand-body">
        {placeholderReleaseNote.summary}
      </p>

      <div class="mt-5 rounded-[1.15rem] border border-surface-200 bg-white p-5">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Changes in this release
        </p>
        <ul class="mt-4 grid gap-3 pl-5 text-[0.98rem] leading-7 text-brand-body">
          {#each placeholderReleaseNote.changes as change (change)}
            <li class="list-disc">{change}</li>
          {/each}
        </ul>
      </div>
    </article>
  </section>
</div>
