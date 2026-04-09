<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    MagnifyingGlass,
    EyeSlash,
    Table,
    Calendar,
    CurrencyDollar,
    Prohibit,
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
  import Button from "$lib/components/ui/buttons/button.svelte";
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

    return resolvePath(getDocsHref(slug));
  }

  function resolveResourceGuideHref(slug: string): string {
    if (!isSiteSectionEnabled("resources")) {
      return resolvePath(getResourcesHref());
    }

    return resolvePath(getResourcesHref(slug));
  }

  const problemSolutionData = [
    {
      icon: Table,
      title: "Not Knowing What You Have",
      description:
        "Kwipoo gives you a searchable inventory so you always know exactly what you own. Instead of guessing or digging through bins, you can pull up your items instantly, check their details, and avoid wasting money on duplicates. Everything is stored on one platform, so you never have to wonder what you have again.",
    },
    {
      icon: MagnifyingGlass,
      title: "Struggling to Find Things",
      description:
        "With Kwipoo, you always know where your stuff is. Assign your items to storage locations—whether it’s in a closet, a storage unit, or a packed-away bin—so you never have to waste time searching. Spots let you track things how you want, whether it’s at the room level or down to the exact shelf, box, or drawer, so you can grab what you need without the scavenger hunt.",
    },
    {
      icon: EyeSlash,
      title: "Missing Details That Matter",
      description:
        "Log important item details like model names, serial numbers, and purchase info in Kwipoo so you never have to dig through manuals or search online when you need a replacement part. If you're selling, upgrading, or comparing items, you have all the specs and purchase history at your fingertips to make quick, informed decisions. No more guesswork—just instant access to the info that matters.",
    },
    {
      icon: Calendar,
      title: "Event & Trip Planning Frustrations",
      description:
        "Kwipoo makes packing and planning effortless with reusable sets that help you stay prepared. Whether you’re heading out solo or coordinating a group, you can build packing lists, check off items as you go, and make sure nothing gets forgotten. You can even look back at past events to see exactly what you brought last time, so you don’t have to figure it all out again.",
    },
    {
      icon: CurrencyDollar,
      title: "Wasting Money on Unnecessary Purchases",
      description:
        "Before buying something new, check Kwipoo to see if you already own it or have enough already. You can search your inventory in seconds, so you don’t accidentally purchase duplicates of things you forgot you had. And if you don’t own it, you can see if a friend or family member does—so you can borrow instead of buy.",
    },
    {
      icon: Prohibit,
      title: "Forgetting & Leaving Things Behind",
      description:
        "Kwipoo makes sure you always pack what you need and leave nothing behind. Instead of scrambling at the last minute, you can track what’s in your bags, storage, or car and check items off as you pack. And when planning for future trips, you can review what you brought last time to fine-tune your packing list.",
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

  const switchbackItems = [
    {
      tag: "Things",
      featureBadge: getDocsPageBadge("things"),
      title: "Keep track of what you own—all on one platform.",
      description:
        "Know exactly what you have, where it is, and what it’s worth—so you spend less time searching, avoid unnecessary repurchases, and make smarter decisions about what to keep, use, or replace. Whether it’s everyday essentials or hobby gear, Kwipoo helps you stay organized without the mental load.",
      image: {
        src: "/assets/thingsFeatureAsset@2x.png",
        alt: "Kwipoo inventory management interface showing organized items",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("things"),
      supportingLinkText: "See the home inventory guide",
      supportingLinkHref: resolveResourceGuideHref(
        "home-inventory-that-stays-updated",
      ),
    },
    {
      tag: "Sets",
      featureBadge: getDocsPageBadge("sets"),
      title:
        "Group the right things together—so they’re always ready when you need them.",
      description:
        "Create reusable Sets for trips, hobbies, or recurring routines. Whether it’s a backpacking kit, a photography setup, or a go-bag, Kwipoo helps you pack faster, plan smarter, and avoid forgetting essentials.",
      image: {
        src: "/assets/backpack@2x.png",
        alt: "Event planning and packing list features in Kwipoo",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("sets"),
      supportingLinkText: "See the repeatable packing guide",
      supportingLinkHref: resolveResourceGuideHref(
        "repeatable-packing-system-trips-camping-events",
      ),
    },
    {
      tag: "Places",
      featureBadge: getDocsPageBadge("places"),
      title:
        "Map out where your stuff lives—across home, storage, and anywhere else.",
      description:
        "A Place represents a real-world location (home, storage unit, office), giving you a clear, structured way to track what’s stored where—so you never have to dig through the wrong spot again.",
      image: {
        src: "/assets/placesFeatureAsset@2x.png",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("places"),
      supportingLinkText: "See the storage bins guide",
      supportingLinkHref: resolveResourceGuideHref(
        "organize-storage-bins-find-things-later",
      ),
    },
    {
      tag: "Spots",
      featureBadge: getDocsPageBadge("spots"),
      title:
        "Pinpoint exactly where things are stored—down to the shelf, bin, or drawer.",
      description:
        "Spots let you track specific locations within Places (like “Bedroom” or “Basement”), so you can find what you need instantly instead of tearing through storage.",
      image: {
        src: "/assets/spotsFeatureAsset@2x.png",
        alt: "Kwipoo inventory management interface showing organized items",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("spots"),
      supportingLinkText: "See the multi-location guide",
      supportingLinkHref: resolveResourceGuideHref(
        "track-what-you-own-across-home-storage-and-travel",
      ),
    },
    {
      tag: "Events",
      featureBadge: getDocsPageBadge("events"),
      title: "Plan trips and events without last-minute scrambling.",
      description:
        "Assign gear to upcoming trips, events, or projects—whether you’re packing solo or coordinating with a group. Check off what’s ready, see what’s missing, and ensure no one forgets the essentials.",
      image: {
        src: "/assets/eventsFeatureAsset@2x.png",
        alt: "Event planning and packing list features in Kwipoo",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("events"),
      supportingLinkText: "See the moving checklist guide",
      supportingLinkHref: resolveResourceGuideHref(
        "moving-inventory-checklist-boxes-storage-and-essentials",
      ),
    },
    {
      tag: "Social",
      featureBadge: getDocsPageBadge("social"),
      title: "Borrow, lend, and collaborate—without the back-and-forth.",
      description:
        "See what your friends own, avoid unnecessary duplicate purchases, and coordinate gear-sharing seamlessly. Whether for hobbies, outdoor trips, or shared projects, Kwipoo makes it easy to stay connected and prepared.",
      image: {
        src: "/assets/socialFeatureAsset@2x.png",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "Learn More",
      buttonVariant: "primary",
      buttonSize: "md",
      buttonHref: resolveFeatureDocsHref("social"),
      supportingLinkText: "See the household inventory guide",
      supportingLinkHref: resolveResourceGuideHref(
        "households-families-roommates",
      ),
    },

    {
      tag: "Profile",
      featureBadge: getDocsPageBadge("profile"),
      title:
        "Customize your inventory, control privacy, and make Kwipoo work for you.",
      description:
        "Set visibility preferences, manage your personal inventory, and tailor how you track and organize things to fit your lifestyle. Your stuff, your rules.",
      image: {
        src: "/assets/logos/logo.svg",
        alt: "Privacy controls and sharing features in Kwipoo",
      },
      showButton: true,
      buttonText: "Learn More",
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

  const resourcesHubHref = resolvePath(getResourcesHref());
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
        href: resolvePath(getResourcesHref(guide.slug)),
      };
    })
    .filter((entry): entry is HomeGuideEntry => Boolean(entry));

  const faqItems = [
    {
      question: "What is Kwipoo?",
      answer:
        "Kwipoo is a personal inventory and planning app for tracking what you own, where it is stored, and what you need for trips, hobbies, events, and day-to-day life.",
    },
    {
      question: "What can I track in Kwipoo?",
      answer:
        "You can track individual Things, organize them inside Places and Spots, group them into reusable Sets, and prepare for Events without rebuilding the same list every time.",
    },
    {
      question: "Who is Kwipoo for?",
      answer:
        "Kwipoo is useful for households, hobbyists, travelers, organizers, and anyone who wants a searchable home inventory instead of relying on memory, notes, or scattered spreadsheets.",
    },
    {
      question:
        "How does Kwipoo help me avoid duplicate purchases or forgotten items?",
      answer:
        "Because your inventory is searchable and tied to real storage locations, you can check what you already own, see where it lives, and reuse past packing or event setups before you buy or leave something behind.",
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
      <div
        class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      >
        <div class="max-w-3xl">
          <p class="brand-section-label mb-4">Start With Your Problem</p>
          <h2 class="text-3xl font-bold leading-tight text-primary-950 sm:text-4xl">
            Choose the guide that matches the friction you want to remove first.
          </h2>
          <p class="mt-4 text-base leading-relaxed text-brand-body sm:text-lg">
            If you found Kwipoo because of home inventory, storage bins,
            duplicate buying, camping prep, moving, or repeatable packing,
            start there. These guides explain the workflow in plain language
            and give new visitors a faster path into the parts of Kwipoo that
            fit their situation.
          </p>
        </div>

        <div class="w-full max-w-xs lg:w-60">
          <Button href={resourcesHubHref} variant="outline" size="md">
            Browse All Guides
          </Button>
        </div>
      </div>

      <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {#each homepageGuideEntries as guide (guide.slug)}
          <!-- eslint-disable svelte/no-navigation-without-resolve -->
          <a
            href={guide.href}
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
  title="Get more of your time back with Kwipoo"
  description="We all want to live our best lives, but too often, we spend more time and energy managing and keeping up with everything we own, need, and use than actually living. Kwipoo is here to help—a platform that keeps track of your stuff so you can stay prepared, make smarter decisions, and remove the guesswork. Focus on what you love instead of getting caught up in the hassle."
  items={problemSolutionData}
/>

<Switchbacks
  eyebrow="How It Comes Together"
  title="Everything has a place, a purpose, and a plan"
  description="Kwipoo connects the things you own, where they live, the sets you reuse, and the events you prepare for so the whole system stays practical instead of becoming another chore."
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
        What people usually want to know before using Kwipoo
      </h2>
      <p
        class="text-base leading-relaxed text-brand-body md:mx-auto md:max-w-4/5 md:text-lg"
      >
        This is the short version: Kwipoo helps you build a searchable personal
        inventory, organize where things live, and reuse plans for trips,
        events, and recurring routines.
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
  eyebrow="The Calmer Alternative"
  quoteText="We all have better things to do than hunt for missing stuff or panic over last-minute errands. Kwipoo gives you back that time and headspace so you can actually enjoy your hobbies, family events, or just day-to-day life without the frantic scramble."
  showButton={true}
  buttonText="Create a Free Account Today"
  buttonVariant="primary"
  buttonSize="lg"
  buttonHref={APP_SIGNUP_URL}
  onButtonClick={() =>
    trackCtaClick({
      location: "homepage_close",
      label: "Create a Free Account Today",
      destination: APP_SIGNUP_URL,
      kind: "signup",
    })}
/>
