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

<div class="flex h-full flex-col gap-4 bg-white p-5 sm:p-6">
  <div class="flex shrink-0">
    <div
      class="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-50 sm:h-12 sm:w-12"
    >
      <IconComponent class="h-5 w-5 text-primary-500 sm:h-6 sm:w-6"></IconComponent>
    </div>
  </div>

  <div class="flex-1">
    <h3 class="mb-2 text-lg font-semibold text-color">
      {title}
    </h3>
    <p class="text-sm leading-relaxed text-neutral-800 sm:text-base">
      {description}
    </p>
  </div>
</div>
