import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const spotsDocsPage = defineDocsPage({
  slug: "spots",
  category: "Track and organize",
  eyebrow: "Precise locations",
  title: "Pinpoint items with Spots",
  summary:
    "Use Spots to record the exact area inside a Place or container Thing where something lives, from rooms and closets to bins, shelves, pouches, and drawers.",
  description:
    "Spots turn a broad Place or container Thing into a practical storage map. They help you find Things faster and keep location assignments accurate as items move.",
  image: {
    src: "/assets/spotsFeatureAsset@2x.png",
    alt: "Kwipoo Spots feature showing detailed storage locations",
  },
  sections: [
    {
      heading: "Why Use Spots?",
      paragraphs: [
        "A Spot represents a specific area within a Place or inside a container Thing where Things can be stored. Think of it like a room, closet, shelf, tote compartment, or backpack pocket that helps you track where your stuff actually is. While Spots are optional, they make it much easier to find Things fast and keep your inventory accurate as items move around.",
      ],
      bullets: [
        "Never Waste Time Searching Again: Check the Spot instead of rummaging through an entire room or closet.",
        "Adapt to Your Level of Organization: Use detailed Spots or keep it simple with a single general Spot.",
        "Make Moving & Rearranging Easier: Update Spots when you reorganize so you do not lose track of where things went.",
      ],
    },
    {
      heading: "Adding a Spot",
      bullets: [
        "Go to `Places` or `Things` from the navigation bar.",
        "Find the Place or container Thing where the Spot should live.",
        "Add a new Spot beneath that Place or Thing.",
        "Enter the required field: `Name`.",
        "Add a description and visibility if needed.",
        "Save the Spot so it appears under the Place or Thing it belongs to.",
      ],
    },
    createEntityFieldsSection({
      slug: "spots",
      heading: "Fields for a Spot",
    }),
    {
      heading: "Moving Things to a Spot",
      subsections: [
        {
          heading: "Moving Multiple Things at Once",
          bullets: [
            "Go to the Spot details and use the `View All` entry point.",
            "Open the move action for the Spot.",
            "Choose the Things or Sets to move.",
            "Confirm the move to that Spot.",
          ],
        },
        {
          heading: "Moving a Single Thing",
          bullets: [
            "Open the Thing's details.",
            "Use the move action.",
            "Choose the destination Spot.",
            "Confirm the move so the inventory matches reality.",
          ],
        },
      ],
    },
    {
      heading: "Viewing, Editing, & Deleting Spots",
      bullets: [
        "Spots are listed directly under the Place or Thing they belong to.",
        "Use `View All` to see the Things assigned to a Spot.",
        "Edit a Spot to change its name, description, or visibility.",
        "Delete a Spot when it is no longer needed. Deleting it does not delete the Things inside it, but those items become unassigned.",
      ],
    },
    {
      heading: "Privacy & Visibility",
      bullets: [
        "Public: Anyone can see this Spot if your profile is public.",
        "Friends Only: Only your Kwipoo friends can view this Spot.",
        "Owner Only: The Spot is visible only to you.",
      ],
    },
    {
      heading: "Pro Tips",
      bullets: [
        "Make It Work for You: Use a general Spot if you do not need hyper-detailed organization, or break things down further if you do.",
        "Use Spots Inside Container Things: Add them to totes, backpacks, bins, and other portable storage when that is where items actually live.",
        "Use Spots for Rotating Gear: Seasonal or frequently moved items benefit from clear Spot updates.",
        "If You Move It, Update It: Keep your inventory honest by changing the Spot when something changes location.",
      ],
    },
  ],
  relatedSlugs: ["places", "things", "events"],
});
