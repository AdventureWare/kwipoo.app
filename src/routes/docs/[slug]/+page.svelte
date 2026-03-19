<script lang="ts">
  import {
    getDocsPageLabel,
    getDocsPlaceholderSections,
    getDocsPlaceholderSummary,
  } from "$lib/content/docs";
  import { MARKETING_SITE_URL } from "$lib/config/site";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let pageLabel = $derived(getDocsPageLabel(data.docPage.slug));
  let placeholderSummary = $derived(getDocsPlaceholderSummary(pageLabel));
  let placeholderSections = $derived(getDocsPlaceholderSections(pageLabel));
</script>

<svelte:head>
  <title>{pageLabel} | Kwipoo Docs</title>
  <meta name="description" content={placeholderSummary} />
  <meta property="og:title" content={`${pageLabel} | Kwipoo Docs`} />
  <meta property="og:description" content={placeholderSummary} />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content={`${MARKETING_SITE_URL}/docs/${data.docPage.slug}`}
  />
</svelte:head>

<article class="space-y-14">
  <section class="space-y-6">
    <h1 class="text-[3.75rem] font-semibold leading-none tracking-tight text-primary-950 xl:text-[4.5rem]">
      {pageLabel}
    </h1>
    <p class="max-w-[60rem] text-[1.65rem] leading-[1.55] text-neutral-900">
      {placeholderSummary}
    </p>
  </section>

  {#each placeholderSections as section (section.heading)}
    <section class="space-y-6">
      <h2 class="text-[3rem] font-semibold leading-none tracking-tight text-primary-950 xl:text-[3.5rem]">
        {section.heading}
      </h2>

      {#each section.paragraphs as paragraph (paragraph)}
        <p class="max-w-[60rem] text-[1.65rem] leading-[1.55] text-neutral-900">
          {paragraph}
        </p>
      {/each}

      {#if section.bullets}
        <ul class="max-w-[60rem] list-disc space-y-5 pl-10 text-[1.65rem] leading-[1.55] text-neutral-900">
          {#each section.bullets as bullet (bullet)}
            <li>{bullet}</li>
          {/each}
        </ul>
      {/if}
    </section>
  {/each}
</article>
