<script lang="ts">
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
    buttonSize?: "sm" | "md" | "md";
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

<div class="grid grid-cols-1 gap-12 items-center md:grid-cols-3">
  {#if imageOnLeft}
    <!-- Image on left (1/3), content on right (2/3) -->
    <div
      class="relative order-first md:col-span-1 p-4 shadow-2xl rounded-2xl bg-neutral-50"
    >
      <img
        src={image.src}
        alt={image.alt}
        class="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
        loading="lazy"
      />
    </div>
    <div class="space-y-6 order-last md:col-span-2 md:mr-12">
      <Tag text={tag} />
      <h3 class="text-xl font-bold text-color sm:text-2xl mb-3">
        {title}
      </h3>
      <p class="text-md leading-relaxed text-neutral-900">
        {description}
      </p>
      {#if showButton}
        <div class="mt-4 sm:w-1/2 md:w-1/3">
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
    <!-- Content on left (2/3), image on right (1/3) -->
    <div class="space-y-6 order-last md:order-first md:col-span-2 md:ml-12">
      <Tag text={tag} />
      <h3 class="text-xl font-bold text-color sm:text-2xl mb-3">
        {title}
      </h3>
      <p class="text-md leading-relaxed text-neutral-900">
        {description}
      </p>
      {#if showButton}
        <div class="mt-4 sm:w-1/2 md:w-1/3">
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
      class="relative order-first md:order-last md:col-span-1 p-4 shadow-2xl rounded-2xl bg-neutral-50"
    >
      <img
        src={image.src}
        alt={image.alt}
        class="aspect-[4/3] w-full rounded-xl object-cover shadow-md"
        loading="lazy"
      />
    </div>
  {/if}
</div>
