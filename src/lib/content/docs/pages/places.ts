import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const placesDocsPage = defineDocsPage({
  slug: "places",
  category: "Track and organize",
  eyebrow: "Storage structure",
  title: "Organize with Places",
  summary:
    "Use Places for the major real-world locations where you keep your Things, from home and office to storage units and shared spaces.",
  description:
    "Places are the top-level locations in your inventory. They help you answer where something belongs before you narrow it down further with Spots, whether those Spots live inside a Place or inside a container Thing.",
  image: {
    src: "/assets/placesFeatureAsset@2x.png",
    alt: "Kwipoo Places feature showing organized storage locations",
  },
  sections: [
    {
      heading: "Why Use Places?",
      paragraphs: [
        'A Place represents a real-world location where you store Things, such as your home, office, or storage unit. Places give you the high-level location layer, while Spots handle the more specific areas inside a Place or inside a container Thing like a tote or backpack. If you want a simpler setup, you can always use one general Spot like "Main" instead of breaking the Place into many areas.',
      ],
      bullets: [
        "Track Where Your Things Are Stored: Use Places for the big location layer, then use Spots for the exact shelf, bin, room, or compartment when you need more precision.",
        "Flexible Organization: Use multiple detailed Spots inside a Place, or add Spots to a container Thing like a tote or backpack when that matches reality better.",
        "Save Key Location Details: Store addresses and related information for reference.",
        "Privacy & Sharing Options: Control who can see each Place with visibility settings.",
      ],
    },
    {
      heading: "Adding a Place",
      bullets: [
        "Go to `Places` from the navigation bar.",
        "Open the menu in the top right.",
        "Choose the option to add a new Place.",
        "Enter the required field: `Place Name`.",
        "Review the default `Type` and `Visibility` values and change them if needed.",
        "Add optional description and address details if they help.",
        "Save the Place so it appears in your list.",
      ],
    },
    createEntityFieldsSection({
      slug: "places",
      heading: "Fields for a Place",
    }),
    {
      heading: "Managing Places & Spots",
      bullets: [
        "Use Places for the major locations in your life, such as home, office, garage, or storage.",
        "Use Spots when you want more detail inside a Place, or inside a container Thing like a tote, backpack, or storage bin.",
        'If you prefer a simpler setup, create a single Spot like "Main" instead of breaking the Place into multiple areas.',
      ],
    },
    {
      heading: "Viewing & Editing Places",
      bullets: [
        "Browse all of your Places from the Places list.",
        "Turn on edit mode from the top right menu when you want to update a Place.",
        "Use the pencil action to edit a Place and save changes.",
        "Delete a Place from edit mode when it is no longer needed. Deleting a Place does not delete the Things inside it, but it can affect Spot assignments.",
      ],
    },
    {
      heading: "Privacy & Visibility",
      bullets: [
        "Public: Anyone can see this Place if your profile is public.",
        "Friends Only: Only your Kwipoo friends can view this Place.",
        "Owner Only: The Place is visible only to you.",
      ],
    },
    {
      heading: "Pro Tips",
      bullets: [
        'Keep It Simple or Detailed: Use a single "Main" Spot or create multiple detailed Spots based on rooms or areas.',
        "Use Spots on Container Things when you want to map the inside of a tote, backpack, toolbox, or other portable storage item.",
        "Save Addresses for Reference when you are managing multiple properties or storage locations.",
        "Set visibility based on how comfortable you are sharing a location with others.",
      ],
    },
  ],
  relatedSlugs: ["spots", "things", "getting-started"],
});
