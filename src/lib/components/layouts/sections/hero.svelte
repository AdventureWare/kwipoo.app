<!-- src/lib/components/hero-section.svelte -->
<script lang="ts">
  import AppStoreButtons from "../../ui/buttons/app-store-buttons.svelte";
  import Button from "../../ui/buttons/button.svelte";
</script>

<section class="relative bg-neutral-100 rounded-4xl mb-30">
  <div class="px-8 sm:px-6 lg:px-8">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center overflow-hidden"
    >
      <!-- Left Content -->
      <div class="text-left py-16 sm:py-20 lg:py-24">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Life is busy. <br />
          Your stuff shouldn't make it busier
        </h1>

        <p
          class="mb-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-0"
        >
          Track what you own, where you keep it, and what you need for any
          occasion—all in one app.
        </p>

        <div class="flex flex-col gap-4">
          <div class="w-full sm:max-w-2/5 lg:max-w-1/2">
            <Button
              variant="primary"
              size="lg"
              href="https://kwipoo.vercel.app/login">Open in Browser</Button
            >
          </div>

          <AppStoreButtons />
        </div>
      </div>

      <!-- Right Content - Phone Mockup (Hidden on mobile) -->
      <div class="hidden lg:block relative h-full">
        <img
          src="/assets/product_Feature.png"
          alt="Kwipoo app interface"
          class="absolute bottom-0 right-0 w-80 h-auto transform translate-y-20 -translate-x-20"
        />
      </div>
    </div>
  </div>
</section>
