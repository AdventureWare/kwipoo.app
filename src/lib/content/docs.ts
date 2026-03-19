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

export interface DocsSection {
  heading: string;
  summary?: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: DocsCallout;
  codeSample?: DocsCodeSample;
  example?: DocsExample;
}

export interface DocsPage {
  slug: string;
  category: DocsCategory;
  eyebrow: string;
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
  }>;
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
          "Once you have a few Things in Kwipoo, create the Places and Spots that match how you think about storage in real life. That gives every item a clear home instead of leaving it in a vague list.",
        ],
        bullets: [
          "Add your most-used or most-often-misplaced items first.",
          "Create Places for the major locations you store things.",
          "Use Spots to narrow a Place down to a room, bin, shelf, or drawer.",
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
      "Create a searchable inventory so you know what you own, where it is, and the details you will need later.",
    description:
      "Things are the items you want to keep track of in Kwipoo. They are the foundation of your inventory and connect to the rest of the app.",
    image: {
      src: "/assets/thingsFeatureAsset@2x.png",
      alt: "Kwipoo Things feature showing an organized list of items",
    },
    sections: [
      {
        heading: "What Things are for",
        summary:
          "Things are the core units of your inventory, so naming and structure matter more than quantity at first.",
        paragraphs: [
          "A Thing represents a specific item you own and want to keep track of. Use it for everyday essentials, hobby gear, packed-away storage, or anything else you do not want to lose track of.",
          "The goal is to make your inventory searchable and reliable so you can answer simple questions quickly: Do I already own this? Where is it? Which one is the right one?",
        ],
        callout: {
          tone: "note",
          title: "Think retrieval first",
          body: "If a future version of you cannot search for the item using the words you chose today, the entry will not be doing enough work.",
        },
      },
      {
        heading: "Capture the details that matter",
        summary:
          "Store the details you will realistically need later rather than trying to build a perfect catalog all at once.",
        paragraphs: [
          "Kwipoo can be most useful when you store the details you are likely to need later, especially for repairs, replacements, upgrades, resale, or insurance-related reference.",
        ],
        bullets: [
          "Use names that are easy to search.",
          "Save identifying details like models or serial information when they matter.",
          "Assign each Thing to the Place or Spot where it usually lives.",
        ],
        codeSample: {
          label: "A searchable Thing entry",
          language: "text",
          code: `Thing name: Fuji X-T30 camera
Place: Home
Spot: Office cabinet
Notes: Extra battery in side pocket
Reference: Serial + charger type`,
        },
      },
      {
        heading: "Connect Things to the rest of Kwipoo",
        summary:
          "A well-defined Thing becomes more valuable once it participates in the rest of your system.",
        paragraphs: [
          "Things become even more useful when they are connected to your broader setup. Once an item has a home and a clear name, it is easier to group into Sets, prepare for Events, and coordinate with other people.",
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
      "Use Places for your major real-world locations so you can organize by where items are actually kept.",
    description:
      "Places help you structure inventory around the broad locations that make sense in real life, like home, a storage unit, an office, or another shared space.",
    image: {
      src: "/assets/placesFeatureAsset@2x.png",
      alt: "Kwipoo Places feature showing organized storage locations",
    },
    sections: [
      {
        heading: "Start broad, not microscopic",
        paragraphs: [
          "A Place should represent a meaningful location, not every tiny storage detail. Think of Places as the top-level structure that helps you answer where something lives before you get more specific.",
        ],
        bullets: [
          "Use a Place for each major location you manage.",
          "Keep names obvious so anyone using the system can understand them.",
          "Let Spots handle the finer-grained detail inside a Place.",
        ],
      },
      {
        heading: "Use Places to reduce search time",
        paragraphs: [
          "Once your inventory is split across clear Places, it becomes much easier to narrow a search. Instead of checking everywhere, you can immediately focus on the correct home base for the item.",
        ],
      },
      {
        heading: "Keep the structure maintainable",
        paragraphs: [
          "The best Place structure is one you can keep up with. If the setup feels too complicated to maintain, simplify it before adding more layers.",
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
      "Use Spots to record the exact storage position of an item within a Place, down to the shelf, box, or drawer.",
    description:
      "Spots make it easier to find items quickly because they narrow a broad location into the exact place you should look first.",
    image: {
      src: "/assets/spotsFeatureAsset@2x.png",
      alt: "Kwipoo Spots feature showing detailed storage locations",
    },
    sections: [
      {
        heading: "Go from general to exact",
        paragraphs: [
          'If Places tell you the larger location, Spots tell you the exact storage target. This helps you move from "it is somewhere in the basement" to "it is in the camping bin on the back shelf."',
        ],
      },
      {
        heading: "Use Spots where precision saves time",
        paragraphs: [
          "Not every item needs a detailed Spot, but they are especially useful when you store gear in containers, closets, drawers, or shelving systems where things are easy to overlook.",
        ],
        bullets: [
          "Use clear labels that match how you would describe the location out loud.",
          "Reserve Spots for the storage details that actually help you retrieve things faster.",
          "Update the Spot when an item gets moved so your inventory stays trustworthy.",
        ],
      },
      {
        heading: "Pair Spots with consistent storage habits",
        paragraphs: [
          "The more consistently you put things back in the same Spot, the more value Kwipoo can provide. A clear structure is only useful when it still matches reality.",
        ],
      },
    ],
    relatedSlugs: ["places", "things", "events"],
  },
  {
    slug: "sets",
    category: "Plan and collaborate",
    eyebrow: "Reusable groups",
    title: "Pack faster with Sets",
    summary:
      "Group related items into reusable Sets so you can prepare for routines, hobbies, and trips without rebuilding the same list each time.",
    description:
      "Sets are useful when the same gear belongs together repeatedly. They reduce the work of remembering every item from scratch.",
    image: {
      src: "/assets/backpack@2x.png",
      alt: "Kwipoo Sets feature showing grouped travel or hobby gear",
    },
    sections: [
      {
        heading: "Think in repeatable kits",
        summary:
          "Sets work best when they represent a repeatable scenario instead of a one-off packing list.",
        paragraphs: [
          "A Set is a reusable group of Things that belong together for a purpose. This could be a travel kit, a hobby loadout, a volunteer setup, or anything else you use repeatedly.",
        ],
      },
      {
        heading: "Use Sets to simplify preparation",
        summary:
          "The point of a Set is to reduce mental overhead before the next outing, trip, or project.",
        paragraphs: [
          "Instead of remembering every single item each time, you can rely on a Set as your starting point. That helps reduce last-minute stress and lowers the chance of forgetting something important.",
        ],
        bullets: [
          "Build Sets around recurring activities rather than one-off situations.",
          "Keep Set names tied to the routine they support.",
          "Refine Sets after each use so the next round is easier.",
        ],
        example: {
          title: "Expand a reusable travel Set",
          summary:
            "Open this example to see how a Set turns a recurring plan into a reusable checklist.",
          steps: [
            "Create a Set for the trip type, such as Weekend Camping.",
            "Add the Things you nearly always bring for that activity.",
            "Review the Set after the trip and adjust it while the experience is fresh.",
          ],
        },
      },
      {
        heading: "Connect Sets to planning",
        paragraphs: [
          "Sets work especially well alongside Events. Once you know the kind of gear that usually travels together, it becomes easier to plan for a specific upcoming trip or project.",
        ],
      },
    ],
    relatedSlugs: ["events", "things", "getting-started"],
  },
  {
    slug: "events",
    category: "Plan and collaborate",
    eyebrow: "Upcoming plans",
    title: "Prepare for Events",
    summary:
      "Use Events to organize what you need for upcoming trips, projects, and shared plans so you can see what is ready and what still needs attention.",
    description:
      "Events give structure to time-bound planning. They help you connect inventory to a real upcoming moment instead of keeping everything in a generic list.",
    image: {
      src: "/assets/eventsFeatureAsset@2x.png",
      alt: "Kwipoo Events feature showing trip and event planning tools",
    },
    sections: [
      {
        heading: "Plan around a real date or activity",
        paragraphs: [
          "Events are useful when you are getting ready for a trip, an outing, a project, or another moment where specific gear matters. They help you see what belongs to the plan and what still needs to be handled.",
        ],
      },
      {
        heading: "Reduce last-minute scrambling",
        paragraphs: [
          "When your items and Sets are already organized, Events help you pull the right pieces together and keep preparation visible. That makes it easier to check readiness before it is time to leave or begin.",
        ],
        bullets: [
          "Start with relevant Sets or Things.",
          "Review what is missing while there is still time to adjust.",
          "Use past planning patterns to make future preparation faster.",
        ],
      },
      {
        heading: "Use Events as a decision tool",
        paragraphs: [
          "The value of an Event is not just keeping a list. It is giving you a clearer picture of what is already covered, what is still needed, and where the plan might break down.",
        ],
      },
    ],
    relatedSlugs: ["sets", "things", "social"],
  },
  {
    slug: "social",
    category: "Plan and collaborate",
    eyebrow: "Shared coordination",
    title: "Coordinate through Social",
    summary:
      "Use Kwipoo's social features to see what other people have, coordinate shared needs, and avoid unnecessary duplicate purchases.",
    description:
      "Social features support situations where planning is easier together, especially when people can borrow, lend, or divide responsibilities across a group.",
    image: {
      src: "/assets/socialFeatureAsset@2x.png",
      alt: "Kwipoo Social feature showing shared inventory and collaboration",
    },
    sections: [
      {
        heading: "See what is already covered",
        paragraphs: [
          "When people coordinate gear or supplies together, the first question is often whether someone already has the needed item. Social features help reduce guesswork and duplicate buying by making that answer easier to find.",
        ],
      },
      {
        heading: "Use Social when planning as a group",
        paragraphs: [
          "Shared visibility can be especially helpful for group trips, family logistics, hobby communities, or any other workflow where people routinely share responsibility for bringing the right things.",
        ],
        bullets: [
          "Use shared awareness to avoid duplicate purchases.",
          "Coordinate who has what before the plan is underway.",
          "Treat Social as a support layer on top of a clear personal inventory.",
        ],
      },
      {
        heading: "Keep your own structure strong",
        paragraphs: [
          "Social works best when your own Things, Places, and Sets are already clear. A reliable personal system makes collaboration easier because you know what you actually have and where it is.",
        ],
      },
    ],
    relatedSlugs: ["events", "sets", "profile"],
  },
  {
    slug: "profile",
    category: "Start here",
    eyebrow: "Personal setup",
    title: "Manage your Profile",
    summary:
      "Adjust the settings and preferences that shape how your inventory works for you, including privacy and personal organization choices.",
    description:
      "Profile features help you tailor Kwipoo to your own habits so the app fits your lifestyle instead of forcing you into someone else's system.",
    image: {
      src: "/assets/householdProfile@2x.png",
      alt: "Kwipoo profile view showing personal setup options",
    },
    sections: [
      {
        heading: "Make the app feel personal",
        paragraphs: [
          "Profile settings are where you define how you want Kwipoo to support your inventory and planning habits. This is also where privacy-related choices can shape how visible your information is to others.",
        ],
      },
      {
        heading: "Keep your setup aligned with real life",
        paragraphs: [
          "As your inventory grows, revisit your preferences to make sure your account still matches how you organize, share, and plan. Small adjustments can keep the app easier to use over time.",
        ],
        bullets: [
          "Review privacy-related choices as your use of the app changes.",
          "Update your setup when your storage patterns or routines change.",
          "Use Profile controls to keep Kwipoo aligned with your comfort level.",
        ],
      },
      {
        heading: "Support future documentation growth",
        paragraphs: [
          "Profile is also a useful place for future docs to expand into settings-specific guidance, account management help, and more detailed how-to references.",
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
      })),
    },
  ];
}

export function getDocsPageLabel(slug: string): string {
  return (
    docsFeatureNavItems.find((item) => item.slug === slug)?.label ??
    getDocsPage(slug)?.title ??
    "Documentation"
  );
}

export function getDocsPlaceholderSummary(title: string): string {
  return `Placeholder introduction for ${title}. This page is where the section-specific documentation for ${title.toLowerCase()} will live.`;
}

export function getDocsPlaceholderSections(title: string): DocsSection[] {
  return [
    {
      heading: `${title} Overview`,
      paragraphs: [
        `${title} overview placeholder. Use this section for a short explanation of what this part of the product does and when someone should use it.`,
      ],
    },
    {
      heading: `Using ${title}`,
      paragraphs: [
        `Usage placeholder for ${title}. This area can later hold the main instructions, workflows, or feature details people need in order to use ${title.toLowerCase()} confidently.`,
      ],
      bullets: [
        "Placeholder point for the primary workflow.",
        "Placeholder point for important behavior or context.",
        "Placeholder point for future screenshots or examples.",
      ],
    },
    {
      heading: `${title} Reference`,
      paragraphs: [
        `Reference placeholder for ${title}. This section can later hold edge cases, FAQs, screenshots, or any additional notes that belong on this page.`,
      ],
    },
  ];
}

export function getRelatedDocsPages(docPage: DocsPage): DocsPage[] {
  return docPage.relatedSlugs
    .map((slug) => getDocsPage(slug))
    .filter((page): page is DocsPage => Boolean(page));
}
