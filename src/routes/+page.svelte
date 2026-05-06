<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    MagnifyingGlass,
    EyeSlash,
    Table,
    Calendar,
    CurrencyDollar,
    Prohibit,
    MapPinArea,
    Camera,
    ShieldCheck,
    Stack,
  } from "phosphor-svelte";
  import { getDocsHref, getDocsPageBadge } from "$lib/content/docs";
  import {
    getResourceGuide,
    getResourcesHref,
  } from "$lib/content/resources";
  import {
    APP_LOGIN_URL,
    APP_SIGNUP_URL,
    MARKETING_SITE_URL,
    SITE_KEYWORDS,
  } from "$lib/config/site";
  import { trackCtaClick } from "$lib/analytics";
  import { HeroSection, QuoteCallout } from "$lib/components";
  import EverydayProblemHighlights from "$lib/components/layouts/sections/everyday-problem-highlights.svelte";
  import ProblemSolution from "$lib/components/layouts/sections/problem-solution.svelte";
  import Switchbacks from "$lib/components/layouts/sections/switchbacks.svelte";
  import {
    getOrganizationJsonLd,
    getSoftwareApplicationJsonLd,
    getWebSiteJsonLd,
    DEFAULT_OG_IMAGE_URL,
    SOFTWARE_APPLICATION_ID,
    WEBSITE_ID,
    toSeoJsonLd,
  } from "$lib/seo";
  import { isSiteSectionEnabled } from "$lib/site-sections";
  const resolvePath = resolve as unknown as (path: string) => string;

  function resolveFeatureDocsHref(slug: string): string {
    if (!isSiteSectionEnabled("docs")) {
      return APP_LOGIN_URL;
    }

    return getDocsHref(slug);
  }

  function resolveResourceGuideHref(slug: string): string {
    if (!isSiteSectionEnabled("resources")) {
      return getResourcesHref();
    }

    return getResourcesHref(slug);
  }

  const problemSolutionData = [
    {
      icon: Table,
      title: "Not Knowing What You Have",
      description:
        "Build a searchable inventory so you can check what you already own before you dig through bins or buy another one.",
    },
    {
      icon: MagnifyingGlass,
      title: "Struggling to Find Things",
      description:
        "Tie items to real places, spots, shelves, bins, and drawers so you know where to look first instead of starting from scratch.",
    },
    {
      icon: EyeSlash,
      title: "Missing Details That Matter",
      description:
        "Keep model numbers, serials, purchase notes, and photos with the item so replacements, resale, and comparisons take minutes instead of guesswork.",
    },
    {
      icon: Calendar,
      title: "Event & Trip Planning Frustrations",
      description:
        "Reuse sets and past event setups so packing starts with a real list instead of memory.",
    },
    {
      icon: CurrencyDollar,
      title: "Wasting Money on Unnecessary Purchases",
      description:
        "Search before you buy to catch duplicates, see whether you already have enough, and borrow from people you trust when that is easier.",
    },
    {
      icon: Prohibit,
      title: "Forgetting & Leaving Things Behind",
      description:
        "Check items in and out of bags, cars, and storage so the one important thing does not get missed at the last minute.",
    },
  ];

  const everydayProblemHighlights = [
    {
      icon: MagnifyingGlass,
      title: "You know it is somewhere",
      description:
        "But not whether it is in the closet, the car, the garage bin, or the bag you packed last month.",
    },
    {
      icon: CurrencyDollar,
      title: "You buy it again just to move on",
      description:
        "Because checking every shelf, drawer, and tote takes more effort than grabbing another one.",
    },
    {
      icon: Calendar,
      title: "Packing starts too late",
      description:
        "Trips and events become a last-minute scramble when you have to rebuild the same list from memory.",
    },
    {
      icon: Prohibit,
      title: "The one important thing gets missed",
      description:
        "Especially when everyone assumes someone else already packed it, brought it, or knows where it lives.",
    },
  ] satisfies Array<{
    icon: import("svelte").Component;
    title: string;
    description: string;
  }>;

  const trustSignals = [
    {
      icon: MapPinArea,
      title: "Track where things actually live",
      description:
        "Kwipoo is built around places and spots, so your inventory can get as specific as a storage unit, shelf, drawer, or bin instead of stopping at a vague list.",
    },
    {
      icon: Camera,
      title: "Keep the details you need later",
      description:
        "Photos, serial numbers, model details, and notes stay with the item so replacements, comparisons, and handoffs do not depend on memory.",
    },
    {
      icon: Stack,
      title: "Reuse setups instead of rebuilding them",
      description:
        "Sets and events help you carry the same gear, packing, and planning workflows forward instead of recreating them every time.",
    },
    {
      icon: ShieldCheck,
      title: "Start small without breaking the system",
      description:
        "You can begin with one recurring pain point, then grow from there when it proves useful. The app does not require a perfect inventory to be worth starting.",
    },
  ] satisfies Array<{
    icon: import("svelte").Component;
    title: string;
    description: string;
  }>;

  const switchbackItems = [
    {
      tag: "Things",
      featureBadge: getDocsPageBadge("things"),
      title: "Know what you own before you search or buy again.",
      description:
        "Things are the individual items in your inventory. Add the basics once, then search, filter, and revisit them when you need to find, compare, replace, or repack something.",
      image: {
        src: "/assets/thingsFeatureAsset@2x.png",
        alt: "Kwipoo inventory management interface showing organized items",
      },
      showButton: true,
      buttonText: "How Things Work",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("things"),
      supportingLinkText: "Start with the home inventory guide",
      supportingLinkHref: resolveResourceGuideHref(
        "home-inventory-that-stays-updated",
      ),
    },
    {
      tag: "Sets",
      featureBadge: getDocsPageBadge("sets"),
      title:
        "Reuse the same packing and gear setups instead of starting from scratch.",
      description:
        "Sets group the items you use together for trips, hobbies, and routines, so the next checklist starts mostly done.",
      image: {
        src: "/assets/backpack@2x.png",
        alt: "Event planning and packing list features in Kwipoo",
      },
      showButton: true,
      buttonText: "How Sets Work",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("sets"),
      supportingLinkText: "Start with the repeatable packing guide",
      supportingLinkHref: resolveResourceGuideHref(
        "repeatable-packing-system-trips-camping-events",
      ),
    },
    {
      tag: "Places",
      featureBadge: getDocsPageBadge("places"),
      title:
        "See which home, storage unit, or location your stuff belongs to.",
      description:
        "Places give your inventory a real-world map, so you stop guessing whether something is at home, in storage, or somewhere else.",
      image: {
        src: "/assets/placesFeatureAsset@2x.png",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "How Places Work",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("places"),
      supportingLinkText: "Start with the storage bins guide",
      supportingLinkHref: resolveResourceGuideHref(
        "organize-storage-bins-find-things-later",
      ),
    },
    {
      tag: "Spots",
      featureBadge: getDocsPageBadge("spots"),
      title:
        "Get specific enough to find the shelf, bin, or drawer that matters.",
      description:
        "Spots break a place into the exact storage locations you actually search through, so finding one item does not mean tearing apart the whole area.",
      image: {
        src: "/assets/spotsFeatureAsset@2x.png",
        alt: "Kwipoo inventory management interface showing organized items",
      },
      showButton: true,
      buttonText: "How Spots Work",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("spots"),
      supportingLinkText: "Start with the multi-location guide",
      supportingLinkHref: resolveResourceGuideHref(
        "track-what-you-own-across-home-storage-and-travel",
      ),
    },
    {
      tag: "Events",
      featureBadge: getDocsPageBadge("events"),
      title: "Prepare for trips, projects, and one-off plans without the scramble.",
      description:
        "Events pull the right items into a working plan so you can see what is ready, what is missing, and what still needs attention.",
      image: {
        src: "/assets/eventsFeatureAsset@2x.png",
        alt: "Event planning and packing list features in Kwipoo",
      },
      showButton: true,
      buttonText: "How Events Work",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("events"),
      supportingLinkText: "Start with the moving checklist guide",
      supportingLinkHref: resolveResourceGuideHref(
        "moving-inventory-checklist-boxes-storage-and-essentials",
      ),
    },
    {
      tag: "Social",
      featureBadge: getDocsPageBadge("social"),
      title: "Coordinate shared gear without the usual back-and-forth.",
      description:
        "Social helps you see what trusted people already have when borrowing, lending, or planning together makes more sense than buying again.",
      image: {
        src: "/assets/socialFeatureAsset@2x.png",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "How Social Works",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("social"),
      supportingLinkText: "Start with the household inventory guide",
      supportingLinkHref: resolveResourceGuideHref(
        "households-families-roommates",
      ),
    },

    {
      tag: "Profile",
      featureBadge: getDocsPageBadge("profile"),
      title:
        "Control privacy and make the system fit how you organize.",
      description:
        "Profile settings let you decide what stays private, what gets shared, and how your inventory works for your life instead of someone else's default.",
      image: {
        src: "/assets/logos/logo.svg",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "How Profile Works",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("profile"),
    },
  ] satisfies Array<{
    tag: string;
    featureBadge?: import("$lib/types/feature-badges").FeatureBadge;
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
    };
    showButton?: boolean;
    buttonText?: string;
    buttonVariant?: "primary" | "secondary" | "outline" | "ghost";
    buttonSize?: "sm" | "md" | "lg";
    buttonHref?: string;
    supportingLinkText?: string;
    supportingLinkHref?: string;
  }>;

  interface HomeGuideEntry {
    slug: string;
    audience: string;
    title: string;
    summary: string;
    href: string;
  }

  const resourcesHubHref = getResourcesHref();
  const homepageGuideEntrySlugs = [
    "home-inventory-that-stays-updated",
    "organize-storage-bins-find-things-later",
    "stop-buying-duplicates-you-already-have-at-home",
    "camping-gear-inventory-checklist-and-setup-guide",
    "moving-inventory-checklist-boxes-storage-and-essentials",
    "repeatable-packing-system-trips-camping-events",
  ] as const;
  const homepageGuideEntries: HomeGuideEntry[] = homepageGuideEntrySlugs
    .map((slug) => {
      const guide = getResourceGuide(slug);

      if (!guide) {
        return null;
      }

      return {
        slug: guide.slug,
        audience: guide.audience,
        title: guide.title,
        summary: guide.summary,
        href: getResourcesHref(guide.slug),
      };
    })
    .filter((entry): entry is HomeGuideEntry => Boolean(entry));

  const faqItems = [
    {
      question: "What is Kwipoo?",
      answer:
        "Kwipoo is a personal inventory app for tracking what you own, where it is stored, and what you need for packing, storage, trips, hobbies, and everyday life.",
    },
    {
      question: "Who is Kwipoo for?",
      answer:
        "Kwipoo is useful for households, hobbyists, travelers, organizers, and anyone who wants a searchable home inventory instead of relying on memory, notes, or scattered spreadsheets.",
    },
    {
      question: "Do I need to inventory everything to get value?",
      answer:
        "No. Most people should start with the items they search for, buy twice, pack often, or keep forgetting. The goal is to reduce friction quickly, not build a perfect catalog on day one.",
    },
    {
      question: "What can I track in Kwipoo?",
      answer:
        "You can track individual Things, organize them inside Places and Spots, group them into reusable Sets, and prepare for Events without rebuilding the same list every time.",
    },
    {
      question: "Is Kwipoo free to start?",
      answer:
        "Yes. Kwipoo Free lets you get started without payment, and you can upgrade later if you need more room.",
    },
  ] as const;

  const homeTitle =
    "Home Inventory App for Storage, Packing, and Moving | Kwipoo";
  const homeDescription =
    "Kwipoo is a home inventory app for tracking what you own, where it is stored, and what you need for packing, storage, trips, and moves.";
  const docsUrl = isSiteSectionEnabled("docs")
    ? `${MARKETING_SITE_URL}/docs`
    : undefined;
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(),
      getWebSiteJsonLd(),
      getSoftwareApplicationJsonLd({ softwareHelpUrl: docsUrl }),
      {
        "@type": "WebPage",
        name: homeTitle,
        url: MARKETING_SITE_URL,
        description: homeDescription,
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        mainEntity: {
          "@id": SOFTWARE_APPLICATION_ID,
        },
        about: [
          "Personal inventory",
          "Home organization",
          "Packing lists",
          "Shared gear planning",
        ],
        primaryImageOfPage: DEFAULT_OG_IMAGE_URL,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
</script>

<svelte:head>
  <title>{homeTitle}</title>
  <meta name="description" content={homeDescription} />
  <meta name="keywords" content={SITE_KEYWORDS} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={homeTitle} />
  <meta property="og:description" content={homeDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={MARKETING_SITE_URL} />
  <meta name="twitter:title" content={homeTitle} />
  <meta name="twitter:description" content={homeDescription} />
<svelte:element this={"script"} type="application/ld+json">
    {toSeoJsonLd(homeStructuredData)}
  </svelte:element>
</svelte:head>

<HeroSection />

<section
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute -left-10 top-0 h-44 w-44 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
    <div
      class="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
    ></div>
  </div>

  <div class="relative mx-auto max-w-6xl">
    <div
      class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6"
    >
      <div
        class="brand-outline-card relative overflow-hidden rounded-[1.75rem] border border-brand-border bg-brand-panel/88 p-6 shadow-sm sm:p-7"
      >
        <div
          class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/80 to-transparent"
        ></div>
        <p class="brand-section-label mb-4">Why It Holds Up In Real Life</p>
        <h2 class="max-w-lg text-3xl font-bold leading-tight text-primary-950 sm:text-4xl">
          Kwipoo is built to stay useful after the first list.
        </h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-brand-body sm:text-lg">
          The point is not to make a prettier spreadsheet. It is to build a
          system you can keep using when you need to find something, check what
          you already have, pack faster, or remember the details that matter.
        </p>
        <div class="mt-6 grid gap-3 sm:grid-cols-2">
          <div
            class="rounded-2xl border border-brand-border bg-brand-canvas/86 px-4 py-3 text-sm font-medium text-brand-ink shadow-sm"
          >
            Works for storage, travel, projects, and everyday life
          </div>
          <div
            class="rounded-2xl border border-brand-border bg-brand-canvas/86 px-4 py-3 text-sm font-medium text-brand-ink shadow-sm"
          >
            Built around real locations, not generic folders
          </div>
          <div
            class="rounded-2xl border border-brand-border bg-brand-canvas/86 px-4 py-3 text-sm font-medium text-brand-ink shadow-sm"
          >
            Useful even if you start with one repeated problem
          </div>
          <div
            class="rounded-2xl border border-brand-border bg-brand-canvas/86 px-4 py-3 text-sm font-medium text-brand-ink shadow-sm"
          >
            Keeps item details close when you need them later
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {#each trustSignals as signal (signal.title)}
          <article
            class="brand-outline-card relative flex h-full flex-col rounded-[1.5rem] border border-brand-border bg-brand-canvas/94 p-5 shadow-sm sm:p-6"
          >
            <div
              class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent"
            ></div>
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-panel text-primary-700 shadow-sm"
            >
              <signal.icon class="h-5 w-5 sm:h-6 sm:w-6"></signal.icon>
            </div>
            <h3 class="text-lg font-semibold text-primary-950 sm:text-xl">
              {signal.title}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-brand-body sm:text-base">
              {signal.description}
            </p>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<EverydayProblemHighlights
  eyebrow="The Everyday Problem"
  title="The friction usually looks small until it keeps happening"
  description="It is rarely one dramatic disaster. It is the repeated little interruptions: searching, second-guessing, duplicate buying, and last-minute scrambling when you already have enough going on."
  signals={[
    "Searching the same bins again",
    "Buying doubles because it is faster",
    "Rebuilding the same packing list",
    "Realizing the one key item never made it",
  ]}
  items={everydayProblemHighlights}
/>

{#if isSiteSectionEnabled("resources")}
  <section
    class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 shadow-sm sm:px-8 sm:py-10 lg:px-10"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        class="absolute -right-12 top-6 h-44 w-44 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-primary-100)_72%,transparent)_0%,transparent_72%)] blur-3xl"
      ></div>
      <div
        class="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_70%,transparent)_0%,transparent_72%)] blur-3xl"
      ></div>
    </div>

    <div class="relative mx-auto max-w-6xl">
      <div class="max-w-3xl">
        <p class="brand-section-label mb-4">Start With Your Problem</p>
        <h2 class="text-3xl font-bold leading-tight text-primary-950 sm:text-4xl">
          Start with the problem you want to stop repeating.
        </h2>
        <p class="mt-4 text-base leading-relaxed text-brand-body sm:text-lg">
          Pick the guide that matches what is slowing you down: not knowing
          what you own, not finding it, buying duplicates, or rebuilding the
          same packing list. Then start free in Kwipoo while the workflow is
          still fresh.
        </p>
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a
          href={resolvePath(resourcesHubHref)}
          class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 transition-colors duration-150 hover:text-primary-800"
        >
          See all guides
        </a>
        <!-- eslint-enable svelte/no-navigation-without-resolve -->
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each homepageGuideEntries as guide (guide.slug)}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={resolvePath(guide.href)}
            class="brand-outline-card card-hover flex h-full flex-col rounded-[1.5rem] border border-brand-border bg-brand-panel/88 p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 sm:p-6"
          >
            <p
              class="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brand-muted"
            >
              {guide.audience}
            </p>
            <h3 class="mt-3 text-[1.18rem] font-semibold leading-tight text-primary-950">
              {guide.title}
            </h3>
            <p class="mt-3 text-[0.96rem] leading-7 text-brand-body">
              {guide.summary}
            </p>
            <p class="mt-5 text-sm font-semibold text-primary-700">
              Read guide
            </p>
          </a>
          <!-- eslint-enable svelte/no-navigation-without-resolve -->
        {/each}
      </div>
    </div>
  </section>
{/if}

<ProblemSolution
  title="Kwipoo turns repeated friction into a system you can actually trust"
  description="The goal is not to catalog your whole life on day one. It is to make the next search, purchase, packing list, or replacement decision easier because your items, locations, and details are already there."
  items={problemSolutionData}
/>

<Switchbacks
  eyebrow="How The System Works"
  title="Each part of Kwipoo answers a different question you run into in real life"
  description="Things tell you what you own. Places and Spots tell you where it is. Sets and Events help you reuse the system when you pack, move, or plan again."
  items={switchbackItems}
/>

<section
  class="brand-outline-card card relative mb-30 overflow-hidden border border-brand-border bg-brand-canvas px-5 py-8 shadow-sm sm:p-8 lg:px-10"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      class="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_color-mix(in_srgb,var(--color-secondary-100)_72%,transparent)_0%,transparent_72%)] blur-2xl"
    ></div>
  </div>

  <div class="relative mx-auto max-w-6xl">
    <div class="mb-8 text-left md:mb-10 md:text-center">
      <p class="brand-section-label mb-4">Common Questions</p>
      <h2 class="mb-4 text-3xl font-bold text-primary-950 sm:text-4xl">
        Questions that usually come up right before someone starts
      </h2>
      <p
        class="text-base leading-relaxed text-brand-body md:mx-auto md:max-w-4/5 md:text-lg"
      >
        These are the questions that usually decide whether someone tries
        Kwipoo now or keeps putting it off.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      {#each faqItems as item (item.question)}
        <article
          class="brand-outline-card relative rounded-[1.5rem] border border-brand-border bg-brand-panel/80 p-6 shadow-sm"
        >
          <div
            class="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary-300/70 to-transparent"
          ></div>
          <h3 class="text-xl font-semibold text-color">
            {item.question}
          </h3>
          <p class="mt-3 text-base leading-7 text-brand-body">
            {item.answer}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>

<QuoteCallout
  eyebrow="Start Small"
  quoteText="You do not need a perfect inventory to get value. Start with the things you search for, buy twice, pack often, or keep forgetting. That is usually enough to make Kwipoo useful right away."
  showButton={true}
  buttonText="Start Free"
  buttonVariant="primary"
  buttonSize="lg"
  buttonHref={APP_SIGNUP_URL}
  onButtonClick={() =>
    trackCtaClick({
      location: "homepage_close",
      label: "Start Free",
      destination: APP_SIGNUP_URL,
      kind: "signup",
    })}
/>
