import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const thingsDocsPage = defineDocsPage({
  slug: "things",
  category: "Track and organize",
  eyebrow: "Core inventory",
  title: "Track your Things",
  summary:
    "Build a searchable inventory of the physical items you own so you can find them faster, avoid duplicate purchases, and keep the details you will need later.",
  description:
    "Things are the foundation of Kwipoo. Each Thing represents a real item you own, with details about where it is, how to identify it, and how it fits into the rest of your setup.",
  image: {
    src: "/assets/thingsFeatureAsset@2x.png",
    alt: "Kwipoo Things feature showing an organized list of items",
  },
  sections: [
    {
      heading: "Why Use Things?",
      paragraphs: [
        "A Thing represents any physical object you want to track in Kwipoo, whether that is camping gear, an appliance, or your favorite guitar. By adding Things, you give yourself a fuller picture of what you own in one place so you can make better decisions, save time, and avoid unnecessary purchases.",
      ],
      bullets: [
        "Centralized Inventory: Keep a complete record of what you own in one place so you can check before buying, understand what you already have, and make smarter decisions about replacing, upgrading, or downsizing.",
        "Location Tracking: Assign each Thing to a specific Spot so you always know where it is.",
        "Detailed Item Data: Keep notes on source, cost, condition, weight, and more for planning, insurance, maintenance, repair, or sale.",
        "Privacy & Sharing: Set each Thing to Public, Friends Only, or Owner Only depending on what you are comfortable sharing.",
      ],
    },
    {
      heading: "Adding a Thing",
      bullets: [
        "Go to `Things` on the navigation bar.",
        "Use the add action in the top right.",
        "Add an image if you want a visual reference.",
        "Enter the required field: `Name`.",
        "Fill out any optional fields that will help later.",
        "Save your new Thing so it appears in the Things list.",
      ],
    },
    createEntityFieldsSection({
      slug: "things",
      heading: "Fields for a Thing",
      paragraphs: [
        "Only `Name` needs manual input to save a Thing. Several other fields start with sensible defaults, and the rest are optional details you can fill in over time for reference, repair, maintenance, insurance, packing, or trade and sale.",
      ],
    }),
    {
      heading: "Privacy & Visibility",
      bullets: [
        "Public: Anyone can see this Thing if your profile is also public.",
        "Friends Only: Only your Kwipoo friends can view it.",
        "Owner Only: Visible to you alone, even if the rest of your profile is public.",
      ],
    },
    {
      heading: "Categories Explained",
      subsections: [
        {
          heading: "What are Categories?",
          paragraphs: [
            "Categories help you classify your Things so they are easier to search, filter, and analyze. Each Thing can have a category based on type, purpose, or whatever organization style makes sense to you.",
          ],
        },
        {
          heading: "Why use Categories?",
          bullets: [
            "Find What You Need Faster: Filter and search your Things by category instead of scrolling through a long list.",
            "Avoid Unnecessary Purchases: Check how many shirts, tools, or camping items you already own before buying more.",
            "Track Spending by Category: See where your money goes across gear, clothing, electronics, and more.",
            "Plan & Pack Smarter: Filtering by category makes it easier to prep for a trip or move.",
          ],
        },
        {
          heading: "How do Categories Work?",
          bullets: [
            "Suggested Categories: Kwipoo provides a list of common categories to choose from.",
            "Custom Categories: If none fit, you can enter your own.",
            "Flexible & Simple: There is no strict structure. Categorize Things in the way that makes sense to you.",
          ],
        },
        {
          heading: "Examples of How Categories Help",
          bullets: [
            "Packing for a Trip: Filter by camping gear to make sure you have what you need.",
            "Decluttering: Check clothing to see how many jackets you actually wear.",
            "Shopping Smarter: Look at electronics before buying another charger or pair of headphones.",
          ],
        },
        {
          heading: "Best Practices",
          bullets: [
            "Use broad categories when you do not need much detail.",
            "Be specific when more detail will actually help.",
            "Review your categories over time to spot trends in ownership and spending.",
          ],
        },
      ],
    },
    {
      heading: "Viewing & Editing Things",
      bullets: [
        "Browse all the items you have added in the Things section.",
        "Search or filter by category, brand, or other criteria to find what you need quickly.",
        "Open a Thing card to view the details, edit the information, change its Spot, or delete it.",
        "If you entered cost or weight, those values can appear in aggregate views like Sets or Events.",
      ],
    },
    {
      heading: "Assigning a Single Thing to a Spot",
      bullets: [
        "Open the Thing's details and use the move action.",
        "Choose the correct Place and Spot from the list.",
        "Use `Move Here` for the location where the item currently belongs.",
        "If the item moves in real life, update its Spot in Kwipoo too.",
      ],
    },
    {
      heading: "Thing Filters",
      paragraphs: [
        "The Thing Filters panel helps you find, organize, and analyze your Things with search, grouping, and summary options.",
      ],
      subsections: [
        {
          heading: "Search-By",
          bullets: [
            "Name: Search by the Thing's name.",
            "Category: Search by the assigned category.",
            "Description: Search for keywords in the Thing's description.",
            "Brand: Find Things by brand.",
            "Acquired From: Search based on where you got the Thing.",
          ],
        },
        {
          heading: "Grouped By",
          bullets: [
            "Category: View Things grouped by category.",
            "Brand: See all the Things you have from a specific brand.",
            "Acquisition Source: Organize by where or from whom you acquired Things.",
          ],
        },
        {
          heading: "Summary Type",
          bullets: [
            "Count of Things: Shows how many Things fall under each group.",
            "Sum of Cost: Displays the total cost of Things in each group when costs have been entered.",
          ],
        },
        {
          heading: "Applying Filters",
          paragraphs: [
            "After selecting your search, grouping, and summary preferences, apply the filters to see results. Filters are useful for finding specific items, checking spending patterns, and getting better insight into your inventory.",
          ],
        },
      ],
    },
    {
      heading: "Pro Tips",
      bullets: [
        "Start with your key items first, then add more as you have time and energy.",
        "Add details over time instead of trying to perfect every entry immediately.",
        "Add new Things right after you get them, while the information is easy to find.",
        "Check retailer purchase histories to speed up backfilling older items.",
        "Move a Thing in Kwipoo when you move it in real life.",
        "Use categories even if they stay simple. They pay off later in search and analysis.",
      ],
    },
  ],
  relatedSlugs: ["places", "spots", "sets"],
});
