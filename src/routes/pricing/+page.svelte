<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import { PREMIUM_SIGNUP_PATH } from "$lib/config/billing";
  import {
    APP_SIGNUP_URL,
    SUPPORT_EMAIL,
    SUPPORT_EMAIL_MAILTO,
  } from "$lib/config/site";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type PricingTier = {
    name: string;
    eyebrow: string;
    highlight?: string;
    priceLabel: string;
    cadence: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    ctaVariant: "primary" | "secondary" | "outline" | "ghost";
    footnote: string;
    featured?: boolean;
  };

  type ComparisonRow = {
    label: string;
    free: string;
    premium: string;
    custom: string;
  };

  const pricingTitle = "Kwipoo Pricing | Free, Premium, and Custom Plans";
  const pricingDescription =
    "Explore the draft Kwipoo pricing page scaffold with placeholder Free, Premium, and Custom plan positioning.";
  const customPricingHref = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
    "Kwipoo custom pricing inquiry",
  )}`;

  const pricingTiers = [
    {
      name: "Free",
      eyebrow: "For getting started",
      priceLabel: "$0",
      cadence: "to start",
      description:
        "A draft entry point for trying Kwipoo without committing to a paid plan.",
      features: [
        "Up to 100 cloud-stored Places and Things",
        "Core inventory structure for organizing what you own and where it lives",
        "Basic planning workflows for early Sets, storage cleanup, and trip prep",
        "Self-serve setup for individuals or households testing the product",
      ],
      ctaLabel: "Start Free",
      ctaHref: APP_SIGNUP_URL,
      ctaVariant: "secondary",
      footnote:
        "Placeholder draft. Free-plan limits and included features are not final.",
    },
    {
      name: "Premium",
      eyebrow: "For heavier personal use",
      highlight: "Suggested flagship plan",
      priceLabel: "Premium pricing TBD",
      cadence: "monthly or annual",
      description:
        "A draft paid tier for people who want more room, more flexibility, and a clearer everyday workflow.",
      features: [
        "Higher limits than Free for stored inventory and planning data",
        "Placeholder room for richer organization, planning, or collaboration tools",
        "Placeholder room for upgraded support, onboarding, or priority help",
        "Shaped for active households, hobby gear, storage management, and repeat trip planning",
      ],
      ctaLabel: "Start Premium",
      ctaHref: PREMIUM_SIGNUP_PATH,
      ctaVariant: "primary",
      footnote:
        "Starts the Premium signup handoff flow. The final billing destination is environment-configurable.",
      featured: true,
    },
    {
      name: "Custom",
      eyebrow: "For larger or specialized setups",
      priceLabel: "Contact for pricing",
      cadence: "tailored to scope",
      description:
        "A draft lane for bigger households, clubs, teams, programs, or organizations that need a more specific arrangement.",
      features: [
        "Custom volume, account shape, or rollout conversations",
        "Placeholder room for onboarding, migration, or hands-on setup support",
        "Placeholder room for specialized collaboration, permissions, or workflow needs",
        "A direct discussion before packaging and commercial terms are finalized",
      ],
      ctaLabel: "Speak to Sales",
      ctaHref: customPricingHref,
      ctaVariant: "outline",
      footnote:
        "Use this as the placeholder path for custom packaging until the real offer is defined.",
    },
  ] satisfies PricingTier[];

  const comparisonRows = [
    {
      label: "Cloud-stored Places and Things",
      free: "Up to 100",
      premium: "Higher draft limit",
      custom: "Tailored to fit scope",
    },
    {
      label: "Best fit",
      free: "Trying Kwipoo",
      premium: "Daily personal or household use",
      custom: "Teams, groups, or complex rollouts",
    },
    {
      label: "Support model",
      free: "Self-serve",
      premium: "Draft upgraded support",
      custom: "Direct conversation",
    },
    {
      label: "Commercial model",
      free: "No-cost entry point",
      premium: "Paid subscription draft",
      custom: "Quoted engagement",
    },
  ] satisfies ComparisonRow[];

  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Kwipoo Pricing",
        url: toAbsoluteMarketingUrl("/pricing"),
        description: pricingDescription,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
      ]),
    ],
  };
</script>

<svelte:head>
  <title>{pricingTitle}</title>
  <meta name="description" content={pricingDescription} />
  <meta name="robots" content="noindex,nofollow" />
  <meta property="og:title" content={pricingTitle} />
  <meta property="og:description" content={pricingDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={toAbsoluteMarketingUrl("/pricing")} />
  <meta name="twitter:title" content={pricingTitle} />
  <meta name="twitter:description" content={pricingDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(pricingStructuredData)}
  </svelte:element>
</svelte:head>

<div class="grid gap-10 pb-10">
  <header class="grid gap-5">
    <nav
      aria-label="Breadcrumb"
      class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      <a href={resolve("/")} class="transition-colors hover:text-color">Home</a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Pricing</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Draft Pricing
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Placeholder pricing scaffolding for Free, Premium, and Custom plans.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          This page is intentionally shaped as a draft. The goal right now is to
          establish the structure, tone, and plan comparison flow before final
          pricing, packaging, and feature limits are locked.
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={APP_SIGNUP_URL}
            variant="primary"
            size="lg"
            class="sm:w-auto"
          >
            Start Free
          </Button>
          <Button href={PREMIUM_SIGNUP_PATH} variant="outline" size="lg" class="sm:w-auto">
            Start Premium
          </Button>
        </div>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            Current Status
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            This is a reviewable shell, not a final price sheet.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Copy, limits, and packaging are placeholders. The layout is ready to
            review now, and the offer details can be refined later without
            changing the page structure.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Flag
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            PUBLIC_FEATURE_PRICING
          </p>
        </div>
      </aside>
    </div>
  </header>

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Plans
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Three pricing lanes with room to sharpen the details later.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The scaffolding below is built to hold draft copy now and real plan
        details later. Each card has a clear audience, value framing, and next
        action.
      </p>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      {#each pricingTiers as tier (tier.name)}
        <article
          class={[
            "card flex h-full flex-col rounded-[1.5rem] border p-6 shadow-sm",
            tier.featured
              ? "border-primary-300 bg-linear-to-b from-primary-50 via-white to-surface-50"
              : "border-surface-200 bg-surface-50",
          ]}
        >
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-2">
              <p
                class={[
                  "text-[0.78rem] font-semibold uppercase tracking-[0.18em]",
                  tier.featured ? "text-primary-700" : "text-brand-muted",
                ]}
              >
                {tier.eyebrow}
              </p>
              <h3
                class="text-[1.55rem] font-semibold leading-tight text-surface-950"
              >
                {tier.name}
              </h3>
            </div>

            {#if tier.highlight}
              <span
                class="rounded-full border border-primary-200 bg-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-700"
              >
                {tier.highlight}
              </span>
            {/if}
          </div>

          <div class="mt-5 border-t border-surface-200 pt-5">
            <div class="flex flex-wrap items-end gap-x-3 gap-y-1">
              <p
                class="text-[1.9rem] font-semibold leading-none text-surface-950"
              >
                {tier.priceLabel}
              </p>
              <p
                class="pb-1 text-sm font-medium uppercase tracking-[0.14em] text-brand-muted"
              >
                {tier.cadence}
              </p>
            </div>
            <p class="mt-4 text-[0.98rem] leading-7 text-brand-body">
              {tier.description}
            </p>
          </div>

          <ul class="mt-5 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
            {#each tier.features as feature (feature)}
              <li class="flex gap-3">
                <span
                  aria-hidden="true"
                  class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500"
                ></span>
                <span>{feature}</span>
              </li>
            {/each}
          </ul>

          <div class="mt-auto pt-6">
            <Button
              href={tier.ctaHref}
              variant={tier.ctaVariant}
              class="w-full"
            >
              {tier.ctaLabel}
            </Button>
            <p class="mt-4 text-sm leading-6 text-brand-muted">
              {tier.footnote}
            </p>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        At A Glance
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Quick comparison rows for the first review pass.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        This is the lightweight comparison area. It gives the page a pricing
        page rhythm now without forcing final commitments too early.
      </p>
    </div>

    <div class="grid gap-4">
      {#each comparisonRows as row (row.label)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <h3 class="text-[1.1rem] font-semibold text-surface-950">
            {row.label}
          </h3>
          <div class="mt-4 grid gap-3 md:grid-cols-3">
            <div class="rounded-[1rem] border border-surface-200 bg-white p-4">
              <p
                class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-muted"
              >
                Free
              </p>
              <p class="mt-2 text-[0.98rem] leading-7 text-brand-body">
                {row.free}
              </p>
            </div>
            <div
              class="rounded-[1rem] border border-primary-200 bg-primary-50 p-4"
            >
              <p
                class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary-700"
              >
                Premium
              </p>
              <p class="mt-2 text-[0.98rem] leading-7 text-brand-body">
                {row.premium}
              </p>
            </div>
            <div class="rounded-[1rem] border border-surface-200 bg-white p-4">
              <p
                class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-muted"
              >
                Custom
              </p>
              <p class="mt-2 text-[0.98rem] leading-7 text-brand-body">
                {row.custom}
              </p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
    <article
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        What To Finalize Later
      </p>
      <div class="mt-4 grid gap-4">
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Exact plan limits
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Replace draft quantity language with the real thresholds once
            pricing and storage policy are settled.
          </p>
        </div>
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Premium differentiators
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Decide which benefits actually belong in Premium so the plan feels
            concrete rather than aspirational.
          </p>
        </div>
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Custom qualification
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Clarify who should contact sales and what kinds of usage patterns
            justify a custom conversation.
          </p>
        </div>
      </div>
    </article>

    <article
      class="card flex h-full flex-col justify-between rounded-[1.5rem] border border-secondary-200 bg-secondary-50 p-6 shadow-sm"
    >
      <div class="space-y-3">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-secondary-800"
        >
          Contact Placeholder
        </p>
        <h2 class="text-[1.55rem] font-semibold leading-tight text-surface-950">
          Use the Custom lane when a standard plan probably will not fit.
        </h2>
        <p class="text-[0.98rem] leading-7 text-brand-body">
          For now, the draft sales path can simply route to email while the
          actual qualification flow is being figured out.
        </p>
      </div>

      <div
        class="mt-6 rounded-[1.15rem] border border-secondary-200 bg-white/85 p-4"
      >
        <p
          class="text-sm font-semibold uppercase tracking-[0.16em] text-secondary-800"
        >
          Current contact
        </p>
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={customPricingHref}
          class="mt-2 inline-block text-base font-semibold text-surface-950 transition-colors hover:text-primary-700"
        >
          {SUPPORT_EMAIL}
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </article>
  </section>
</div>
