<!-- src/lib/components/hero-section.svelte -->
<script lang="ts">
  import { asset } from "$app/paths";
  import {
    ANALYTICS_EVENT_NAMES,
    createMarketingCtaClickedProperties,
  } from "$lib/analytics/schema";
  import { APP_LOGIN_URL, APP_SIGNUP_URL } from "$lib/config/site";
  import AppStoreButtons from "../../ui/buttons/app-store-buttons.svelte";
  import Button from "../../ui/buttons/button.svelte";
  import MotionReveal from "../../ui/motion-reveal.svelte";
</script>

<section
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-panel shadow-sm"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute -left-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-200)_72%,transparent)_0%,transparent_72%)] blur-2xl"
    ></div>
    <div
      class="absolute right-0 top-8 h-48 w-48 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_75%,transparent)_0%,transparent_72%)] blur-2xl"
    ></div>
    <div
      class="brand-soft-grid absolute inset-x-8 bottom-0 h-32 opacity-40"
    ></div>
  </div>

  <div class="relative px-4 sm:px-8 lg:px-10">
    <div
      class="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
    >
      <div class="py-3 text-left sm:py-16 lg:py-20">
        <MotionReveal delay={40} distance={18} class="mb-3 hidden sm:block">
          <p class="brand-section-label">Personal Inventory For Real Life</p>
        </MotionReveal>

        <MotionReveal delay={100} distance={24}>
          <h1
            class="text-[1.7rem] font-bold leading-[1.02] text-primary-950 sm:max-w-2xl sm:text-5xl sm:leading-tight lg:text-6xl"
          >
            Life is busy. <br class="hidden sm:block" />
            Your stuff shouldn't make it busier
          </h1>
        </MotionReveal>

        <MotionReveal delay={180} distance={28}>
          <p
            class="mx-0 mb-3 mt-2 max-w-none text-[0.95rem] leading-[1.55] text-brand-body sm:mb-6 sm:mt-5 sm:max-w-xl sm:text-xl"
          >
            Keep track of what you own, where it lives, and what you need next
            in one personal inventory app.
          </p>
        </MotionReveal>

        <MotionReveal
          delay={240}
          distance={22}
          class="mb-8 hidden flex-wrap gap-2.5 sm:flex"
        >
          <span
            class="rounded-full border border-brand-border bg-brand-canvas/85 px-3.5 py-2 text-sm font-medium text-brand-ink shadow-sm"
          >
            Search what you own
          </span>
          <span
            class="rounded-full border border-brand-border bg-brand-canvas/85 px-3.5 py-2 text-sm font-medium text-brand-ink shadow-sm"
          >
            See where it lives
          </span>
          <span
            class="rounded-full border border-brand-border bg-brand-canvas/85 px-3.5 py-2 text-sm font-medium text-brand-ink shadow-sm"
          >
            Reuse trip and event setups
          </span>
        </MotionReveal>

        <MotionReveal
          delay={320}
          distance={30}
          class="flex max-w-xl flex-col gap-2.5 sm:gap-4"
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <div class="w-full sm:max-w-xs">
                <Button
                  variant="primary"
                  size="lg"
                  href={APP_SIGNUP_URL}
                  analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
                  analyticsProperties={createMarketingCtaClickedProperties({
                    location: "hero",
                    label: "Create Free Account",
                    destination: APP_SIGNUP_URL,
                    kind: "signup",
                  })}
                >
                  Create Free Account
                </Button>
              </div>

              <div class="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  href={APP_LOGIN_URL}
                  class="sm:min-w-[9.5rem]"
                  analyticsEvent={ANALYTICS_EVENT_NAMES.marketingCtaClicked}
                  analyticsProperties={createMarketingCtaClickedProperties({
                    location: "hero",
                    label: "Open App",
                    destination: APP_LOGIN_URL,
                    kind: "login",
                  })}
                >
                  Open App
                </Button>
              </div>
            </div>

            <p
              class="hidden max-w-xs text-sm leading-relaxed text-brand-muted sm:block sm:text-[0.95rem]"
            >
              Free account. Useful for storage, hobbies, travel prep, and the
              little things you are tired of re-finding.
            </p>
          </div>

          <div
            class="rounded-[1.75rem] border border-brand-border bg-brand-canvas/80 p-3 shadow-sm ring-1 ring-white/45 backdrop-blur-sm sm:p-4"
          >
            <p
              class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700"
            >
              Pick up where you plan and pack
            </p>
            <AppStoreButtons />
          </div>
        </MotionReveal>
      </div>

      <div
        class="relative flex justify-center pb-10 sm:pb-12 lg:justify-end lg:py-12"
      >
        <MotionReveal
          delay={480}
          distance={16}
          class="absolute -right-3 bottom-14 hidden xl:block"
        >
          <div
            class="animate-float-soft-delayed max-w-[13rem] rounded-[1.5rem] border border-brand-border bg-brand-canvas/92 p-4 shadow-sm"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700"
            >
              Reusable Plans
            </p>
            <p class="mt-2 text-sm leading-relaxed text-brand-body">
              Build once, reuse often, and avoid last-minute scrambling.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal
          delay={260}
          distance={36}
          class="hero-phone-wrap relative w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem]"
        >
          <div
            class="animate-glow-pulse absolute inset-x-5 bottom-4 top-10 rounded-full bg-brand-glow blur-3xl"
          ></div>
          <div
            class="absolute inset-2 rounded-[3.5rem] border border-white/35"
          ></div>

          <div
            class="animate-drift-soft brand-outline-card relative rounded-[3.65rem] bg-brand-shell p-2.5 shadow-2xl ring-1 ring-primary-900/25"
          >
            <div class="rounded-[3rem] bg-brand-screen p-2.5">
              <div
                class="relative overflow-hidden rounded-[2.55rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.22),_rgba(255,255,255,0)_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]"
              >
                <div
                  class="pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-28 -translate-x-1/2 rounded-b-[1rem] bg-brand-screen"
                ></div>
                <div
                  class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,_rgba(255,255,255,0.15),_rgba(255,255,255,0))]"
                ></div>

                <img
                  src={asset("/assets/product_Feature.png")}
                  alt="Kwipoo app interface"
                  class="block w-full"
                />
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </div>
  </div>
</section>
