<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import DocsSectionContent from "$lib/components/ui/docs-section-content.svelte";
  import {
    getDocsHref,
    getDocsSectionId,
  } from "$lib/content/docs";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let sectionEntries = $derived(
    data.docPage.sections.map((section) => ({
      id: getDocsSectionId(section.heading),
      section,
    })),
  );

  function resolveDocsHref(slug: string): string {
    return resolve(getDocsHref(slug) as Pathname);
  }

  let docUrl = $derived(toAbsoluteMarketingUrl(getDocsHref(data.docPage.slug)));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let docsStructuredData = $derived(
    toSeoJsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechArticle",
          headline: data.docPage.title,
          description: data.docPage.description,
          url: docUrl,
          image: toAbsoluteMarketingUrl(data.docPage.image.src),
          articleSection: data.docPage.category,
          about: [data.docPage.eyebrow, data.docPage.title],
          isPartOf: {
            "@type": "CollectionPage",
            name: "Kwipoo Documentation",
            url: toAbsoluteMarketingUrl("/docs"),
          },
        },
        getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: data.docPage.title, path: getDocsHref(data.docPage.slug) },
        ]),
      ],
    }),
  );
</script>

<svelte:head>
  <title>{data.docPage.title} | Kwipoo Docs</title>
  <meta name="description" content={data.docPage.description} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={`${data.docPage.title} | Kwipoo Docs`} />
  <meta property="og:description" content={data.docPage.description} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={docUrl} />
  <meta name="twitter:title" content={`${data.docPage.title} | Kwipoo Docs`} />
  <meta name="twitter:description" content={data.docPage.description} />
  <script type="application/ld+json">{docsStructuredData}</script>
</svelte:head>

<header class="space-y-4">
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
  >
    <a href={resolve("/")} class="transition-colors hover:text-color">
      Home
    </a>
    <span aria-hidden="true">/</span>
    <a
      href={resolve("/docs")}
      class="transition-colors hover:text-color"
    >
      Docs
    </a>
    <span aria-hidden="true">/</span>
    <span class="text-brand-body">{data.docPage.title}</span>
  </nav>

  <p class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted">
    {data.docPage.eyebrow}
  </p>
  <h1
    class="text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.2rem]"
  >
    {data.docPage.title}
  </h1>
  <p class="max-w-4xl text-lg leading-8 text-brand-body">
    {data.docPage.description}
  </p>
</header>

<article class="mt-8 grid gap-10">
  <p class="max-w-4xl text-lg leading-8 text-color">
    {data.docPage.summary}
  </p>

  {#each sectionEntries as entry (entry.id)}
    <DocsSectionContent id={entry.id} section={entry.section} />
  {/each}

  {#if data.relatedDocs.length > 0}
    <section class="grid gap-5">
      <div class="space-y-3">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Continue Exploring
        </p>
        <h2
          class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
        >
          Related guides
        </h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        {#each data.relatedDocs as docPage (docPage.slug)}
          <a
            href={resolveDocsHref(docPage.slug)}
            class="card card-hover preset-filled-surface-50-950 rounded-[1.2rem] border border-surface-200-800 p-5 shadow-sm hover:border-primary-200-800"
          >
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-surface-300"
            >
              {docPage.eyebrow}
            </p>
            <h3 class="mt-2 text-[1.15rem] font-semibold leading-tight text-surface-50">
              {docPage.title}
            </h3>
            <p class="mt-2 text-[0.95rem] leading-6 text-surface-100">
              {docPage.summary}
            </p>
          </a>
        {/each}
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </section>
  {/if}
</article>
