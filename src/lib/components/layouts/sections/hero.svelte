<!-- src/lib/components/hero-section.svelte -->
<script lang="ts">
  import { APP_LOGIN_URL } from "$lib/config/site";
  import AppStoreButtons from "../../ui/buttons/app-store-buttons.svelte";
  import Button from "../../ui/buttons/button.svelte";
</script>

<section class="relative mb-30 overflow-hidden rounded-4xl bg-neutral-100">
  <div class="px-6 sm:px-8 lg:px-10">
    <div
      class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div class="py-12 text-left sm:py-16 lg:py-20">
        <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Life is busy. <br />
          Your stuff shouldn't make it busier
        </h1>

        <p
          class="mx-0 mb-6 max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl"
        >
          Track what you own, where you keep it, and what you need for any
          occasion—all in one app.
        </p>

        <div class="flex flex-col gap-4">
          <div class="w-full sm:max-w-xs">
            <Button
              variant="primary"
              size="lg"
              href={APP_LOGIN_URL}>Open in Browser</Button
            >
          </div>

          <AppStoreButtons />
        </div>
      </div>

      <div class="flex justify-center pb-10 sm:pb-12 lg:justify-end lg:py-12">
        <div
          class="w-full max-w-sm rounded-[2rem] bg-white/75 p-3 shadow-xl ring-1 ring-black/5 backdrop-blur sm:max-w-md sm:p-4 lg:max-w-lg"
        >
          <img
            src="/assets/product_Feature.png"
            alt="Kwipoo app interface"
            class="aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  </div>
</section>
