<script lang="ts">
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import { initializeAnalytics, isAnalyticsEnabled, trackPageView } from "$lib/analytics";
  import { createMarketingPageViewProperties } from "$lib/analytics/schema";

  let lastTrackedUrl = "";

  function trackCurrentPage(url: URL, navigationType: string) {
    const resolvedUrl = url.toString();

    if (resolvedUrl === lastTrackedUrl) {
      return;
    }

    lastTrackedUrl = resolvedUrl;

    trackPageView(createMarketingPageViewProperties({
      path: url.pathname,
      search: url.search || undefined,
      url: resolvedUrl,
      title: document.title,
      navigation_type: navigationType,
      referrer: document.referrer || undefined,
    }));
  }

  onMount(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    void initializeAnalytics();
    trackCurrentPage(page.url, "initial_load");

    return afterNavigate(({ to, type }) => {
      if (!to?.url) {
        return;
      }

      trackCurrentPage(to.url, type);
    });
  });
</script>
