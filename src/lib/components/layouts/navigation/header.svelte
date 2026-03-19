<!-- src/lib/components/navigation/header.svelte -->
<script lang="ts">
  import { resolve } from "$app/paths";
  import { APP_LOGIN_URL } from "$lib/config/site";
  import Button from "../../ui/buttons/button.svelte";
</script>

<header class="bg-white border-b border-neutral-100 sticky top-0 z-50">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="flex-shrink-0">
        <a href={resolve("/")} class="flex items-center">
          <span class="text-2xl font-monoton text-primary-500">Kwipoo</span>
        </a>
      </div>

      <div class="hidden md:flex items-center">
        <Button href={APP_LOGIN_URL} variant="secondary">
          Get Started
        </Button>
      </div>

      <div class="md:hidden flex items-center gap-4">
        <Button href={APP_LOGIN_URL} variant="secondary">
          Get Started
        </Button>
      </div>
    </div>
  </nav>
</header>
