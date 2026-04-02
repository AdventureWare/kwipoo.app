import { defineDocsPage } from "./helpers";

export const gettingStartedDocsPage = defineDocsPage({
  slug: "getting-started",
  category: "Start here",
  eyebrow: "New to Kwipoo",
  title: "Getting started with Kwipoo",
  summary:
    "Set up your account, add your first items, and create a structure that keeps your inventory easy to maintain.",
  description:
    "Kwipoo is designed to help you track what you own, where it lives, and what you need for upcoming plans. Start simple, then add more structure as your inventory grows.",
  image: {
    src: "/assets/product_Feature.png",
    alt: "Kwipoo app overview showing core inventory screens",
  },
  sections: [
    {
      heading: "Build the basics first",
      summary:
        "Start with the parts of your inventory that are easiest to recognize and easiest to maintain.",
      paragraphs: [
        "Start by adding the Things you care about keeping track of. Focus on the items that are easiest to forget, easiest to rebuy by mistake, or hardest to locate quickly.",
        "Once you have a few Things in Kwipoo, create the Places and Spots that match how you think about storage in real life. Use Places for the major locations, and use Spots for the precise areas inside a Place or inside a container Thing like a tote or backpack. That gives every item a clear home instead of leaving it in a vague list.",
      ],
      bullets: [
        "Add your most-used or most-often-misplaced items first.",
        "Create Places for the major locations you store things.",
        "Use Spots to narrow a Place or container Thing down to a room, bin, shelf, drawer, pouch, or pocket.",
      ],
      callout: {
        tone: "tip",
        title: "Start small on purpose",
        body: "The best first version of your setup is the one you will actually keep updated. Begin with one area of life, then expand once the structure feels natural.",
      },
      codeSample: {
        label: "A simple starter structure",
        language: "text",
        code: `Things
  - Passport
  - Tent
  - Camera battery

Places
  - Home
  - Garage

Spots
  - Hall closet shelf
  - Camping bin`,
      },
      example: {
        title: "Try a five-minute starter pass",
        summary:
          "Use one short setup round to create a structure you can refine later.",
        steps: [
          "Add three to five Things you use often or regularly misplace.",
          "Create one or two Places that match where those items live in real life.",
          "Add Spots only where extra precision would save you time.",
        ],
      },
    },
    {
      heading: "Expand into routines",
      summary:
        "Once the basics are reliable, start using the parts of Kwipoo that reduce repeated planning work.",
      paragraphs: [
        "After your inventory foundation is in place, start grouping related gear into Sets and using Events for upcoming trips or plans. This is where Kwipoo becomes more than a catalog and starts helping you prepare faster.",
      ],
      bullets: [
        "Create Sets for recurring kits like travel, hobbies, or emergency gear.",
        "Use Events when you need to check what is ready, missing, or still being gathered.",
        "Review your setup regularly and keep names clear so searching stays easy.",
      ],
    },
    {
      heading: "Keep your setup practical",
      summary:
        "Good documentation should point you toward habits that stay useful over time, not just a one-time setup burst.",
      paragraphs: [
        "You do not need to document everything at once. Kwipoo works best when the structure matches your real habits, so build around the situations that save you the most time or stress.",
        "If you share planning or gear with other people, you can also explore Social and Profile settings as your workflow grows.",
      ],
    },
  ],
  relatedSlugs: ["things", "places", "sets"],
});
