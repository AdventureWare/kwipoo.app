<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import { Header, Footer } from "$lib/components";
  import { SITE_NAME } from "$lib/config/site";
  import {
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_OG_IMAGE_URL,
    toAbsoluteMarketingUrl,
  } from "$lib/seo";

  let { children } = $props();
  let canonicalUrl = $derived(toAbsoluteMarketingUrl(page.url.pathname));
</script>

<svelte:head>
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
  <meta property="og:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
  <meta name="twitter:image:alt" content={DEFAULT_OG_IMAGE_ALT} />
</svelte:head>

<div class="min-h-screen bg-surface flex flex-col">
  <Header />
  <main class="flex-grow m-8 xl:mx-auto xl:max-w-7xl">
    {@render children()}
  </main>
  <Footer />
</div>
