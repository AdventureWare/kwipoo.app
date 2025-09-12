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
    tag?: string;
    title?: string;
    description?: string;
    items: SwitchbackItemData[];
    className?: string;
  }

  let { tag, title, description, items, className = "" }: Props = $props();
</script>

<section class="py-16 {className}">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {#each items as item, index}
      <div class="mb-24 last:mb-0">
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
