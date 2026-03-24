<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import { TwitterLogo, LinkedinLogo, InstagramLogo } from "phosphor-svelte";
  import {
    COMPANY_NAME,
    COMPANY_WEBSITE_URL,
    SITE_TAGLINE,
    SOCIAL_PROFILE_HREFS,
    SUPPORT_EMAIL_MAILTO,
  } from "$lib/config/site";
  import { getSiteLinksForSurface } from "$lib/site-sections";

  const footerLinks = getSiteLinksForSurface("footer");

  const socialLinks = [
    {
      href: SOCIAL_PROFILE_HREFS.twitter,
      label: "Twitter",
      icon: TwitterLogo,
    },
    {
      href: SOCIAL_PROFILE_HREFS.linkedin,
      label: "LinkedIn",
      icon: LinkedinLogo,
    },
    {
      href: SOCIAL_PROFILE_HREFS.instagram,
      label: "Instagram",
      icon: InstagramLogo,
    },
  ] as const;
</script>

<footer class="relative mt-30 border-t border-brand-border bg-brand-panel">
  <div
    class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent"
  ></div>
  <div
    class="pointer-events-none absolute left-1/2 top-0 h-40 w-[38rem] -translate-x-1/2 bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
  ></div>

  <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div
      class="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-[minmax(0,1.45fr)_repeat(3,minmax(0,0.8fr))]"
    >
      <div class="col-span-1">
        <a
          href={resolve("/")}
          class="inline-flex items-center gap-4 rounded-[1.75rem] border border-brand-border bg-brand-canvas/90 px-5 py-4 shadow-sm"
        >
          <div
            class="card flex h-16 w-16 items-center justify-center border border-brand-border bg-brand-panel"
          >
            <img src={asset("/assets/logos/logo.svg")} alt="Kwipoo Logo" />
          </div>
          <span class="text-2xl font-monoton text-primary-600">Kwipoo</span>
        </a>

        <p class="mt-5 max-w-md text-base leading-relaxed text-brand-body">
          {SITE_TAGLINE} Kwipoo helps you keep track of what you own, where it lives,
          and what you need next without turning organization into more work.
        </p>

        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={SUPPORT_EMAIL_MAILTO}
          class="mt-5 inline-flex text-sm font-semibold text-primary-700 transition-colors duration-200 hover:text-primary-800"
        >
          Email support
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>

      <div class="col-span-1">
        <h3
          class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-800"
        >
          Company
        </h3>
        <ul class="space-y-3">
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <li>
            <a
              href={COMPANY_WEBSITE_URL}
              class="transition-colors duration-200 hover:text-primary-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {COMPANY_NAME}
            </a>
          </li>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        </ul>
      </div>

      <div class="col-span-1">
        <h3
          class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-800"
        >
          More Info
        </h3>
        <ul class="space-y-3">
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          {#each footerLinks as item (item.href)}
            <li>
              <a
                href={resolve(item.href)}
                class="transition-colors duration-200 hover:text-primary-800"
              >
                {item.label}
              </a>
            </li>
          {/each}
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        </ul>
      </div>

      <div class="col-span-1">
        <h3
          class="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-800"
        >
          Follow Us
        </h3>
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <div
          class="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-start"
        >
          {#each socialLinks as socialLink (socialLink.label)}
            <a
              href={socialLink.href}
              class="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-border bg-brand-canvas text-primary-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-800"
              aria-label={socialLink.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <socialLink.icon size={20} />
            </a>
          {/each}
        </div>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </div>

    <div
      class="mt-12 flex flex-col gap-3 border-t border-brand-border pt-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
    >
      <p class="text-sm text-brand-muted">
        Copyright © {new Date().getFullYear()}
        {COMPANY_NAME}.
      </p>
      <p class="text-sm text-brand-muted">
        Built for calmer storage, packing, and everyday planning.
      </p>
    </div>
  </div>
</footer>
