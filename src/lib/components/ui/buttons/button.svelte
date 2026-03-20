<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  import type { Pathname } from "$app/types";
  import { resolve } from "$app/paths";
  import { isExternalHref } from "$lib/config/site";
  import type { Snippet } from "svelte";
  import type {
    ClassValue,
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
  } from "svelte/elements";

  type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
  type ButtonSize = "sm" | "md" | "lg";

  interface SharedProps {
    children: Snippet;
    class?: ClassValue;
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

  const baseClasses = [
    "btn",
    "w-full",
    "font-medium",
    "shadow-sm",
    "transition-colors",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-primary-300",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ];

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "border border-primary-600 bg-primary-600 text-[var(--color-primary-contrast-600)] hover:border-primary-700 hover:bg-primary-700",
    secondary:
      "border border-secondary-500 bg-secondary-500 text-[var(--color-secondary-contrast-500)] hover:border-secondary-600 hover:bg-secondary-600",
    outline:
      "border border-primary-300 bg-brand-canvas text-primary-800 hover:bg-primary-50",
    ghost: "bg-primary-50 text-primary-800 hover:bg-primary-100",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "btn-sm min-h-10",
    md: "btn-base min-h-11",
    lg: "btn-lg min-h-12",
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

  let classes = $derived([
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && "pointer-events-none",
    className,
  ]);
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
    {...restProps as Omit<HTMLAnchorAttributes, "class" | "href" | "type">}
    href={resolvedHref}
    class={classes}
    aria-disabled={disabled}
    tabindex={disabled ? -1 : undefined}
    role="button"
  >
    {@render children()}
  </a>
  <!-- eslint-enable svelte/no-navigation-without-resolve -->
{:else}
  <button
    {...restProps as Omit<HTMLButtonAttributes, "class" | "href" | "type">}
    {type}
    {disabled}
    class={classes}
  >
    {@render children()}
  </button>
{/if}
