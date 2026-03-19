<script lang="ts">
  import Button from "./buttons/button.svelte";

  interface Props {
    quoteText?: string;
    showButton?: boolean;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
    buttonSize?: "sm" | "md" | "lg";
    buttonHref?: string;
    onButtonClick?: () => void;
  }

  let {
    quoteText = "Here is the quote text that will be displayed in the callout box.",
    showButton = false,
    buttonText = "Learn More",
    buttonVariant = "primary",
    buttonSize = "md",
    buttonHref,
    onButtonClick,
  }: Props = $props();
</script>

<div
  class="mb-30 rounded-2xl border border-neutral-100 bg-white px-5 py-8 text-base shadow-md sm:px-8 sm:text-lg lg:px-12"
>
  <p class="leading-relaxed text-neutral-900">
    "{quoteText}"
  </p>

  {#if showButton}
    <div class="mt-5 w-full sm:mx-auto sm:max-w-xs lg:max-w-sm">
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
