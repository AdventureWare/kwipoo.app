<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type BillingCycle = "monthly" | "annual";
  type CheckoutStep = "details" | "review" | "success";

  const mockCheckoutTitle = "Kwipoo Mock Premium Checkout";
  const mockCheckoutDescription =
    "Try a local mock version of the Kwipoo Premium purchase flow without collecting any real payment details.";

  const priceByCycle = {
    monthly: {
      label: "Premium Monthly",
      cadence: "Billed monthly",
      amountLabel: "$9",
      subtotalLabel: "$9.00",
      totalLabel: "$9.00",
    },
    annual: {
      label: "Premium Annual",
      cadence: "Billed annually",
      amountLabel: "$90",
      subtotalLabel: "$90.00",
      totalLabel: "$90.00",
    },
  } as const satisfies Record<
    BillingCycle,
    {
      label: string;
      cadence: string;
      amountLabel: string;
      subtotalLabel: string;
      totalLabel: string;
    }
  >;

  const mockCheckoutStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: mockCheckoutTitle,
        url: toAbsoluteMarketingUrl("/pricing/premium/mock-checkout"),
        description: mockCheckoutDescription,
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
        { name: "Mock Checkout", path: "/pricing/premium/mock-checkout" },
      ]),
    ],
  };

  let step = $state<CheckoutStep>("details");
  let billingCycle = $state<BillingCycle>("monthly");
  let fullName = $state("");
  let email = $state("");
  let locationName = $state("");
  let cardNumber = $state("");
  let expiration = $state("");
  let cvc = $state("");
  let postalCode = $state("");
  let agreedToMockTerms = $state(false);

  let selectedPlan = $derived(priceByCycle[billingCycle]);
  let cardDigits = $derived(cardNumber.replace(/\D/g, ""));
  let cardLastFour = $derived(cardDigits.slice(-4).padStart(4, "0"));
  let mockReceiptId = $derived(
    `KWI-MOCK-${billingCycle === "annual" ? "A" : "M"}-${cardLastFour}`,
  );
  let canReview = $derived(
    fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      cardDigits.length >= 4 &&
      expiration.trim().length > 0 &&
      cvc.trim().length > 0 &&
      postalCode.trim().length > 0 &&
      agreedToMockTerms,
  );

  function goToReview() {
    if (!canReview) {
      return;
    }

    step = "review";
  }

  function goBackToDetails() {
    step = "details";
  }

  function completeMockPurchase() {
    step = "success";
  }

  function restartMockPurchase() {
    step = "details";
  }

</script>

<svelte:head>
  <title>{mockCheckoutTitle}</title>
  <meta name="description" content={mockCheckoutDescription} />
  <meta name="robots" content="noindex,nofollow" />
  <meta property="og:title" content={mockCheckoutTitle} />
  <meta property="og:description" content={mockCheckoutDescription} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={toAbsoluteMarketingUrl("/pricing/premium/mock-checkout")}
  />
  <meta name="twitter:title" content={mockCheckoutTitle} />
  <meta name="twitter:description" content={mockCheckoutDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(mockCheckoutStructuredData)}
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
      <a href={resolve("/pricing/premium")} class="transition-colors hover:text-color">
        Premium Signup
      </a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Mock Checkout</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.95fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Mock Purchase Flow
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Try the Premium purchase process without taking a real payment.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          This is a local mock checkout. It is meant for flow review only, so
          you can move through account details, payment review, and a mock
          success state before the real billing provider is connected.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            Current Mode
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            No real charge will be created.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            The mock keeps everything inside the website so you can test the
            shape of the experience before wiring a real checkout destination.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Flow Stages
          </p>
          <p class="mt-2 text-sm leading-6 text-surface-950">
            Details, review, and success.
          </p>
        </div>
      </aside>
    </div>
  </header>

  <section class="grid gap-4 md:grid-cols-3">
    {#each [
      { key: "details", label: "1. Details" },
      { key: "review", label: "2. Review" },
      { key: "success", label: "3. Success" },
    ] as phase (phase.key)}
      <article
        class={[
          "card rounded-[1.2rem] border p-4 shadow-sm",
          step === phase.key
            ? "border-primary-300 bg-primary-50"
            : "border-surface-200 bg-surface-50",
        ]}
      >
        <p
          class={[
            "text-sm font-semibold uppercase tracking-[0.16em]",
            step === phase.key ? "text-primary-700" : "text-brand-muted",
          ]}
        >
          {phase.label}
        </p>
      </article>
    {/each}
  </section>

  <section class="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
    <article
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      {#if step === "details"}
        <div class="space-y-5">
          <div class="space-y-3">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              Account Details
            </p>
            <h2
              class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
            >
              Fill out the mock purchase form.
            </h2>
            <p class="text-[0.98rem] leading-7 text-brand-body">
              None of this data leaves the browser. It just powers the mock
              review and confirmation screens.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <label class="grid gap-2">
              <span class="text-sm font-semibold text-surface-950">Full name</span>
              <input
                bind:value={fullName}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                placeholder="Jordan Quinn"
              />
            </label>

            <label class="grid gap-2">
              <span class="text-sm font-semibold text-surface-950">Email</span>
              <input
                bind:value={email}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                placeholder="jordan@example.com"
                type="email"
              />
            </label>

            <label class="grid gap-2 md:col-span-2">
              <span class="text-sm font-semibold text-surface-950">
                What will you use Premium for?
              </span>
              <input
                bind:value={locationName}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                placeholder="Household gear, camping kits, and storage tracking"
              />
            </label>
          </div>

          <div class="space-y-3">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              Billing Cycle
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                class={[
                  "rounded-[1.1rem] border p-4 text-left transition-colors",
                  billingCycle === "monthly"
                    ? "border-primary-300 bg-primary-50"
                    : "border-surface-200 bg-white",
                ]}
                onclick={() => {
                  billingCycle = "monthly";
                }}
              >
                <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                  Monthly
                </p>
                <p class="mt-2 text-[1.35rem] font-semibold text-surface-950">
                  $9
                </p>
                <p class="mt-2 text-sm leading-6 text-brand-body">
                  Simple recurring monthly access for the mock flow.
                </p>
              </button>

              <button
                type="button"
                class={[
                  "rounded-[1.1rem] border p-4 text-left transition-colors",
                  billingCycle === "annual"
                    ? "border-primary-300 bg-primary-50"
                    : "border-surface-200 bg-white",
                ]}
                onclick={() => {
                  billingCycle = "annual";
                }}
              >
                <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                  Annual
                </p>
                <p class="mt-2 text-[1.35rem] font-semibold text-surface-950">
                  $90
                </p>
                <p class="mt-2 text-sm leading-6 text-brand-body">
                  A simple annual plan option for testing checkout branching.
                </p>
              </button>
            </div>
          </div>

          <div class="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.6fr)_minmax(0,0.5fr)]">
            <label class="grid gap-2">
              <span class="text-sm font-semibold text-surface-950">Card number</span>
              <input
                bind:value={cardNumber}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                inputmode="numeric"
                placeholder="4242 4242 4242 4242"
              />
            </label>

            <label class="grid gap-2">
              <span class="text-sm font-semibold text-surface-950">Expiry</span>
              <input
                bind:value={expiration}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                placeholder="12/29"
              />
            </label>

            <label class="grid gap-2">
              <span class="text-sm font-semibold text-surface-950">CVC</span>
              <input
                bind:value={cvc}
                class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
                inputmode="numeric"
                placeholder="123"
              />
            </label>
          </div>

          <label class="grid gap-2 md:max-w-xs">
            <span class="text-sm font-semibold text-surface-950">Postal code</span>
            <input
              bind:value={postalCode}
              class="min-h-11 rounded-[1rem] border border-surface-300 bg-white px-4 py-3 text-base text-surface-950 outline-none transition-colors focus:border-primary-500"
              placeholder="10001"
            />
          </label>

          <label class="flex items-start gap-3 rounded-[1rem] border border-surface-200 bg-white p-4">
            <input
              bind:checked={agreedToMockTerms}
              class="mt-1 h-4 w-4 rounded border-surface-300"
              type="checkbox"
            />
            <span class="text-sm leading-6 text-brand-body">
              I understand this is a mock checkout and no actual payment or account
              upgrade will be created.
            </span>
          </label>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary"
              size="lg"
              class="sm:w-auto"
              disabled={!canReview}
              onclick={goToReview}
            >
              Review mock purchase
            </Button>
            <Button href="/pricing/premium" variant="outline" size="lg" class="sm:w-auto">
              Back to Premium
            </Button>
          </div>
        </div>
      {:else if step === "review"}
        <div class="space-y-5">
          <div class="space-y-3">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              Review Order
            </p>
            <h2
              class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
            >
              Check the mock purchase summary.
            </h2>
            <p class="text-[0.98rem] leading-7 text-brand-body">
              This is the spot where a real provider would typically show a final
              charge confirmation before payment is submitted.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Customer
              </p>
              <p class="mt-2 text-base font-semibold text-surface-950">{fullName}</p>
              <p class="mt-1 text-sm leading-6 text-brand-body">{email}</p>
              <p class="mt-1 text-sm leading-6 text-brand-body">{locationName}</p>
            </div>

            <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Payment method
              </p>
              <p class="mt-2 text-base font-semibold text-surface-950">
                Mock card ending in {cardLastFour}
              </p>
              <p class="mt-1 text-sm leading-6 text-brand-body">
                Expires {expiration} • Postal code {postalCode}
              </p>
            </div>
          </div>

          <div class="rounded-[1.2rem] border border-primary-200 bg-primary-50 p-5">
            <div class="flex items-center justify-between gap-4">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
                  Selected plan
                </p>
                <h3 class="mt-2 text-[1.35rem] font-semibold text-surface-950">
                  {selectedPlan.label}
                </h3>
                <p class="mt-1 text-sm leading-6 text-brand-body">
                  {selectedPlan.cadence}
                </p>
              </div>
              <p class="text-[1.75rem] font-semibold text-surface-950">
                {selectedPlan.totalLabel}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary"
              size="lg"
              class="sm:w-auto"
              onclick={completeMockPurchase}
            >
              Complete mock purchase
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="sm:w-auto"
              onclick={goBackToDetails}
            >
              Edit details
            </Button>
          </div>
        </div>
      {:else}
        <div class="space-y-5">
          <div class="space-y-3">
            <p
              class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
            >
              Success State
            </p>
            <h2
              class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color"
            >
              Mock Premium purchase complete.
            </h2>
            <p class="text-[0.98rem] leading-7 text-brand-body">
              This is the place where a real checkout would redirect after
              successful payment and account provisioning.
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Receipt ID
              </p>
              <p class="mt-2 text-base font-semibold text-surface-950">
                {mockReceiptId}
              </p>
            </div>

            <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
                Plan
              </p>
              <p class="mt-2 text-base font-semibold text-surface-950">
                {selectedPlan.label}
              </p>
              <p class="mt-1 text-sm leading-6 text-brand-body">
                {selectedPlan.cadence}
              </p>
            </div>
          </div>

          <div class="rounded-[1.2rem] border border-secondary-200 bg-secondary-50 p-5">
            <h3 class="text-[1.2rem] font-semibold text-surface-950">
              What a real implementation would do here
            </h3>
            <ul class="mt-4 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
              <li class="flex gap-3">
                <span
                  aria-hidden="true"
                  class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500"
                ></span>
                <span>Create or upgrade the customer subscription in the billing backend.</span>
              </li>
              <li class="flex gap-3">
                <span
                  aria-hidden="true"
                  class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500"
                ></span>
                <span>Unlock Premium access in the app for the right account.</span>
              </li>
              <li class="flex gap-3">
                <span
                  aria-hidden="true"
                  class="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-secondary-500"
                ></span>
                <span>Send confirmation email, receipt details, and manage-billing links.</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={resolve("/pricing")} variant="primary" size="lg" class="sm:w-auto">
              Back to Pricing
            </Button>
            <Button
              variant="outline"
              size="lg"
              class="sm:w-auto"
              onclick={restartMockPurchase}
            >
              Run the mock again
            </Button>
          </div>
        </div>
      {/if}
    </article>

    <aside
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Order Summary
      </p>
      <div class="mt-4 space-y-4">
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-brand-muted">
            Plan
          </p>
          <h3 class="mt-2 text-[1.2rem] font-semibold text-surface-950">
            {selectedPlan.label}
          </h3>
          <p class="mt-1 text-sm leading-6 text-brand-body">
            {selectedPlan.cadence}
          </p>
        </div>

        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <div class="flex items-center justify-between gap-3 text-sm text-brand-body">
            <span>Subtotal</span>
            <span>{selectedPlan.subtotalLabel}</span>
          </div>
          <div class="mt-2 flex items-center justify-between gap-3 text-sm text-brand-body">
            <span>Taxes</span>
            <span>$0.00</span>
          </div>
          <div class="mt-4 border-t border-surface-200 pt-4">
            <div class="flex items-center justify-between gap-3">
              <span class="text-base font-semibold text-surface-950">Total</span>
              <span class="text-[1.35rem] font-semibold text-surface-950">
                {selectedPlan.totalLabel}
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-[1.1rem] border border-primary-200 bg-primary-50 p-4">
          <p class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
            Mock behavior
          </p>
          <p class="mt-2 text-sm leading-6 text-brand-body">
            This route stores no data and completes no transaction. It only simulates
            the shape of a checkout and success handoff.
          </p>
        </div>
      </div>
    </aside>
  </section>
</div>
