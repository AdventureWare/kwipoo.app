<!-- src/lib/components/navigation/header.svelte -->
<script lang="ts">
  import { page } from "$app/state";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Button from "../../ui/buttons/button.svelte";
  import { List, X } from "phosphor-svelte";

  interface NavItem {
    label: string;
    href: string;
  }

  const navItems: NavItem[] = [
    { label: "Blogs", href: "/blogs" },
    { label: "Guides", href: "/guides" },
    { label: "Documentation", href: "/documentation" },
    { label: "About Us", href: "/about-us" },
  ];

  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<header class="bg-white border-b border-neutral-100 sticky top-0 z-50">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" class="flex items-center">
          <span class="text-2xl font-monoton text-primary-500">Kwipoo</span>
        </a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a
            href={item.href}
            class="px-3 py-1 rounded-md hover:text-primary-600 transition-colors duration-200 font-medium {page
              .url.pathname === item.href
              ? 'bg-primary/10'
              : ''}"
            class:text-primary={page.url.pathname === item.href}
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center">
        <Button href="https://kwipoo.vercel.app/login" variant="secondary">
          Get Started
        </Button>
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden flex justify-between items-center gap-4">
        <Button href="https://kwipoo.vercel.app/login" variant="secondary">
          Get Started
        </Button>
        <button
          type="button"
          class="text-neutral-950 hover:text-primary focus:outline-none focus:text-primary transition-colors duration-200"
          onclick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <div
            class="transition-transform duration-200 {mobileMenuOpen
              ? 'rotate-90'
              : ''}"
          >
            {#if mobileMenuOpen}
              <X size={24} weight="regular" />
            {:else}
              <List size={24} weight="regular" />
            {/if}
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if mobileMenuOpen}
      <div
        class="md:hidden border-t border-neutral-100 bg-white overflow-hidden"
        transition:slide={{ duration: 300, easing: cubicOut }}
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          {#each navItems as item}
            <a
              href={item.href}
              class="block px-3 py-2 hover:text-primary-500 hover:bg-neutral-50 rounded-md font-medium transition-colors duration-200 {page
                .url.pathname === item.href
                ? 'bg-primary/10'
                : ''}"
              onclick={closeMobileMenu}
              class:text-primary={page.url.pathname === item.href}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </nav>
</header>
