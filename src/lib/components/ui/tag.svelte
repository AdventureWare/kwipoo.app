<script lang="ts">
  interface Props {
    text: string;
    variant?: "primary" | "secondary" | "outline" | "neutral";
    size?: "sm" | "md" | "lg";
    className?: string;
  }

  let {
    text,
    variant = "primary",
    size = "md",
    className = "",
  }: Props = $props();

  const variantClasses = {
    primary: "border-primary-500 text-primary-500",
    secondary: "border-secondary-500 text-secondary-500",
    outline: "border-neutral-300 text-neutral-700 ",
    neutral: "border-neutral-200 text-neutral-600",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  };
</script>

<div
  class="inline-flex items-center border font-medium mb-2 {variantClasses[
    variant
  ]} {sizeClasses[size]} {className}"
>
  {text}
</div>
