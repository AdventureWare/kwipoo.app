import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const setsDocsPage = defineDocsPage({
  slug: "sets",
  category: "Plan and collaborate",
  eyebrow: "Reusable groups",
  badge: FEATURE_BADGE_PRESETS.beta,
  title: "Pack faster with Sets",
  summary:
    "Group Things into reusable Sets so recurring activities, outfits, travel kits, and gear setups are easier to assemble, review, and reuse.",
  description:
    "Sets are reusable collections of Things for a specific purpose. They help you plan faster, compare combinations, and keep recurring gear groupings from becoming repetitive manual work.",
  image: {
    src: "/assets/backpack@2x.png",
    alt: "Kwipoo Sets feature showing grouped travel or hobby gear",
  },
  sections: [
    {
      heading: "Why Use Sets?",
      paragraphs: [
        "A Set is a collection of Things that you frequently use together. Sets act as reusable groupings for specific purposes, and a single Thing can be used across multiple Sets. Whether it is a travel kit, a photography setup, a camping pack, or an everyday essentials collection, Sets help you assemble and track the gear you need much faster.",
      ],
      bullets: [
        "Quickly Access Repeating Item Groupings: Save time by organizing Things into reusable Sets.",
        "Plan & Pack Efficiently: See everything needed for an activity in one place.",
        "Track Costs & Weights for a Set: Automatically see total weight and total cost.",
        "Show Off Gear Setups or Outfits: Share curated setups with friends.",
        "Play Around with Different Combinations: Experiment before making final decisions.",
      ],
    },
    {
      heading: "Adding a Set",
      bullets: [
        "Go to `Things` on the navigation bar.",
        "Open the `Sets` tab.",
        "Add a new Set.",
        "Enter the required field: `Name`.",
        "Add optional `Description`, `Type`, and `Visibility` as needed.",
        "Save the Set so it appears in your list.",
      ],
    },
    createEntityFieldsSection({
      slug: "sets",
      heading: "Fields for a Set",
    }),
    {
      heading: "Assigning Things to a Set",
      subsections: [
        {
          heading: "Assign Things Directly",
          bullets: [
            "Go to the Set detail page.",
            "Open the menu in the top right and choose the assign action.",
            "Select the Things or Sets you want to assign.",
            "Confirm the assignment to the Set.",
            "Any categories not already in the Set will be added automatically.",
          ],
        },
        {
          heading: "Add Categories and Assign to Categories",
          bullets: [
            "Add a category inside the Set.",
            "Select the Things or Sets that should live inside that category.",
          ],
        },
        {
          heading: "Removing Things or Categories from a Set",
          bullets: [
            "Turn on edit mode from the Set detail menu.",
            "Delete a category to remove all items assigned to it from the Set.",
            "Use the remove action on an individual Thing card to take only that item out of the Set.",
          ],
        },
      ],
    },
    {
      heading: "Viewing & Editing Sets",
      bullets: [
        "Browse all created Sets in the Sets section.",
        "Search for Sets by name.",
        "Open a Set to view its Things, total weight, and total cost.",
        "Edit the name, description, type, visibility, or assigned Things whenever needed.",
        "Delete a Set without deleting the Things inside it.",
      ],
    },
    {
      heading: "Total Cost & Weight",
      paragraphs: [
        "Each Set automatically calculates total weight and total cost based on the Things assigned to it. That makes Sets useful for travel limits, portability decisions, and budgeting.",
      ],
      bullets: [
        "Total Weight: The sum of all Things in the Set when weight has been entered.",
        "Total Cost: The total purchase price of all Things in the Set when cost has been entered.",
      ],
    },
    {
      heading: "Privacy & Visibility",
      bullets: [
        "Public: Anyone can see this Set if your profile is public.",
        "Friends Only: Only your Kwipoo friends can see the Set.",
        "Owner Only: The Set is visible only to you.",
      ],
    },
    {
      heading: "Pro Tips",
      bullets: [
        "Create Sets for Activities like hiking, skiing, photography, travel, or daily use.",
        "Use Sets for Quick Packing before a trip.",
        "Monitor Weight for Portability if travel or backpack weight matters to you.",
        "Leverage Categories inside a Set to make larger groupings easier to scan.",
      ],
    },
  ],
  relatedSlugs: ["events", "things", "getting-started"],
});
