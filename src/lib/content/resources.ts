import type { DocsSection, DocsTocItem } from "$lib/content/docs";
import { getDocsSectionId } from "$lib/content/docs";

export interface ResourceGuide {
  slug: string;
  eyebrow: string;
  audience: string;
  format: string;
  readTime: string;
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

export const resourceGuides = [
  {
    slug: "outdoor-adventurers",
    eyebrow: "Resource guide",
    audience: "Outdoor adventurers",
    format: "Guide",
    readTime: "7 min read",
    title: "Keep outdoor gear organized and trip-ready",
    summary:
      "Use Kwipoo to track gear, build reusable trip kits, coordinate group packing, and keep outdoor spending easier to manage.",
    description:
      "Outdoor gear tends to spread across closets, bins, garages, trunks, and borrowed bags. This guide shows how to use Kwipoo to keep it easier to find, pack, and avoid buying twice.",
    image: {
      src: "/assets/backpack@2x.png",
      alt: "Kwipoo Sets view with grouped outdoor gear for trip planning",
    },
    sections: [
      {
        heading: "Start with the gear that matters most",
        summary:
          "Begin with the items that cost the most, go missing most often, or are the most annoying to replace.",
        paragraphs: [
          "If you have ever bought another headlamp, stove canister, or dry bag because you were not sure what you already had, the first win is visibility. Kwipoo gives you one place to check before you shop, pack, or dig through storage.",
        ],
        bullets: [
          "Add your most-used or most expensive gear as Things first.",
          "Assign each item to the Place and Spot where it actually lives, such as garage shelves, a camping bin, or the back of your SUV.",
          "Fill in cost, weight, serial number, or condition details for anything you may insure, replace, or compare later.",
        ],
        callout: {
          tone: "tip",
          title: "Capture weight and cost early",
          body: "Those details become useful later when you want to balance pack loads, estimate replacement value, or understand what your setup really costs.",
        },
      },
      {
        heading: "Build reusable trip kits",
        summary:
          "Sets save you from rebuilding the same packing list every time a trip comes up.",
        paragraphs: [
          "Instead of rebuilding a backpacking list from memory before every trip, create Sets for the outings you repeat. That could mean one base backpacking kit, one cold-weather variation, and one car-camping setup with the heavier gear.",
        ],
        bullets: [
          "Create Sets for recurring adventures like backpacking weekends, climbing days, or overlanding trips.",
          "Reuse those Sets when a new trip comes up instead of starting from a blank checklist.",
          "Use Events when a specific outing needs a live packing pass, readiness check, or final trip-specific adjustments.",
        ],
      },
      {
        heading: "Make group trips easier to coordinate",
        summary:
          "Trips go smoother when everyone can see what is already covered before they leave home.",
        paragraphs: [
          "Group plans break down when someone assumes another person packed the fuel, water filter, or first-aid kit. Kwipoo helps you review what is already accounted for and where the gaps still are before the trip starts.",
        ],
        bullets: [
          "Create an Event for each trip so you can review what needs to come along.",
          "Use Packing Lists to check off personal and shared gear before departure.",
          "Review what friends already have before buying another duplicate item for the group.",
        ],
      },
      {
        heading: "Make replacement decisions with better context",
        summary:
          "A visible inventory helps you avoid duplicate purchases and see where your money is going.",
        paragraphs: [
          "Outdoor gear adds up quickly. When your inventory shows what you own, what shape it is in, and what it cost, you can make calmer decisions about upgrades, lending, and what is actually missing from your setup.",
        ],
        bullets: [
          "Track gear costs so you can estimate the value of a kit or category.",
          "Use categories and filters to see where you are overspending or carrying redundant gear.",
          "Share selected gear with friends when borrowing or lending is easier than buying new.",
        ],
      },
    ],
    relatedSlugs: [
      "households-families-roommates",
      "frequent-travelers-movers",
    ],
  },
  {
    slug: "households-families-roommates",
    eyebrow: "Resource guide",
    audience: "Families, couples, and roommates",
    format: "Guide",
    readTime: "7 min read",
    title: "Build a household inventory people can actually use",
    summary:
      "Use Kwipoo to organize home essentials, track shared items, cut down on duplicate purchases, and keep storage easier to maintain.",
    description:
      "Household organization gets messy when items move between rooms, seasonal bins, drawers, and the people who use them. This guide shows how Kwipoo can make everyday home storage easier to see and manage.",
    image: {
      src: "/assets/placesFeatureAsset@2x.png",
      alt: "Kwipoo Places view showing organized home storage locations",
    },
    sections: [
      {
        heading: "Start with the items people ask about most",
        summary:
          "A clear inventory cuts down on repeated searches and unnecessary rebuys.",
        paragraphs: [
          "If batteries vanish into drawers, tools migrate between rooms, or no one can remember where the extra lightbulbs went, the problem is usually not the number of items. It is that the household has no shared source of truth for what exists and where it lives.",
        ],
        bullets: [
          "Add the household items you regularly search for or repurchase by mistake.",
          "Use Places and Spots for practical home locations like pantry shelves, linen closets, garage cabinets, or hall bins.",
          "Set visibility based on whether an item should be visible to the whole household or just one person.",
        ],
        callout: {
          tone: "tip",
          title: "Name categories the way your household talks",
          body: "Simple labels like Cleaning Supplies, Tools, Kid Gear, and Seasonal Decor make search and filtering faster than overly detailed taxonomy.",
        },
      },
      {
        heading: "Organize seasonal and low-use storage",
        summary:
          "Seasonal gear is easier to store away when everyone can still find it later.",
        paragraphs: [
          "Holiday decor, winter clothes, spare bedding, and camping supplies often end up in out-of-the-way storage for good reason. Kwipoo helps you move them out of daily space without losing track of the exact bin, room, or shelf where they ended up.",
        ],
        bullets: [
          "Create dedicated storage Places and Spots for off-season or low-frequency items.",
          "Update item locations when things move between daily use and long-term storage.",
          "Use clear names for bins, closets, and shelves so anyone in the household can find the right place fast.",
        ],
      },
      {
        heading: "Keep shared items from turning into friction",
        summary:
          "Shared tools, chargers, appliances, and supplies are easier to manage when their location stays visible.",
        paragraphs: [
          "A surprising amount of household frustration comes from items that everyone uses but no one tracks. Kwipoo helps households keep better tabs on what is shared, who has it, and what needs to be replaced or returned.",
        ],
        bullets: [
          "Track shared-use items separately from personal ones when that distinction matters.",
          "Use Kwipoo to note who has a borrowed or frequently moved item.",
          "Check inventory before buying replacements for tools, chargers, batteries, or pantry staples.",
        ],
      },
      {
        heading: "Declutter with a clearer picture",
        summary:
          "Once you can see what is underused or duplicated, it is easier to decide what should stay, move, or go.",
        paragraphs: [
          "Clutter usually grows when storage fills with forgotten duplicates, single-purpose tools, or categories that no one reviews. Once your household inventory is searchable, it becomes easier to decide what to keep accessible, what to store away, and what no longer needs space at all.",
        ],
        bullets: [
          "Use filters and summaries to spot redundant or underused household items.",
          "Review categories that have grown messy or expensive over time.",
          "Use the same structure for everyday essentials and important documents so the home has one reliable organizational system.",
        ],
      },
    ],
    relatedSlugs: ["frequent-travelers-movers", "outdoor-adventurers"],
  },
  {
    slug: "frequent-travelers-movers",
    eyebrow: "Resource guide",
    audience: "Frequent travelers and movers",
    format: "Guide",
    readTime: "8 min read",
    title: "Keep travel essentials organized across trips and moves",
    summary:
      "Use Kwipoo to track what you own across locations, build reusable packing systems, avoid overpacking, and protect high-value travel gear.",
    description:
      "Travel and moving get harder when your belongings are split across suitcases, storage units, temporary stays, and home. This guide shows how Kwipoo can give you a stable inventory and packing workflow even when your location keeps changing.",
    image: {
      src: "/assets/eventsFeatureAsset@2x.png",
      alt: "Kwipoo Events view showing trip planning and packing progress",
    },
    sections: [
      {
        heading: "Start with a portable inventory",
        summary:
          "A reliable inventory makes trips, moves, and resets easier because you have one place to check instead of relying on memory.",
        paragraphs: [
          "When your life spans flights, short stays, storage, and frequent repacking, the first problem is usually fragmentation. Some items are at home, some are in transit, and some are tucked into a bag you last touched two moves ago. Kwipoo helps you rebuild clarity from that spread-out reality.",
        ],
        bullets: [
          "Add your most important belongings first, especially tech, travel documents, chargers, and frequently packed essentials.",
          "Capture details like weight, value, and location so your inventory supports travel decisions instead of just listing items.",
          "Use clear categories such as Tech Gear, Clothing, Toiletries, and Documents for faster filtering later.",
        ],
      },
      {
        heading: "Create a packing system you can reuse",
        summary:
          "Packing gets faster when repeat trip types already have a starting point.",
        paragraphs: [
          "Business travel, weekend trips, long stays, and full moves all call for different versions of the same core items. Kwipoo helps you reuse what works instead of rebuilding every list from scratch while hoping you remembered the obvious things.",
        ],
        bullets: [
          "Create Sets for the trip patterns you repeat most often.",
          "Use Events and Packing Lists to turn those reusable Sets into a checklist for a specific departure.",
          "Adjust the final list for weather, duration, or destination instead of starting from zero every time.",
        ],
        callout: {
          tone: "tip",
          title: "Build one base travel set first",
          body: "A small baseline kit for everyday essentials gives you a dependable foundation for both short trips and more complicated moves.",
        },
      },
      {
        heading: "Keep location records current",
        summary:
          "Temporary locations only help if you name them clearly and update them when things move.",
        paragraphs: [
          "When belongings rotate between home, storage, hotels, Airbnbs, and friends' places, vague mental notes stop being reliable. Kwipoo helps you keep a current record of where items actually are so retrieval is less of a scavenger hunt.",
        ],
        bullets: [
          "Assign items to real locations such as home, storage, a temporary rental, or a travel bag.",
          "Update item locations whenever you move them between long-term storage and active travel use.",
          "Use specific temporary names like Airbnb - Tokyo or Storage Unit B so future-you can trust the record.",
        ],
      },
      {
        heading: "Pack lighter without guessing",
        summary:
          "The goal is not packing less for its own sake. It is bringing the right things with more confidence.",
        paragraphs: [
          "Overpacking creates drag. Underpacking creates stress. Once your inventory is searchable and your Sets reflect real trip patterns, you can make more deliberate decisions about what is worth carrying and what can stay behind.",
        ],
        bullets: [
          "Use filters to review only the categories relevant to the trip in front of you.",
          "Check item weights when you are trying to stay inside baggage limits or keep a pack manageable.",
          "Log value, serial numbers, and notes for high-value items so replacements or claims are easier if something goes wrong.",
        ],
      },
    ],
    relatedSlugs: ["outdoor-adventurers", "households-families-roommates"],
  },
] satisfies ResourceGuide[];

export function getResourcesHref(slug?: string): string {
  return slug ? `/resources/${slug}` : "/resources";
}

export function getResourceGuide(slug: string): ResourceGuide | undefined {
  return resourceGuides.find((guide) => guide.slug === slug);
}

export function getRelatedResourceGuides(
  guide: ResourceGuide,
): ResourceGuide[] {
  return guide.relatedSlugs
    .map((slug) => getResourceGuide(slug))
    .filter((relatedGuide): relatedGuide is ResourceGuide =>
      Boolean(relatedGuide),
    );
}

export function getResourceGuideTocItems(guide: ResourceGuide): DocsTocItem[] {
  return guide.sections.map((section) => ({
    id: getDocsSectionId(section.heading),
    label: section.heading,
  }));
}
