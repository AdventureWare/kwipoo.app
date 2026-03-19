<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import { TwitterLogo, LinkedinLogo, InstagramLogo } from "phosphor-svelte";
  import { COMPANY_NAME, DOCS_ENABLED } from "$lib/config/site";
</script>

<footer class="border-t border-neutral-200 bg-white">
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
      <div class="col-span-1">
        <div class="flex items-center justify-center md:justify-start">
          <div
            class="flex h-20 w-20 items-center justify-center rounded bg-neutral-200"
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
          <li>
            <a
              href="https://www.adventureware.com/"
              class="hover:text-neutral-600 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {COMPANY_NAME}
            </a>
          </li>
        </ul>
      </div>

      <div class="col-span-1">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wider">
          Resources
        </h3>
        <ul class="space-y-3">
          {#if DOCS_ENABLED}
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
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 md:justify-start">
          <a
            href="https://twitter.com/KwipooApp"
            class="w-10 h-10 bg-primary-500 text-white rounded-full flex flex-shrink-0 items-center justify-center hover:bg-primary-700 transition-colors duration-200"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterLogo size={20} />
          </a>
          <a
            href="https://linkedin.com/company/kwipoo"
            class="w-10 h-10 bg-primary-500 text-white rounded-full flex flex-shrink-0 items-center justify-center hover:bg-primary-700 transition-colors duration-200"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={20} />
          </a>
          <a
            href="https://instagram.com/kwipoo"
            class="w-10 h-10 bg-primary-500 text-white rounded-full flex flex-shrink-0 items-center justify-center hover:bg-primary-700 transition-colors duration-200"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={20} />
          </a>
        </div>
      </div>
    </div>

    <div class="mt-12 border-t border-neutral-200 pt-8">
      <p class="text-center text-sm">
        Copyright © {new Date().getFullYear()} {COMPANY_NAME}.
      </p>
    </div>
  </div>
</footer>
