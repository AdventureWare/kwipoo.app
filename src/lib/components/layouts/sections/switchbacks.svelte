<script lang="ts">
  import ImageContentCard from "$lib/components/ui/cards/image-content-card.svelte";
  import type { FeatureBadge } from "$lib/types/feature-badges";

  interface SwitchbackItemData {
    tag: string;
    featureBadge?: FeatureBadge;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    showButton?: boolean;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
    buttonSize?: "sm" | "md" | "lg";
    buttonHref?: string;
    onButtonClick?: () => void;
  }

  interface Props {
    items: SwitchbackItemData[];
    className?: string;
    eyebrow?: string;
    title?: string;
    description?: string;
  }

  let { items, className = "", eyebrow, title, description }: Props = $props();
</script>

<section class={`relative py-12 sm:py-14 lg:py-16 ${className}`}>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute left-0 top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
  </div>

  <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    {#if eyebrow || title || description}
      <div class="mb-10 text-left md:mb-12 md:text-center">
        {#if eyebrow}
          <p class="brand-section-label mb-4">{eyebrow}</p>
        {/if}
        {#if title}
          <h2 class="mb-4 text-3xl font-bold text-primary-950 sm:text-4xl">
            {title}
          </h2>
        {/if}
        {#if description}
          <p
            class="text-base leading-relaxed text-brand-body md:mx-auto md:max-w-4/5 md:text-lg"
          >
            {description}
          </p>
        {/if}
      </div>
    {/if}

    {#each items as item, index (item.title)}
      <div class="mb-16 last:mb-0 sm:mb-20 lg:mb-24">
        <ImageContentCard
          tag={item.tag}
          featureBadge={item.featureBadge}
          title={item.title}
          description={item.description}
          image={item.image}
          showButton={item.showButton}
          buttonText={item.buttonText}
          buttonVariant={item.buttonVariant}
          buttonSize={item.buttonSize}
          buttonHref={item.buttonHref}
          onButtonClick={item.onButtonClick}
          imageOnLeft={index % 2 !== 0}
        />
      </div>
    {/each}
  </div>
</section>
