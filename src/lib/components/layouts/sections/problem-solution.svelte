<script lang="ts">
  import type { Component } from "svelte";
  import IconContentCard from "$lib/components/ui/cards/icon-content-card.svelte";

  interface GridItem {
    icon: Component;
    title: string;
    description: string;
  }

  interface Props {
    title: string;
    description: string;
    items: GridItem[];
  }

  let { title, description, items }: Props = $props();
</script>

<section class="mb-30 rounded-2xl bg-neutral-50 px-5 py-8 sm:p-8 lg:px-10">
  <div class="max-w-6xl mx-auto">
    <div class="mb-8 text-left md:mb-10 md:text-center">
      <h2 class="mb-4 text-3xl font-bold text-color sm:text-4xl">{title}</h2>
      <p class="text-base leading-relaxed text-neutral-950 md:mx-auto md:max-w-4/5 md:text-lg">
        {description}
      </p>
    </div>

    <div
      class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-neutral-200 md:grid-cols-2"
    >
      {#each items as item (item.title)}
        <IconContentCard
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      {/each}
    </div>
  </div>
</section>
