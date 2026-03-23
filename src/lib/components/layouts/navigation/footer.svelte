<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import { TwitterLogo, LinkedinLogo, InstagramLogo } from "phosphor-svelte";
  import { isFeatureEnabled } from "$lib/config/feature-flags";
  import {
    COMPANY_NAME,
    COMPANY_WEBSITE_URL,
    SOCIAL_PROFILE_HREFS,
  } from "$lib/config/site";

  const docsEnabled = isFeatureEnabled("docs");
  const pricingEnabled = isFeatureEnabled("pricing");
  const resourcesEnabled = isFeatureEnabled("resources");
  const releaseHistoryEnabled = isFeatureEnabled("releaseHistory");

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

<footer class="border-t border-brand-border bg-brand-panel">
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
      <div class="col-span-1">
        <div class="flex items-center justify-center md:justify-start">
          <div
            class="card flex h-20 w-20 items-center justify-center border border-brand-border bg-brand-canvas"
          >
            <img src={asset("/assets/logos/logo.svg")} alt="Kwipoo Logo" />
          </div>
        </div>
      </div>

      <div class="col-span-1">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
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
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          More Info
        </h3>
        <ul class="space-y-3">
          <li>
            <a
              href={resolve("/support")}
              class="transition-colors duration-200 hover:text-primary-800"
            >
              Support
            </a>
          </li>
          {#if pricingEnabled}
            <li>
              <a
                href={resolve("/pricing")}
                class="transition-colors duration-200 hover:text-primary-800"
              >
                Pricing
              </a>
            </li>
          {/if}
          {#if docsEnabled}
            <li>
              <a
                href={resolve("/docs")}
                class="transition-colors duration-200 hover:text-primary-800"
              >
                Documentation
              </a>
            </li>
          {/if}
          {#if resourcesEnabled}
            <li>
              <a
                href={resolve("/resources")}
                class="transition-colors duration-200 hover:text-primary-800"
              >
                Resources
              </a>
            </li>
          {/if}
          {#if releaseHistoryEnabled}
            <li>
              <a
                href={resolve("/releases")}
                class="transition-colors duration-200 hover:text-primary-800"
              >
                Release History
              </a>
            </li>
          {/if}
          <li>
            <a
              href={resolve("/privacy-policy")}
              class="transition-colors duration-200 hover:text-primary-800"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href={resolve("/terms-and-conditions")}
              class="transition-colors duration-200 hover:text-primary-800"
            >
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-1">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          Follow Us
        </h3>
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <div
          class="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-start"
        >
          {#each socialLinks as socialLink (socialLink.label)}
            <a
              href={socialLink.href}
              class="btn-icon h-10 w-10 rounded-full border border-primary-600 bg-primary-600 text-[var(--color-primary-contrast-600)] shadow-sm transition-colors hover:border-primary-700 hover:bg-primary-700"
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

    <div class="mt-12 border-t border-brand-border pt-8">
      <p class="text-center text-sm">
        Copyright © {new Date().getFullYear()}
        {COMPANY_NAME}.
      </p>
    </div>
  </div>
</footer>
