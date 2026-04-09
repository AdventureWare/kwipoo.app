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
    slug: "stop-buying-duplicates-you-already-have-at-home",
    eyebrow: "Resource guide",
    audience: "Households tired of re-buying what they already own",
    format: "Guide",
    readTime: "7 min read",
    title: "How to stop buying duplicates you already have at home",
    summary:
      "Use Kwipoo to make stored items, backup supplies, and repeat-buy categories easier to check before you shop again.",
    description:
      "Duplicate purchases usually happen because checking takes more effort than buying. This guide shows how to use Kwipoo to keep the right categories visible, so you can trust what you already have at home before another charger, bottle, tool, or pantry item ends up in the cart.",
    image: {
      src: "/assets/thingsFeatureAsset@2x.png",
      alt: "Kwipoo Things view showing household items tracked to avoid duplicate purchases",
    },
    sections: [
      {
        heading: "Start with the categories that get bought twice",
        summary:
          "The fastest wins come from the household categories where memory fails most often.",
        paragraphs: [
          "Most people do not accidentally buy a second couch. They buy another charger, flashlight, extension cord, bottle of cleaner, pack of batteries, or travel-size toiletry because checking the house feels slower than making the purchase. A duplicate-prevention system works best when it starts with the categories that already create that pattern.",
        ],
        bullets: [
          "Begin with the items you regularly search for, replace, or wonder if you still have.",
          "Include backup supplies, small tools, hobby accessories, and any category that spreads across drawers, bins, and closets.",
          "Treat the first pass as a targeted friction-reduction project, not a full inventory audit.",
        ],
        callout: {
          tone: "tip",
          title: "Start with one expensive annoyance category",
          body: "If one category keeps costing money or wasting time, like charging cables, pantry staples, or camping accessories, that is the best place to prove the system works.",
        },
      },
      {
        heading: "Make location and quantity easier to trust",
        summary:
          "The question is usually not just Do I own this. It is Do I own it, where is it, and do I have enough of it.",
        paragraphs: [
          "Duplicate buying happens when the inventory feels uncertain. If you cannot tell whether something exists, where it lives, or whether the last spare was already used, you will default to buying again. Kwipoo helps because the item, its location, and the supporting details can live in one place instead of being spread across memory.",
        ],
        bullets: [
          "Track the real storage location so you can tell whether an item is actually available or buried in long-term storage.",
          "Capture useful quantity or condition details when they affect whether you should buy more.",
          "Use practical category names so the search matches how you think when you are in a store or making a list.",
        ],
      },
      {
        heading: "Check the inventory before shopping, not after",
        summary:
          "The habit only works when the inventory becomes part of the decision moment.",
        paragraphs: [
          "A home inventory is not just for finding things after the fact. Its best duplicate-prevention value shows up before you buy. That means using it while making a shopping list, before reordering supplies, or when you are standing in a store trying to remember whether you already solved this problem once.",
        ],
        bullets: [
          "Review the relevant category before ordering household supplies or hobby gear.",
          "Check stored-away locations before replacing something that might simply be out of sight.",
          "Use the same system for both quick searches and longer restock planning so you do not maintain two separate lists.",
        ],
      },
      {
        heading: "Keep shared household context visible",
        summary:
          "Duplicate purchases rise when several people assume nobody else already handled it.",
        paragraphs: [
          "In shared households, duplicate buying is not always forgetfulness. Sometimes it is ambiguity. One person buys more batteries because they did not know another pack was in the closet. Another person buys a tool because they forgot it was in the garage tote. Kwipoo helps reduce that ambiguity by making the household source of truth easier to trust.",
        ],
        bullets: [
          "Track commonly shared items where everyone would reasonably look for them.",
          "Use consistent names for locations and categories so the same search works across the household.",
          "Keep backup stock, shared-use tools, and recurring supplies visible even when they are not in daily use.",
        ],
      },
      {
        heading: "Update after restocks, cleanouts, and room resets",
        summary:
          "Duplicate prevention gets easier when the inventory stays aligned with the moments when stuff actually changes.",
        paragraphs: [
          "The inventory does not need constant maintenance, but it does need a few dependable update moments. The easiest ones are after restocking supplies, decluttering a problem area, moving items into storage, or reorganizing a room. That is when you already know what changed and where it ended up.",
        ],
        bullets: [
          "Update locations when items move into new drawers, bins, or backup-storage spots.",
          "Adjust quantities or notes when a category gets restocked or nearly runs out.",
          "Use cleanouts and reorganizations as the time to remove stale assumptions from the inventory.",
        ],
      },
    ],
    relatedSlugs: [
      "home-inventory-that-stays-updated",
      "organize-storage-bins-find-things-later",
      "households-families-roommates",
    ],
  },
  {
    slug: "track-what-you-own-across-home-storage-and-travel",
    eyebrow: "Resource guide",
    audience: "People managing belongings across multiple locations",
    format: "Guide",
    readTime: "8 min read",
    title: "Track what you own across home, storage, and travel",
    summary:
      "Use Kwipoo to keep a reliable inventory when your belongings move between home, storage units, temporary stays, and travel bags.",
    description:
      "It gets hard to trust your inventory when some belongings are at home, some are packed away, some are traveling with you, and some are sitting in a temporary place you barely remember naming. This guide shows how to use Kwipoo to keep that multi-location picture clear without turning every move into a reset.",
    image: {
      src: "/assets/spotsFeatureAsset@2x.png",
      alt: "Kwipoo Spots view showing items tracked across multiple locations",
    },
    sections: [
      {
        heading: "Start by mapping the locations that actually matter",
        summary:
          "A multi-location inventory gets clearer when you define the real places first instead of jumping straight into item cleanup.",
        paragraphs: [
          "When things are spread across home, storage, vehicles, temporary stays, and travel bags, the first problem is usually not the item list. It is the location map. If the places are vague, the inventory will stay vague too. Start by naming the real-world locations that determine where something could be when you need it.",
        ],
        bullets: [
          "Set up Places for stable locations like home, storage unit, office, or family property.",
          "Add the temporary or mobile locations that regularly matter, such as car, travel bag, Airbnb, or short-term rental.",
          "Keep the location map practical enough that you would actually trust it during a busy week.",
        ],
        callout: {
          tone: "tip",
          title: "Make temporary places explicit",
          body: "Names like Airbnb - Denver or Van - Summer Road Trip are much easier to trust later than generic labels like Travel or Temporary.",
        },
      },
      {
        heading: "Separate long-term storage from active use",
        summary:
          "The system becomes easier to scan when stored-away items and active items are both visible but not mentally mixed together.",
        paragraphs: [
          "A lot of confusion comes from not knowing whether something is currently available or simply still owned somewhere else. Kwipoo helps because you can keep the item in the inventory while still making its current location obvious. That means you do not lose sight of stored belongings, but you also do not assume they are close at hand.",
        ],
        bullets: [
          "Use Places and Spots to distinguish active-use locations from long-term storage areas.",
          "Keep packed-away items in the inventory instead of mentally deleting them once they leave daily view.",
          "Use clear names for retrieval layers like storage shelf, tote number, luggage pocket, or guest-room closet.",
        ],
      },
      {
        heading: "Track movement patterns, not just final destinations",
        summary:
          "A multi-location inventory is more useful when it reflects how items circulate, not only where they are supposed to live in theory.",
        paragraphs: [
          "Some belongings rotate predictably between home, storage, and travel. Camping gear moves into the garage after a trip. Chargers rotate between work bag and desk drawer. Seasonal supplies disappear into storage and return months later. When those movement patterns are expected, updating them feels less like admin and more like keeping the map honest.",
        ],
        bullets: [
          "Notice the categories that regularly move between locations instead of assuming they have one permanent home.",
          "Use Sets and Events when those movements are tied to recurring trips, projects, or seasonal resets.",
          "Treat the inventory as a living map of current reality, not a permanent record of where items should ideally stay.",
        ],
      },
      {
        heading: "Use one system for retrieval, not separate mental systems",
        summary:
          "The real win is replacing several fragile memory systems with one place you can trust before you search, pack, or buy.",
        paragraphs: [
          "People often keep one mental map for home, another for storage, and a third for travel gear. That works until life gets busy. Kwipoo is most helpful when it becomes the shared source of truth across those contexts, so the answer to Where is it now does not depend on which mode your brain happens to be in.",
        ],
        bullets: [
          "Check the same inventory before opening storage bins, packing for a trip, or replacing a missing item.",
          "Keep the same naming logic across home, storage, and temporary locations so searching stays predictable.",
          "Use notes or useful item details only when they help you decide whether the item is worth retrieving, replacing, or carrying.",
        ],
      },
      {
        heading: "Update after transitions while the movement is still fresh",
        summary:
          "The easiest time to keep a multi-location inventory accurate is right after unpacking, moving, or resetting a space.",
        paragraphs: [
          "A multi-location system does not need constant maintenance, but it does need reliable update moments. The best ones are right after real transitions: coming home from a trip, moving things into storage, emptying a temporary rental, or resetting a room after a project. That is when you still know what moved and what changed.",
        ],
        bullets: [
          "Update locations when items come back from travel or go into off-site storage.",
          "Rename temporary places or remove them when that phase of life is over.",
          "Use moves, seasonal shifts, and unpacking sessions as checkpoints for restoring trust in the inventory.",
        ],
      },
    ],
    relatedSlugs: [
      "stop-buying-duplicates-you-already-have-at-home",
      "organize-storage-bins-find-things-later",
      "repeatable-packing-system-trips-camping-events",
    ],
  },
  {
    slug: "repeatable-packing-system-trips-camping-events",
    eyebrow: "Resource guide",
    audience: "Travelers, campers, and repeat-event planners",
    format: "Guide",
    readTime: "8 min read",
    title: "Build a repeatable packing system for trips, camping, and events",
    summary:
      "Use Kwipoo to turn repeat trips and event prep into reusable packing workflows, so you stop rebuilding the same list from memory every time.",
    description:
      "Packing gets stressful when every trip starts from a blank page. This guide shows how to use Kwipoo to build a repeatable packing system from what you already own, so weekend travel, camping, and recurring events become easier to prepare for and easier to improve over time.",
    image: {
      src: "/assets/eventsFeatureAsset@2x.png",
      alt: "Kwipoo Events view showing a reusable packing workflow in progress",
    },
    sections: [
      {
        heading: "Start with the trips and events you repeat most often",
        summary:
          "A repeatable packing system works best when it starts with patterns, not one-off edge cases.",
        paragraphs: [
          "You do not need one perfect master packing list for every future scenario. You need a dependable starting point for the situations that keep coming back: weekend trips, camping weekends, youth sports tournaments, overnight visits, work travel, or event setups. When those repeatable situations are clear, the rest of the system gets much easier to maintain.",
        ],
        bullets: [
          "Pick one or two recurring trip or event types that already create stress or repeated forgotten items.",
          "Build the first reusable setup around what usually stays the same, not around every possible exception.",
          "Let rare edge cases stay manual until the repeatable flows are working.",
        ],
        callout: {
          tone: "tip",
          title: "Start with the most annoying repeat trip",
          body: "If one trip type always makes you scramble, forget essentials, or repack the same category from memory, that is the right place to build your first reusable system.",
        },
      },
      {
        heading: "Build the system from what you already own",
        summary:
          "A packing workflow gets more trustworthy when it is tied directly to your real inventory instead of a wish-list version of the trip.",
        paragraphs: [
          "Most packing lists break down because they are disconnected from reality. They describe what you hope to bring, but not what you actually own, where it lives, or whether it is already packed somewhere else. Kwipoo helps by grounding the workflow in your existing Things, Places, and Spots before the trip-specific checklist begins.",
        ],
        bullets: [
          "Add the gear, clothing, supplies, or shared items that regularly belong in the trip or event setup.",
          "Keep those items tied to the real locations where they normally live so retrieval is part of the workflow.",
          "Track details that change the decision, like quantity, size, condition, weight, or whether an item is shared with someone else.",
        ],
      },
      {
        heading: "Use Sets as the reusable foundation",
        summary:
          "Sets give you the repeatable structure so you are not starting from zero every time a date gets added to the calendar.",
        paragraphs: [
          "The most useful repeatable packing systems have a stable core and flexible edges. In Kwipoo, Sets let you create that stable core. A weekend travel set, a camping kitchen set, a tournament sideline set, or a family beach setup can all become reusable building blocks instead of a memory test.",
        ],
        bullets: [
          "Create a Set for the common version of the trip or event, not the most extreme version.",
          "Separate core gear from optional extras so the reusable setup stays easy to scan.",
          "Use more than one Set when that matches reality better, like one personal travel set plus one shared family or group set.",
        ],
      },
      {
        heading: "Turn reusable setups into a final packing pass",
        summary:
          "The reusable system should reduce the work, but the last check still belongs to the specific departure or event in front of you.",
        paragraphs: [
          "A repeatable packing system is not about freezing every list forever. It is about starting ahead. Once the reusable base exists, use the live event or trip plan to account for weather, duration, missing supplies, borrowed gear, or anything that only matters this time.",
        ],
        bullets: [
          "Use Events when you need a live checklist for a specific trip, date, or group plan.",
          "Review what is already packed, what still needs attention, and what can stay behind for this version.",
          "Treat the reusable setup as the baseline and the Event as the real-world adjustment layer.",
        ],
      },
      {
        heading: "Improve the system after each real packing cycle",
        summary:
          "The fastest way to build a strong packing system is to update it right after the trip while the misses are still obvious.",
        paragraphs: [
          "The most useful feedback comes right after the gear comes home or the event ends. That is when you still know what was missing, what never got used, what stayed packed by accident, and what should become part of the standard setup next time. A repeatable system gets better from those quick corrections.",
        ],
        bullets: [
          "Adjust the Set when an item should clearly become part of the recurring baseline.",
          "Remove or downgrade items that keep adding weight, clutter, or unnecessary steps.",
          "Update item locations when unpacking so the next trip starts from an accurate inventory again.",
        ],
      },
    ],
    relatedSlugs: [
      "stop-buying-duplicates-you-already-have-at-home",
      "track-what-you-own-across-home-storage-and-travel",
      "organize-storage-bins-find-things-later",
    ],
  },
  {
    slug: "organize-storage-bins-find-things-later",
    eyebrow: "Resource guide",
    audience: "Households using bins, totes, and seasonal storage",
    format: "Guide",
    readTime: "7 min read",
    title: "Organize storage bins so you can find things later",
    summary:
      "Use Kwipoo to label bins more clearly, connect them to real storage locations, and keep track of what is packed away without opening every tote.",
    description:
      "Storage bins are useful right up until they become mystery boxes. This guide shows how to use Kwipoo to organize bins around real retrieval needs, so holiday decor, backup supplies, hobby gear, and long-term storage stay easier to trust later.",
    image: {
      src: "/assets/placesFeatureAsset@2x.png",
      alt: "Kwipoo Places view showing organized storage locations and bins",
    },
    sections: [
      {
        heading: "Name bins for retrieval, not just for packing speed",
        summary:
          "A bin label should help future-you find something fast, not only help present-you finish a cleanup session.",
        paragraphs: [
          "Many storage systems break down because the bins were named in a rush. Labels like Misc, Extra Stuff, or Winter Closet make sense for about a week and then become useless. A better approach is to name bins by the question you will ask later, like Holiday Lights, Guest Bedding, Spare Toiletries, or Kids' Art Supplies.",
        ],
        bullets: [
          "Use clear bin names that describe what someone would reasonably expect to find inside.",
          "Avoid catch-all labels unless the contents are genuinely temporary.",
          "If a bin holds several related categories, label the broader purpose instead of listing every item on the outside.",
        ],
        callout: {
          tone: "tip",
          title: "Number the bins when names repeat",
          body: "If you have several bins for the same category, use simple names like Holiday Decor Bin 1 and Holiday Decor Bin 2 so the inventory stays easy to scan.",
        },
      },
      {
        heading:
          "Track the storage structure before the contents get complicated",
        summary:
          "It is usually easier to trust a bin system when the location map is clear first.",
        paragraphs: [
          "A bin inventory becomes much more useful when you know not only what the bin is called, but also where it actually lives. Kwipoo helps by separating the larger location from the specific storage spot, so you can keep track of attic shelves, garage racks, hall closets, or basement corners without relying on memory.",
        ],
        bullets: [
          "Create Places for the larger storage areas, such as garage, attic, basement, shed, or storage unit.",
          "Use Spots for the retrieval layer, like top shelf, left rack, back wall, or under guest bed.",
          "Assign bins to those real storage locations so the inventory answers both what and where.",
        ],
      },
      {
        heading: "Choose the right level of detail for each bin",
        summary:
          "Not every bin needs a full item-by-item breakdown, but the important ones usually need more than a vague label.",
        paragraphs: [
          "The right level of detail depends on how frustrating it would be to guess later. Some bins only need a clear label and location. Others are worth tracking more closely because they hold expensive items, seasonal essentials, paperwork, or supplies that get repurchased by mistake.",
        ],
        bullets: [
          "Track high-value, hard-to-replace, or frequently searched items individually when it will save time later.",
          "Use the bin itself as the practical storage location for grouped items that do not need separate tracking yet.",
          "Expand the detail only when a bin keeps causing confusion, duplicate purchases, or slow retrieval.",
        ],
      },
      {
        heading:
          "Keep seasonal and long-term storage visible after it disappears",
        summary:
          "The problem with packed-away storage is not only access. It is losing confidence that the right things are still there.",
        paragraphs: [
          "Off-season storage works because it gets things out of the way. It also creates distance between you and the memory of what you packed. Kwipoo helps keep that storage visible even when the bins are stacked high or tucked away for months at a time.",
        ],
        bullets: [
          "Use the same storage structure for holiday decor, winter gear, camping bins, backup household supplies, and archived keepsakes.",
          "Capture a few useful details for categories you revisit seasonally, such as quantity, size, condition, or missing pieces.",
          "Review the inventory before buying more of something you may already have stored away.",
        ],
      },
      {
        heading: "Update the record when bins get repacked, split, or moved",
        summary:
          "A storage inventory usually drifts when the containers change but the record does not.",
        paragraphs: [
          "Bins are rarely static. One overstuffed tote becomes two smaller ones. Holiday supplies move from the garage to a closet. A storage shelf gets reorganized. The inventory stays useful when those changes are treated as quick maintenance, not as a future project.",
        ],
        bullets: [
          "Rename or split bins in Kwipoo whenever the real-world container changes enough to affect retrieval.",
          "Update the Spot when a bin moves to a new shelf, room, or off-site location.",
          "Use room resets, seasonal swaps, and decluttering sessions as the natural time to clean up the storage map.",
        ],
      },
    ],
    relatedSlugs: [
      "track-what-you-own-across-home-storage-and-travel",
      "repeatable-packing-system-trips-camping-events",
      "stop-buying-duplicates-you-already-have-at-home",
    ],
  },
  {
    slug: "home-inventory-that-stays-updated",
    eyebrow: "Resource guide",
    audience: "Home organizers and households",
    format: "Guide",
    readTime: "8 min read",
    title: "Build a home inventory you can actually keep updated",
    summary:
      "Use Kwipoo to start a practical home inventory, organize it around real storage locations, and keep it useful without turning it into a side project.",
    description:
      "A home inventory only helps if you can trust it later. This guide shows how to build one in Kwipoo without trying to catalog your whole life in a weekend, so it stays useful for everyday storage, duplicate prevention, and future planning.",
    image: {
      src: "/assets/thingsFeatureAsset@2x.png",
      alt: "Kwipoo Things view showing a practical home inventory in progress",
    },
    sections: [
      {
        heading: "Start with the items that cause the most friction",
        summary:
          "The best first pass is not everything you own. It is the items that cost money, go missing, or get bought twice.",
        paragraphs: [
          "Most home inventories fail because they start as a massive cataloging project. That turns the setup into homework. A better starting point is the stuff you regularly search for, replace, borrow, or forget you already own. Once those items are visible, the system starts paying you back immediately.",
        ],
        bullets: [
          "Begin with household categories that create the most repeated friction, like tools, chargers, batteries, kitchen gear, cleaning supplies, kid gear, or seasonal storage.",
          "Add higher-value items early so you can capture details like cost, serial number, condition, or warranty information while it still feels worth the effort.",
          "Treat the first version as a working inventory, not a finished archive.",
        ],
        callout: {
          tone: "tip",
          title: "Start where you already feel the pain",
          body: "If one closet, garage shelf, or storage bin keeps wasting your time, inventory that first instead of trying to map your whole home at once.",
        },
      },
      {
        heading: "Organize around where things live in real life",
        summary:
          "A home inventory becomes easier to trust when it mirrors actual rooms, closets, bins, and shelves instead of a perfect abstract taxonomy.",
        paragraphs: [
          "When people cannot find something at home, the missing information is usually location, not category. Kwipoo works best when Places and Spots reflect the way your home actually works: pantry, hall closet, garage cabinet, guest room bin, basement shelf, and so on.",
        ],
        bullets: [
          "Set up Places for larger real-world locations like home, garage, attic, storage unit, or office.",
          "Use Spots for the practical retrieval layer, such as pantry shelf, entry drawer, tool chest, or closet bin.",
          "Name locations the way you would naturally describe them to another person in the house.",
        ],
      },
      {
        heading: "Keep the naming simple enough that future-you will use it",
        summary:
          "A system that feels slightly too simple is usually better than one that is too detailed to maintain.",
        paragraphs: [
          "The point of a home inventory is not to produce perfect metadata. It is to make searching, storing, and planning easier later. If the naming scheme is too elaborate, you will avoid updating it. Clear everyday labels win because they keep the system fast enough to use when you are in a hurry.",
        ],
        bullets: [
          "Use obvious category names like Tools, Backup Toiletries, Travel Gear, and Holiday Decor before inventing complicated hierarchies.",
          "Keep location names stable even if the exact contents change over time.",
          "Only add extra details when they help you make a real decision, like replacement cost, quantity, fit, or condition.",
        ],
      },
      {
        heading: "Build updates into the moments when things already move",
        summary:
          "Most people will not keep a separate inventory-maintenance habit. They will keep a lightweight update habit attached to existing routines.",
        paragraphs: [
          "You do not need to review your inventory every day. You need a few reliable moments to keep it current. The best times are when items are already moving: unpacking after a trip, resetting the house after a season change, putting away purchases, or reorganizing a storage area.",
        ],
        bullets: [
          "Update item locations when you put things away after travel, projects, or seasonal use.",
          "Do a small review when you restock household supplies or move things into long-term storage.",
          "Treat home cleanouts, moves, and room resets as natural checkpoints for improving the inventory instead of starting over.",
        ],
      },
      {
        heading: "Expand in layers once the system proves useful",
        summary:
          "A home inventory becomes durable when it grows from repeated wins, not from one large burst of effort.",
        paragraphs: [
          "Once you can quickly answer questions like where the spare charger is, whether you already own that tool, or what is in the winter-storage bin, the inventory starts feeling worth maintaining. That is the right time to expand into more rooms, more categories, or more detailed planning workflows.",
        ],
        bullets: [
          "Add the next room, zone, or storage category only after the current one feels easy to maintain.",
          "Use Sets when you want to group recurring household, travel, or hobby items together for faster prep.",
          "Use Events when a move, trip, or major reset needs a temporary checklist built from what you already own.",
        ],
      },
    ],
    relatedSlugs: [
      "organize-storage-bins-find-things-later",
      "repeatable-packing-system-trips-camping-events",
      "stop-buying-duplicates-you-already-have-at-home",
    ],
  },
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
      "stop-buying-duplicates-you-already-have-at-home",
      "track-what-you-own-across-home-storage-and-travel",
      "repeatable-packing-system-trips-camping-events",
    ],
  },
  {
    slug: "households-families-roommates",
    eyebrow: "Resource guide",
    audience: "Families, couples, and roommates",
    format: "Guide",
    readTime: "7 min read",
    title:
      "Build a household inventory system for couples, families, and roommates",
    summary:
      "Use Kwipoo to create a shared household inventory system so the people in the home can find essentials faster, avoid duplicate purchases, and keep storage easier to maintain.",
    description:
      "A household inventory system only works if the people in the home can actually trust it. This guide shows how to use Kwipoo to track shared items, organize storage, and reduce the friction that builds up when essentials move between rooms, bins, drawers, and the people who use them.",
    image: {
      src: "/assets/placesFeatureAsset@2x.png",
      alt: "Kwipoo Places view showing organized home storage locations",
    },
    sections: [
      {
        heading: "Start with the shared items people ask about most",
        summary:
          "A shared inventory system earns trust fastest when it answers the questions that come up over and over in the household.",
        paragraphs: [
          "If batteries vanish into drawers, tools migrate between rooms, or no one can remember where the extra lightbulbs went, the problem is usually not the number of items. It is that the household has no shared source of truth for what exists, where it lives, and who can count on finding it there.",
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
        heading: "Keep shared items from turning into repeated friction",
        summary:
          "Shared tools, chargers, appliances, and supplies are easier to manage when the system makes location and responsibility more visible.",
        paragraphs: [
          "A surprising amount of household frustration comes from items that everyone uses but no one tracks. Kwipoo helps households keep better tabs on what is shared, who has it, and what needs to be replaced or returned, so the system works for couples, families, and roommates instead of only for the most organized person in the house.",
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
    relatedSlugs: [
      "stop-buying-duplicates-you-already-have-at-home",
      "home-inventory-that-stays-updated",
      "organize-storage-bins-find-things-later",
    ],
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
    relatedSlugs: [
      "track-what-you-own-across-home-storage-and-travel",
      "repeatable-packing-system-trips-camping-events",
      "home-inventory-that-stays-updated",
    ],
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
