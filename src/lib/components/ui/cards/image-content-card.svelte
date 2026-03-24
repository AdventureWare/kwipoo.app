<script lang="ts">
  import { asset } from "$app/paths";
  import type { FeatureBadge } from "$lib/types/feature-badges";
  import FeatureStatusBadge from "../feature-status-badge.svelte";
  import Button from "../buttons/button.svelte";
  import Tag from "../tag.svelte";
  interface Props {
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
    imageOnLeft?: boolean;
  }

  let {
    tag,
    featureBadge,
    title,
    description,
    image,
    showButton,
    buttonText = "Learn More",
    buttonVariant = "primary",
    buttonSize = "md",
    buttonHref,
    onButtonClick,
    imageOnLeft = false,
  }: Props = $props();
</script>

<div
  class="brand-outline-card group relative grid grid-cols-1 items-center gap-8 rounded-[1.75rem] border border-brand-border bg-brand-canvas/92 px-5 py-6 shadow-sm sm:gap-10 sm:px-6 sm:py-7 md:grid-cols-3 md:gap-12 lg:px-8 lg:py-8"
>
  <div
    class="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/75 to-transparent"
  ></div>

  {#if imageOnLeft}
    <div
      class="relative order-first mx-auto w-full max-w-md md:col-span-1 md:max-w-none"
    >
      <div
        class="absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_72%,transparent)_0%,transparent_72%)] blur-xl"
      ></div>
      <div
        class="brand-outline-card card relative overflow-hidden border border-brand-border bg-brand-panel p-3 shadow-sm sm:p-4"
      >
        <div class="brand-soft-grid absolute inset-0 opacity-30"></div>
        <img
          src={asset(image.src)}
          alt={image.alt}
          class="card relative aspect-[4/3] w-full object-cover shadow-md"
          loading="lazy"
        />
      </div>
    </div>
    <div class="order-last space-y-5 md:col-span-2 md:mr-12 md:space-y-6">
      <div class="flex flex-wrap items-start gap-2">
        <Tag text={tag} />
        {#if featureBadge}
          <FeatureStatusBadge badge={featureBadge} className="mt-0.5" />
        {/if}
      </div>
      <h3 class="mb-3 text-xl font-bold text-primary-950 sm:text-2xl">
        {title}
      </h3>
      <p class="max-w-2xl text-base leading-relaxed text-brand-body">
        {description}
      </p>
      {#if showButton}
        <div class="mt-4 w-full sm:max-w-xs">
          <Button
            variant={buttonVariant}
            size={buttonSize}
            href={buttonHref}
            onclick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      {/if}
    </div>
  {:else}
    <div
      class="order-last space-y-5 md:order-first md:col-span-2 md:ml-12 md:space-y-6"
    >
      <div class="flex flex-wrap items-start gap-2">
        <Tag text={tag} />
        {#if featureBadge}
          <FeatureStatusBadge badge={featureBadge} className="mt-0.5" />
        {/if}
      </div>
      <h3 class="mb-3 text-xl font-bold text-primary-950 sm:text-2xl">
        {title}
      </h3>
      <p class="max-w-2xl text-base leading-relaxed text-brand-body">
        {description}
      </p>
      {#if showButton}
        <div class="mt-4 w-full sm:max-w-xs">
          <Button
            variant={buttonVariant}
            size={buttonSize}
            href={buttonHref}
            onclick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      {/if}
    </div>
    <div
      class="relative order-first mx-auto w-full max-w-md md:order-last md:col-span-1 md:max-w-none"
    >
      <div
        class="absolute -inset-3 rounded-[2rem] bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_70%,transparent)_0%,transparent_72%)] blur-xl"
      ></div>
      <div
        class="brand-outline-card card relative overflow-hidden border border-brand-border bg-brand-panel p-3 shadow-sm sm:p-4"
      >
        <div class="brand-soft-grid absolute inset-0 opacity-30"></div>
        <img
          src={asset(image.src)}
          alt={image.alt}
          class="card relative aspect-[4/3] w-full object-cover shadow-md"
          loading="lazy"
        />
      </div>
    </div>
  {/if}
</div>
