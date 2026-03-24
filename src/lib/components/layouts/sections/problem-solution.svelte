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

<section
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 shadow-sm sm:p-8 lg:px-10"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute -right-10 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_78%,transparent)_0%,transparent_72%)] blur-2xl"
    ></div>
  </div>

  <div class="relative mx-auto max-w-6xl">
    <div class="mb-8 text-left md:mb-10 md:text-center">
      <p class="brand-section-label mb-4">Where The Friction Adds Up</p>
      <h2 class="mb-4 text-3xl font-bold text-primary-950 sm:text-4xl">
        {title}
      </h2>
      <p
        class="text-base leading-relaxed text-brand-body md:mx-auto md:max-w-4/5 md:text-lg"
      >
        {description}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
