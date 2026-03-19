<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  import type { Pathname } from "$app/types";
  import { resolve } from "$app/paths";
  import { isExternalHref } from "$lib/config/site";
  import type { Snippet } from "svelte";
  import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
  } from "svelte/elements";

  type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
  type ButtonSize = "sm" | "md" | "lg";

  interface SharedProps {
    children: Snippet;
    class?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  }

  type LinkProps = SharedProps &
    Omit<HTMLAnchorAttributes, "class" | "href" | "type">;

  type NativeButtonProps = SharedProps &
    Omit<HTMLButtonAttributes, "class" | "href" | "type">;

  type Props = LinkProps | NativeButtonProps;

  const baseClasses =
    "w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-[#329F9B] hover:bg-[#2a8480] text-white focus:ring-[#329F9B]/50 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary-500 hover:bg-[#d4ac47] text-white focus:ring-secondary-500/50 shadow-sm hover:shadow-md",
    outline:
      "border border-[#329F9B] text-[#329F9B] hover:bg-[#329F9B] hover:text-white focus:ring-[#329F9B]/50",
    ghost: "text-[#329F9B] hover:bg-[#329F9B]/10 focus:ring-[#329F9B]/50",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-10 px-3 py-2 text-xs",
    md: "min-h-11 px-4 py-2.5 text-sm",
    lg: "min-h-12 px-6 py-3 text-base",
  };

  let {
    children,
    class: className = "",
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    ...restProps
  }: Props = $props();

  let classes = $derived(
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim(),
  );
  let resolvedHref = $derived(
    href
      ? isExternalHref(href)
        ? href
        : resolve(href as Pathname)
      : undefined,
  );
</script>

{#if href}
  <!-- eslint-disable svelte/no-navigation-without-resolve -->
  <a
    {...(restProps as Omit<HTMLAnchorAttributes, "class" | "href" | "type">)}
    href={resolvedHref}
    class={classes}
    role="button"
  >
    {@render children()}
  </a>
  <!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
  <button
    {...(restProps as Omit<HTMLButtonAttributes, "class" | "href" | "type">)}
    {type}
    {disabled}
    class={classes}
  >
    {@render children()}
  </button>
{/if}
