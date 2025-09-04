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

<section class="bg-neutral-100 p-8 rounded-2xl mb-30">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-left sm:text-center mb-12">
      <h2 class="text-3xl font-bold text-color mb-4">{title}</h2>
      <p class="text-lg text-gray-600 sm:max-w-4/5 mx-auto">{description}</p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-[12px]">
      {#each items as item}
        <IconContentCard
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      {/each}
    </div>
  </div>
</section>
