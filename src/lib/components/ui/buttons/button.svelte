<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    trackAnalyticsEvent,
    type AnalyticsEventProperties,
  } from "$lib/analytics";
  import type { AnalyticsEventName } from "$lib/analytics/schema";
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
    analyticsEvent?: AnalyticsEventName;
    analyticsProperties?: AnalyticsEventProperties;
  }

  type LinkProps = SharedProps &
    Omit<HTMLAnchorAttributes, "class" | "href" | "type" | "onclick"> & {
      onclick?: (event: MouseEvent) => void;
    };

  type NativeButtonProps = SharedProps &
    Omit<HTMLButtonAttributes, "class" | "href" | "type" | "onclick"> & {
      onclick?: (event: MouseEvent) => void;
    };

  type Props = LinkProps | NativeButtonProps;

  const baseClasses = [
    "btn",
    "w-full",
    "font-medium",
    "shadow-sm",
    "transition-all",
    "duration-200",
    "ease-out",
    "hover:-translate-y-0.5",
    "hover:shadow-md",
    "active:translate-y-0",
    "active:shadow-sm",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-primary-300",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ];

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "border border-primary-600 bg-primary-600 text-primary-contrast-600 hover:border-primary-700 hover:bg-primary-700 hover:text-primary-contrast-700",
    secondary:
      "border border-secondary-500 bg-secondary-500 text-surface-950 hover:border-secondary-600 hover:bg-secondary-600",
    outline:
      "border border-primary-300 bg-brand-canvas text-surface-950 hover:bg-primary-50",
    ghost: "bg-primary-50 text-surface-950 hover:bg-primary-100",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "btn-sm min-h-10",
    md: "btn-base min-h-11",
    lg: "btn-lg min-h-12",
  };
  const resolvePath = resolve as unknown as (path: string) => string;

  let {
    children,
    class: className = "",
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    analyticsEvent,
    analyticsProperties,
    onclick,
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
    href ? (isExternalHref(href) ? href : resolvePath(href)) : undefined,
  );

  function handleClick(event: MouseEvent) {
    if (analyticsEvent) {
      void trackAnalyticsEvent(analyticsEvent, analyticsProperties);
    }

    onclick?.(event);
  }
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
    onclick={handleClick}
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
    onclick={handleClick}
  >
    {@render children()}
  </button>
{/if}
