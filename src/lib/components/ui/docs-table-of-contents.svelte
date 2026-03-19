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
    class="rounded-[1.5rem] border border-neutral-200 bg-white p-5 shadow-sm"
  >
    <p
      class="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600"
    >
      {title}
    </p>

    <div class="mt-4 space-y-2">
      {#each items as item (item.id)}
        <a
          href={`#${item.id}`}
          class="block rounded-xl px-3 py-2 text-sm leading-6 text-neutral-800 transition-colors hover:bg-primary-50 hover:text-primary-900"
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
{/if}
