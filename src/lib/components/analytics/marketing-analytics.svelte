<script lang="ts">
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import {
    disableAnalyticsCapture,
    initializeAnalytics,
    isAnalyticsEnabled,
    trackPageView,
  } from "$lib/analytics";
  import {
    ANALYTICS_CONSENT_CHANGED_EVENT,
    hasAnalyticsConsent,
    type AnalyticsConsentChangedDetail,
  } from "$lib/analytics/consent";
  import { createMarketingPageViewProperties } from "$lib/analytics/schema";

  let lastTrackedUrl = "";

  function trackCurrentPage(url: URL, navigationType: string) {
    if (!hasAnalyticsConsent()) {
      return;
    }

    const resolvedUrl = url.toString();

    if (resolvedUrl === lastTrackedUrl) {
      return;
    }

    lastTrackedUrl = resolvedUrl;

    trackPageView(
      createMarketingPageViewProperties({
        path: url.pathname,
        search: url.search || undefined,
        url: resolvedUrl,
        title: document.title,
        navigation_type: navigationType,
        referrer: document.referrer || undefined,
      }),
    );
  }

  onMount(() => {
    if (!isAnalyticsEnabled()) {
      return;
    }

    if (hasAnalyticsConsent()) {
      void initializeAnalytics();
      trackCurrentPage(page.url, "initial_load");
    }

    afterNavigate(({ to, type }) => {
      if (!to?.url) {
        return;
      }

      trackCurrentPage(to.url, type);
    });

    function handleConsentChanged(event: Event): void {
      const { detail } = event as CustomEvent<AnalyticsConsentChangedDetail>;

      if (detail.preference === "accepted") {
        void initializeAnalytics();
        trackCurrentPage(page.url, "consent_granted");
        return;
      }

      disableAnalyticsCapture();
    }

    window.addEventListener(
      ANALYTICS_CONSENT_CHANGED_EVENT,
      handleConsentChanged,
    );

    return () => {
      window.removeEventListener(
        ANALYTICS_CONSENT_CHANGED_EVENT,
        handleConsentChanged,
      );
    };
  });
</script>
