<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { Header, Footer } from "$lib/components";

  let { children } = $props();
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
