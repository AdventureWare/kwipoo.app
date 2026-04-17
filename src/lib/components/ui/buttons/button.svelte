<!-- src/lib/components/ui/button.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import {
    trackAnalyticsEvent,
    type AnalyticsEventProperties,
  } from "$lib/analytics";
  import { buildMarketingAppHandoffHref } from "$lib/analytics/handoff";
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
    "kw-button",
    "w-full",
    "font-medium",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ];

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "kw-button--primary border",
    secondary: "kw-button--secondary border",
    outline: "kw-button--outline border",
    ghost: "kw-button--ghost border",
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
  let resolvedHref = $derived.by(() => {
    if (!href) {
      return undefined;
    }

    const normalizedHref = isExternalHref(href) ? href : resolvePath(href);
    const ctaLocation =
      typeof analyticsProperties?.location === "string"
        ? analyticsProperties.location
        : undefined;
    const ctaKind =
      typeof analyticsProperties?.kind === "string"
        ? analyticsProperties.kind
        : undefined;

    return buildMarketingAppHandoffHref({
      href: normalizedHref,
      currentPath: page.url.pathname,
      currentSearch: page.url.search,
      ctaLocation,
      ctaKind,
    });
  });
  let resolvedAnalyticsProperties = $derived.by(() => {
    if (!analyticsProperties || !resolvedHref) {
      return analyticsProperties;
    }

    if (typeof analyticsProperties.destination !== "string") {
      return analyticsProperties;
    }

    return {
      ...analyticsProperties,
      destination: resolvedHref,
    };
  });

  function shouldDelayTrackedNavigation(event: MouseEvent): boolean {
    const currentTarget = event.currentTarget;

    if (!(currentTarget instanceof HTMLAnchorElement) || !resolvedHref || !href) {
      return false;
    }

    return (
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      !currentTarget.target
    );
  }

  async function handleClick(event: MouseEvent) {
    onclick?.(event);

    if (event.defaultPrevented || disabled || !analyticsEvent) {
      return;
    }

    if (shouldDelayTrackedNavigation(event)) {
      const destinationHref = resolvedHref;

      if (!destinationHref) {
        return;
      }

      event.preventDefault();
      await trackAnalyticsEvent(analyticsEvent, resolvedAnalyticsProperties);

      if (isExternalHref(destinationHref)) {
        window.location.assign(destinationHref);
      } else {
        // eslint-disable-next-line svelte/no-navigation-without-resolve
        await goto(resolvePath(destinationHref));
      }

      return;
    }

    void trackAnalyticsEvent(analyticsEvent, resolvedAnalyticsProperties);
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
