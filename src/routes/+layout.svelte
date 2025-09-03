<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { Header, Footer } from "$lib/components";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-neutral-50 flex flex-col">
  <Header />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
