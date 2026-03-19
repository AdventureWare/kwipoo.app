<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import { TwitterLogo, LinkedinLogo, InstagramLogo } from "phosphor-svelte";
  import { isFeatureEnabled } from "$lib/config/feature-flags";
  import { COMPANY_NAME, COMPANY_WEBSITE_URL } from "$lib/config/site";

  const docsEnabled = isFeatureEnabled("docs");
</script>

<footer class="border-t border-surface-200 bg-white">
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
      <div class="col-span-1">
        <div class="flex items-center justify-center md:justify-start">
          <div
            class="card flex h-20 w-20 items-center justify-center border border-surface-200 bg-surface-100"
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
              class="hover:text-neutral-600 transition-colors duration-200"
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
          Resources
        </h3>
        <ul class="space-y-3">
          {#if docsEnabled}
            <li>
              <a
                href={resolve("/docs")}
                class="hover:text-neutral-950 transition-colors duration-200"
              >
                Documentation
              </a>
            </li>
          {/if}
          <li>
            <a
              href={resolve("/privacy-policy")}
              class="hover:text-neutral-950 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href={resolve("/terms-and-conditions")}
              class="hover:text-neutral-950 transition-colors duration-200"
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
          <a
            href="https://twitter.com/KwipooApp"
            class="btn-icon preset-filled-primary-500 h-10 w-10 rounded-full shadow-sm"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogo size={20} />
          </a>
          <a
            href="https://linkedin.com/company/kwipoo"
            class="btn-icon preset-filled-primary-500 h-10 w-10 rounded-full shadow-sm"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={20} />
          </a>
          <a
            href="https://instagram.com/kwipoo"
            class="btn-icon preset-filled-primary-500 h-10 w-10 rounded-full shadow-sm"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={20} />
          </a>
        </div>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>
    </div>

    <div class="mt-12 border-t border-surface-200 pt-8">
      <p class="text-center text-sm">
        Copyright © {new Date().getFullYear()}
        {COMPANY_NAME}.
      </p>
    </div>
  </div>
</footer>
