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
      class="text-xs font-semibold uppercase tracking-[0.18em] text-surface-300"
    >
      {title}
    </p>

    <div class="mt-4 space-y-2">
      {#each items as item (item.id)}
        <a
          href={`#${item.id}`}
          class="btn btn-sm block w-full justify-start rounded-xl border border-surface-700 bg-surface-900 px-3 py-2 text-sm leading-6 text-surface-50 shadow-none hover:border-surface-600 hover:bg-surface-800 hover:text-surface-50"
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}
