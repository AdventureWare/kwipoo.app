<script>
  import {
    Archive,
    MagnifyingGlass,
    EyeSlash,
    Table,
    Calendar,
    CurrencyDollar,
    Prohibit,
  } from "phosphor-svelte";
  import { HeroSection, QuoteCallout } from "$lib/components";
  import ProblemSolution from "$lib/components/layouts/sections/problem-solution.svelte";

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
</script>

<svelte:head>
  <title>Kwipoo - The Smarter Way to Manage Your Things</title>
  <meta
    name="description"
    content="Stop wasting time searching for your things or rebuying what you already have. Kwipoo helps you track, organize, and actually use your belongings."
  />
  <meta
    property="og:title"
    content="Kwipoo - Life is busy. Your stuff shouldn't make it busier"
  />
  <meta
    property="og:description"
    content="The smarter way to manage your personal inventory. Track, organize, and find your belongings instantly."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://kwipoo.app" />
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

<QuoteCallout
  quoteText="We all have better things to do than hunt for missing stuff or panic over last-minute errands. Kwipoo gives you back that time and headspace—so you can actually enjoy your hobbies, family events, or just day-to-day life without  the frantic scramble."
  showButton={true}
  buttonText="Create a Free Account Today"
  buttonVariant="primary"
  buttonSize="lg"
  buttonHref="https://kwipoo.vercel.app/login"
/>
