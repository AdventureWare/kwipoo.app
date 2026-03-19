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
    primary: "preset-outlined-primary-500 bg-white/90 text-primary-700",
    secondary: "preset-outlined-secondary-500 bg-white/90 text-secondary-700",
    outline: "preset-outlined-surface-300-700 bg-white text-neutral-700",
    neutral: "preset-tonal-surface text-neutral-700",
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
