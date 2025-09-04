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
  class="bg-white py-8 px-12 text-lg rounded-2xl shadow-md border border-gray-200"
>
  <p>
    "{quoteText}"
  </p>

  {#if showButton}
    <div class="mt-4 sm:w-1/2 lg:w-1/3 mx-auto">
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
