import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const setsDocsPage = defineDocsPage({
  slug: "sets",
  category: "Plan and collaborate",
  eyebrow: "Reusable groups",
  badge: FEATURE_BADGE_PRESETS.beta,
  title: "Pack faster with Sets",
  summary:
    "Group Things into reusable Sets so recurring activities, travel kits, outfits, and gear setups are easier to assemble, review, and reuse.",
  description:
    "Sets are reusable collections of Things for a specific purpose. In the current app, Sets are organized around categories inside the Set so larger groupings stay easier to scan, assign, and maintain over time.",
  image: {
    src: "/assets/backpack@2x.png",
    alt: "Kwipoo Sets feature showing grouped travel or hobby gear",
  },
  sections: [
    {
      heading: "Why use Sets?",
      paragraphs: [
        "A Set is a reusable grouping of Things that you often use together. A single Thing can belong to multiple Sets, which makes Sets useful for travel, hobbies, recurring routines, seasonal kits, or any setup you rebuild again and again.",
      ],
      bullets: [
        "Faster planning: Reuse a saved grouping instead of remembering every item manually.",
        "Clearer structure: Break a larger Set into categories so it stays easier to scan.",
        "Automatic totals: Review total weight and total cost from the Things already assigned.",
        "Shareable setups: Visibility controls let you keep a Set private or share it more broadly.",
      ],
    },
    {
      heading: "Add a Set",
      bullets: [
        "Open `Things` from the main navigation.",
        "Switch to the `Sets` view.",
        "Use `Add Set`.",
        "Enter the required field: `Name`.",
        "Add optional `Description`, `Type`, and `Visibility` values if they help.",
        "Save the Set so it appears in your reusable set list.",
      ],
    },
    createEntityFieldsSection({
      slug: "sets",
      heading: "Fields for a Set",
      paragraphs: [
        "Only `Name` is required. The form's `Type` field stores the broad category or use case for the Set, such as travel, outfit, sport, or everyday carry.",
      ],
    }),
    {
      heading: "Build the Set with categories",
      paragraphs: [
        "The current Set detail workflow is category-driven. Categories act as sections inside the Set so you can group related Things together instead of dumping everything into one long list.",
      ],
      bullets: [
        "Use `Add Category` from the Set detail view to create a new section inside the Set.",
        "Give each category a label that reflects how you naturally think about the gear, such as Clothing, Cooking, Camera, or Safety.",
        "Keep the number of categories small enough that the Set is still easy to review quickly.",
      ],
    },
    {
      heading: "Assign Things to a Set",
      subsections: [
        {
          heading: "Assign to the whole Set",
          bullets: [
            "Open the Set menu in the top right.",
            "Use `Assign Thing(s)`.",
            "Select available Things or existing Sets from the selector drawer.",
            "When you assign at the full-Set level, Kwipoo automatically creates missing categories based on the assigned Things.",
          ],
        },
        {
          heading: "Assign to a specific category",
          bullets: [
            "Open the target category inside the Set.",
            "Use `Assign Thing(s)` for that category row.",
            "Select the Things or Sets that belong in that section.",
            "New Things created from that flow inherit the category context automatically.",
          ],
        },
      ],
      callout: {
        tone: "tip",
        title: "Whole-set assignment is the fastest way to bootstrap structure",
        body: "If you already categorized your Things well, assigning to the Set first lets Kwipoo create the category sections for you.",
      },
    },
    {
      heading: "Edit and clean up a Set",
      paragraphs: [
        "Open a Set to review its description, totals, and category sections. The detail view also includes edit controls for the Set itself plus an edit mode for category cleanup.",
      ],
      bullets: [
        "Use the pencil action to edit the Set name, description, type, or visibility.",
        "Use the trash action to delete the Set when you no longer need it.",
        "Turn on `Edit Mode` from the Set menu when you want to edit or delete categories, or remove individual Things from category rows.",
        "Deleting a Set does not delete the Things inside it.",
      ],
    },
    {
      heading: "Review total weight and total cost",
      paragraphs: [
        "Each Set detail screen includes an Additional Information panel that summarizes the Things currently assigned to the Set.",
      ],
      bullets: [
        "Total Weight: The sum of Thing weights using your current default weight unit.",
        "Total Cost: The combined recorded cost of the Things in the Set.",
      ],
    },
    {
      heading: "Privacy and visibility",
      bullets: [
        "Public: Anyone can see this Set if your profile is public.",
        "Friends Only: Only your Kwipoo friends can see the Set.",
        "Owner Only: The Set is visible only to you.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Use Sets for recurring jobs like travel, work kits, outdoor activities, or outfits you rebuild often.",
        "Let category sections mirror the way you actually pack or check the Set in real life.",
        "Assign an existing Set into another Set when you want to reuse a bundle of Things quickly.",
        "Keep weights and costs current if you use Sets for travel decisions or budgeting.",
      ],
    },
  ],
  relatedSlugs: ["events", "things", "getting-started"],
});
