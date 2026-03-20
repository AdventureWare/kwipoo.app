<script lang="ts">
  let {
    title = "On this page",
    items,
  }: {
    title?: string;
    items: Array<{
      id: string;
      label: string;
    }>;
  } = $props();
</script>

{#if items.length > 0}
  <nav
    aria-label={title}
    class="card preset-filled-surface-50-950 rounded-[1.5rem] border border-surface-200-800 p-5 shadow-sm"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      {title}
    </p>

    <div class="mt-4 space-y-2">
      {#each items as item (item.id)}
        <a
          href={`#${item.id}`}
          class="btn btn-sm preset-filled-surface-50-950 block w-full justify-start rounded-xl border border-surface-200-800 px-3 py-2 text-sm leading-6 text-color hover:border-primary-200-800"
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}
