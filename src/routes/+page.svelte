<script lang="ts">
  import {
    MagnifyingGlass,
    EyeSlash,
    Table,
    Calendar,
    CurrencyDollar,
    Prohibit,
  } from "phosphor-svelte";
  import {
    isFeatureEnabled,
  } from "$lib/config/feature-flags";
  import {
    APP_LOGIN_URL,
    MARKETING_SITE_URL,
    SITE_DESCRIPTION,
    SITE_KEYWORDS,
  } from "$lib/config/site";
  import { HeroSection, QuoteCallout } from "$lib/components";
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

  const switchbackItems = [
    {
      tag: "Things",
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
      buttonHref: APP_LOGIN_URL,
    },
    {
      tag: "Sets",
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
      buttonHref: APP_LOGIN_URL,
    },
    {
      tag: "Places",
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
      buttonHref: APP_LOGIN_URL,
    },
    {
      tag: "Spots",
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
      buttonHref: APP_LOGIN_URL,
    },
    {
      tag: "Events",
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
      buttonHref: APP_LOGIN_URL,
    },
    {
      tag: "Social",
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
      buttonHref: APP_LOGIN_URL,
    },

    {
      tag: "Profile",
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
      buttonHref: APP_LOGIN_URL,
    },
  ] satisfies Array<{
    tag: string;
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
  }>;

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
      question: "How does Kwipoo help me avoid duplicate purchases or forgotten items?",
      answer:
        "Because your inventory is searchable and tied to real storage locations, you can check what you already own, see where it lives, and reuse past packing or event setups before you buy or leave something behind.",
    },
  ] as const;

  const homeTitle = "Personal Inventory App for Tracking What You Own | Kwipoo";
  const docsUrl = isFeatureEnabled("docs")
    ? `${MARKETING_SITE_URL}/docs`
    : undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homeStructuredData = toSeoJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationJsonLd(),
      getWebSiteJsonLd(),
      getSoftwareApplicationJsonLd({ softwareHelpUrl: docsUrl }),
      {
        "@type": "WebPage",
        name: homeTitle,
        url: MARKETING_SITE_URL,
        description: SITE_DESCRIPTION,
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
  });
</script>

<svelte:head>
  <title>{homeTitle}</title>
  <meta name="description" content={SITE_DESCRIPTION} />
  <meta name="keywords" content={SITE_KEYWORDS} />
  <meta
    name="robots"
    content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  />
  <meta property="og:title" content={homeTitle} />
  <meta
    property="og:description"
    content={SITE_DESCRIPTION}
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={MARKETING_SITE_URL} />
  <meta name="twitter:title" content={homeTitle} />
  <meta name="twitter:description" content={SITE_DESCRIPTION} />
  <script type="application/ld+json">{homeStructuredData}</script>
</svelte:head>

<HeroSection />

<QuoteCallout
  quoteText="Life’s already busy enough—why does keeping track of your own things have to feel like a second job? One day you’re tearing apart the house for that one thing you swore was in the closet. The next, you’re buying a duplicate because it was easier than looking. Then there’s the group trip or event where everyone thought someone else was bringing that one crucial item—until it was too late. These little everyday headaches add up—and steal time away from the things that actually matter."
/>

<ProblemSolution
  title="Get more of your time back with Kwipoo"
  description="We all want to live our best lives, but too often, we spend more time and energy managing and keeping up with everything we own, need, and use than actually living. Kwipoo is here to help—a platform that keeps track of your stuff so you can stay prepared, make smarter decisions, and remove the guesswork. Focus on what you love instead of getting caught up in the hassle."
  items={problemSolutionData}
/>

<Switchbacks items={switchbackItems} />

<section
  class="card mb-30 border border-brand-border bg-brand-canvas px-5 py-8 sm:p-8 lg:px-10"
>
  <div class="max-w-6xl mx-auto">
    <div class="mb-8 text-left md:mb-10 md:text-center">
      <p
        class="mb-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-primary-800-200"
      >
        Common Questions
      </p>
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
          class="rounded-[1.5rem] border border-brand-border bg-brand-canvas p-6 shadow-sm"
        >
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
  quoteText="We all have better things to do than hunt for missing stuff or panic over last-minute errands. Kwipoo gives you back that time and headspace—so you can actually enjoy your hobbies, family events, or just day-to-day life without  the frantic scramble."
  showButton={true}
  buttonText="Create a Free Account Today"
  buttonVariant="primary"
  buttonSize="lg"
  buttonHref={APP_LOGIN_URL}
/>
