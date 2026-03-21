<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    PREMIUM_CHECKOUT_URL,
    PREMIUM_CONTACT_HREF,
    PREMIUM_PRIMARY_CTA,
    PREMIUM_SIGNUP_MODE,
    PREMIUM_SIGNUP_URL,
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

  type FlowState = {
    eyebrow: string;
    title: string;
    description: string;
    statusLabel: string;
    statusValue: string;
    checklist: string[];
  };

  const premiumSignupTitle = "Kwipoo Premium Signup | Checkout Flow Draft";
  const premiumSignupDescription =
    "Start the draft Kwipoo Premium signup flow and hand off to checkout, account creation, or direct contact depending on configuration.";

  const flowStateByMode = {
    checkout: {
      eyebrow: "Hosted checkout configured",
      title: "This route can hand off directly into a payment step.",
      description:
        "Use this when you have a hosted checkout page ready, such as a Stripe payment link, Paddle checkout, Lemon Squeezy checkout, or an app-owned billing entry page.",
      statusLabel: "Current source",
      statusValue: PREMIUM_CHECKOUT_URL ?? "PUBLIC_PREMIUM_CHECKOUT_URL",
      checklist: [
        "Keep the pricing page focused on plan messaging and route the paid action through this entry point.",
        "Send the primary CTA into a hosted checkout or app billing flow instead of trying to process payment on the marketing site itself.",
        "Let the destination system own subscription state, payment method collection, and post-purchase account access.",
      ],
    },
    signup: {
      eyebrow: "Signup handoff configured",
      title: "This route can send people into account creation before upgrade.",
      description:
        "Use this when Premium purchase should happen after account creation inside the product application rather than on the marketing site.",
      statusLabel: "Current source",
      statusValue: PREMIUM_SIGNUP_URL ?? "PUBLIC_PREMIUM_SIGNUP_URL",
      checklist: [
        "Capture intent on the marketing site, then hand off to the app for authentication and plan selection.",
        "Keep upgrade eligibility, billing state, and entitlement changes in the product or billing backend.",
        "Use this pattern if Premium requires an account before the user can complete purchase.",
      ],
    },
    contact: {
      eyebrow: "Fallback contact flow",
      title: "The marketing site is ready, but payment is not connected yet.",
      description:
        "Until a real checkout or in-app upgrade destination is configured, this route keeps the Premium CTA usable by falling back to direct contact.",
      statusLabel: "Next wiring step",
      statusValue:
        "Set PUBLIC_PREMIUM_CHECKOUT_URL or PUBLIC_PREMIUM_SIGNUP_URL",
      checklist: [
        "Add a hosted checkout URL if you want the site to send users straight into payment.",
        "Add an app signup or upgrade URL if you want purchase to happen after account creation.",
        "Keep direct contact as the fallback path while pricing, packaging, and billing operations are still being finalized.",
      ],
    },
  } satisfies Record<
    import("$lib/config/billing").PremiumSignupMode,
    FlowState
  >;

  const setupCards = [
    {
      title: "Checkout destination",
      description:
        "A hosted payment link or billing screen is the cleanest handoff when you are ready to collect money.",
    },
    {
      title: "Account-aware upgrade path",
      description:
        "If Premium should be tied to an authenticated user, point this flow to the app and let the app own upgrade state.",
    },
    {
      title: "Fallback contact path",
      description:
        "Even before billing is live, you still need a real CTA destination so visitors are not trapped on a dead-end pricing card.",
    },
  ] satisfies SetupCard[];

  const premiumFlowState = flowStateByMode[PREMIUM_SIGNUP_MODE];

  const premiumSignupStructuredData = toSeoJsonLd({
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
  });

  void premiumSignupStructuredData;
</script>

<svelte:head>
  <title>{premiumSignupTitle}</title>
  <meta name="description" content={premiumSignupDescription} />
  <meta name="robots" content="noindex,nofollow" />
  <meta property="og:title" content={premiumSignupTitle} />
  <meta property="og:description" content={premiumSignupDescription} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={toAbsoluteMarketingUrl("/pricing/premium")}
  />
  <meta name="twitter:title" content={premiumSignupTitle} />
  <meta name="twitter:description" content={premiumSignupDescription} />
  <!-- prettier-ignore -->
  <script type="application/ld+json">
{premiumSignupStructuredData}
  </script>
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
      <span class="text-brand-body">Premium Signup</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Premium Flow
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Start the Premium signup flow.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          This is the marketing-site handoff point for Premium. It gives the
          pricing page a stable destination now, while the actual billing or
          upgrade destination can be swapped in later through configuration.
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={PREMIUM_PRIMARY_CTA.href}
            variant="primary"
            size="lg"
            class="sm:w-auto"
          >
            {PREMIUM_PRIMARY_CTA.label}
          </Button>
          <Button href="/pricing" variant="outline" size="lg" class="sm:w-auto">
            Back to Pricing
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
            {premiumFlowState.eyebrow}
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            {premiumFlowState.title}
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            {premiumFlowState.description}
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            {premiumFlowState.statusLabel}
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            {premiumFlowState.statusValue}
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
        The marketing layer should own the handoff, not the subscription ledger.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        This keeps the site honest about its role. The page explains the next
        step, sends people to the right destination, and leaves billing truth to
        the system that will actually create or upgrade an account.
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
        {#each premiumFlowState.checklist as item (item)}
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
          Keep a human path available while billing is still settling.
        </h2>
        <p class="text-[0.98rem] leading-7 text-brand-body">
          Even with a checkout route in place, a support or sales contact path is
          still useful for edge cases, migrations, and early Premium questions.
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
