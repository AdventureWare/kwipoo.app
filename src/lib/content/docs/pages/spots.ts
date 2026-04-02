import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const spotsDocsPage = defineDocsPage({
  slug: "spots",
  category: "Track and organize",
  eyebrow: "Precise locations",
  title: "Pinpoint items with Spots",
  summary:
    "Use Spots to record the exact area inside a Place or container Thing where something lives, from rooms and closets to bins, shelves, pouches, and drawers.",
  description:
    "Spots turn a broad Place or container Thing into a practical storage map. They help you find Things faster, keep location assignments accurate, and support more precise moves when your setup changes.",
  image: {
    src: "/assets/spotsFeatureAsset@2x.png",
    alt: "Kwipoo Spots feature showing detailed storage locations",
  },
  sections: [
    {
      heading: "Why use Spots?",
      paragraphs: [
        "A Spot represents a specific area inside a Place or inside a container Thing. Think of it as the shelf, drawer, closet, tote compartment, or backpack pocket that answers the real question of where something is.",
      ],
      bullets: [
        "Faster retrieval: Check the exact Spot instead of searching an entire room or container.",
        "Flexible precision: Use detailed Spots where they help, or keep the structure simple when broad locations are enough.",
        "More reliable moves: Update the Spot when you reorganize so your inventory stays tied to reality.",
      ],
      callout: {
        tone: "tip",
        title: "Only add precision where it pays off",
        body: "Spots are optional. Use them when a Place is still too broad to answer where an item lives.",
      },
    },
    {
      heading: "Add a Spot",
      bullets: [
        "Open the Place or container Thing that should contain the Spot.",
        "Use the `Add Spot` action from that detail view.",
        "Enter the required field: `Name`.",
        "Add a description if it will help people recognize the area.",
        "Review visibility before saving.",
        "Save the Spot so it appears under its parent Place or Thing.",
      ],
    },
    createEntityFieldsSection({
      slug: "spots",
      heading: "Fields for a Spot",
      paragraphs: [
        "Only `Name` is required. Description is optional, and visibility starts with a default but cannot become more permissive than the parent Place or Thing.",
      ],
    }),
    {
      heading: "Move Things into a Spot",
      paragraphs: [
        "The current Spot detail screen uses a single `Add or Move Thing(s)` action for the main assignment flow.",
      ],
      subsections: [
        {
          heading: "From the Spot detail view",
          bullets: [
            "Open the Spot.",
            "Use `Add or Move Thing(s)`.",
            "Select available Things or Sets that should move into this Spot.",
            "Confirm the action so their current location updates to this Spot.",
          ],
        },
        {
          heading: "Create directly into the Spot",
          bullets: [
            "From the move-and-select drawer, use the add action if the item does not exist yet.",
            "The new Thing can be created directly in the current Spot so you do not need a second move step afterward.",
          ],
        },
        {
          heading: "From a Thing detail view",
          bullets: [
            "If you start from the Thing instead, use the Thing move flow and choose the destination Spot there.",
            "Update the Spot whenever the real-world location changes.",
          ],
        },
      ],
    },
    {
      heading: "View, edit, and delete Spots",
      paragraphs: [
        "Open a Spot to review its name, description, additional information, and the Things currently assigned to it.",
      ],
      bullets: [
        "Use the pencil action in the Spot detail view to edit the Spot.",
        "Use the trash action to delete a Spot when it is no longer useful.",
        "Deleting a Spot removes Things from that Spot, but it does not delete the Things themselves.",
        "Place-based Spots and Thing-based Spots both open into the same core detail workflow.",
      ],
    },
    {
      heading: "Privacy and visibility",
      paragraphs: [
        "Spots follow the same Public, Friends Only, and Owner Only visibility labels as the rest of the inventory, but they also inherit limits from their parent source.",
      ],
      bullets: [
        "Public: Anyone can see the Spot if the parent context and profile allow it.",
        "Friends Only: Only your Kwipoo friends can view it.",
        "Owner Only: The Spot is visible only to you.",
        "A Spot can be stricter than its parent Place or Thing, but not more permissive.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Use Spots for the places where people actually hesitate or guess, such as bins, drawers, shelves, and bags.",
        "Add Spots inside container Things when the container itself has meaningful internal structure.",
        "Review the Things listed on a Spot to quickly sanity-check whether that location still matches reality.",
        "If you move it in real life, update the Spot in Kwipoo at the same time.",
      ],
    },
  ],
  relatedSlugs: ["places", "things", "events"],
});
