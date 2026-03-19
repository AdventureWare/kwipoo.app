<script lang="ts">
  import { asset } from "$app/paths";
  import Button from "../buttons/button.svelte";
  import Tag from "../tag.svelte";
  interface Props {
    tag: string;
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

<div class="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
  {#if imageOnLeft}
    <div
      class="relative order-first mx-auto w-full max-w-md rounded-2xl bg-neutral-50 p-3 shadow-xl sm:p-4 md:col-span-1 md:max-w-none"
    >
      <img
        src={asset(image.src)}
        alt={image.alt}
        class="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
        loading="lazy"
      />
    </div>
    <div class="order-last space-y-5 md:col-span-2 md:mr-12 md:space-y-6">
      <Tag text={tag} />
      <h3 class="text-xl font-bold text-color sm:text-2xl mb-3">
        {title}
      </h3>
      <p class="max-w-2xl text-base leading-relaxed text-neutral-900">
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
    <div class="order-last space-y-5 md:order-first md:col-span-2 md:ml-12 md:space-y-6">
      <Tag text={tag} />
      <h3 class="text-xl font-bold text-color sm:text-2xl mb-3">
        {title}
      </h3>
      <p class="max-w-2xl text-base leading-relaxed text-neutral-900">
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
      class="relative order-first mx-auto w-full max-w-md rounded-2xl bg-neutral-50 p-3 shadow-xl sm:p-4 md:order-last md:col-span-1 md:max-w-none"
    >
      <img
        src={asset(image.src)}
        alt={image.alt}
        class="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
        loading="lazy"
      />
    </div>
  {/if}
</div>
