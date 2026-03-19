<!-- src/lib/components/ui/app-store-buttons.svelte -->
<script lang="ts">
  import AppleStore from "./apple-store.svelte";
  import GooglePlay from "./google-play.svelte";
</script>

<div
  class="flex flex-col items-stretch justify-start gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4"
>
  <AppleStore />

  <GooglePlay />
</div>
