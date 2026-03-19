<script lang="ts">
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import { getDocsCategoryGroups } from "$lib/content/docs";
  import { MARKETING_SITE_URL } from "$lib/config/site";

  const categoryGroups = getDocsCategoryGroups();
  const defaultCategory = categoryGroups[0]?.category ?? "Start here";

  function getDocsHref(slug: string): string {
    return resolve((slug === "getting-started" ? "/docs" : `/docs/${slug}`) as Pathname);
  }
</script>

<svelte:head>
  <title>Documentation | Kwipoo</title>
  <meta
    name="description"
    content="Use the Kwipoo documentation to understand what each part of the app does and how the core features fit together."
  />
  <meta property="og:title" content="Kwipoo Documentation" />
  <meta
    property="og:description"
    content="Use the Kwipoo documentation to understand what each part of the app does and how the core features fit together."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${MARKETING_SITE_URL}/docs`} />
</svelte:head>

<article class="space-y-14">
  <section class="space-y-6">
    <h1 class="text-[3.75rem] font-semibold leading-none tracking-tight text-primary-950 xl:text-[4.5rem]">
      Welcome to Kwipoo Documentation
    </h1>
    <p class="max-w-[60rem] text-[1.65rem] leading-[1.55] text-neutral-900">
      This documentation is the central reference for understanding how Kwipoo
      works. Use it to learn what each part of the app is for, how the core
      features connect, and what the main terms inside Kwipoo actually mean.
    </p>
  </section>

  <section class="space-y-6">
    <h2 class="text-[3rem] font-semibold leading-none tracking-tight text-primary-950 xl:text-[3.5rem]">
      Browse by Topic
    </h2>
    <p class="max-w-[60rem] text-[1.65rem] leading-[1.55] text-neutral-900">
      Use the category tabs to jump into setup guides, inventory structure, and
      planning workflows. Each group collects the most relevant pages so you
      can get to the right section without scanning the whole directory first.
    </p>

    <Tabs defaultValue={defaultCategory} class="space-y-6">
      <Tabs.List
        class="grid gap-3 rounded-[1.5rem] border border-surface-200 bg-white p-3 shadow-sm md:grid-cols-3"
      >
        {#each categoryGroups as group (group.category)}
          <Tabs.Trigger
            value={group.category}
            class="docs-category-tab rounded-[1.25rem] px-4 py-4 text-left transition-colors"
          >
            <span
              class="block text-[0.9rem] font-semibold uppercase tracking-[0.18em]"
            >
              {group.category}
            </span>
            <span class="mt-3 block text-[1rem] leading-6 opacity-80">
              {group.pages.length}
              {group.pages.length === 1 ? " guide" : " guides"}
            </span>
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each categoryGroups as group (group.category)}
        <Tabs.Content value={group.category} class="space-y-5">
          <div
            class="rounded-[1.5rem] bg-primary-950 px-6 py-6 text-primary-50 shadow-sm"
          >
            <p
              class="text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-primary-200"
            >
              Category overview
            </p>
            <p class="mt-3 max-w-4xl text-[1.1rem] leading-8 text-primary-50/90">
              {group.description}
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {#each group.pages as docPage (docPage.slug)}
              <!-- eslint-disable svelte/no-navigation-without-resolve -->
              <a
                href={getDocsHref(docPage.slug)}
                class="card card-hover flex h-full flex-col gap-4 rounded-[1.5rem] border border-surface-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <p
                  class="text-[0.9rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
                >
                  {docPage.eyebrow}
                </p>
                <h3 class="text-[1.55rem] font-semibold leading-tight text-primary-950">
                  {docPage.title}
                </h3>
                <p class="text-[1rem] leading-7 text-neutral-800">
                  {docPage.summary}
                </p>
                <span class="btn btn-sm preset-filled-primary-500 mt-auto self-start">
                  Read guide
                </span>
              </a>
              <!-- eslint-enable svelte/no-navigation-without-resolve -->
            {/each}
          </div>
        </Tabs.Content>
      {/each}
    </Tabs>
  </section>

  <section class="space-y-6">
    <h2 class="text-[3rem] font-semibold leading-none tracking-tight text-primary-950 xl:text-[3.5rem]">
      How to Use This Documentation
    </h2>
    <p class="max-w-[60rem] text-[1.65rem] leading-[1.55] text-neutral-900">
      Start with the category browser if you want a curated path, then use the
      directory on the left to move between individual pages. Each guide is
      meant to work as a focused reference for one part of Kwipoo.
    </p>
  </section>
</article>

<style>
  :global(.docs-category-tab) {
    border: 1px solid transparent;
    background: color-mix(
      in srgb,
      var(--color-surface-50) 70%,
      var(--color-primary-50)
    );
    color: var(--color-primary-950);
  }

  :global(.docs-category-tab[data-selected]) {
    border-color: var(--color-primary-500);
    background: var(--color-primary-500);
    color: var(--color-primary-contrast-500);
    box-shadow:
      0 18px 40px -24px color-mix(
        in srgb,
        var(--color-primary-700) 65%,
        transparent
      );
  }

  :global(.docs-category-tab[data-focus]) {
    outline: 2px solid color-mix(in srgb, var(--color-primary-300) 60%, white);
    outline-offset: 2px;
  }
</style>
