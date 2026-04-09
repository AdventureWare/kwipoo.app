<script lang="ts">
  import type { Component } from "svelte";
  import MotionReveal from "$lib/components/ui/motion-reveal.svelte";
  import QuipuThreads from "$lib/components/ui/quipu-threads.svelte";

  interface ProblemHighlight {
    icon: Component;
    title: string;
    description: string;
  }

  interface Props {
    eyebrow: string;
    title: string;
    description: string;
    items: ProblemHighlight[];
    signals?: string[];
  }

  let {
    eyebrow,
    title,
    description,
    items,
    signals = [],
  }: Props = $props();
</script>

<section
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="animate-glow-pulse absolute -left-12 top-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_76%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
    <div
      class="absolute right-0 top-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
    <div class="brand-soft-grid absolute inset-x-6 bottom-0 h-28 opacity-35"></div>
    <div class="absolute right-10 top-0 hidden lg:block">
      <QuipuThreads
        class="animate-quipu-sway opacity-65"
        strands={[
          { length: 88, knots: [24, 56], accent: "gold" },
          { length: 122, knots: [26, 62, 96], accent: "teal" },
          { length: 104, knots: [30, 72], accent: "gold" },
        ]}
      />
    </div>
  </div>

  <div class="relative mx-auto max-w-6xl">
    <div
      class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6"
    >
      <MotionReveal delay={50}>
        <div
          class="brand-outline-card relative overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-panel/88 p-6 shadow-sm sm:p-7"
        >
          <div
            class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/80 to-transparent"
          ></div>

          <p class="brand-section-label mb-4">{eyebrow}</p>
          <div class="absolute right-6 top-0 hidden sm:block lg:hidden">
            <QuipuThreads
              class="opacity-55"
              strands={[
                { length: 60, knots: [18, 40], accent: "teal" },
                { length: 82, knots: [24, 58], accent: "gold" },
              ]}
            />
          </div>
          <h2
            class="max-w-lg text-3xl font-bold leading-tight text-primary-950 sm:text-4xl"
          >
            {title}
          </h2>
          <p
            class="mt-4 max-w-xl text-base leading-relaxed text-brand-body sm:text-lg"
          >
            {description}
          </p>

          {#if signals.length > 0}
            <div class="mt-6 grid gap-3 sm:grid-cols-2">
              {#each signals as signal (signal)}
                <div
                  class="rounded-2xl border border-brand-border bg-brand-canvas/86 px-4 py-3 text-sm font-medium text-brand-ink shadow-sm"
                >
                  {signal}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </MotionReveal>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {#each items as item, index (item.title)}
          <MotionReveal delay={110 + index * 70} distance={22}>
            <article
              class="brand-outline-card relative flex h-full flex-col rounded-[1.5rem] border border-brand-border bg-brand-canvas/94 p-5 shadow-sm sm:p-6"
            >
              <div
                class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent"
              ></div>

              <div
                class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-panel text-primary-700 shadow-sm"
              >
                <item.icon class="h-5 w-5 sm:h-6 sm:w-6"></item.icon>
              </div>

              <h3 class="text-lg font-semibold text-primary-950 sm:text-xl">
                {item.title}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-brand-body sm:text-base">
                {item.description}
              </p>
            </article>
          </MotionReveal>
        {/each}
      </div>
    </div>
  </div>
</section>
