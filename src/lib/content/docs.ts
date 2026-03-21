import type { FeatureBadge } from "$lib/types/feature-badges";
import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";

export const docsCategoryOrder = [
  "Start here",
  "Track and organize",
  "Plan and collaborate",
] as const;

export type DocsCategory = (typeof docsCategoryOrder)[number];

export interface DocsCallout {
  title: string;
  body: string;
  tone?: "note" | "tip" | "warning";
}

export interface DocsCodeSample {
  label: string;
  language?: string;
  code: string;
}

export interface DocsExample {
  title: string;
  summary: string;
  steps: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface DocsSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface DocsTable {
  columns: string[];
  rows: string[][];
}

export interface DocsSection {
  heading: string;
  summary?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: DocsSubsection[];
  table?: DocsTable;
  callout?: DocsCallout;
  codeSample?: DocsCodeSample;
  example?: DocsExample;
}

export interface DocsPage {
  slug: string;
  category: DocsCategory;
  eyebrow: string;
  badge?: FeatureBadge;
  title: string;
  summary: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  sections: DocsSection[];
  relatedSlugs: string[];
}

export interface DocsCategoryGroup {
  category: DocsCategory;
  description: string;
  pages: DocsPage[];
}

export interface DocsNavSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    slug?: string;
    badge?: FeatureBadge;
  }>;
}

export interface DocsTocItem {
  id: string;
  label: string;
}

export const docsCategoryDescriptions: Record<DocsCategory, string> = {
  "Start here":
    "Foundational guides for getting your account set up and building a system you will actually use.",
  "Track and organize":
    "Core concepts for understanding what you own, where it lives, and how to keep it easy to find.",
  "Plan and collaborate":
    "Features that help you prepare for trips, routines, and shared gear without starting from scratch each time.",
};

export const docsPages = [
  {
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
  },
  {
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
      {
        heading: "Fields for a Thing",
        paragraphs: [
          "Only `Name` is required. Everything else is optional, but those fields can be very useful later for reference, repair, maintenance, insurance, packing, or trade and sale.",
        ],
        table: {
          columns: ["Field", "Description", "Required?", "Example"],
          rows: [
            [
              "Name",
              "A clear, descriptive name for the item.",
              "Yes",
              "Mountain Bike",
            ],
            [
              "Description",
              "Additional notes, details, or context about the item.",
              "No",
              "Bought in 2020, 21-speed, aluminum frame",
            ],
            ["Brand", "The brand or manufacturer of the item.", "No", "Trek"],
            [
              "Category",
              "A text field for the item's category. Kwipoo suggests categories, but you can enter your own.",
              "No",
              "Camping",
            ],
            [
              "Visibility",
              "Who can see this Thing: Public, Friends Only, or Owner Only.",
              "No",
              "Public",
            ],
            ["Weight", "The numeric value of the item's weight.", "No", "15.2"],
            ["Weight Unit", "The unit used for weight.", "No", "lb"],
            [
              "Source",
              "Where you purchased or acquired the item.",
              "No",
              "REI",
            ],
            ["Quantity", "How many identical units you have.", "No", "2"],
            ["Cost", "How much you paid or what it is worth.", "No", "$500"],
            [
              "Acquisition Date",
              "The date you bought or acquired the item.",
              "No",
              "2021-08-15",
            ],
            [
              "Condition",
              "The overall condition of the Thing.",
              "No",
              "5 - Very Good",
            ],
            ["Model", "Model name or number.", "No", "Marlin 7"],
            [
              "Product ID",
              "Additional product ID or code, separate from the serial number.",
              "No",
              "UPC-654789",
            ],
            ["Serial number", "The item's serial number.", "No", "SN12345ABC"],
          ],
        },
      },
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
  },
  {
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
          "Enter the required fields: `Name`, `Type`, and `Visibility`.",
          "Add optional description and address details if they help.",
          "Save the Place so it appears in your list.",
        ],
      },
      {
        heading: "Fields for a Place",
        table: {
          columns: ["Field", "Description", "Required?", "Example"],
          rows: [
            ["Name", "A clear, descriptive name for the Place.", "Yes", "Home"],
            ["Type", "The Place type from preset options.", "Yes", "House"],
            [
              "Visibility",
              "Who can see this Place: Public, Friends Only, or Owner Only.",
              "Yes",
              "Friends Only",
            ],
            [
              "Description",
              "Additional notes or details about the Place.",
              "No",
              "Main house with basement",
            ],
            [
              "Address Line 1",
              "The first line of the address.",
              "No",
              "123 Main St",
            ],
            ["Address Line 2", "Additional address info.", "No", "Apt 5B"],
            ["City", "City where the Place is located.", "No", "Denver"],
            ["State", "State, province, or region.", "No", "CO"],
            ["Postal Code", "ZIP or postal code.", "No", "80203"],
            [
              "Country",
              "Country where the Place is located.",
              "No",
              "United States",
            ],
          ],
        },
      },
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
  },
  {
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
      {
        heading: "Fields for a Spot",
        table: {
          columns: ["Field", "Description", "Required?", "Example"],
          rows: [
            [
              "Name",
              "A clear, descriptive name for the Spot.",
              "Yes",
              "Bedroom",
            ],
            [
              "Description",
              "Additional notes or details about the Spot.",
              "No",
              "Closet near the door",
            ],
            [
              "Visibility",
              "Who can see this Spot: Public, Friends Only, or Owner Only.",
              "Yes",
              "Friends Only",
            ],
          ],
        },
      },
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
  },
  {
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
      {
        heading: "Fields for a Set",
        table: {
          columns: ["Field", "Description", "Required?", "Example"],
          rows: [
            [
              "Name",
              "A clear, descriptive name for the Set.",
              "Yes",
              "Winter Camping Kit",
            ],
            [
              "Description",
              "Additional notes, details, or context about the Set.",
              "No",
              "Gear for 3-4 day trips",
            ],
            ["Type", "A text field for the Set's purpose.", "No", "Travel"],
            [
              "Visibility",
              "Who can see this Set: Public, Friends Only, or Owner Only.",
              "Yes",
              "Friends Only",
            ],
          ],
        },
      },
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
  },
  {
    slug: "events",
    category: "Plan and collaborate",
    eyebrow: "Upcoming plans",
    badge: FEATURE_BADGE_PRESETS.beta,
    title: "Prepare for Events",
    summary:
      "Use Events to plan trips, projects, moves, and shared activities with clear lists, assigned gear, packing views, and weight tracking.",
    description:
      "Events connect your inventory to a real upcoming plan. They help you prepare for solo or group activities without losing track of what is covered, what is missing, and who is bringing what.",
    image: {
      src: "/assets/eventsFeatureAsset@2x.png",
      alt: "Kwipoo Events feature showing trip and event planning tools",
    },
    sections: [
      {
        heading: "Why Use Events?",
        paragraphs: [
          "An Event in Kwipoo is more than a date on a calendar. It is a way to plan, track, and coordinate Things for activities. Whether you are going on a solo trip, organizing a group adventure, getting ready to move, or prepping for a weekend getaway, Events help you manage what you need and avoid forgotten items.",
        ],
        bullets: [
          "Pack Smarter, Not Harder: Assign Things to an Event and check them off as you pack.",
          "Solo or Group: Plan for yourself or invite others to collaborate.",
          "Know Who's Bringing What: Reduce duplicate contributions and missing essentials.",
          "Weight Tracking Made Easy: See the total weight of your gear to optimize packing.",
        ],
      },
      {
        heading: "Types of Events",
        bullets: [
          "Solo Event: A personal packing and planning list just for you.",
          "Group Event: A shared Event with invites, a group list, and optional personal lists for attendees.",
        ],
      },
      {
        heading: "Adding an Event",
        bullets: [
          "Go to `Events` from the navigation bar.",
          "Add a new Event.",
          "Enter the required fields: whether the Event is solo, the name, start date, end date, and visibility.",
          "Add optional `Description` and `Location` if they help.",
          "Save the Event so it appears in your list.",
        ],
      },
      {
        heading: "Fields for an Event",
        table: {
          columns: ["Field", "Description", "Required?", "Example"],
          rows: [
            [
              "Is Solo",
              "Defines whether this is a Solo or Group Event.",
              "Yes",
              "True",
            ],
            [
              "Name",
              "A clear, descriptive name for the Event.",
              "Yes",
              "Backpacking Trip",
            ],
            [
              "Description",
              "Additional details about the Event.",
              "No",
              "Weekend in the mountains",
            ],
            [
              "Location",
              "Where the Event is taking place.",
              "No",
              "Rocky Mountain National Park",
            ],
            ["Start Date", "When the Event begins.", "Yes", "2025-06-15"],
            ["End Date", "When the Event ends.", "Yes", "2025-06-18"],
            [
              "Visibility",
              "Who can see this Event: Public, Friends Only, or Owner Only.",
              "Yes",
              "Friends Only",
            ],
          ],
        },
      },
      {
        heading: "Lists & Assigning Things to an Event",
        paragraphs: [
          "Every Event has a list where you can assign Things and Sets so nothing gets left behind.",
        ],
        subsections: [
          {
            heading: "Solo Events",
            bullets: [
              "A personal list is automatically created for you.",
              "Assign Things or Sets directly to that list.",
            ],
          },
          {
            heading: "Group Events",
            bullets: [
              "A group list is shared among attendees.",
              "Each participant can add a personal list that is private to them.",
              "Everyone can see the group list and what is already being brought.",
            ],
          },
          {
            heading: "How to Add a Personal List (Group Events Only)",
            bullets: [
              "Open the Event details.",
              "Open the Event menu.",
              "Add a personal list from the menu.",
              "Remove it later from the same menu if needed.",
            ],
          },
          {
            heading: "Assigning Things & Sets to an Event",
            bullets: [
              "Open the Event details and use the assign action from the Event menu.",
              "If both group and personal lists exist, the active tab determines where the Things will be assigned.",
              "Assign Things directly or add categories first and then assign Things into those categories.",
              "Select the Things or Sets you want to add and confirm the assignment.",
            ],
          },
        ],
      },
      {
        heading: "Viewing & Checking the Packing List",
        bullets: [
          "Open the packing list from the Event menu.",
          "Use tile view to see item cards grouped by Spot.",
          "Use list view for a simpler text-based layout, also grouped by Spot.",
          "Check items off as you pack.",
        ],
      },
      {
        heading: "Total Weight Tracking",
        paragraphs: [
          "For group Events, Kwipoo can show both your personal weight and the combined group weight so you can balance loads and avoid unnecessary bulk.",
        ],
        bullets: [
          "Personal Weight: The total weight of everything you personally added.",
          "Group Weight: The combined weight of all Things in the shared group list.",
        ],
      },
      {
        heading: "Inviting & Managing Attendees (Group Events Only)",
        bullets: [
          "Send invites from the Event menu and choose who to invite.",
          "View, accept, or decline invitations before the Event starts.",
          "The Event creator is the initial admin and can remove Things or Sets from the group list, assign other admins, and remove attendees when needed.",
        ],
      },
      {
        heading: "Viewing & Editing Events",
        bullets: [
          "Browse upcoming and past Events from the Events list page.",
          "Edit the name, description, dates, or attendees as needed, depending on your permissions.",
          "Delete the Event if you are the admin. Deleting the Event does not delete the Things in it.",
        ],
      },
      {
        heading: "Privacy & Visibility",
        bullets: [
          "Public: Anyone can see the Event if your profile is public.",
          "Friends Only: Only invited attendees can view it.",
          "Owner Only: The Event is visible only to you.",
        ],
      },
      {
        heading: "Pro Tips",
        bullets: [
          "Plan Ahead: Build the list before it is time to pack so last-minute scrambling stays low.",
          "Use the Group List Strategically: Early contributions help you spot duplicates and gaps.",
          "Track Weight for Smarter Packing when you are flying, backpacking, or traveling light.",
          "Pick Solo or Group based on the kind of coordination you actually need.",
        ],
      },
    ],
    relatedSlugs: ["sets", "things", "social"],
  },
  {
    slug: "social",
    category: "Plan and collaborate",
    eyebrow: "Shared coordination",
    badge: FEATURE_BADGE_PRESETS.beta,
    title: "Coordinate through Social",
    summary:
      "Use Social to connect with friends, browse shared gear, coordinate plans, borrow instead of rebuying, and keep conversations tied to real inventory.",
    description:
      "Kwipoo's social features help you see what other people have, manage friendships, message directly, and coordinate around trips, gifts, and shared gear needs.",
    image: {
      src: "/assets/socialFeatureAsset@2x.png",
      alt: "Kwipoo Social feature showing shared inventory and collaboration",
    },
    sections: [
      {
        heading: "Why Use Social?",
        paragraphs: [
          "Kwipoo is more than just a way to track your Things. It is also a tool for connecting with people who share your interests, helping you borrow, lend, discover, and chat about gear. Whether you are coordinating a trip, looking for a gift, or just keeping up with friends, Social makes inventory more useful together.",
        ],
        bullets: [
          "Check Before You Buy: See whether a friend already owns the item and might lend or sell it instead.",
          "Surprise Gifts Done Right: Avoid gifting something a friend already has, or get ideas from what they use.",
          "See What Friends Are Using: Browse friends' Things and Sets for inspiration and recommendations.",
          "Lend & Borrow: Check a friend's inventory before buying something for yourself.",
          "Easier Event Planning: Look at a friend's profile when deciding what they should bring or what they still need.",
        ],
      },
      {
        heading: "Finding & Adding Friends",
        subsections: [
          {
            heading: "Searching for Users",
            bullets: [
              "Go to your Profile.",
              "Open `Find Friends`.",
              "Search by username or name.",
              "Select a user to view their profile.",
            ],
          },
          {
            heading: "Sending a Friend Request",
            bullets: [
              "If the user is not already your friend, use the `Send Friend Request` action on their profile.",
              "If their profile is set to Friends Only, you will not see their Things, Sets, or Places until they accept.",
            ],
          },
          {
            heading: "Viewing Your Friends",
            bullets: [
              "Open your Profile.",
              "Use the friends entry point to see your friends list.",
              "Search for a specific friend from that list.",
              "Open a friend's name to view their profile.",
            ],
          },
          {
            heading: "Removing a Friend",
            bullets: [
              "Open your friends list.",
              "Find the friend you want to remove.",
              "Use the delete action next to their name.",
            ],
          },
        ],
      },
      {
        heading: "Viewing & Interacting with Other Users",
        subsections: [
          {
            heading: "Viewing a Friend's Profile",
            bullets: [
              "Open a friend's name from your friends list to view their profile.",
              "If they shared Things, Sets, or Places with Friends Only visibility, you will be able to see them.",
            ],
          },
          {
            heading: "Viewing a Non-Friend's Profile",
            bullets: [
              "If you find a user through `Find Friends`, you can view their profile.",
              "If their account is public, you can see their visible Things, Sets, and Places.",
              "If their account is set to Friends Only, you will only see the friend request action until they accept.",
            ],
          },
        ],
      },
      {
        heading: "Messaging & Chat",
        paragraphs: [
          "Kwipoo's chat features make it easier to stay in touch and coordinate with friends. You can use direct conversations with individual users or event chats tied to shared plans.",
        ],
        subsections: [
          {
            heading: "Accessing the Chat Center",
            bullets: [
              "Go to your Profile.",
              "Open the chat center to see all chats.",
              "Use direct chats for one-to-one conversations.",
              "Use event chats for group conversations created from Events.",
            ],
          },
          {
            heading: "Starting a Direct Chat",
            bullets: [
              "Go to a friend's profile.",
              "Use the chat icon in the top right.",
              "If a conversation already exists, you will jump into it.",
              "If not, Kwipoo creates a new thread.",
            ],
          },
          {
            heading: "Using Event Chats",
            bullets: [
              "When you create or join an Event, an event chat is created automatically.",
              "Access event chats from the chat center or through Event details.",
            ],
          },
        ],
      },
      {
        heading: "Privacy & Control",
        paragraphs: [
          "Kwipoo gives you full control over who can see your profile and the Things, Sets, and Places connected to it. Your profile privacy applies globally, and you can also fine-tune visibility on individual items.",
        ],
        bullets: [
          "Public: Anyone can view your profile and visible items.",
          "Friends Only: Only friends can see your profile and items.",
          "Owner Only: No one else can see your profile or items.",
        ],
      },
      {
        heading: "Pro Tips",
        bullets: [
          "Use Friends Only visibility if you want friend-only sharing without broadcasting your inventory more broadly.",
          "Check friends' gear before buying something yourself.",
          "Use inventory visibility to make gift-giving easier and more informed.",
          "Use chat for quick coordination when you want to borrow, ask questions, or plan together.",
          "Add friends, family, roommates, and social groups to make the network more useful over time.",
        ],
      },
    ],
    relatedSlugs: ["events", "sets", "profile"],
  },
  {
    slug: "profile",
    category: "Start here",
    eyebrow: "Personal setup",
    badge: FEATURE_BADGE_PRESETS.beta,
    title: "Manage your Profile",
    summary:
      "Use your Profile to present yourself on Kwipoo, review what you have added, manage friends, and control the settings that shape your account.",
    description:
      "Your Profile is the control center for your identity, privacy, preferences, and support options inside Kwipoo.",
    image: {
      src: "/assets/householdProfile@2x.png",
      alt: "Kwipoo profile view showing personal setup options",
    },
    sections: [
      {
        heading: "What's on Your Profile?",
        bullets: [
          "Profile Picture & Bio: Personalize how you appear to others.",
          "Things, Sets, Places Count: See a quick summary of how much you have added.",
          "Friends List & Search: View and manage your connections.",
          "Notifications: Open alerts like friend requests or Event updates.",
          "Settings: Access privacy, account settings, and support options.",
        ],
      },
      {
        heading: "Updating Your Profile",
        paragraphs: [
          "Use the edit action next to your profile picture when you want to change how your account appears.",
        ],
        bullets: [
          "Change your profile image.",
          "Update your bio.",
          "Save the changes to apply the update.",
        ],
      },
      {
        heading: "Settings & Privacy",
        paragraphs: [
          "The Settings & Privacy area lets you manage account details, privacy preferences, default settings, and support options.",
        ],
        subsections: [
          {
            heading: "Accessing Settings",
            bullets: [
              "Use the gear icon in the top right of the Profile page.",
            ],
          },
          {
            heading: "Account",
            bullets: [
              "Personal Information: Manage your first name, last name, and profile picture.",
              "Username: Update your Kwipoo username.",
              "Email: Change the email associated with your account.",
              "Password: Update your password.",
              "Delete Account: Permanently delete your Kwipoo account.",
            ],
          },
          {
            heading: "Privacy",
            paragraphs: [
              "Adjust your profile visibility to control who can see your Things, Sets, and Places. Even with a public profile, you can still fine-tune privacy for individual Things, Sets, Places, and Events.",
            ],
            bullets: [
              "Public: Anyone can view your profile if it is public.",
              "Friends Only: Only your Kwipoo friends can see your profile.",
              "Owner Only: Your profile is invisible to others.",
            ],
          },
          {
            heading: "Defaults",
            bullets: [
              "Default Weight Unit: Choose the weight unit that will be used by default for entry and displayed in totals.",
            ],
          },
          {
            heading: "Support",
            bullets: [
              "Contact Us: Reach out to Kwipoo support.",
              "Report a Problem: Flag issues or bugs.",
              "Terms and Conditions: View the latest terms of service.",
              "Privacy Policy: Review Kwipoo's privacy policies.",
            ],
          },
          {
            heading: "Logging Out",
            bullets: [
              "Use the log out action at the bottom of the Settings page to sign out of your account.",
            ],
          },
        ],
      },
    ],
    relatedSlugs: ["getting-started", "social", "things"],
  },
] satisfies DocsPage[];

export function getDocsPage(slug: string): DocsPage | undefined {
  return docsPages.find((page) => page.slug === slug);
}

export function getDocsPagesByCategory(category: DocsCategory): DocsPage[] {
  return docsPages.filter((page) => page.category === category);
}

export function getDocsCategoryGroups(): DocsCategoryGroup[] {
  return docsCategoryOrder.map((category) => ({
    category,
    description: docsCategoryDescriptions[category],
    pages: getDocsPagesByCategory(category),
  }));
}

const docsFeatureNavItems = [
  { slug: "places", label: "Places" },
  { slug: "spots", label: "Spots" },
  { slug: "things", label: "Things" },
  { slug: "sets", label: "Sets" },
  { slug: "events", label: "Events" },
  { slug: "social", label: "Social" },
  { slug: "profile", label: "Profile" },
] as const;

export function getDocsNavSections(): DocsNavSection[] {
  return [
    {
      title: "Getting Started",
      items: [
        {
          label: "Welcome",
          href: "/docs",
        },
      ],
    },
    {
      title: "Features",
      items: docsFeatureNavItems.map((item) => ({
        label: item.label,
        href: `/docs/${item.slug}`,
        slug: item.slug,
        badge: getDocsPage(item.slug)?.badge,
      })),
    },
  ];
}

export const docsLandingTocItems: DocsTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "start-here", label: "Start Here" },
  { id: "browse-topics", label: "Browse Topics" },
  { id: "content-roadmap", label: "Content Roadmap" },
] as const;

export function getDocsHref(slug: string): string {
  return slug === "getting-started" ? "/docs" : `/docs/${slug}`;
}

export function getDocsSectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDocsTocItems(docPage: DocsPage): DocsTocItem[] {
  return docPage.sections.map((section) => ({
    id: getDocsSectionId(section.heading),
    label: section.heading,
  }));
}

export function getDocsPageLabel(slug: string): string {
  return (
    docsFeatureNavItems.find((item) => item.slug === slug)?.label ??
    getDocsPage(slug)?.title ??
    "Documentation"
  );
}

export function getDocsPageBadge(slug: string): FeatureBadge | undefined {
  return getDocsPage(slug)?.badge;
}

export function getRelatedDocsPages(docPage: DocsPage): DocsPage[] {
  return docPage.relatedSlugs
    .map((slug) => getDocsPage(slug))
    .filter((page): page is DocsPage => Boolean(page));
}
