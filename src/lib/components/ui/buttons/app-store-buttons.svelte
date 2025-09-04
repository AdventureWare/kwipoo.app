<!-- src/lib/components/ui/app-store-buttons.svelte -->
<script lang="ts">
  import AppleStore from "./apple-store.svelte";
  import GooglePlay from "./google-play.svelte";

  const appStoreUrl = "https://apps.apple.com/us/app/kwipoo/id6505006728";
</script>

<div class="flex flex-col md:flex-row gap-4 items-start justify-start">
  <AppleStore />

  <GooglePlay />
</div>
