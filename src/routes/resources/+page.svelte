<script lang="ts">
  import { resolve } from "$app/paths";
  import FeatureStatusBadge from "$lib/components/ui/feature-status-badge.svelte";
  import { getResourcesHref, resourceGuides } from "$lib/content/resources";
  import {
    type FeatureBadge,
    FEATURE_BADGE_PRESETS,
  } from "$lib/types/feature-badges";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";
  const resolvePath = resolve as unknown as (path: string) => string;

  type ResourceFormat = {
    title: string;
    description: string;
    cadence: string;
    badge?: FeatureBadge;
  };

  type ResourceTrack = {
    title: string;
    audience: string;
    summary: string;
  };

  type ResourceEntry = {
    slug: string;
    audience: string;
    title: string;
    format: string;
    readTime: string;
    summary: string;
  };

  const resourcesTitle = "Kwipoo Resources | Articles, Videos, and Tutorials";
  const resourcesDescription =
    "Browse Kwipoo resource guides for households, outdoor setups, travel prep, and other real-world inventory workflows.";

  const resourceFormats: ResourceFormat[] = [
    {
      title: "Articles",
      description:
        "Written pieces for workflows, feature introductions, and practical organization ideas.",
      cadence: "Evergreen references and updates",
      badge: FEATURE_BADGE_PRESETS.comingSoon,
    },
    {
      title: "Videos",
      description:
        "Short visual walkthroughs that show the product in motion and explain real setup patterns.",
      cadence: "Product demos and guided explainers",
      badge: FEATURE_BADGE_PRESETS.comingSoon,
    },
    {
      title: "Tutorials",
      description:
        "Step-by-step learning paths for getting started, building inventory structure, and improving routines.",
      cadence: "Hands-on, follow-along teaching",
      badge: FEATURE_BADGE_PRESETS.comingSoon,
    },
  ];

  const resourceTracks: ResourceTrack[] = [
    {
      title: "Outdoor adventures",
      audience: "Camping, hiking, and gear-heavy hobbies",
      summary:
        "Organize gear, build reusable kits, and make sure trips do not fall apart because something critical stayed behind.",
    },
    {
      title: "Home organization",
      audience: "Families, couples, and roommates",
      summary:
        "Bring order to shared household items, seasonal storage, and the everyday essentials that tend to disappear into drawers and bins.",
    },
    {
      title: "Travel and moving",
      audience: "Frequent travelers and multi-location lives",
      summary:
        "Keep belongings visible across suitcases, storage, temporary stays, and repeat packing workflows.",
    },
  ];

  const featuredResources: ResourceEntry[] = resourceGuides.map((guide) => ({
    slug: guide.slug,
    audience: guide.audience,
    title: guide.title,
    format: guide.format,
    readTime: guide.readTime,
    summary: guide.summary,
  }));

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

  function resolveResourceHref(slug: string): string {
    return resolvePath(getResourcesHref(slug));
  }
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
  <script type="application/ld+json">
{resourcesStructuredData}
  </script>
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
          Practical guides for organizing real life with Kwipoo.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Start with audience-specific guides for outdoor gear, shared
          households, and travel-heavy routines. Each guide focuses on a
          specific setup problem so people can see how Kwipoo fits into daily
          life, not just how the feature list reads on paper.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            Available Now
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            Start with three practical guides.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            These guides are organized around real households, trips, and gear
            setups so the advice stays concrete from the first read.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/80 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Live now
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            Outdoor adventurers, households, and frequent travelers or movers.
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
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        The library is designed to support more than one way of learning.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        Written guides are available now, with videos and tutorials planned for
        the same practical, real-world workflows.
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
          <div class="mt-3 flex flex-wrap items-center gap-2">
            <h3 class="text-[1.2rem] font-semibold leading-tight text-surface-950">
              {format.title}
            </h3>
            {#if format.badge}
              <FeatureStatusBadge badge={format.badge} />
            {/if}
          </div>
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
        Guide Tracks
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
        Available Guides
      </p>
      <div class="mt-4 grid gap-4">
        {#each featuredResources as resource (resource.slug)}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={resolveResourceHref(resource.slug)}
            class="card card-hover rounded-[1.1rem] border border-surface-200 bg-white p-4 shadow-sm hover:border-primary-200"
          >
            <p
              class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted"
            >
              {resource.format} • {resource.readTime}
            </p>
            <h3 class="mt-2 text-[1.15rem] font-semibold text-surface-950">
              {resource.title}
            </h3>
            <p class="mt-2 text-sm font-medium text-primary-700">
              {resource.audience}
            </p>
            <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
              {resource.summary}
            </p>
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {/each}
      </div>
    </article>
  </section>
</div>
