<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { APP_LOGIN_URL } from "$lib/config/site";
  import DocsDirectoryNav from "$lib/components/ui/docs-directory-nav.svelte";
  import DocsTableOfContents from "$lib/components/ui/docs-table-of-contents.svelte";
  import type { LayoutData } from "./$types";

  let {
    data,
    children,
  }: {
    data: LayoutData;
    children: import("svelte").Snippet;
  } = $props();
</script>

<section class="mx-auto w-full max-w-[1600px] px-4 sm:px-6 xl:px-4">
  <div class="xl:hidden py-6">
    <DocsDirectoryNav
      sections={data.navSections}
      currentHref={page.url.pathname}
    />
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_280px]">
    <aside
      class="hidden xl:block xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] xl:self-start xl:overflow-y-auto xl:border-r xl:border-surface-200-800 xl:py-10 xl:pr-8"
    >
      <DocsDirectoryNav
        sections={data.navSections}
        currentHref={page.url.pathname}
        variant="shell"
      />
    </aside>

    <main class="min-w-0 py-8 xl:px-10 xl:py-10">
      {@render children()}
    </main>

    <aside
      class="hidden xl:block xl:sticky xl:top-16 xl:h-[calc(100vh-4rem)] xl:overflow-y-auto xl:border-l xl:border-surface-200-800 xl:py-10 xl:pl-5"
    >
      <div class="space-y-4">
        <div
          class="brand-outline-card card rounded-[1.5rem] border border-brand-border bg-brand-canvas/92 p-5 shadow-sm"
        >
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
          >
            Docs Workspace
          </p>
          <p class="mt-3 text-[0.98rem] leading-6 text-brand-body">
            Read the guide here, then open Kwipoo alongside it while the docs
            expand into deeper walkthroughs and screenshots.
          </p>
          <div class="mt-4 space-y-3">
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <a
              href={APP_LOGIN_URL}
              class="btn btn-sm preset-filled-primary-500 w-full justify-center text-surface-950"
            >
              Open Kwipoo
            </a>
            <a
              href={resolve("/support")}
              class="btn btn-sm w-full justify-center border border-brand-border bg-brand-canvas text-surface-950 hover:bg-brand-panel"
            >
              Contact support
            </a>
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          </div>
        </div>

        <DocsTableOfContents items={data.tocItems} />
      </div>
    </aside>
  </div>
</section>
