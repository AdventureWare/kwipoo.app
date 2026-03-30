<script lang="ts">
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import {
    APP_LOGIN_URL,
    SUPPORT_EMAIL,
    SUPPORT_EMAIL_MAILTO,
  } from "$lib/config/site";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import { SITE_NAME } from "$lib/config/site";

  type SupportTopic = {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  };

  const supportTitle = "Kwipoo Support | Contact the Team";
  const supportDescription =
    "Contact Kwipoo support for help with account questions, product issues, privacy requests, and other support needs.";
  const generalSupportHref = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
    "Kwipoo support request",
  )}`;
  const billingSupportHref = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
    "Kwipoo billing question",
  )}`;
  const privacySupportHref = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
    "Kwipoo privacy request",
  )}`;

  const supportTopics = [
    {
      eyebrow: "Product and account help",
      title: "Get help when something is blocking you in Kwipoo.",
      description:
        "Use this for login trouble, confusing behavior, missing information, or questions about how to use the product.",
      href: generalSupportHref,
      ctaLabel: "Email product support",
    },
    {
      eyebrow: "Billing and premium questions",
      title: "Ask about pricing, upgrades, or custom-plan conversations.",
      description:
        "If your question is tied to Premium signup, pricing, or a commercial discussion, send it here so the context is clear up front.",
      href: billingSupportHref,
      ctaLabel: "Email billing support",
    },
    {
      eyebrow: "Privacy and policy requests",
      title: "Reach out about privacy-related support needs.",
      description:
        "If your request relates to personal data, privacy choices, or policy questions, include the scope of the request in your message.",
      href: privacySupportHref,
      ctaLabel: "Email privacy support",
    },
  ] satisfies SupportTopic[];

  const supportChecklist = [
    "The email address tied to your account, if you have one",
    "What you were trying to do when the issue happened",
    "What happened instead, including any error text you saw",
    "Your device, platform, browser, or app version if you know it",
    "Screenshots or short reproduction steps when they help explain the problem",
  ] as const;

  const supportStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Kwipoo Support",
        url: toAbsoluteMarketingUrl("/support"),
        description: supportDescription,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Support", path: "/support" },
      ]),
    ],
  };
</script>

<svelte:head>
  <title>{supportTitle}</title>
  <meta name="description" content={supportDescription} />
  <meta name="robots" content="index,follow" />
  <meta property="og:title" content={supportTitle} />
  <meta property="og:description" content={supportDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={toAbsoluteMarketingUrl("/support")} />
  <meta name="twitter:title" content={supportTitle} />
  <meta name="twitter:description" content={supportDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(supportStructuredData)}
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
      <span class="text-brand-body">Support</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.95fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Support
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Contact Kwipoo support when you need help.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          The current support channel is email. Send us the issue, question, or
          request that you need help with, and include enough detail for us to
          understand what is happening.
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={generalSupportHref}
            variant="primary"
            size="lg"
            class="sm:w-auto"
          >
            Email support
          </Button>
          <Button href={APP_LOGIN_URL} variant="outline" size="lg" class="sm:w-auto">
            Open Kwipoo
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
            Best contact path
          </p>
          <h2
            class="text-[1.4rem] font-semibold leading-tight text-surface-950"
          >
            Email is the fastest way to reach the team right now.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            Use the support address below for product, account, billing, or
            privacy-related questions.
          </p>
        </div>

        <div
          class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4"
        >
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Support email
          </p>
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={generalSupportHref}
            class="mt-2 inline-flex text-base font-semibold text-surface-950 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-700"
          >
            {SUPPORT_EMAIL}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        </div>
      </aside>
    </div>
  </header>

  <section class="grid gap-5">
    <div class="space-y-3">
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Support Topics
      </p>
      <h2 class="text-[1.9rem] font-semibold leading-tight tracking-tight text-color">
        Pick the topic that best matches what you need.
      </h2>
      <p class="max-w-4xl text-lg leading-8 text-brand-body">
        All three paths go to the same support mailbox, but the subject line
        helps keep the request organized from the start.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      {#each supportTopics as topic (topic.title)}
        <article
          class="card rounded-[1.35rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
        >
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
          >
            {topic.eyebrow}
          </p>
          <h3 class="mt-3 text-[1.2rem] font-semibold leading-tight text-surface-950">
            {topic.title}
          </h3>
          <p class="mt-3 text-[0.98rem] leading-7 text-brand-body">
            {topic.description}
          </p>
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={topic.href}
            class="mt-5 inline-flex font-semibold text-primary-700 transition-colors hover:text-primary-800"
          >
            {topic.ctaLabel}
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        </article>
      {/each}
    </div>
  </section>

  <section class="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
    <article
      class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        What To Include
      </p>
      <h2 class="mt-3 text-[1.6rem] font-semibold leading-tight text-surface-950">
        A little context makes support much more efficient.
      </h2>
      <ul class="mt-5 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
        {#each supportChecklist as item (item)}
          <li class="rounded-[1.05rem] border border-surface-200 bg-white px-4 py-3">
            {item}
          </li>
        {/each}
      </ul>
    </article>

    <article
      class="card rounded-[1.5rem] border border-dashed border-surface-300 bg-brand-panel p-6 shadow-sm"
    >
      <p
        class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
      >
        Helpful Links
      </p>
      <div class="mt-4 space-y-4">
        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Need to sign in first?
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Open the app if you need to check your account, reproduce an issue,
            or gather details before contacting support.
          </p>
          <Button
            href={APP_LOGIN_URL}
            variant="ghost"
            size="sm"
            class="mt-4 w-auto"
          >
            Open Kwipoo
          </Button>
        </div>

        <div class="rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Privacy or legal question?
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Review the policy pages if your request is tied to data handling or
            service terms, then email support with the specific request.
          </p>
          <div class="mt-4 flex flex-wrap gap-4">
            <a
              href={resolve("/privacy-policy")}
              class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Privacy policy
            </a>
            <a
              href={resolve("/terms-and-conditions")}
              class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Terms and conditions
            </a>
          </div>
        </div>
      </div>
    </article>
  </section>
</div>
