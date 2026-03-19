<script lang="ts">
  import { page } from "$app/state";
  import DocsDirectoryNav from "$lib/components/ui/docs-directory-nav.svelte";
  import { getDocsNavSections } from "$lib/content/docs";

  let { children } = $props();

  const navSections = getDocsNavSections();
</script>

<section class="mx-auto w-full max-w-[1440px] px-6 py-8 md:px-8 lg:px-10 lg:py-10">
  <div class="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
    <aside class="lg:sticky lg:top-24 lg:self-start">
      <DocsDirectoryNav sections={navSections} currentHref={page.url.pathname} />
    </aside>

    <div class="min-w-0">
      {@render children()}
    </div>
  </div>
</section>
