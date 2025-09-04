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

<div class="flex gap-4 p-6">
  <!-- Icon Container -->
  <div class="hidden md:flex flex-shrink-0">
    <div
      class="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100"
    >
      <IconComponent class="h-6 w-6 text-primary-500"></IconComponent>
    </div>
  </div>

  <!-- Content -->
  <div class="flex-1">
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p class="text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
</div>
