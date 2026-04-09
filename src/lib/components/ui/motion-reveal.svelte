<script lang="ts">
  import { onMount } from "svelte";
  import type { Snippet } from "svelte";
  import { prefersReducedMotion } from "svelte/motion";

  interface Props {
    children?: Snippet;
    class?: string;
    delay?: number;
    distance?: number;
    once?: boolean;
    rootMargin?: string;
    threshold?: number;
  }

  let {
    children,
    class: className = "",
    delay = 0,
    distance = 24,
    once = true,
    rootMargin = "0px 0px -12% 0px",
    threshold = 0.18,
  }: Props = $props();

  let element: HTMLDivElement | null = null;
  let isEnhanced = $state(false);
  let isVisible = $state(false);

  function elementIsInView(node: HTMLDivElement): boolean {
    const bounds = node.getBoundingClientRect();

    return (
      bounds.top <= window.innerHeight * 0.88 && bounds.bottom >= 0
    );
  }

  onMount(() => {
    if (!element || prefersReducedMotion.current) {
      return;
    }

    isEnhanced = true;

    if (elementIsInView(element)) {
      isVisible = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          isVisible = true;

          if (once) {
            observer.disconnect();
          }

          return;
        }

        if (!once) {
          isVisible = false;
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  });
</script>

<div
  bind:this={element}
  class={["kw-reveal", className]}
  data-enhanced={isEnhanced}
  data-visible={isVisible}
  style={`--kw-reveal-delay:${delay}ms; --kw-reveal-distance:${distance}px;`}
>
  {@render children?.()}
</div>
