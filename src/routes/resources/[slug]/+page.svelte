<script lang="ts">
  import { resolve } from "$app/paths";
  import DocsSectionContent from "$lib/components/ui/docs-section-content.svelte";
  import {
    getResourceGuideTocItems,
    getResourcesHref,
  } from "$lib/content/resources";
  import { APP_LOGIN_URL } from "$lib/config/site";
  import {
    ORGANIZATION_ID,
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import type { PageData } from "./$types";

  const resolvePath = resolve as unknown as (path: string) => string;

  let { data }: { data: PageData } = $props();

  let sectionEntries = $derived(
    data.resourceGuide.sections.map((section) => ({
      id:
        getResourceGuideTocItems(data.resourceGuide).find(
          (item) => item.label === section.heading,
        )?.id ?? section.heading,
      section,
    })),
  );
  let tocItems = $derived(getResourceGuideTocItems(data.resourceGuide));
  let inlineRelatedResources = $derived(data.relatedResources.slice(0, 2));
  let seoTitle = $derived(
    data.resourceGuide.seoTitle ?? `${data.resourceGuide.title} | Kwipoo Resources`,
  );
  let seoDescription = $derived(
    data.resourceGuide.seoDescription ?? data.resourceGuide.description,
  );
  let guideUrl = $derived(
    toAbsoluteMarketingUrl(getResourcesHref(data.resourceGuide.slug)),
  );
  let resourceStructuredData = $derived(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: data.resourceGuide.title,
          description: seoDescription,
          url: guideUrl,
          mainEntityOfPage: guideUrl,
          image: toAbsoluteMarketingUrl(data.resourceGuide.image.src),
          articleSection: "Resources",
          audience: {
            "@type": "Audience",
            audienceType: data.resourceGuide.audience,
          },
          publisher: {
            "@id": ORGANIZATION_ID,
          },
          isPartOf: {
            "@type": "CollectionPage",
            name: "Kwipoo Resources",
            url: toAbsoluteMarketingUrl("/resources"),
          },
        },
        ...(data.resourceGuide.faqItems?.length
          ? [
              {
                "@type": "FAQPage",
                mainEntity: data.resourceGuide.faqItems.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ]
          : []),
        getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          {
            name: data.resourceGuide.title,
            path: getResourcesHref(data.resourceGuide.slug),
          },
        ]),
      ],
    },
  );

  function resolveResourceHref(slug: string): string {
    return resolvePath(getResourcesHref(slug));
  }
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoDescription} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta
    property="og:title"
    content={seoTitle}
  />
  <meta property="og:description" content={seoDescription} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={guideUrl} />
  <meta
    property="og:image"
    content={toAbsoluteMarketingUrl(data.resourceGuide.image.src)}
  />
  <meta property="og:image:alt" content={data.resourceGuide.image.alt} />
  <meta property="article:section" content="Resources" />
  <meta
    name="twitter:title"
    content={seoTitle}
  />
  <meta name="twitter:description" content={seoDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(resourceStructuredData)}
  </svelte:element>
</svelte:head>

<header class="space-y-4">
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
  >
    <a href={resolve("/")} class="transition-colors hover:text-color">Home</a>
    <span aria-hidden="true">/</span>
    <a href={resolve("/resources")} class="transition-colors hover:text-color">
      Resources
    </a>
    <span aria-hidden="true">/</span>
    <span class="text-brand-body">{data.resourceGuide.title}</span>
  </nav>

  <div class="flex flex-wrap items-center gap-3">
    <p
      class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      {data.resourceGuide.eyebrow}
    </p>
    <p class="text-sm font-medium text-brand-body">
      {data.resourceGuide.audience}
    </p>
    <p class="text-sm font-medium text-brand-body">
      {data.resourceGuide.format} • {data.resourceGuide.readTime}
    </p>
  </div>

  <h1
    class="max-w-5xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.2rem]"
  >
    {data.resourceGuide.title}
  </h1>
  <p class="max-w-4xl text-lg leading-8 text-brand-body">
    {data.resourceGuide.description}
  </p>
</header>

<article class="mt-8 grid gap-10">
  <section
    class="card rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
  >
    <p
      class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
    >
      What this guide helps with
    </p>
    <p class="mt-3 max-w-4xl text-[1.08rem] leading-7 text-surface-950">
      {data.resourceGuide.summary}
    </p>

    <div class="mt-5 flex flex-wrap gap-3">
      {#each tocItems as item (item.id)}
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={`#${item.id}`}
          class="btn btn-sm preset-outlined-primary-500 w-auto rounded-full border-primary-300 bg-white text-primary-800 hover:bg-primary-100"
        >
          {item.label}
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      {/each}
    </div>
  </section>

  {#each sectionEntries as entry, index (entry.id)}
    <DocsSectionContent id={entry.id} section={entry.section} />

    {#if index === 1 && inlineRelatedResources.length > 0}
      <section
        class="card rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
        >
          Keep Going
        </p>
        <h2
          class="mt-3 text-[1.55rem] font-semibold leading-tight text-surface-950"
        >
          Related guides in the same workflow
        </h2>
        <p class="mt-3 max-w-3xl text-[0.98rem] leading-7 text-brand-body">
          If this guide matches the problem you are solving, these are usually
          the next practical guides people need.
        </p>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          {#each inlineRelatedResources as guide (guide.slug)}
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <a
              href={resolveResourceHref(guide.slug)}
              class="card card-hover rounded-[1.15rem] border border-primary-200 bg-white p-4 shadow-sm hover:border-primary-300"
            >
              <p
                class="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-muted"
              >
                {guide.audience}
              </p>
              <h3 class="mt-2 text-[1.1rem] font-semibold text-surface-950">
                {guide.title}
              </h3>
              <p class="mt-2 text-[0.95rem] leading-6 text-brand-body">
                {guide.summary}
              </p>
            </a>
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          {/each}
        </div>
      </section>
    {/if}
  {/each}

  {#if data.resourceGuide.faqItems?.length}
    <section class="grid gap-5">
      <div class="space-y-3">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Common Questions
        </p>
        <h2
          class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
        >
          Quick answers before you set this up
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        {#each data.resourceGuide.faqItems as item (item.question)}
          <article
            class="card rounded-[1.3rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
          >
            <h3 class="text-[1.08rem] font-semibold leading-tight text-surface-950">
              {item.question}
            </h3>
            <p class="mt-3 text-[0.96rem] leading-7 text-brand-body">
              {item.answer}
            </p>
          </article>
        {/each}
      </div>
    </section>
  {/if}

  <section
    class="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]"
  >
    <article
      class="card rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
      >
        Next step
      </p>
      <h2
        class="mt-3 text-[1.6rem] font-semibold leading-tight text-surface-950"
      >
        Open Kwipoo and start with the items you search for, pack, or replace
        most often.
      </h2>
      <p class="mt-3 max-w-2xl text-[0.98rem] leading-7 text-brand-body">
        You do not need a perfect system on day one. Add the items, locations,
        and recurring setups that save you the most time or stress, then expand
        from there.
      </p>
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      <a
        href={APP_LOGIN_URL}
        class="btn preset-filled-primary-500 mt-5 inline-flex w-fit rounded-full text-surface-950"
      >
        Open Kwipoo
      </a>
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </article>

    {#if data.relatedResources.length > 0}
      <article
        class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
      >
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Related guides
        </p>
        <div class="mt-4 grid gap-4">
          {#each data.relatedResources as guide (guide.slug)}
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <a
              href={resolveResourceHref(guide.slug)}
              class="card card-hover preset-filled-surface-50-950 rounded-[1.15rem] border border-surface-200-800 p-4 shadow-sm hover:border-primary-200-800"
            >
              <p
                class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-surface-300"
              >
                {guide.audience}
              </p>
              <h3 class="mt-2 text-[1.1rem] font-semibold text-surface-50">
                {guide.title}
              </h3>
              <p class="mt-2 text-[0.95rem] leading-6 text-surface-100">
                {guide.summary}
              </p>
            </a>
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          {/each}
        </div>
      </article>
    {/if}
  </section>
</article>
