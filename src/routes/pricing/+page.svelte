<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    LIFETIME_OFFER_ENABLED,
    PREMIUM_MANAGE_URL,
    PREMIUM_SIGNUP_PATH,
  } from "$lib/config/billing";
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
    "Choose Kwipoo Free for up to 100 Things, upgrade to Premium for $5 per month or $50 per year, or buy early lifetime access while available.";
  const customPricingHref = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
    "Kwipoo custom pricing inquiry",
  )}`;

  const pricingTiers = [
    {
      name: "Free",
      eyebrow: "For getting started",
      priceLabel: "$0",
      cadence: "forever",
      description:
        "A strong starting point for organizing what you own before you need larger storage or inventory limits.",
      features: [
        "Up to 100 Things with the full core inventory structure",
        "250 MB of storage for starter photos and attachments",
        "Places, Sets, Events, and everyday planning workflows included",
        "Self-serve setup for a person or household getting organized",
      ],
      ctaLabel: "Start Free",
      ctaHref: APP_SIGNUP_URL,
      ctaVariant: "secondary" as const,
      footnote:
        "Free stays useful on its own, and you can upgrade later when you need more room.",
    },
    {
      name: "Premium",
      eyebrow: "For heavier personal use",
      highlight: "Suggested flagship plan",
      priceLabel: "$5",
      cadence: "per month or $50/year",
      description:
        "More room for active households, hobby gear, storage projects, and repeat trip planning without running into the free cap.",
      features: [
        "Up to 5,000 Things before you hit the inventory limit",
        "10 GB of storage for richer photos and attachments",
        "$50 annual plan saves $10 compared with monthly billing",
        "Hosted checkout and customer portal for self-serve billing",
        "Built for ongoing personal and household inventory use",
      ],
      ctaLabel: "Choose Premium",
      ctaHref: PREMIUM_SIGNUP_PATH,
      ctaVariant: "primary" as const,
      footnote:
        "Existing accounts keep their grandfathered access at no cost; new upgrades use the app-owned billing flow.",
      featured: true,
    },
    ...(LIFETIME_OFFER_ENABLED
      ? [
          {
            name: "Lifetime",
            eyebrow: "Early adopter offer",
            highlight: "Limited-time",
            priceLabel: "$80",
            cadence: "one-time",
            description:
              "A pay-once option for people who want Premium access without an ongoing subscription.",
            features: [
              "Premium Thing and storage limits for one personal account",
              "Future Kwipoo updates included for the life of the product",
              "No recurring subscription to manage",
              "Available for early adopters while the offer remains open",
            ],
            ctaLabel: "View Lifetime",
            ctaHref: PREMIUM_SIGNUP_PATH,
            ctaVariant: "outline" as const,
            footnote:
              "Existing lifetime buyers keep their access if this offer is later closed to new purchases.",
          },
        ]
      : []),
    {
      name: "Custom",
      eyebrow: "For larger or specialized setups",
      priceLabel: "Contact for pricing",
      cadence: "tailored to scope",
      description:
        "For clubs, programs, larger groups, or specialized setups that need something beyond the self-serve plans.",
      features: [
        "Custom volume, rollout, or migration conversations",
        "Direct coordination for unusual data or workflow needs",
        "A human path for organization-wide or operational use cases",
        "Commercial terms shaped to fit the scope instead of forcing the standard plan",
      ],
      ctaLabel: "Speak to Sales",
      ctaHref: customPricingHref,
      ctaVariant: "outline" as const,
      footnote:
        "Start here when Free or Premium is not the right fit.",
    },
  ] satisfies PricingTier[];

  const comparisonRows = [
    {
      label: "Things",
      free: "Up to 100",
      premium: "Up to 5,000",
      custom: LIFETIME_OFFER_ENABLED
        ? "Lifetime uses Premium limits"
        : "Tailored to fit scope",
    },
    {
      label: "Storage",
      free: "250 MB",
      premium: "10 GB",
      custom: LIFETIME_OFFER_ENABLED
        ? "10 GB fair-use allowance"
        : "Shaped to fit the plan",
    },
    {
      label: "Best fit",
      free: "Trying Kwipoo or staying light",
      premium: "Daily personal or household use",
      custom: LIFETIME_OFFER_ENABLED
        ? "Subscription-averse early adopters"
        : "Teams, groups, or complex rollouts",
    },
    {
      label: "Billing",
      free: "No payment required",
      premium: "$5 monthly or $50 annually",
      custom: LIFETIME_OFFER_ENABLED
        ? "$80 one-time while available"
        : "Quoted conversation",
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
          Pricing
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Free for up to 100 Things. Premium when you need real room to grow.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Start with Kwipoo Free at no cost, then move to Premium for $5 per
          month or $50 per year when you need higher Thing limits and more
          storage. Early adopters can also choose $80 lifetime access while the
          offer is open.
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
            Choose Premium
          </Button>
        </div>
        <p class="text-sm leading-6 text-brand-muted">
          Already paying?
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a class="font-semibold text-primary-700 transition-colors hover:text-primary-800" href={PREMIUM_MANAGE_URL}>
            Manage your subscription
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
          in the app-owned billing flow.
        </p>
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
            Premium is live without forcing long-time users into a paid plan.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Existing accounts created before the freemium rollout keep their
            grandfathered higher limits at no cost. New paid upgrades go through
            the app-owned checkout and billing portal.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Premium
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            $5/month, $50/year, or $80 lifetime while available
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
        Pick the lane that matches how much inventory and storage you actually need.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        Free stays simple. Premium gives active users more room without asking
        them to change how they organize. Lifetime is available as an early
        adopter offer for people who would rather pay once.
      </p>
    </div>

    <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
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
        The most important limit and billing differences in one scan.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        You should be able to tell in a few seconds whether Free is enough or
        whether Premium is the better fit.
      </p>
      <p class="text-sm leading-6 text-brand-muted">
        Existing customers do not need to rebuy here.
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a class="font-semibold text-primary-700 transition-colors hover:text-primary-800" href={PREMIUM_MANAGE_URL}>
          Open subscription management
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
        if you are already on Premium.
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
                {LIFETIME_OFFER_ENABLED ? "Lifetime" : "Custom"}
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
        Why Premium exists
      </p>
      <div class="mt-4 grid gap-4">
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Free should stay genuinely usable
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            You can organize real inventory on the free plan before deciding
            whether you need more capacity.
          </p>
        </div>
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Premium buys room, not complexity
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            The upgrade is straightforward: more Things, more storage, and an
            account-managed billing path.
          </p>
        </div>
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Existing users keep their footing
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Grandfathered accounts are not forced into paid conversion just
            because Premium now exists.
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
          Need something outside the standard plans?
        </p>
        <h2 class="text-[1.55rem] font-semibold leading-tight text-surface-950">
          Start a custom-plan conversation when Free or Premium is not enough.
        </h2>
        <p class="text-[0.98rem] leading-7 text-brand-body">
          If you are planning for a club, program, or other larger rollout, we
          can talk through fit before you try to force it through the self-serve
          path.
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
