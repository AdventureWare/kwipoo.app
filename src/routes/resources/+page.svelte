<script lang="ts">
  import { resolve } from "$app/paths";
  import { trackAnalyticsEvent } from "$lib/analytics";
  import FeatureStatusBadge from "$lib/components/ui/feature-status-badge.svelte";
  import { getResourcesHref, resourceGuides } from "$lib/content/resources";
  import {
    ANALYTICS_EVENT_NAMES,
    createResourceGuideSelectedProperties,
  } from "$lib/analytics/schema";
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

  const resourcesTitle =
    "Home Inventory, Storage, Packing, and Moving Guides | Kwipoo";
  const resourcesDescription =
    "Browse Kwipoo guides, comparisons, and decision pages for home inventory, storage bins, storage units, duplicate-buy prevention, camping gear organization, moving checklists, packing systems, and multi-location organization.";

  const resourceFormats: ResourceFormat[] = [
    {
      title: "Articles",
      description:
        "Written guides for common workflows, feature context, and setup decisions.",
      cadence: "Live now",
    },
    {
      title: "Videos",
      description:
        "Short walkthroughs that show how a workflow looks inside the product.",
      cadence: "Planned",
      badge: FEATURE_BADGE_PRESETS.comingSoon,
    },
    {
      title: "Tutorials",
      description:
        "Follow-along lessons for getting started and building a system step by step.",
      cadence: "Planned",
      badge: FEATURE_BADGE_PRESETS.comingSoon,
    },
  ];

  const resourceTracks: ResourceTrack[] = [
    {
      title: "Home inventory",
      audience: "Anyone building a system they can keep updated",
      summary:
        "Start with a practical inventory structure that mirrors real rooms, bins, and storage habits instead of a perfect spreadsheet.",
    },
    {
      title: "Storage and bins",
      audience: "Closets, totes, shelves, and long-term storage",
      summary:
        "Name bins more clearly, connect them to real storage locations, and stop turning packed-away items into mystery boxes.",
    },
    {
      title: "Packing systems",
      audience: "Trips, camping, and recurring events",
      summary:
        "Turn repeat trips and event prep into reusable packing workflows instead of rebuilding the same list every time.",
    },
    {
      title: "Outdoor adventures",
      audience: "Camping, hiking, and gear-heavy hobbies",
      summary:
        "Track camping gear, build reusable kits, and check what is missing before the trip starts.",
    },
    {
      title: "Home organization",
      audience: "Families, couples, and roommates",
      summary:
        "Keep shared household items easier to find, easier to store, and less likely to be bought twice.",
    },
    {
      title: "Travel, moving, and multi-location life",
      audience: "Belongings split between home, storage, and temporary places",
      summary:
        "Keep a clearer picture of what is at home, in storage, in transit, or temporarily elsewhere without rebuilding the map each time.",
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
  const resourceGuideCount = featuredResources.length;

  const resourcesStructuredData = {
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
  };

  function resolveResourceHref(slug: string): string {
    return resolvePath(getResourcesHref(slug));
  }

  function trackResourceHubGuideClick(resource: ResourceEntry): void {
    void trackAnalyticsEvent(
      ANALYTICS_EVENT_NAMES.resourceGuideSelected,
      createResourceGuideSelectedProperties({
        location: "resources_hub",
        content_slug: resource.slug,
        content_title: resource.title,
        content_audience: resource.audience,
        content_format: resource.format,
        content_read_time: resource.readTime,
        destination: resolveResourceHref(resource.slug),
      }),
    );
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
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(resourcesStructuredData)}
  </svelte:element>
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
          Resources
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Pick the guide that matches the problem you want to solve.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Start with the situation that already costs you time: building a home
          inventory that stays current, finding what is packed away, avoiding
          duplicate purchases, planning repeat trips, moving without losing
          track of essentials, or keeping items straight across home, storage,
          and travel.
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
            Start with the workflow that sounds familiar.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            These {resourceGuideCount} guides stay practical: what to track
            first, how to structure places and bins, and where Kwipoo fits when
            you are ready to set up your own system.
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
            Home inventory, storage bins, storage units, duplicate-buy
            prevention, moving checklists, repeatable packing, outdoor gear,
            households, and multi-location organization.
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
        More ways to learn are on the way.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        Written guides are live now. Video walkthroughs and follow-along
        tutorials are planned for the same everyday workflows.
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
            onclick={() => trackResourceHubGuideClick(resource)}
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
