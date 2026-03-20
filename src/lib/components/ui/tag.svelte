<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  interface Props {
    text: string;
    variant?: "primary" | "secondary" | "outline" | "neutral";
    size?: "sm" | "md" | "lg";
    className?: ClassValue;
  }

  let {
    text,
    variant = "primary",
    size = "md",
    className = "",
  }: Props = $props();

  const variantClasses = {
    primary: "border border-primary-200 bg-brand-canvas/90 text-primary-800",
    secondary:
      "border border-secondary-300 bg-brand-panel text-secondary-800",
    outline: "border border-brand-border bg-brand-canvas text-brand-muted",
    neutral: "bg-brand-panel text-brand-muted",
  };

  const sizeClasses = {
    sm: "px-2.5 py-1 text-[0.68rem]",
    md: "px-4 py-2 text-[0.72rem]",
    lg: "px-5 py-2.5 text-sm",
  };
</script>

<span
  class={[
    "badge mb-2 font-semibold uppercase tracking-[0.18em]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]}
>
  {text}
</span>
