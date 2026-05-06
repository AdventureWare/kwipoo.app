<script lang="ts">
  import { browser } from "$app/environment";
  import { resolve } from "$app/paths";
  import { Button } from "$lib/components";
  import { SITE_NAME, SUPPORT_EMAIL } from "$lib/config/site";
  import {
    getBreadcrumbJsonLd,
    toAbsoluteMarketingUrl,
    toSeoJsonLd,
  } from "$lib/seo";
  import type { PageProps } from "./$types";

  const pageTitle = "Delete Account Request | Kwipoo";
  const pageDescription =
    "Request deletion of your Kwipoo account through the public account-deletion page.";

  const requestChecklist = [
    "Use the email address tied to your Kwipoo account.",
    "Add enough detail to help us identify the account quickly.",
    "After submitting, send the prefilled email if your mail app opens.",
  ] as const;

  const nextSteps = [
    "We review account-deletion requests through the support mailbox.",
    "We may need follow-up information if we cannot confidently identify the account.",
    "If your request is broader than account deletion alone, the support and privacy pages remain available.",
  ] as const;

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: pageTitle,
        description: pageDescription,
        url: toAbsoluteMarketingUrl("/delete-account-form"),
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: toAbsoluteMarketingUrl("/"),
        },
      },
      getBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Delete Account Request", path: "/delete-account-form" },
      ]),
    ],
  };

  const fieldShellClasses =
    "rounded-[1.15rem] border border-surface-200 bg-white px-4 py-3 text-base text-surface-950 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100";
  const fieldLabelClasses =
    "text-sm font-semibold uppercase tracking-[0.14em] text-brand-body";

  let { form }: PageProps = $props();
  let lastOpenedMailto: string | null = null;

  $effect(() => {
    const mailtoHref = form?.success ? form.mailtoHref : null;

    if (!browser || !mailtoHref || lastOpenedMailto === mailtoHref) {
      return;
    }

    lastOpenedMailto = mailtoHref;
    window.location.href = mailtoHref;
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  <meta name="robots" content="noindex,follow" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:type" content="website" />
  <meta
    property="og:url"
    content={toAbsoluteMarketingUrl("/delete-account-form")}
  />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(pageStructuredData)}
  </svelte:element>
</svelte:head>

<div class="grid gap-10 pb-12">
  <header class="grid gap-5">
    <nav
      aria-label="Breadcrumb"
      class="flex flex-wrap items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
    >
      <a href={resolve("/")} class="transition-colors hover:text-color">Home</a>
      <span aria-hidden="true">/</span>
      <span class="text-brand-body">Delete Account Request</span>
    </nav>

    <div
      class="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.95fr)]"
    >
      <div class="space-y-4">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Account Deletion
        </p>
        <h1
          class="max-w-4xl text-[2.5rem] font-semibold leading-tight tracking-tight text-color md:text-[3.15rem]"
        >
          Request deletion of your Kwipoo account.
        </h1>
        <p class="max-w-3xl text-lg leading-8 text-brand-body">
          Use this page to prepare an account-deletion request for the email address
          tied to your Kwipoo account. After you submit the form, you can send a
          prefilled request through your email app if it opens on your device.
        </p>
      </div>

      <aside
        class="card flex h-full flex-col justify-between gap-5 rounded-[1.5rem] border border-primary-200 bg-primary-50 p-6 shadow-sm"
      >
        <div class="space-y-3">
          <p
            class="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-primary-700"
          >
            What happens here
          </p>
          <h2 class="text-[1.4rem] font-semibold leading-tight text-surface-950">
            This page gives users a live account-deletion path outside the app.
          </h2>
          <p class="text-[0.98rem] leading-7 text-brand-body">
            If your mail app does not open after submission, you can still send the
            request manually to the support address shown below.
          </p>
        </div>

        <div class="rounded-[1.15rem] border border-primary-200 bg-white/85 p-4">
          <p
            class="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700"
          >
            Support email
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            class="mt-2 inline-flex text-base font-semibold text-surface-950 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-700"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </aside>
    </div>
  </header>

  <section class="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
    <article
      class="card rounded-[1.6rem] border border-surface-200 bg-surface-50 p-5 shadow-sm sm:p-6"
    >
      <div class="space-y-3">
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Account Deletion Form
        </p>
        <h2 class="text-[1.75rem] font-semibold leading-tight text-surface-950">
          Send enough detail to identify the account cleanly.
        </h2>
        <p class="max-w-3xl text-[0.98rem] leading-7 text-brand-body">
          The email address tied to your account is the most important field. The
          rest of the form helps reduce follow-up when a request needs manual review.
        </p>
      </div>

      {#if form?.success}
        <div
          class="mt-6 rounded-[1.25rem] border border-primary-200 bg-primary-50 p-4 sm:p-5"
        >
          <h3 class="text-[1.15rem] font-semibold text-surface-950">
            Your account-deletion request is ready to send.
          </h3>
          <p class="mt-2 text-[0.98rem] leading-7 text-brand-body">
            A prefilled email was prepared for <strong>{form.accountEmail}</strong>.
            If your email app did not open, use the button below to open it again or
            email support manually.
          </p>
          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={form.mailtoHref}
              variant="primary"
              size="md"
              class="sm:w-auto"
            >
              Open prefilled email
            </Button>
            <Button href="/support" variant="outline" size="md" class="sm:w-auto">
              Open support page
            </Button>
          </div>
        </div>
      {/if}

      <form method="POST" class="mt-6 grid gap-5">
        <div class="grid gap-5 md:grid-cols-2">
          <label class="grid gap-2">
            <span class={fieldLabelClasses}>Account Email</span>
            <input
              class={fieldShellClasses}
              id="accountEmail"
              name="accountEmail"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              value={form?.values?.accountEmail ?? ""}
              required
            />
            {#if form?.errors?.accountEmail}
              <span class="text-sm font-medium text-red-700">
                {form.errors.accountEmail}
              </span>
            {/if}
          </label>

          <label class="grid gap-2">
            <span class={fieldLabelClasses}>Full Name</span>
            <input
              class={fieldShellClasses}
              id="fullName"
              name="fullName"
              type="text"
              autocomplete="name"
              placeholder="Optional"
              value={form?.values?.fullName ?? ""}
            />
          </label>
        </div>

        <label class="grid gap-2">
          <span class={fieldLabelClasses}>Platform</span>
          <select class={fieldShellClasses} id="platform" name="platform">
            <option
              value="unknown"
              selected={(form?.values?.platform ?? "unknown") === "unknown"}
            >
              Not sure
            </option>
            <option value="ios" selected={form?.values?.platform === "ios"}>
              iOS
            </option>
            <option
              value="android"
              selected={form?.values?.platform === "android"}
            >
              Android
            </option>
            <option value="web" selected={form?.values?.platform === "web"}>
              Web
            </option>
          </select>
          {#if form?.errors?.platform}
            <span class="text-sm font-medium text-red-700">
              {form.errors.platform}
            </span>
          {/if}
        </label>

        <label class="grid gap-2">
          <span class={fieldLabelClasses}>Additional Details</span>
          <textarea
            class={`${fieldShellClasses} min-h-36 resize-y`}
            id="details"
            name="details"
            placeholder="Optional account details, timing, or anything else that helps us identify the request."
          >{form?.values?.details ?? ""}</textarea>
        </label>

        <div class="grid gap-3 rounded-[1.25rem] border border-surface-200 bg-brand-panel p-4">
          <label class="flex items-start gap-3 text-[0.98rem] leading-7 text-brand-body">
            <input
              class="mt-1 h-4 w-4 rounded border-surface-300 text-primary-600"
              id="isAccountOwner"
              name="isAccountOwner"
              type="checkbox"
              checked={form?.values?.isAccountOwner ?? false}
              required
            />
            <span>
              I am the account owner, or I am authorized to request deletion for
              this account.
            </span>
          </label>
          {#if form?.errors?.isAccountOwner}
            <span class="text-sm font-medium text-red-700">
              {form.errors.isAccountOwner}
            </span>
          {/if}

          <label class="flex items-start gap-3 text-[0.98rem] leading-7 text-brand-body">
            <input
              class="mt-1 h-4 w-4 rounded border-surface-300 text-primary-600"
              id="understandsDeletion"
              name="understandsDeletion"
              type="checkbox"
              checked={form?.values?.understandsDeletion ?? false}
              required
            />
            <span>
              I understand this request may permanently delete the Kwipoo account
              and related data associated with it.
            </span>
          </label>
          {#if form?.errors?.understandsDeletion}
            <span class="text-sm font-medium text-red-700">
              {form.errors.understandsDeletion}
            </span>
          {/if}
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="submit" variant="primary" size="lg" class="sm:w-auto">
            Submit account deletion request
          </Button>
          <Button href="/delete-data-form" variant="outline" size="lg" class="sm:w-auto">
            Open delete data request
          </Button>
        </div>
      </form>
    </article>

    <div class="grid gap-4">
      <article
        class="card rounded-[1.5rem] border border-surface-200 bg-surface-50 p-5 shadow-sm"
      >
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Before You Submit
        </p>
        <ul class="mt-4 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
          {#each requestChecklist as item (item)}
            <li class="rounded-[1.05rem] border border-surface-200 bg-white px-4 py-3">
              {item}
            </li>
          {/each}
        </ul>
      </article>

      <article
        class="card rounded-[1.5rem] border border-dashed border-surface-300 bg-brand-panel p-5 shadow-sm"
      >
        <p
          class="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-brand-muted"
        >
          Next Steps
        </p>
        <ul class="mt-4 grid gap-3 text-[0.98rem] leading-7 text-brand-body">
          {#each nextSteps as item (item)}
            <li class="rounded-[1.05rem] border border-surface-200 bg-white px-4 py-3">
              {item}
            </li>
          {/each}
        </ul>

        <div class="mt-5 rounded-[1.1rem] border border-surface-200 bg-white p-4">
          <h3 class="text-[1.08rem] font-semibold text-surface-950">
            Need a different request path?
          </h3>
          <p class="mt-2 text-[0.96rem] leading-7 text-brand-body">
            Use the data-deletion page for broader privacy requests, or the support
            and legal pages if you need another contact path first.
          </p>
          <div class="mt-4 flex flex-wrap gap-4">
            <a
              href={resolve("/delete-data-form")}
              class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Delete data request
            </a>
            <a
              href={resolve("/privacy-policy")}
              class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Privacy policy
            </a>
            <a
              href={resolve("/support")}
              class="font-semibold text-primary-700 transition-colors hover:text-primary-800"
            >
              Support
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</div>
