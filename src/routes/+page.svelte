<script>
  import { HeroSection, QuoteCallout } from "$lib/components";
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

<QuoteCallout
  quoteText="We all have better things to do than hunt for missing stuff or panic over last-minute errands. Kwipoo gives you back that time and headspace—so you can actually enjoy your hobbies, family events, or just day-to-day life without  the frantic scramble."
  showButton={true}
  buttonText="Create a Free Account Today"
  buttonVariant="primary"
  buttonSize="lg"
  buttonHref="https://kwipoo.vercel.app/signup"
/>
