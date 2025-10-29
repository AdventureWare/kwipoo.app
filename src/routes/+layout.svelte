<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { Header, Footer } from "$lib/components";
  import { page } from "$app/state";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let { children } = $props();

  // Track page views with context
  $effect(() => {
    if (browser && window.posthog) {
      // Enhanced page view tracking
      window.posthog.capture("$pageview", {
        path: page.url.pathname,
        referrer: document.referrer,
        page_type: getPageType(page.url.pathname),
        utm_source: page.url.searchParams.get("utm_source"),
        utm_medium: page.url.searchParams.get("utm_medium"),
        utm_campaign: page.url.searchParams.get("utm_campaign"),
      });
    }
  });

  // Scroll depth tracking
  onMount(() => {
    if (!browser) return;

    let maxScroll = 0;
    let scrollTimer: number;

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      maxScroll = Math.max(maxScroll, scrollPercent);

      // Track milestone scrolls (25%, 50%, 75%, 100%)
      if (scrollPercent >= 25 && maxScroll < 25) {
        window.posthog?.capture("scroll_milestone", {
          depth: 25,
          page: page.url.pathname,
        });
      } else if (scrollPercent >= 50 && maxScroll < 50) {
        window.posthog?.capture("scroll_milestone", {
          depth: 50,
          page: page.url.pathname,
        });
      } else if (scrollPercent >= 75 && maxScroll < 75) {
        window.posthog?.capture("scroll_milestone", {
          depth: 75,
          page: page.url.pathname,
        });
      } else if (scrollPercent >= 90 && maxScroll < 90) {
        window.posthog?.capture("scroll_milestone", {
          depth: 90,
          page: page.url.pathname,
        });
      }
    };

    // Time on page tracking
    const startTime = Date.now();

    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(trackScroll, 100);
    });

    // Track when leaving page
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      window.posthog?.capture("page_engagement", {
        max_scroll_depth: maxScroll,
        time_spent_seconds: timeSpent,
        page: page.url.pathname,
        engaged: timeSpent > 10 && maxScroll > 25, // User engaged if spent >10s and scrolled >25%
      });
    };
  });

  // Error tracking
  onMount(() => {
    if (!browser) return;

    const errorHandler = (event: ErrorEvent) => {
      window.posthog?.capture("javascript_error", {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        page: window.location.pathname,
      });
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      window.posthog?.capture("unhandled_promise_rejection", {
        reason: event.reason?.toString(),
        page: window.location.pathname,
      });
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  });

  function getPageType(path: string): string {
    if (path === "/") return "landing";
    if (path.startsWith("/documentation")) return "documentation";
    if (path.startsWith("/guides")) return "guides";
    if (path.startsWith("/blogs")) return "blog";
    if (path.startsWith("/about")) return "about";
    return "other";
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-surface flex flex-col">
  <Header />
  <main class="flex-grow m-8 xl:mx-auto xl:max-w-7xl">
    {@render children()}
  </main>
  <Footer />
</div>
