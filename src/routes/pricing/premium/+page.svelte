<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    PREMIUM_CHECKOUT_URL,
    PREMIUM_CONTACT_HREF,
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

  const premiumSignupTitle = "Kwipoo Premium | Buy or Manage Your Subscription";
  const premiumSignupDescription =
    "Buy Kwipoo Premium for $4.99 per month or manage your existing subscription through the app-owned billing flow.";

  const setupCards = [
    {
      title: "Account-aware checkout",
      description:
        "The website sends you into the app, where sign-in, subscription state, and Stripe checkout stay tied to the right account.",
    },
    {
      title: "Customer portal access",
      description:
        "Existing subscribers can open the billing portal from this same handoff instead of hunting around inside the product first.",
    },
    {
      title: "Grandfathering stays intact",
      description:
        "Accounts created before the freemium rollout keep their grandfathered access rather than being forced into a paid plan.",
    },
  ] satisfies SetupCard[];
  const premiumChecklist = [
    "If you are new, the flow sends you through account creation first and then returns you to checkout.",
    "If you already have an account, sign in and continue directly into the hosted subscription flow.",
    "If you are already paying, use the manage path to update payment details or cancel in the customer portal.",
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
          Buy Premium or manage the subscription you already have.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Premium is handled inside the app so checkout, account state, and
          billing management stay attached to the right user. Use this page to
          start a new subscription or jump straight to the management path.
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={PREMIUM_CHECKOUT_URL}
            variant="primary"
            size="lg"
            class="sm:w-auto"
          >
            Buy Premium
          </Button>
          <Button href="/pricing" variant="ghost" size="lg" class="sm:w-auto">
            Back to Pricing
          </Button>
        </div>
        <p class="text-sm leading-6 text-brand-muted">
          Already subscribed?
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a class="font-semibold text-primary-700 transition-colors hover:text-primary-800" href={PREMIUM_MANAGE_URL}>
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
            Account-linked billing
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            The marketing site owns the handoff. The app owns the subscription.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            That separation keeps billing reliable. The website can explain the
            plan and capture intent, while the authenticated app handles
            checkout, cancellation, and state changes without duplicate logic.
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
            $4.99 per month
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
        What This Route Owns
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        This page should answer two questions fast: how do I buy, and how do I manage?
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        The buy path sends people into the app-owned checkout flow. The manage
        path sends paying customers into the billing portal or back to their
        account billing screen if the subscription is handled another way.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each setupCards as card (card.title)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <h3 class="text-[1.2rem] font-semibold leading-tight text-surface-950">
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
