<script lang="ts">
  let {
    title = "On this page",
    items,
  }: {
    title?: string;
    items: Array<{
      id: string;
      label: string;
      level?: 2 | 3;
    }>;
  } = $props();
</script>

{#if items.length > 0}
  <nav
    aria-label={title}
    class="brand-outline-card card rounded-[1.5rem] border border-brand-border bg-brand-canvas/92 p-5 shadow-sm"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      {title}
    </p>

    <div class="mt-4 space-y-1.5">
      {#each items as item (item.id)}
        <a
          href={`#${item.id}`}
          class={`block rounded-xl px-3 py-2 leading-6 transition-colors hover:bg-brand-panel ${
            item.level === 3
              ? "ml-4 text-[0.95rem] text-brand-body hover:text-color"
              : "text-sm font-semibold text-color hover:text-color"
          }`}
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}
