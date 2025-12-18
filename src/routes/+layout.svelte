<script lang="ts">
  import "../app.css";
  import { Header, Footer } from "$lib/components";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" sizes="any" href="/favicon.ico" />
</svelte:head>

<div class="min-h-screen bg-surface flex flex-col">
  <Header />
  <main class="flex-grow m-8 xl:mx-auto xl:max-w-7xl">
    {@render children()}
  </main>
  <Footer />
</div>
