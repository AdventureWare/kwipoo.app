<!-- src/lib/components/navigation/header.svelte -->
<script lang="ts">
  import { Navigation } from "@skeletonlabs/skeleton-svelte";
  import { page } from "$app/state";
  import { resolve } from "$app/paths";
  import { isFeatureEnabled } from "$lib/config/feature-flags";
  import { APP_LOGIN_URL } from "$lib/config/site";
  import Button from "../../ui/buttons/button.svelte";

  const homeHref = resolve("/");
  const docsHref = resolve("/docs");
  const pricingHref = resolve("/pricing");
  const resourcesHref = resolve("/resources");
  const releasesHref = resolve("/releases");
  const docsEnabled = isFeatureEnabled("docs");
  const pricingEnabled = isFeatureEnabled("pricing");
  const resourcesEnabled = isFeatureEnabled("resources");
  const releaseHistoryEnabled = isFeatureEnabled("releaseHistory");

  const desktopLinks = [
    { href: homeHref, label: "Home" },
    ...(pricingEnabled ? [{ href: pricingHref, label: "Pricing" }] : []),
    ...(docsEnabled ? [{ href: docsHref, label: "Docs" }] : []),
    ...(resourcesEnabled ? [{ href: resourcesHref, label: "Resources" }] : []),
    ...(releaseHistoryEnabled
      ? [{ href: releasesHref, label: "Releases" }]
      : []),
  ];

  const mobileLinks = [
    ...(pricingEnabled ? [{ href: pricingHref, label: "Pricing" }] : []),
    ...(docsEnabled ? [{ href: docsHref, label: "Docs" }] : []),
    ...(resourcesEnabled ? [{ href: resourcesHref, label: "Resources" }] : []),
    ...(releaseHistoryEnabled
      ? [{ href: releasesHref, label: "Releases" }]
      : []),
  ];

  const navLinkBaseClass =
    "rounded-full px-3 py-2 text-[1.04rem] font-semibold tracking-[0.01em] transition-colors md:px-4 md:py-2.5 md:text-[1.1rem]";

  function isCurrent(href: string): boolean {
    return (
      page.url.pathname === href ||
      (href !== homeHref && page.url.pathname.startsWith(`${href}/`))
    );
  }
</script>

<Navigation
  layout="bar"
  class="sticky top-0 z-50 border-b border-brand-border bg-brand-canvas/95 backdrop-blur supports-[backdrop-filter]:bg-brand-canvas/88"
>
  <div
    class="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center gap-2 px-4 py-1.5 sm:px-6 md:min-h-16 md:flex-nowrap md:gap-3 md:py-2.5 lg:px-8"
  >
    <Navigation.Header class="flex min-w-0 flex-1 items-center gap-4 md:gap-6">
      <a href={homeHref} class="shrink-0" aria-label="Kwipoo home">
        <span class="text-2xl font-monoton text-primary-600">Kwipoo</span>
      </a>

      <Navigation.Menu class="hidden items-center gap-2 md:flex">
        {#each desktopLinks as item (item.href)}
          <Navigation.TriggerAnchor
            href={item.href}
            aria-current={isCurrent(item.href) ? "page" : undefined}
            class={[
              navLinkBaseClass,
              isCurrent(item.href)
                ? "bg-primary-800 text-surface-50 hover:bg-primary-900 hover:text-surface-50"
                : "text-surface-950 hover:bg-primary-50 hover:text-surface-950",
            ]}
          >
            <Navigation.TriggerText>{item.label}</Navigation.TriggerText>
          </Navigation.TriggerAnchor>
        {/each}
      </Navigation.Menu>
    </Navigation.Header>

    <Navigation.Group class="hidden items-center md:flex">
      <Button href={APP_LOGIN_URL} variant="secondary" class="w-auto px-5">
        Get Started
      </Button>
    </Navigation.Group>

    <Navigation.Group
      class="ml-auto flex w-full flex-wrap items-center justify-end gap-2 md:hidden"
    >
      {#if mobileLinks.length > 0}
        <Navigation.Menu class="flex flex-wrap items-center justify-end gap-2">
          {#each mobileLinks as item (item.href)}
            <Navigation.TriggerAnchor
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              class={[
                navLinkBaseClass,
                isCurrent(item.href)
                  ? "bg-primary-800 text-surface-50 hover:bg-primary-900 hover:text-surface-50"
                  : "text-surface-950 hover:bg-primary-50 hover:text-surface-950",
              ]}
            >
              <Navigation.TriggerText>{item.label}</Navigation.TriggerText>
            </Navigation.TriggerAnchor>
          {/each}
        </Navigation.Menu>
      {/if}

      <Button href={APP_LOGIN_URL} variant="secondary" size="sm" class="w-auto">
        Get Started
      </Button>
    </Navigation.Group>
  </div>
</Navigation>
