import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const eventsDocsPage = defineDocsPage({
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
        "Set whether the Event is solo or collaborative.",
        "Enter the required field: `Name`.",
        "Review the default start date, end date, and visibility values and change them if needed.",
        "Add optional `Description` and `Location` if they help.",
        "Save the Event so it appears in your list.",
      ],
    },
    createEntityFieldsSection({
      slug: "events",
      heading: "Fields for an Event",
    }),
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
});
