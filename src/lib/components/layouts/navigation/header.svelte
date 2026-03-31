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
    "rounded-full px-2.5 py-1.5 text-[0.95rem] font-semibold tracking-[0.01em] transition-colors md:px-4 md:py-2.5 md:text-[1.1rem]";

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
      class="mx-auto flex min-h-13 flex-wrap items-center gap-1.5 px-4 py-1.5 sm:px-6 md:min-h-16 md:flex-nowrap md:gap-3 md:py-3 lg:px-8"
    >
      <Navigation.Header
        class="flex min-w-0 flex-1 items-center gap-4 md:gap-6"
      >
        <a
          href={homeHref}
          class="shrink-0 rounded-full bg-brand-panel/85 px-2.5 py-1 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 md:px-3 md:py-1.5"
          aria-label="Kwipoo home"
        >
          <span class="text-2xl font-monoton text-primary-600">Kwipoo</span>
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

      <Navigation.Group
        class="ml-auto flex w-full flex-wrap items-center justify-end gap-2 md:hidden"
      >
        {#if mobileLinks.length > 0}
          <Navigation.Menu
            class="flex flex-wrap items-center justify-end gap-2"
          >
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

        <Button
          href={APP_SIGNUP_URL}
          variant="primary"
          size="sm"
          class="w-auto"
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
          class="w-auto"
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
      </Navigation.Group>
    </div>
  </Navigation>
</div>
