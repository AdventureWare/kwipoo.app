<!-- src/lib/components/hero-section.svelte -->
<script lang="ts">
  import { asset } from "$app/paths";
  import { APP_LOGIN_URL } from "$lib/config/site";
  import AppStoreButtons from "../../ui/buttons/app-store-buttons.svelte";
  import Button from "../../ui/buttons/button.svelte";
</script>

<section
  class="card relative mb-30 overflow-hidden border border-brand-border bg-brand-panel shadow-sm"
>
  <div class="px-6 sm:px-8 lg:px-10">
    <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div class="py-10 text-left sm:py-16 lg:py-20">
        <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Life is busy. <br />
          Your stuff shouldn't make it busier
        </h1>

        <p
          class="mx-0 mb-6 max-w-lg text-lg leading-relaxed text-brand-muted sm:text-xl"
        >
          Keep track of what you own, where it lives, and what you need next in
          one personal inventory app.
        </p>

        <div class="flex flex-col gap-4">
          <div class="w-full sm:max-w-xs">
            <Button variant="primary" size="lg" href={APP_LOGIN_URL}
              >Open in Browser</Button
            >
          </div>

          <AppStoreButtons />
        </div>
      </div>

      <div class="flex justify-center pb-10 sm:pb-12 lg:justify-end lg:py-12">
        <div
          class="hero-phone-wrap relative w-full max-w-[18rem] sm:max-w-[20rem]"
        >
          <div
            class="absolute inset-x-5 bottom-4 top-10 rounded-full bg-brand-glow blur-3xl"
          ></div>

          <div
            class="relative rounded-[3.25rem] bg-brand-shell p-2 shadow-2xl ring-1 ring-primary-900/25"
          >
            <div class="rounded-[2.8rem] bg-brand-screen p-2">
              <div
                class="relative overflow-hidden rounded-[2.35rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_rgba(255,255,255,0)_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]"
              >
                <div
                  class="pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-28 -translate-x-1/2 rounded-b-[1rem] bg-brand-screen"
                ></div>

                <img
                  src={asset("/assets/product_Feature.png")}
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
