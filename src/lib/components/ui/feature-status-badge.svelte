<script lang="ts">
  import type { ClassValue } from "svelte/elements";
  import type {
    FeatureBadge,
    FeatureBadgeTone,
  } from "$lib/types/feature-badges";

  interface Props {
    badge: FeatureBadge;
    size?: "sm" | "md";
    className?: ClassValue;
  }

  let {
    badge,
    size = "sm",
    className = "",
  }: Props = $props();

  const toneClasses: Record<FeatureBadgeTone, string> = {
    beta:
      "border border-primary-300 bg-primary-50 text-primary-900 dark:border-primary-700 dark:bg-primary-950/70 dark:text-primary-100",
    premium:
      "border border-secondary-300 bg-secondary-50 text-secondary-900 dark:border-secondary-700 dark:bg-secondary-950/70 dark:text-secondary-100",
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-[0.65rem]",
    md: "px-3 py-1.5 text-[0.7rem]",
  };
</script>

<span
  class={[
    "inline-flex items-center rounded-full font-semibold uppercase tracking-[0.16em]",
    toneClasses[badge.tone],
    sizeClasses[size],
    className,
  ]}
>
  {badge.label}
</span>
