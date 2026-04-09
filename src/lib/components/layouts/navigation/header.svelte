<!-- src/lib/components/navigation/header.svelte -->
<script lang="ts">
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import {
    ANALYTICS_EVENT_NAMES,
    createMarketingCtaClickedProperties,
  } from "$lib/analytics/schema";
  import { APP_LOGIN_URL, APP_SIGNUP_URL } from "$lib/config/site";
  import { getSiteLinksForSurface } from "$lib/site-sections";
  import Button from "../../ui/buttons/button.svelte";

  const homeHref = resolve("/");
  const desktopLinks = getSiteLinksForSurface("headerDesktop");
  const mobileLinks = getSiteLinksForSurface("headerMobile");

  const navLinkBaseClass =
    "rounded-full px-2 py-1 text-[0.8rem] font-semibold tracking-[0.01em] transition-colors md:px-4 md:py-2.5 md:text-[1.1rem]";

  function isCurrent(href: string): boolean {
    return (
      page.url.pathname === href ||
      (href !== homeHref && page.url.pathname.startsWith(`${href}/`))
    );
  }
</script>

<div class="sticky top-3 z-50 px-3 sm:px-4 lg:px-6">
  <Navigation
    layout="bar"
    class="brand-outline-card mx-auto max-w-7xl rounded-[1.75rem] border border-brand-border bg-brand-canvas/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-brand-canvas/78"
  >
    <div
      class="mx-auto flex min-h-12 flex-wrap items-start gap-x-2 gap-y-2 px-3 py-2 sm:px-4 md:min-h-16 md:flex-nowrap md:items-center md:gap-3 md:px-6 md:py-3 lg:px-8"
    >
      <Navigation.Header
        class="flex min-w-0 flex-1 items-center gap-2.5 md:gap-6"
      >
        <a
          href={homeHref}
          class="shrink-0 rounded-full bg-brand-panel/85 px-2 py-0.75 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 md:px-3 md:py-1.5"
          aria-label="Kwipoo home"
        >
          <span class="text-[1.65rem] font-monoton text-primary-600 md:text-2xl">
            Kwipoo
          </span>
        </a>

        <Navigation.Menu class="hidden items-center gap-2 md:flex">
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          {#each desktopLinks as item (item.href)}
            <Navigation.TriggerAnchor
              href={resolve(item.href)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              class={[
                navLinkBaseClass,
                isCurrent(item.href)
                  ? "bg-primary-800 text-surface-50 shadow-sm hover:bg-primary-900 hover:text-surface-50"
                  : "text-surface-950/90 hover:bg-brand-panel hover:text-surface-950",
              ]}
            >
              <Navigation.TriggerText>{item.label}</Navigation.TriggerText>
            </Navigation.TriggerAnchor>
          {/each}
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        </Navigation.Menu>
      </Navigation.Header>

      <Navigation.Group class="hidden items-center gap-3 md:flex">
        <Button
          href={APP_SIGNUP_URL}
          variant="primary"
          class="w-auto px-5"
          analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
          analyticsProperties={createMarketingCtaClickedProperties({
            location: "header_desktop",
            label: "Get Started",
            destination: APP_SIGNUP_URL,
            kind: "signup",
          })}
        >
          Get Started
        </Button>
        <Button
          href={APP_LOGIN_URL}
          variant="outline"
          class="w-auto px-5"
          analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
          analyticsProperties={createMarketingCtaClickedProperties({
            location: "header_desktop",
            label: "Log In",
            destination: APP_LOGIN_URL,
            kind: "login",
          })}
        >
          Log In
        </Button>
      </Navigation.Group>

      <div class="ml-auto flex shrink-0 items-center md:hidden">
        {#if mobileLinks.length > 0}
          <Navigation.Menu class="flex min-w-0 items-center gap-1.5">
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            {#each mobileLinks as item (item.href)}
              <Navigation.TriggerAnchor
                href={resolve(item.href)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                class={[
                  navLinkBaseClass,
                  isCurrent(item.href)
                    ? "bg-primary-800 text-surface-50 shadow-sm hover:bg-primary-900 hover:text-surface-50"
                    : "text-surface-950/90 hover:bg-brand-panel hover:text-surface-950",
                ]}
              >
                <Navigation.TriggerText>{item.label}</Navigation.TriggerText>
              </Navigation.TriggerAnchor>
            {/each}
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
          </Navigation.Menu>
        {/if}
      </div>

      <div class="flex w-full items-center gap-2 md:hidden">
        <Button
          href={APP_SIGNUP_URL}
          variant="primary"
          size="sm"
          class="min-w-0 flex-1 px-3.5"
          analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
          analyticsProperties={createMarketingCtaClickedProperties({
            location: "header_mobile",
            label: "Get Started",
            destination: APP_SIGNUP_URL,
            kind: "signup",
          })}
        >
          Get Started
        </Button>
        <Button
          href={APP_LOGIN_URL}
          variant="outline"
          size="sm"
          class="min-w-0 flex-1 px-3"
          analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
          analyticsProperties={createMarketingCtaClickedProperties({
            location: "header_mobile",
            label: "Log In",
            destination: APP_LOGIN_URL,
            kind: "login",
          })}
        >
          Log In
        </Button>
      </div>
    </div>
  </Navigation>
</div>
