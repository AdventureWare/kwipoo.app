<!-- src/lib/components/ui/cards/icon-content-card.svelte -->
<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    icon: Component;
    title: string;
    description: string;
  }

  let { icon: IconComponent, title, description }: Props = $props();
</script>

<div
  class="brand-outline-card group relative flex h-full flex-col gap-4 rounded-[1.5rem] border border-brand-border bg-brand-panel/80 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
>
  <div
    class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent"
  ></div>

  <div class="flex shrink-0">
    <div
      class="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-canvas shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:h-14 sm:w-14"
    >
      <IconComponent class="h-5 w-5 text-primary-700 sm:h-6 sm:w-6"
      ></IconComponent>
    </div>
  </div>

  <div class="flex-1">
    <h3 class="mb-2 text-lg font-semibold text-primary-950 sm:text-[1.15rem]">
      {title}
    </h3>
    <p class="text-sm leading-relaxed text-brand-body sm:text-base">
      {description}
    </p>
  </div>
</div>
