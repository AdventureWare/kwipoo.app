import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const thingsDocsPage = defineDocsPage({
  slug: "things",
  category: "Track and organize",
  eyebrow: "Core inventory",
  title: "Track your Things",
  summary:
    "Build a searchable inventory of the physical items you own so you can find them faster, avoid duplicate purchases, and reuse them in Sets or Events.",
  description:
    "Things are the foundation of Kwipoo. Each Thing represents a real item you own, with details about what it is, where it currently lives, and how it connects to the rest of your setup.",
  image: {
    src: "/assets/thingsFeatureAsset@2x.png",
    alt: "Kwipoo Things feature showing an organized list of items",
  },
  sections: [
    {
      heading: "Why use Things?",
      paragraphs: [
        "A Thing represents a physical object you want to keep track of in Kwipoo, whether that is camping gear, home equipment, seasonal storage, or everyday essentials. Things become especially useful once they are tied to real Places and Spots.",
      ],
      bullets: [
        "Searchable inventory: Keep a record of what you own in one place.",
        "Location memory: Assign Things to Spots so you can answer where an item lives without guessing.",
        "Planning reuse: Reuse the same Things in Sets and Events instead of rebuilding packing lists from scratch.",
        "Flexible detail: Start with only a name, then add categories, photos, cost, weight, and identifiers over time.",
      ],
    },
    {
      heading: "Choose the right add flow",
      summary:
        "The Things screen now supports several creation paths depending on how fast or how structured you want the entry process to be.",
      subsections: [
        {
          heading: "Add Thing",
          bullets: [
            "Use `Add Thing` for the standard entry flow.",
            "Start with the name, then add the optional details that matter for this item.",
          ],
        },
        {
          heading: "Add from Photo",
          bullets: [
            "Use `Add from Photo` when a quick visual capture is the fastest way to get the item into Kwipoo.",
            "This flow is designed for light entry first, with more details added later.",
          ],
        },
        {
          heading: "Add Multiple",
          bullets: [
            "Use `Add Multiple` when you are entering a batch of related items.",
            "Lock repeated fields so the next item starts with shared values already filled in.",
            "Keep moving through the queue with the `Add Next` flow until the batch is done.",
          ],
        },
        {
          heading: "Import Things",
          bullets: [
            "Use `Import Things` when you already have a list of items outside the app.",
            "You can paste a line-by-line list or upload a CSV.",
            "Imports support shared defaults like category, source, visibility, and spot assignment so backfilling goes faster.",
          ],
        },
      ],
      callout: {
        tone: "tip",
        title: "Use the simplest flow that gets the item captured",
        body: "You do not need the full detail set on day one. The app is designed so a saved item can grow richer over time.",
      },
    },
    {
      heading: "Add a single Thing",
      bullets: [
        "Open `Things` from the main navigation.",
        "Use `Add Thing` for the standard form, or open the add-options menu for the other entry modes.",
        "Enter the required field: `Name`.",
        "Add optional fields that will help you identify, locate, compare, insure, repair, or repurchase the item later.",
        "Save the Thing so it appears in your Things collection.",
      ],
    },
    createEntityFieldsSection({
      slug: "things",
      heading: "Fields for a Thing",
      paragraphs: [
        "Only `Name` is required to save a Thing. Several other fields start with defaults, and the rest can be filled in later as your inventory becomes more useful.",
      ],
    }),
    {
      heading: "Search, group, and summarize your inventory",
      paragraphs: [
        "The Things page includes a search bar plus a filters panel so you can move between quick lookup and broader inventory analysis.",
      ],
      subsections: [
        {
          heading: "Search fields",
          bullets: [
            "Search by `Name` by default.",
            "Turn on additional search fields for `Category`, `Description`, `Brand`, or `Source` when you need a broader match.",
          ],
        },
        {
          heading: "Grouping options",
          bullets: [
            "Group Things by `Category`.",
            "Group Things by `Brand`.",
            "Group Things by acquisition `Source`.",
          ],
        },
        {
          heading: "Summary options",
          bullets: [
            "Use `Count` when you want to know how many Things are in each group.",
            "Use `Sum of Cost` when you want grouped totals from the cost values you have entered.",
          ],
        },
      ],
    },
    {
      heading: "View, edit, duplicate, and move Things",
      paragraphs: [
        "Open any Thing card to view its detail screen. From there you can review item information, update details, check which Sets include it, and manage where it currently lives.",
      ],
      bullets: [
        "Edit the Thing when details change.",
        "Use `Add Similar` when a new item is related but should start with fresh identifying details.",
        "Use `Duplicate Thing` when you want a copy of an existing entry as the starting point.",
        "Move the Thing into the correct Spot whenever its real-world location changes.",
        "Delete the Thing only when you no longer want it tracked in the inventory.",
      ],
    },
    {
      heading: "Privacy and visibility",
      bullets: [
        "Public: Anyone can see the Thing if your profile is also public.",
        "Friends Only: Only your Kwipoo friends can view it.",
        "Owner Only: Visible only to you.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Start with the items you misplace, rebuy, pack often, or lend to other people.",
        "Use photos for quick capture, but rely on clear names so search stays dependable.",
        "Add a spot assignment as soon as the item's location matters to you.",
        "Use Add Multiple or Import when backfilling a large area instead of entering every item one at a time.",
        "Review categories and costs over time so grouped views stay useful.",
      ],
    },
  ],
  relatedSlugs: ["places", "spots", "sets"],
});
