import { defineDocsPage } from "./helpers";

export const gettingStartedDocsPage = defineDocsPage({
  slug: "getting-started",
  category: "Start here",
  eyebrow: "New to Kwipoo",
  title: "Getting started with Kwipoo",
  summary:
    "Learn the basic Kwipoo model, create a first useful location path, and get value quickly without trying to catalog everything at once.",
  description:
    "Kwipoo is easiest to learn when you start with a real place, a more specific spot if needed, and one item you actually want to track. This guide walks through that first setup so the structure stays practical from day one.",
  image: {
    src: "/assets/product_Feature.png",
    alt: "Kwipoo app overview showing core inventory screens",
  },
  sections: [
    {
      heading: "Learn the model before you add too much",
      summary:
        "The onboarding flow in the current app teaches the product in a specific order because each layer depends on the one before it.",
      paragraphs: [
        "Kwipoo is organized around `Places`, `Spots`, and `Things`. A Place is the broad location, a Spot is the precise area inside it, and a Thing is the actual item you want to find, track, or reuse later.",
        "That order matters. The app's welcome flow starts with Places first because a Thing becomes more useful as soon as it has a clear home instead of living in a vague list.",
      ],
      bullets: [
        "Use Places for big locations like Home, Garage, Office, or Storage.",
        "Use Spots for precise locations like Hall Closet Shelf, Drawer 2, or Bin 3.",
        "Use Things for the physical items you actually want to locate later.",
      ],
      callout: {
        tone: "tip",
        title: "Keep the first pass intentionally small",
        body: "The best setup is the one you will keep current. One useful storage path beats a huge inventory that never gets finished.",
      },
      codeSample: {
        label: "A simple starter structure",
        language: "text",
        code: `Places
  - Home
  - Garage

Spots
  - Hall closet shelf
  - Camping bin

Things
  - Passport
  - Tent
  - Camera battery`,
      },
      example: {
        title: "Try a five-minute starter pass",
        summary:
          "Use one short setup round to create a structure you can refine later.",
        steps: [
          "Add one Place that already exists in your life.",
          "Add one Spot inside that Place if the broad location still feels too vague.",
          "Add one Thing you regularly need to find or avoid rebuying.",
        ],
      },
    },
    {
      heading: "Create your account, then follow the welcome flow",
      summary:
        "Account setup is simple, but the first-run sequence matters because it teaches the mental model the rest of the app uses.",
      paragraphs: [
        "Kwipoo supports email-and-password signup plus Google and Apple sign-in. New email signups require email confirmation before the first full session begins.",
        "After sign-in, the welcome experience pushes you toward one real place, one real spot, and one real thing instead of asking you to configure the whole product at once.",
      ],
      bullets: [
        "Create the account using email, Google, or Apple.",
        "If you choose email signup, confirm the account from the message in your inbox.",
        "Use the welcome screen as a guide to your first useful setup, not as a checklist you must complete perfectly.",
      ],
    },
    {
      heading: "Build one real storage path first",
      summary:
        "A narrow, practical first session is the fastest way to prove the app is worth maintaining.",
      paragraphs: [
        "Pick one item you care about and give it an actual home in Kwipoo. That is the first value moment the app is designed around.",
        "Once a Thing has a Place and Spot, you can come back later to fill in category, brand, purchase details, photos, or other optional information.",
      ],
      bullets: [
        "Start with items you misplace, rebuy, pack often, or share with other people.",
        "Use clear, natural names so search stays fast later.",
        "Add more detail only when it will save time in a real situation.",
      ],
    },
    {
      heading: "Expand into routines once the basics feel stable",
      summary:
        "After the first structure is working, start using Kwipoo for repeated planning instead of one-off storage memory.",
      paragraphs: [
        "When your core inventory feels trustworthy, create Sets for kits you reuse and Events for upcoming plans. That is when Kwipoo starts helping with preparation, not just lookup.",
        "If you share planning or gear with other people, Profile and Social settings become more important as your workflow grows.",
      ],
      bullets: [
        "Create Sets for recurring kits like travel, hobbies, or emergency gear.",
        "Use Events when you want to check what is ready, missing, or still being gathered.",
        "Review names and locations regularly so the inventory stays reliable.",
      ],
    },
  ],
  relatedSlugs: ["create-account", "places", "things"],
});
