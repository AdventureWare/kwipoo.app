<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type ResourceFormat = {
    title: string;
    description: string;
    cadence: string;
  };

  type ResourceTrack = {
    title: string;
    audience: string;
    summary: string;
  };

  type ResourceEntry = {
    title: string;
    format: string;
    duration: string;
    summary: string;
  };

  const resourcesTitle = "Kwipoo Resources | Articles, Videos, and Tutorials";
  const resourcesDescription =
    "Browse planned Kwipoo resources for articles, tutorial guides, product walkthroughs, and video explainers as the content library grows.";

  const resourceFormats: ResourceFormat[] = [
    {
      title: "Articles",
      description:
        "Written pieces for workflows, feature introductions, and practical organization ideas.",
      cadence: "Evergreen references and updates",
    },
    {
      title: "Videos",
      description:
        "Short visual walkthroughs that show the product in motion and explain real setup patterns.",
      cadence: "Product demos and guided explainers",
    },
    {
      title: "Tutorials",
      description:
        "Step-by-step learning paths for getting started, building inventory structure, and improving routines.",
      cadence: "Hands-on, follow-along teaching",
    },
  ];

  const resourceTracks: ResourceTrack[] = [
    {
      title: "Getting started",
      audience: "New users",
      summary:
        "Foundational content for understanding the model, core terms, and where to begin.",
    },
    {
      title: "Real-world setups",
      audience: "Active organizers",
      summary:
        "Examples for homes, storage spaces, travel prep, hobby kits, and recurring event planning.",
    },
    {
      title: "Product education",
      audience: "Evaluators and returning users",
      summary:
        "Guided content that explains new workflows, recent improvements, and how features fit together.",
    },
  ];

  const featuredResources: ResourceEntry[] = [];

  const resourcesStructuredData = toSeoJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Kwipoo Resources",
        url: toAbsoluteMarketingUrl("/resources"),
        description: resourcesDescription,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
      ]),
    ],
  });

  void resourcesStructuredData;
</script>

<svelte:head>
  <title>{resourcesTitle}</title>
  <meta name="description" content={resourcesDescription} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={resourcesTitle} />
  <meta property="og:description" content={resourcesDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={toAbsoluteMarketingUrl("/resources")} />
  <meta name="twitter:title" content={resourcesTitle} />
  <meta name="twitter:description" content={resourcesDescription} />
  <script type="application/ld+json">{resourcesStructuredData}</script>
</svelte:head>

<div class="grid gap-10 pb-10">
  <header class="grid gap-5">
    <nav
      aria-label="Breadcrumb"
      class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      <a href={resolve("/")} class="transition-colors hover:text-color">Home</a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Resources</span>
    </nav>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.9fr)]">
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Content Hub
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          A home for articles, videos, tutorials, and product learning.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          This page is being prepared as the public resource hub for Kwipoo.
          Once enabled, it can collect educational content, walkthroughs, and
          practical examples in one browsable archive.
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
            The route exists, but it stays off until there is real content and a
            publishing cadence to support it.
          </p>
        </div>

        <div class="rounded-[1.15rem] border border-primary-200 bg-white/80 p-4">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Flag
          </p>
          <p class="mt-2 font-mono text-sm text-surface-950">
            PUBLIC_FEATURE_RESOURCES
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
        Formats
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        The page is shaped for mixed-format learning content.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The initial scaffold is designed to support multiple content types
        without making the page feel like a generic blog index.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each resourceFormats as format (format.title)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
          >
            {format.cadence}
          </p>
          <h3 class="mt-3 text-[1.2rem] font-semibold leading-tight text-surface-950">
            {format.title}
          </h3>
          <p class="mt-3 text-[0.98rem] leading-7 text-brand-body">
            {format.description}
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
        Editorial Tracks
      </p>
      <div class="mt-4 grid gap-4">
        {#each resourceTracks as track (track.title)}
          <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              {track.audience}
            </p>
            <h3 class="mt-2 text-[1.08rem] font-semibold text-surface-950">
              {track.title}
            </h3>
            <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
              {track.summary}
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
        Featured Content
      </p>
      {#if featuredResources.length === 0}
        <div class="mt-4 space-y-3">
          <h3 class="text-[1.3rem] font-semibold leading-tight text-surface-950">
            No public resources yet.
          </h3>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Once the flag is enabled, this area can hold featured tutorials,
            latest videos, or a hand-picked reading path.
          </p>
        </div>
      {:else}
        <div class="mt-4 grid gap-4">
          {#each featuredResources as resource (resource.title)}
            <section class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p
                class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted"
              >
                {resource.format} • {resource.duration}
              </p>
              <h3 class="mt-2 text-[1.15rem] font-semibold text-surface-950">
                {resource.title}
              </h3>
              <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
                {resource.summary}
              </p>
            </section>
          {/each}
        </div>
      {/if}
    </article>
  </section>
</div>
