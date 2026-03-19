<!-- src/lib/components/navigation/header.svelte -->
<script lang="ts">
  import { resolve } from "$app/paths";
  import { APP_LOGIN_URL, DOCS_ENABLED } from "$lib/config/site";
  import Button from "../../ui/buttons/button.svelte";

  const navLinkClass =
    "text-sm font-medium text-neutral-800 transition-colors hover:text-primary-700";
</script>

<header class="bg-white border-b border-neutral-100 sticky top-0 z-50">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center gap-4 h-16">
      <div class="flex items-center gap-8 min-w-0">
        <a href={resolve("/")} class="flex items-center">
          <span class="text-2xl font-monoton text-primary-500">Kwipoo</span>
        </a>

        <div class="hidden md:flex items-center gap-6">
          <a href={resolve("/")} class={navLinkClass}>Home</a>
          {#if DOCS_ENABLED}
            <a href={resolve("/docs")} class={navLinkClass}>Docs</a>
          {/if}
        </div>
      </div>

      <div class="hidden md:flex items-center gap-5">
        <Button href={APP_LOGIN_URL} variant="secondary" class="w-auto">
          Get Started
        </Button>
      </div>

      <div class="md:hidden flex items-center gap-4">
        {#if DOCS_ENABLED}
          <a href={resolve("/docs")} class={navLinkClass}>Docs</a>
        {/if}
        <Button href={APP_LOGIN_URL} variant="secondary" size="sm" class="w-auto">
          Get Started
        </Button>
      </div>
    </div>
  </nav>
</header>
