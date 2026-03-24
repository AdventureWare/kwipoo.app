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
  class="card grid grid-cols-1 items-center gap-8 border border-brand-border bg-brand-canvas px-5 py-6 shadow-sm sm:gap-10 sm:px-6 sm:py-7 md:grid-cols-3 md:gap-12 lg:px-8 lg:py-8"
>
  {#if imageOnLeft}
    <div
      class="card relative order-first mx-auto w-full max-w-md border border-brand-border bg-brand-panel p-3 shadow-sm sm:p-4 md:col-span-1 md:max-w-none"
    >
      <img
        src={asset(image.src)}
        alt={image.alt}
        class="card aspect-[4/3] w-full object-cover shadow-md"
        loading="lazy"
      />
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
      class="card relative order-first mx-auto w-full max-w-md border border-brand-border bg-brand-panel p-3 shadow-sm sm:p-4 md:order-last md:col-span-1 md:max-w-none"
    >
      <img
        src={asset(image.src)}
        alt={image.alt}
        class="card aspect-[4/3] w-full object-cover shadow-md"
        loading="lazy"
      />
    </div>
  {/if}
</div>
