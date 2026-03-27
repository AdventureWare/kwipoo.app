<script lang="ts">
  import Button from "./buttons/button.svelte";

  interface Props {
    quoteText?: string;
    eyebrow?: string;
    showButton?: boolean;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
    buttonSize?: "sm" | "md" | "lg";
    buttonHref?: string;
    onButtonClick?: () => void;
  }

  let {
    quoteText = "Here is the quote text that will be displayed in the callout box.",
    eyebrow = "Why people come to Kwipoo",
    showButton = false,
    buttonText = "Learn More",
    buttonVariant = "primary",
    buttonSize = "md",
    buttonHref,
    onButtonClick,
  }: Props = $props();
</script>

<div
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 text-base shadow-sm sm:px-8 sm:py-10 sm:text-lg lg:px-12"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute left-1/2 top-0 h-36 w-[28rem] -translate-x-1/2 bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_68%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
  </div>

  <div class="relative mx-auto max-w-4xl text-center">
    <p class="brand-section-label mb-5">{eyebrow}</p>

    <p
      class="text-balance text-lg leading-relaxed text-brand-body sm:text-[1.45rem] sm:leading-9"
    >
      <span class="text-3xl leading-none text-primary-500">"</span
      >{quoteText}<span class="text-3xl leading-none text-primary-500">"</span>
    </p>

    {#if showButton}
      <div class="mt-6 w-full sm:mx-auto sm:max-w-xs lg:max-w-sm">
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
</div>
