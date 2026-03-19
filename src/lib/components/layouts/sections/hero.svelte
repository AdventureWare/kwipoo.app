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
        <div class="hero-phone-wrap relative w-full max-w-[18rem] sm:max-w-[20rem]">
          <div
            class="absolute inset-x-5 bottom-4 top-10 rounded-full bg-primary-200/65 blur-3xl"
          ></div>

          <div
            class="relative rounded-[3.25rem] bg-primary-950 p-2 shadow-[0_30px_80px_-30px_rgba(12,37,39,0.65)] ring-1 ring-primary-900/30"
          >
            <div class="rounded-[2.8rem] bg-slate-950 p-2">
              <div
                class="relative overflow-hidden rounded-[2.35rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_rgba(255,255,255,0)_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]"
              >
                <div
                  class="pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-28 -translate-x-1/2 rounded-b-[1rem] bg-slate-950"
                ></div>

                <img
                  src="/assets/product_Feature.png"
                  alt="Kwipoo app interface"
                  class="block w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
