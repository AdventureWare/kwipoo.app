<script lang="ts">
  import ImageContentCard from "$lib/components/ui/cards/image-content-card.svelte";

  interface SwitchbackItemData {
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
  }

  interface Props {
    items: SwitchbackItemData[];
    className?: string;
  }

  let { items, className = "" }: Props = $props();
</script>

<section class="py-12 sm:py-14 lg:py-16 {className}">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {#each items as item, index (item.title)}
      <div class="mb-16 last:mb-0 sm:mb-20 lg:mb-24">
        <ImageContentCard
          tag={item.tag}
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
