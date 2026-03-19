<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import {
    docsLandingTocItems,
    docsPages,
    getDocsCategoryGroups,
    getDocsHref,
  } from "$lib/content/docs";
  import { APP_LOGIN_URL, MARKETING_SITE_URL } from "$lib/config/site";

  const categoryGroups = getDocsCategoryGroups();
  const startHerePages =
    categoryGroups.find((group) => group.category === "Start here")?.pages ?? [];
  const featuredPages = docsPages.filter((page) =>
    ["things", "sets", "events", "social"].includes(page.slug),
  );

  function resolveDocsHref(slug: string): string {
    return resolve(getDocsHref(slug) as Pathname);
  }
</script>

<svelte:head>
  <title>Documentation | Kwipoo</title>
  <meta
    name="description"
    content="Browse the Kwipoo documentation for setup guidance, inventory structure, and feature walkthroughs."
  />
  <meta property="og:title" content="Kwipoo Documentation" />
  <meta
    property="og:description"
    content="Browse the Kwipoo documentation for setup guidance, inventory structure, and feature walkthroughs."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${MARKETING_SITE_URL}/docs`} />
</svelte:head>

<header class="space-y-4">
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-surface-600-400"
  >
    <a href={resolve("/")} class="transition-colors hover:text-primary-800-200">
      Home
    </a>
    <span aria-hidden="true">/</span>
    <span class="text-primary-800-200">Docs</span>
  </nav>

  <p
    class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
  >
    Documentation
  </p>
  <h1
    class="text-[2.5rem] font-semibold leading-tight tracking-tight text-surface-950-50 md:text-[3.2rem]"
  >
    Documentation
  </h1>
  <p class="max-w-4xl text-lg leading-8 text-surface-800-200">
    Use this documentation to understand how Kwipoo is structured, how the core
    inventory model fits together, and where each feature belongs in a real
    workflow.
  </p>
</header>

<article class="mt-8 grid gap-10">
  <section id={docsLandingTocItems[0].id} class="grid gap-5">
    <p class="text-lg leading-8 text-surface-900-100">
      Start with the foundational guides if you are new to Kwipoo. Once the
      model feels clear, move into the feature pages for the parts of the
      product you actually use day to day.
    </p>

    <div
      class="card preset-filled-surface-100-900 rounded-[1.5rem] border border-primary-200-800 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Recommended flow
      </p>
      <p class="mt-3 text-[1.15rem] leading-7 text-surface-950-50">
        Learn Things, Places, Spots, Sets, and Events in the same order they
        become useful in real life.
      </p>
      <div class="mt-5 flex flex-wrap gap-3">
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={`#${docsLandingTocItems[1].id}`}
          class="btn btn-sm preset-filled-primary-500 w-auto"
        >
          Start here
        </a>
        <a
          href={`#${docsLandingTocItems[2].id}`}
          class="btn btn-sm preset-outlined-surface-200-800 hover:preset-tonal-surface w-auto"
        >
          Browse topics
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </div>
  </section>

  <section id={docsLandingTocItems[1].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Start Here
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-surface-950-50"
      >
        Foundational guides first.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-surface-800-200">
        These pages establish the vocabulary and habits that the rest of the
        documentation builds on.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      {#each startHerePages as docPage (docPage.slug)}
        <a
          href={resolveDocsHref(docPage.slug)}
          class="card card-hover preset-filled-surface-50-950 flex h-full flex-col gap-3 rounded-[1.35rem] border border-surface-200-800 p-5 shadow-sm hover:border-primary-200-800"
        >
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
          >
            {docPage.eyebrow}
          </p>
          <h3 class="text-[1.25rem] font-semibold leading-tight text-surface-950-50">
            {docPage.title}
          </h3>
          <p class="text-[0.98rem] leading-6 text-surface-800-200">
            {docPage.summary}
          </p>
        </a>
      {/each}

      <a
        href={APP_LOGIN_URL}
        class="card card-hover preset-filled-primary-950-50 flex h-full flex-col gap-3 rounded-[1.35rem] border border-primary-700-300 p-5 shadow-sm"
      >
        <p
          class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-200-800"
        >
          Product Access
        </p>
        <h3 class="text-[1.25rem] font-semibold leading-tight">
          Open Kwipoo while you read.
        </h3>
        <p class="text-[0.98rem] leading-6 text-primary-50-950">
          The docs are designed to sit next to the actual product while you
          build out or review your setup.
        </p>
      </a>
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </section>

  <section id={docsLandingTocItems[2].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Browse Topics
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-surface-950-50"
      >
        Move through the docs by category.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-surface-800-200">
        The topic groups below match the directory in the left sidebar, so the
        landing page and the rest of the docs stay in the same mental model.
      </p>
    </div>

    <div class="grid gap-5">
      {#each categoryGroups as group (group.category)}
        <section
          class="card preset-filled-surface-50-950 rounded-[1.5rem] border border-surface-200-800 p-6 shadow-sm"
        >
          <div class="space-y-3 border-b border-surface-200-800 pb-5">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
            >
              {group.category}
            </p>
            <h3 class="text-[1.35rem] font-semibold leading-tight text-surface-950-50">
              {group.description}
            </h3>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-2">
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            {#each group.pages as docPage (docPage.slug)}
              <a
                href={resolveDocsHref(docPage.slug)}
                class="card card-hover preset-tonal-surface rounded-[1.2rem] border border-surface-200-800 p-4 hover:border-primary-200-800"
              >
                <p
                  class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
                >
                  {docPage.eyebrow}
                </p>
                <h4
                  class="mt-2 text-[1.1rem] font-semibold leading-tight text-surface-950-50"
                >
                  {docPage.title}
                </h4>
                <p class="mt-2 text-[0.95rem] leading-6 text-surface-800-200">
                  {docPage.summary}
                </p>
              </a>
            {/each}
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          </div>
        </section>
      {/each}
    </div>
  </section>

  <section id={docsLandingTocItems[3].id} class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Content Roadmap
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-surface-950-50"
      >
        The structure is ready for deeper pages.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-surface-800-200">
        As this documentation set expands, the next layer should be more
        screenshots, more concrete workflows, and tighter troubleshooting notes.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      {#each featuredPages as docPage (docPage.slug)}
        <a
          href={resolveDocsHref(docPage.slug)}
          class="card card-hover preset-filled-surface-50-950 rounded-[1.2rem] border border-surface-200-800 p-5 shadow-sm hover:border-primary-200-800"
        >
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
          >
            {docPage.eyebrow}
          </p>
          <h3 class="mt-2 text-[1.15rem] font-semibold leading-tight text-surface-950-50">
            {docPage.title}
          </h3>
          <p class="mt-2 text-[0.95rem] leading-6 text-surface-800-200">
            {docPage.summary}
          </p>
        </a>
      {/each}
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </div>
  </section>
</article>
