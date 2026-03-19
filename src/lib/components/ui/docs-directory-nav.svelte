<script lang="ts">
  import { Accordion } from "@skeletonlabs/skeleton-svelte";
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

  let expandedSections = $derived(
    sections.map((section) => section.title),
  );
</script>

<div class="space-y-4">
  <div
    class="rounded-[1.5rem] border border-surface-200 bg-white px-5 py-4 shadow-sm lg:hidden"
  >
    <p
      class="text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-neutral-600"
    >
      Documentation
    </p>
    <p class="mt-2 text-[1.35rem] font-semibold leading-none text-primary-950">
      {currentItem?.label ?? "Browse docs"}
    </p>
    {#if currentItem}
      <p class="mt-2 text-[1rem] leading-none text-neutral-700">
        {currentItem.sectionTitle}
      </p>
    {/if}
  </div>

  <nav aria-label="Documentation index">
    <Accordion
      multiple
      collapsible
      defaultValue={expandedSections}
      class="space-y-4"
    >
      {#each sections as section (section.title)}
        <Accordion.Item
          value={section.title}
          class="card overflow-hidden rounded-[1.5rem] border border-surface-200 bg-white shadow-sm"
        >
          <Accordion.ItemTrigger
            class="docs-section-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span class="min-w-0">
              <span
                class="block text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-neutral-600"
              >
                {section.title}
              </span>
              <span class="mt-2 block text-[1rem] leading-6 text-neutral-700">
                {section.items.length}
                {section.items.length === 1 ? " guide" : " guides"}
              </span>
            </span>

            <Accordion.ItemIndicator
              class="docs-section-indicator shrink-0 text-[1.1rem] text-neutral-500 transition-transform"
            >
              v
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent class="px-3 pb-3">
            <div class="space-y-2 border-t border-surface-200 px-2 pt-3">
              {#each section.items as item (item.href)}
                {@const isCurrent =
                  normalizePathname(item.href) === normalizePathname(currentHref)}

                <a
                  href={resolve(item.href as Pathname)}
                  aria-current={isCurrent ? "page" : undefined}
                  class={[
                    "btn btn-base w-full justify-start rounded-[1rem] border px-4 py-3 text-left text-[1rem] leading-5 shadow-none",
                    isCurrent
                      ? "preset-filled-primary-500 border-primary-500"
                      : "preset-outlined-surface-300-700 bg-white",
                  ]}
                >
                  {item.label}
                </a>
              {/each}
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      {/each}
    </Accordion>
  </nav>
</div>

<style>
  :global(.docs-section-trigger[data-state="open"]) {
    background:
      color-mix(in srgb, var(--color-primary-50) 72%, var(--color-surface-50));
  }

  :global(.docs-section-trigger[data-state="open"] .docs-section-indicator) {
    transform: rotate(180deg);
  }

  :global(.docs-section-trigger[data-focus]) {
    outline: 2px solid color-mix(in srgb, var(--color-primary-300) 60%, white);
    outline-offset: -2px;
  }
</style>
