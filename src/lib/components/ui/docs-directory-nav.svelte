<script lang="ts">
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import { resolve } from "$app/paths";
  import type { Pathname } from "$app/types";
  import type { DocsNavSection } from "$lib/content/docs";

  let {
    sections,
    currentHref,
    variant = "panel",
  }: {
    sections: DocsNavSection[];
    currentHref: string;
    variant?: "panel" | "shell";
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

  let shellVariant = $derived(variant === "shell");
</script>

<nav aria-label="Documentation index">
  <Navigation
    layout="sidebar"
    class={[
      "docs-directory-sidebar w-full",
      shellVariant
        ? "bg-transparent p-0"
        : "card preset-filled-surface-50-950 border border-surface-200-800 shadow-sm",
    ]}
  >
    <Navigation.Header
      class={[
        "border-b border-surface-200-800 pb-5",
        shellVariant ? "mb-1" : "",
      ]}
    >
      <p
        class={[
          "text-[0.92rem] font-semibold uppercase tracking-[0.18em]",
          shellVariant ? "text-brand-muted" : "text-surface-300",
        ]}
      >
        Documentation
      </p>
      <p
        class={[
          "mt-3 font-semibold leading-tight",
          shellVariant ? "text-color" : "text-surface-50",
          shellVariant ? "text-[1.15rem]" : "text-[1.45rem]",
        ]}
      >
        {currentItem?.label ?? "Browse docs"}
      </p>
      <p
        class={[
          "mt-3 leading-6",
          shellVariant ? "text-brand-body" : "text-surface-100",
          shellVariant ? "text-[0.92rem]" : "text-[0.98rem]",
        ]}
      >
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
          <Navigation.Label
            class={[
              "px-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em]",
              shellVariant ? "text-brand-muted" : "text-surface-300",
            ]}
          >
            <span class="block">{section.title}</span>

          </Navigation.Label>

          <Navigation.Menu class="gap-2">
            {#each section.items as item (item.href)}
              {@const isCurrent =
                normalizePathname(item.href) === normalizePathname(currentHref)}

              <Navigation.TriggerAnchor
                href={resolve(item.href as Pathname)}
                aria-current={isCurrent ? "page" : undefined}
                class={[
                  "card-hover rounded-[1rem] border px-4 py-3 text-left shadow-none",
                  shellVariant
                    ? "border-transparent bg-transparent text-surface-950"
                    : "preset-filled-surface-50-950 border-surface-200-800 text-surface-50",
                  shellVariant && !isCurrent && "hover:preset-tonal-primary",
                  !shellVariant && !isCurrent && "hover:border-primary-200-800",
                  isCurrent &&
                    (shellVariant
                      ? "preset-filled-primary-500 border-transparent text-surface-950 shadow-sm"
                      : "preset-filled-primary-500 border-transparent text-surface-950 shadow-sm"),
                ]}
              >
                <Navigation.TriggerText class="min-w-0">
                  <span
                    class={[
                      "block font-semibold leading-5 text-current",
                      shellVariant ? "text-[0.95rem]" : "text-[1rem]",
                    ]}
                  >
                    {item.label}
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
