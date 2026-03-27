<script lang="ts">
  import { resolve } from "$app/paths";
  import { SITE_NAME } from "$lib/config/site";
  import {
    getLatestWebsiteRelease,
    websiteReleaseNotes,
    type WebsiteReleaseNote,
  } from "$lib/content/releases";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";

  const releaseTitle = "Kwipoo Release History | Product Updates";
  const releaseDescription =
    "Browse shipped Kwipoo releases, product improvements, and recent fixes in one public changelog archive.";
  const latestRelease = getLatestWebsiteRelease();

  const importanceLabels: Record<WebsiteReleaseNote["importance"], string> = {
    quiet: "Polish update",
    notable: "Feature update",
    launch: "Launch release",
    urgent: "Important fix",
  };

  const importanceBadgeClasses: Record<WebsiteReleaseNote["importance"], string> =
    {
      quiet: "border-surface-200 bg-surface-100 text-surface-700",
      notable: "border-primary-200 bg-primary-50 text-primary-700",
      launch: "border-secondary-200 bg-secondary-50 text-secondary-700",
      urgent: "border-warning-200 bg-warning-50 text-warning-700",
    };

  function formatPublishedDate(dateString: string): string {
    const publishedDate = new Date(`${dateString}T00:00:00Z`);

    if (Number.isNaN(publishedDate.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(publishedDate);
  }

  function formatPlatformTargets(release: WebsiteReleaseNote): string {
    return release.platformTargets
      .map((platform) =>
        platform === "ios_wrapper"
          ? "iOS"
          : platform === "android_wrapper"
            ? "Android"
            : "Web",
      )
      .join(" / ");
  }

  function getReleaseAnchor(version: string): string {
    return `release-${version.replace(/\./g, "-")}`;
  }

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
      {
        "@type": "ItemList",
        itemListElement: websiteReleaseNotes.map((release, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${toAbsoluteMarketingUrl("/releases")}#${getReleaseAnchor(release.version)}`,
          name: `${release.version}: ${release.title}`,
        })),
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Release History", path: "/releases" },
      ]),
    ],
  });

  void releaseStructuredData;
</script>

<svelte:head>
  <title>{releaseTitle}</title>
  <meta name="description" content={releaseDescription} />
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

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.9fr)]">
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Product Updates
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          A public archive of shipped Kwipoo releases.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Every published version now lands here with the main improvements,
          fixes, and follow-up details in one readable place.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-linear-to-br from-primary-50 via-white to-secondary-50 p-6 shadow-sm"
      >
        {#if latestRelease}
          <div class="space-y-3">
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
            >
              Latest Release
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-[1.45rem] font-semibold leading-tight text-surface-950">
                Version {latestRelease.version}
              </h2>
              <span
                class={`rounded-full border px-3 py-1 text-sm font-semibold ${importanceBadgeClasses[latestRelease.importance]}`}
              >
                {importanceLabels[latestRelease.importance]}
              </span>
            </div>
            <p class="text-[0.98rem] leading-7 text-brand-body">
              {latestRelease.title}
            </p>
          </div>

          <div class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4">
            <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
              Shipped
            </p>
            <p class="mt-2 text-base font-semibold text-surface-950">
              {formatPublishedDate(latestRelease.publishedAt)}
            </p>
            <p class="mt-3 text-sm leading-6 text-brand-body">
              {formatPlatformTargets(latestRelease)}
            </p>
          </div>
        {/if}
      </aside>
    </div>
  </header>

  {#if latestRelease}
    <section class="grid gap-5">
      <div class="space-y-3">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Newest Shipped Version
        </p>
        <h2
          class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
        >
          {latestRelease.version}: {latestRelease.title}
        </h2>
        <p class="max-w-4xl text-lg leading-8 text-brand-body">
          {latestRelease.summary}
        </p>
      </div>

      <article
        class="card grid gap-5 rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="space-y-2">
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              {formatPublishedDate(latestRelease.publishedAt)}
            </p>
            <p class="text-sm leading-6 text-brand-body">
              {formatPlatformTargets(latestRelease)}
            </p>
          </div>

        </div>

        <div class="grid gap-3 md:grid-cols-3">
          {#each latestRelease.highlights as highlight (highlight)}
            <div
              class="rounded-[1.15rem] border border-primary-200 bg-white p-4"
            >
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
                Highlight
              </p>
              <p class="mt-3 text-[0.98rem] leading-7 text-brand-body">
                {highlight}
              </p>
            </div>
          {/each}
        </div>

        {#if latestRelease.details.length > 0}
          <div class="rounded-[1.2rem] border border-surface-200 bg-white p-5">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              More In This Release
            </p>
            <ul class="mt-4 grid gap-3 pl-5 text-[0.98rem] leading-7 text-brand-body">
              {#each latestRelease.details as detail (detail)}
                <li class="list-disc">{detail}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </article>
    </section>
  {/if}

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Release Archive
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        Version-by-version notes, newest first.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        This page is synced from the app release records, so the website archive
        stays aligned with the actual shipped product history.
      </p>
    </div>

    <div class="grid gap-4">
      {#each websiteReleaseNotes as release (release.version)}
        <article
          id={getReleaseAnchor(release.version)}
          class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
        >
          <div
            class="flex flex-wrap items-start justify-between gap-4 border-b border-surface-200 pb-5"
          >
            <div class="space-y-2">
              <p
                class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
              >
                {formatPublishedDate(release.publishedAt)}
              </p>
              <h3 class="text-[1.5rem] font-semibold leading-tight text-surface-950">
                Version {release.version}
              </h3>
              <p class="text-sm leading-6 text-brand-body">
                {formatPlatformTargets(release)}
              </p>
            </div>

            <span
              class={`rounded-full border px-3 py-1 text-sm font-semibold ${importanceBadgeClasses[release.importance]}`}
            >
              {importanceLabels[release.importance]}
            </span>
          </div>

          <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div class="space-y-4">
              <div class="space-y-3">
                <h4 class="text-[1.2rem] font-semibold leading-tight text-surface-950">
                  {release.title}
                </h4>
                <p class="text-[1rem] leading-7 text-brand-body">
                  {release.summary}
                </p>
              </div>

              <ul class="grid gap-3 pl-5 text-[0.98rem] leading-7 text-brand-body">
                {#each release.highlights as highlight (highlight)}
                  <li class="list-disc">{highlight}</li>
                {/each}
              </ul>
            </div>

            {#if release.details.length > 0}
              <div class="rounded-[1.15rem] border border-surface-200 bg-white p-5">
                <p
                  class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
                >
                  Additional Notes
                </p>
                <ul class="mt-4 grid gap-3 pl-5 text-[0.95rem] leading-7 text-brand-body">
                  {#each release.details as detail (detail)}
                    <li class="list-disc">{detail}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  </section>
</div>
