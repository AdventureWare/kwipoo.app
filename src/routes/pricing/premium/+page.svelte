<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    LIFETIME_OFFER_ENABLED,
    PREMIUM_ANNUAL_CHECKOUT_URL,
    PREMIUM_CHECKOUT_URL,
    PREMIUM_CONTACT_HREF,
    PREMIUM_LIFETIME_CHECKOUT_URL,
    PREMIUM_MANAGE_URL,
  } from "$lib/config/billing";
  import { SUPPORT_EMAIL } from "$lib/config/site";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type SetupCard = {
    title: string;
    description: string;
  };
  type PurchaseOption = {
    name: string;
    eyebrow: string;
    price: string;
    cadence: string;
    description: string;
    href: string;
    ctaLabel: string;
    featured?: boolean;
    note: string;
  };

  const premiumSignupTitle = LIFETIME_OFFER_ENABLED
    ? "Kwipoo Premium | Monthly, Annual, and Lifetime"
    : "Kwipoo Premium | Monthly and Annual Plans";
  const premiumSignupDescription = LIFETIME_OFFER_ENABLED
    ? "Buy Kwipoo Premium for $5 per month, $50 annually, or $80 lifetime access while the early adopter offer is available."
    : "Buy Kwipoo Premium for $5 per month or $50 annually when you need more inventory and storage room.";
  const premiumPriceSummary = LIFETIME_OFFER_ENABLED
    ? "$5/month, $50/year, or $80 lifetime while available"
    : "$5/month or $50/year";

  const purchaseOptions = [
    {
      name: "Monthly",
      eyebrow: "Flexible",
      price: "$5",
      cadence: "per month",
      description:
        "Premium capacity with the least upfront commitment. Cancel through the billing portal when needed.",
      href: PREMIUM_CHECKOUT_URL,
      ctaLabel: "Buy Monthly",
      note: "Best when you want to try Premium without committing to a year.",
    },
    {
      name: "Annual",
      eyebrow: "Best subscription value",
      price: "$50",
      cadence: "per year",
      description:
        "Same Premium limits with a $10 annual savings compared with paying month to month.",
      href: PREMIUM_ANNUAL_CHECKOUT_URL,
      ctaLabel: "Buy Annual",
      featured: true,
      note: "A clean fit if Kwipoo is becoming part of your regular organizing system.",
    },
    ...(LIFETIME_OFFER_ENABLED
      ? [
          {
            name: "Lifetime",
            eyebrow: "Early adopter",
            price: "$80",
            cadence: "one-time",
            description:
              "Pay once for Premium access for the life of Kwipoo, with future updates and fair-use cloud storage included.",
            href: PREMIUM_LIFETIME_CHECKOUT_URL,
            ctaLabel: "Buy Lifetime",
            note: "This offer can close for new buyers later. Existing lifetime buyers keep access.",
          },
        ]
      : []),
  ] satisfies PurchaseOption[];

  const setupCards = [
    {
      title: "Checkout stays tied to your account",
      description:
        "Sign in or create an account first, then continue through Stripe so Premium unlocks for the right Kwipoo profile.",
    },
    {
      title: "Billing controls stay in Account settings",
      description:
        "Subscribers can return to Plan & Billing to update payment details, review the current plan, or cancel recurring access.",
    },
    {
      title: "Special access is handled directly",
      description: LIFETIME_OFFER_ENABLED
        ? "Grandfathered, lifetime, and support-managed access stay attached to your account without forcing a standard checkout."
        : "Grandfathered and support-managed access stay attached to your account without forcing a standard checkout.",
    },
  ] satisfies SetupCard[];
  const premiumChecklist = [
    "If you are new, create an account first so Premium can unlock on the right profile.",
    "If you already have an account, sign in and continue directly to hosted checkout.",
    ...(LIFETIME_OFFER_ENABLED
      ? [
          "If you choose Lifetime, Stripe records the payment and Kwipoo keeps durable Premium access on your account.",
        ]
      : []),
    "If you are already paying, manage payment details or cancellation from Plan & Billing.",
  ];

  const premiumSignupStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Kwipoo Premium Signup",
        url: toAbsoluteMarketingUrl("/pricing/premium"),
        description: premiumSignupDescription,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
        { name: "Premium Signup", path: "/pricing/premium" },
      ]),
    ],
  };
</script>

<svelte:head>
  <title>{premiumSignupTitle}</title>
  <meta name="description" content={premiumSignupDescription} />
  <meta property="og:title" content={premiumSignupTitle} />
  <meta property="og:description" content={premiumSignupDescription} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={toAbsoluteMarketingUrl("/pricing/premium")}
  />
  <meta name="twitter:title" content={premiumSignupTitle} />
  <meta name="twitter:description" content={premiumSignupDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(premiumSignupStructuredData)}
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
      <a href={resolve("/pricing")} class="transition-colors hover:text-color">
        Pricing
      </a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Premium</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Premium
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Choose the Premium path that fits how you want to pay.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Sign in or create an account, choose monthly{#if LIFETIME_OFFER_ENABLED},
            annual, or lifetime access{:else}
            or annual access{/if}, and continue through Stripe. After purchase,
          your plan and billing controls live in Account settings.
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={PREMIUM_CHECKOUT_URL}
            variant="primary"
            size="lg"
            class="sm:w-auto"
          >
            Buy Monthly
          </Button>
          <Button href="/pricing" variant="ghost" size="lg" class="sm:w-auto">
            Back to Pricing
          </Button>
        </div>
        <p class="text-sm leading-6 text-brand-muted">
          Already subscribed?
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            href={PREMIUM_MANAGE_URL}
          >
            Manage your subscription
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
          in the app billing flow instead.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            Account-Linked Billing
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            Checkout stays tied to your Kwipoo account.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Choose the Premium option that fits, then continue in the app so
            billing, plan status, and account access stay connected.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Premium plan
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            {premiumPriceSummary}
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
        Purchase Options
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Premium is one product. The payment shape is your choice.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        Monthly and annual are subscriptions managed through the customer
        portal.{#if LIFETIME_OFFER_ENABLED}
          Lifetime is a one-time early adopter purchase that becomes durable
          Premium access inside Kwipoo.{/if}
      </p>
    </div>

    <div
      class={[
        "grid gap-4",
        LIFETIME_OFFER_ENABLED ? "lg:grid-cols-3" : "md:grid-cols-2",
      ]}
    >
      {#each purchaseOptions as option (option.name)}
        <article
          class={[
            "card flex h-full flex-col rounded-[1.5rem] border p-6 shadow-sm",
            option.featured
              ? "border-primary-300 bg-linear-to-b from-primary-50 via-white to-surface-50"
              : "border-surface-200 bg-surface-50",
          ]}
        >
          <div class="space-y-2">
            <p
              class={[
                "text-[0.78rem] font-semibold uppercase tracking-[0.18em]",
                option.featured ? "text-primary-700" : "text-brand-muted",
              ]}
            >
              {option.eyebrow}
            </p>
            <h3
              class="text-[1.45rem] font-semibold leading-tight text-surface-950"
            >
              {option.name}
            </h3>
          </div>

          <div class="mt-5 border-t border-surface-200 pt-5">
            <div class="flex flex-wrap items-end gap-x-3 gap-y-1">
              <p
                class="text-[1.9rem] font-semibold leading-none text-surface-950"
              >
                {option.price}
              </p>
              <p
                class="pb-1 text-sm font-medium uppercase tracking-[0.14em] text-brand-muted"
              >
                {option.cadence}
              </p>
            </div>
            <p class="mt-4 text-[0.98rem] leading-7 text-brand-body">
              {option.description}
            </p>
          </div>

          <div class="mt-auto pt-6">
            <!-- eslint-disable svelte/no-navigation-without-resolve -->
            <Button
              href={option.href}
              variant={option.featured ? "primary" : "outline"}
              class="w-full"
            >
              {option.ctaLabel}
            </Button>
            <!-- eslint-enable svelte/no-navigation-without-resolve -->
            <p class="mt-4 text-sm leading-6 text-brand-muted">
              {option.note}
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
        How It Works
      </p>
      <h2
        class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
      >
        Buy Premium from the right account, then manage it from the same place.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The purchase buttons send you to account-linked checkout. The manage
        link sends subscribers to the billing portal or back to Plan & Billing
        when access is handled another way.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each setupCards as card (card.title)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <h3
            class="text-[1.2rem] font-semibold leading-tight text-surface-950"
          >
            {card.title}
          </h3>
          <p class="mt-3 text-[0.98rem] leading-7 text-brand-body">
            {card.description}
          </p>
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
        Next Steps
      </p>
      <ul class="mt-4 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
        {#each premiumChecklist as item (item)}
          <li class="flex gap-3">
            <span
              aria-hidden="true"
              class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500"
            ></span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </article>

    <article
      class="card rounded-[1.5rem] border border-secondary-200 bg-secondary-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-secondary-800"
      >
        Support Fallback
      </p>
      <div class="mt-4 space-y-3">
        <h2 class="text-[1.45rem] font-semibold leading-tight text-surface-950">
          Support still matters for edge cases and manually managed access.
        </h2>
        <p class="text-[0.98rem] leading-7 text-brand-body">
          Grandfathered accounts, comped access, and special cases are handled
          directly by Kwipoo support. If a standard checkout or portal flow does
          not fit your situation, contact us instead of trying to force it.
        </p>
      </div>

      <div
        class="mt-6 rounded-[1.15rem] border border-secondary-200 bg-white/85 p-4"
      >
        <p
          class="text-sm font-semibold uppercase tracking-[0.16em] text-secondary-800"
        >
          Contact
        </p>
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={PREMIUM_CONTACT_HREF}
          class="mt-2 inline-block text-base font-semibold text-surface-950 transition-colors hover:text-primary-700"
        >
          {SUPPORT_EMAIL}
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </article>
  </section>
</div>
