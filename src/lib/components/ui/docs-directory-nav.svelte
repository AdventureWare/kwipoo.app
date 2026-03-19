<script lang="ts">
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import type { DocsNavSection } from "$lib/content/docs";

  let {
    sections,
    currentHref,
  }: {
    sections: DocsNavSection[];
    currentHref: string;
  } = $props();

  function normalizePathname(pathname: string): string {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      return pathname.slice(0, -1);
    }

    return pathname;
  }

  let currentItem = $derived.by(() => {
    const normalizedHref = normalizePathname(currentHref);

    for (const section of sections) {
      const item = section.items.find(
        (entry) => normalizePathname(entry.href) === normalizedHref,
      );

      if (item) {
        return {
          label: item.label,
          sectionTitle: section.title,
        };
      }
    }

    return null;
  });
</script>

<nav aria-label="Documentation index">
  <Navigation
    layout="sidebar"
    class="docs-directory-sidebar w-full rounded-[1.75rem] border border-surface-200 bg-white shadow-sm"
  >
    <Navigation.Header class="docs-directory-header">
      <p class="text-[0.92rem] font-semibold uppercase tracking-[0.18em] text-neutral-600">
        Documentation
      </p>
      <p class="mt-3 text-[1.45rem] font-semibold leading-tight text-primary-950">
        {currentItem?.label ?? "Browse docs"}
      </p>
      <p class="mt-3 text-[0.98rem] leading-6 text-neutral-700">
        {#if currentItem}
          In {currentItem.sectionTitle}, with the rest of the guides available below.
        {:else}
          Move through the docs from a persistent directory instead of drilling through accordions.
        {/if}
      </p>
    </Navigation.Header>

    <Navigation.Content class="pt-5">
      {#each sections as section (section.title)}
        <Navigation.Group class="gap-3">
          <Navigation.Label class="docs-directory-section-label px-2">
            <span class="block">{section.title}</span>
            <span class="mt-2 block text-[0.95rem] font-normal normal-case tracking-normal text-neutral-700">
              {section.items.length}
              {section.items.length === 1 ? " guide" : " guides"}
            </span>
          </Navigation.Label>

          <Navigation.Menu class="gap-2">
            {#each section.items as item (item.href)}
              {@const isCurrent =
                normalizePathname(item.href) === normalizePathname(currentHref)}

              <Navigation.TriggerAnchor
                href={resolve(item.href as Pathname)}
                aria-current={isCurrent ? "page" : undefined}
                class={[
                  "docs-directory-link rounded-[1rem] border px-4 py-3 text-left shadow-none transition-all",
                  isCurrent && "docs-directory-link-current",
                ]}
              >
                <Navigation.TriggerText class="min-w-0">
                  <span class="block text-[1rem] font-semibold leading-5">
                    {item.label}
                  </span>
                  <span class="mt-1 block text-[0.92rem] leading-5 text-current/75">
                    {isCurrent ? "Current page" : "Open guide"}
                  </span>
                </Navigation.TriggerText>
              </Navigation.TriggerAnchor>
            {/each}
          </Navigation.Menu>
        </Navigation.Group>
      {/each}
    </Navigation.Content>
  </Navigation>
</nav>

<style>
  :global(.docs-directory-sidebar) {
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, white 86%, var(--color-primary-50)) 0%,
        white 34%,
        color-mix(in srgb, white 92%, var(--color-surface-100)) 100%
      );
  }

  :global(.docs-directory-header) {
    border-bottom: 1px solid color-mix(in srgb, var(--color-surface-200) 80%, white);
    padding-bottom: 1.25rem;
  }

  :global(.docs-directory-section-label) {
    color: var(--color-primary-900);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  :global(.docs-directory-link) {
    width: 100%;
    justify-content: flex-start;
    border-color: color-mix(in srgb, var(--color-surface-200) 85%, white);
    background:
      color-mix(in srgb, white 72%, var(--color-primary-50));
    color: var(--color-primary-950);
  }

  :global(.docs-directory-link:hover) {
    background:
      color-mix(in srgb, white 28%, var(--color-primary-50));
    border-color: color-mix(in srgb, var(--color-primary-200) 65%, white);
  }

  :global(.docs-directory-link-current) {
    border-color: color-mix(in srgb, var(--color-primary-500) 70%, white);
    background: var(--color-primary-950);
    color: var(--color-primary-50);
    box-shadow:
      0 20px 45px -30px color-mix(
        in srgb,
        var(--color-primary-950) 85%,
        transparent
      );
  }

  :global(.docs-directory-link[data-focus]) {
    outline: 2px solid color-mix(in srgb, var(--color-primary-300) 60%, white);
    outline-offset: 2px;
  }
</style>
