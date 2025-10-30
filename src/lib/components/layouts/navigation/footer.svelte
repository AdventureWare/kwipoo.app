<script lang="ts">
  import {
    GithubLogo,
    TwitterLogo,
    LinkedinLogo,
    InstagramLogo,
    YoutubeLogo,
  } from "phosphor-svelte";

  interface FooterLink {
    label: string;
    href: string;
    external?: boolean;
  }

  const companyLinks: FooterLink[] = [
    {
      label: "AdventureWare",
      href: "https://www.adventureware.com/",
      external: true,
    },
    { label: "About Us", href: "/about-us" },
  ];

  const resourceLinks: FooterLink[] = [
    { label: "Blog", href: "/blog" },
    { label: "Terms and Conditions", href: "/support" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const socialLinks = [
    { icon: TwitterLogo, href: "https://twitter.com/kwipoo", label: "Twitter" },
    {
      icon: LinkedinLogo,
      href: "https://linkedin.com/company/kwipoo",
      label: "LinkedIn",
    },
    {
      icon: InstagramLogo,
      href: "https://instagram.com/kwipoo",
      label: "Instagram",
    },
    { icon: GithubLogo, href: "https://github.com/kwipoo", label: "GitHub" },
  ];
</script>

<footer class=" border-t border-neutral-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Left Section - Logo placeholder -->
      <div class="col-span-1">
        <div class="flex items-center">
          <!-- Placeholder for logo - you'll add the image here -->
          <div
            class="w-20 h-20 bg-neutral-200 rounded flex items-center justify-center"
          >
            <img src="assets/logos/logo.svg" alt="Kwipoo Logo" />
          </div>
        </div>
      </div>

      <!-- Middle Section - Company Links -->
      <div class="col-span-1">
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
          Company
        </h3>
        <ul class="space-y-3">
          {#each companyLinks as link}
            <li>
              <a
                href={link.href}
                class="hover:text-netral-600 transition-colors duration-200"
                {...link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {}}
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Middle Section - Resources Links -->
      <div class="col-span-1">
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
          Resources
        </h3>
        <ul class="space-y-3">
          {#each resourceLinks as link}
            <li>
              <a
                href={link.href}
                class=" hover:text-neutral-950 transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Right Section - Social Media Icons -->
      <div class="col-span-1">
        <h3 class="text-sm font-semibold uppercase tracking-wider mb-4">
          Follow Us
        </h3>
        <div class="flex flex-wrap gap-3 sm:gap-4">
          {#each socialLinks as social}
            <a
              href={social.href}
              class="w-10 h-10 bg-primary-500 text-white rounded-full flex flex-shrink-0 items-center justify-center hover:bg-primary-700 transition-colors duration-200"
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svelte:component this={social.icon} size={20} />
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Bottom section - Copyright -->
    <div class="mt-12 pt-8">
      <p class="text-center text-sm">
        Copyright © {new Date().getFullYear()} AdventureWare.
      </p>
    </div>
  </div>
</footer>
