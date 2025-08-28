<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
  } from "svelte/elements";

  interface Props extends Omit<HTMLButtonAttributes, "type"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    type?: "button" | "submit" | "reset";
    children: import("svelte").Snippet;
  }

  let {
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    class: className = "",
    children,
    onclick,
    onkeydown,
    ...restProps
  }: Props = $props();

  // Base classes - always full width, let parent container control sizing
  const baseClasses =
    "w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // Using your brand colors
  const variantClasses = {
    primary:
      "bg-[#329F9B] hover:bg-[#2a8480] text-white focus:ring-[#329F9B]/50 shadow-sm hover:shadow-md",
    secondary:
      "bg-[#DBB658] hover:bg-[#d4ac47] text-white focus:ring-[#DBB658]/50 shadow-sm hover:shadow-md",
    outline:
      "border border-[#329F9B] text-[#329F9B] hover:bg-[#329F9B] hover:text-white focus:ring-[#329F9B]/50",
    ghost: "text-[#329F9B] hover:bg-[#329F9B]/10 focus:ring-[#329F9B]/50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
</script>

{#if href}
  <a
    {href}
    class={classes}
    role="button"
    tabindex="0"
    {onclick}
    {onkeydown}
    {...restProps}
  >
    {@render children()}
  </a>
{:else}
  <button
    {type}
    {disabled}
    class={classes}
    {onclick}
    {onkeydown}
    {...restProps}
  >
    {@render children()}
  </button>
{/if}
