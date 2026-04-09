import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const eventsDocsPage = defineDocsPage({
  slug: "events",
  category: "Plan and collaborate",
  eyebrow: "Upcoming plans",
  badge: FEATURE_BADGE_PRESETS.beta,
  title: "Prepare for Events",
  summary:
    "Use Events to plan trips, projects, moves, and shared activities with item lists, packing views, invites, and weight tracking.",
  description:
    "Events connect your inventory to a specific plan. They give you a place to build lists, assign items, review packing status, and coordinate with other people when needed.",
  image: {
    src: "/assets/eventsFeatureAsset@2x.png",
    alt: "Kwipoo Events feature showing trip and event planning tools",
  },
  sections: [
    {
      heading: "Why Use Events?",
      paragraphs: [
        "An Event in Kwipoo is more than a date on a calendar. It is a planning workspace tied to real Things in your inventory. Whether you are packing for a solo trip, coordinating a group outing, preparing for a move, or organizing a project, Events help you decide what belongs, who is bringing it, and what is already packed.",
      ],
      bullets: [
        "Task-focused planning: Build an Event around what you need for one specific plan.",
        "Solo or collaborative: Start with a solo Event or use a group Event with invites and shared coordination.",
        "Structured lists: Organize the Event with categories, direct assignments, or both.",
        "Practical packing: Review assigned Things by Spot and mark them packed as you go.",
      ],
    },
    {
      heading: "Add an Event",
      bullets: [
        "Open `Events` from the main navigation.",
        "Use `Add Event`.",
        "When creating a new Event, choose whether `Is this a Solo event?` should be on or off.",
        "Enter the required field: `Name`.",
        "Add optional `Description` and `Location` if they help.",
        "Review `Start Date`, `End Date`, and `Visibility` before saving.",
        "Save the Event so it appears in your Events list.",
      ],
    },
    {
      heading: "Browse and open Events",
      paragraphs: [
        "The main `Events` screen shows your Event cards grouped by month. From there you can open individual Event detail views, jump into invites, or reveal older Events when needed.",
      ],
      bullets: [
        "Use `Invites` from the Events page to review event invitations.",
        "Use `Show Past Events` when you want to include older Events in the list.",
        "Tap an Event card to open its detail drawer.",
      ],
    },
    createEntityFieldsSection({
      slug: "events",
      heading: "Fields for an Event",
      paragraphs: [
        "Only `Name` is required. `Description`, `Location`, `Start Date`, `End Date`, and `Visibility` are optional or adjustable, and the solo-versus-group choice is made when you first create the Event.",
      ],
    }),
    {
      heading: "Choose solo or group planning",
      subsections: [
        {
          heading: "Solo Events",
          bullets: [
            "A solo Event uses your personal list as the main planning list.",
            "This is the simplest setup when you are planning only for yourself.",
          ],
        },
        {
          heading: "Group Events",
          bullets: [
            "A group Event can include a shared `Group List` plus optional personal lists for attendees.",
            "Use `Send Invites` from the Event menu to bring other people into the Event.",
            "If you are an invited attendee instead of the creator, the Event menu can show `View Invite` for that Event.",
          ],
        },
        {
          heading: "Personal lists inside group Events",
          bullets: [
            "Open the Event menu and use `Add Personal List` if you want a separate personal planning tab.",
            "Use `Remove Personal List` from the same menu if you no longer need it.",
            "When both lists exist, switch between `Personal List` and `Group List` tabs in the Event detail view.",
          ],
        },
      ],
    },
    {
      heading: "Build the Event lists",
      paragraphs: [
        "The current Event detail workflow is category-driven, similar to Sets. Categories act as sections inside the active list so you can group related Things instead of managing one long flat list.",
      ],
      bullets: [
        "Use `Add Category` inside the active list tab to create a new section.",
        "Categories can represent whatever makes the Event easier to scan, such as Shelter, Food, Clothing, Tools, or Paperwork.",
        "If a list has no categories yet, you can still assign Things directly from the Event menu.",
      ],
    },
    {
      heading: "Assign Things to an Event",
      subsections: [
        {
          heading: "Assign to the active list",
          bullets: [
            "Open the Event detail view.",
            "Switch to the list you want to work in if both `Personal List` and `Group List` are available.",
            "Open the Event menu and use `Assign Thing(s)`.",
            "Select the Things you want to assign to that list and confirm.",
          ],
        },
        {
          heading: "Assign to a specific category",
          bullets: [
            "Open the target category row inside the Event list.",
            "Use `Assign Thing(s)` for that category.",
            "Select the Things that belong in that section and confirm the assignment.",
            "New Things created from that flow inherit the category context automatically.",
          ],
        },
      ],
      callout: {
        tone: "tip",
        title: "The active tab controls the top-level assignment target",
        body: "If you use `Assign Thing(s)` from the Event menu, Kwipoo assigns into whichever list tab is currently active.",
      },
    },
    {
      heading: "Use the Packing List",
      bullets: [
        "Open the Event menu and use `Packing List`.",
        "Switch between `Grid View` and `List View` depending on how you want to review the items.",
        "Kwipoo groups the packing list by each Thing's current Spot so you can collect items from their real locations.",
        "Use the checkboxes to mark assigned Things as packed.",
      ],
    },
    {
      heading: "Review weights, attendees, and conversation",
      paragraphs: [
        "Each Event detail view includes supporting information beyond the list itself so you can track the plan at a glance.",
      ],
      bullets: [
        "Weights: The `Weights` section shows `Personal Weight`, and for group Events it also shows `Group Weight`.",
        "Event Details: The info section can show the Event location, organizers, and attendee previews.",
        "Attendees: Group Events include a `View All` action for the attendee list.",
        "Conversation: Group Events include a conversation shortcut from the detail view.",
      ],
    },
    {
      heading: "Edit and manage Events",
      paragraphs: [
        "The Event detail screen includes an `Edit Mode` toggle inside the Event menu. That mode exposes the current cleanup and maintenance controls for the Event and its lists.",
      ],
      bullets: [
        "Turn on `Edit Mode` when you want to edit or delete categories, remove assigned Things, or expose event-level edit controls.",
        "Admins can edit the Event itself with the pencil action and delete it with the trash action.",
        "Group-list cleanup permissions depend on your role or on who created the category or assignment.",
        "Deleting an Event removes the Event record and its planning structure, but it does not delete the Things in your inventory.",
      ],
    },
    {
      heading: "Privacy and visibility",
      bullets: [
        "Public: Anyone can see the Event if your profile is public.",
        "Friends Only: Only your Kwipoo friends can see the Event.",
        "Owner Only: The Event is visible only to you.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Use solo Events when you just need a clean packing plan without collaboration overhead.",
        "Use group Events early so shared assignments and invite coordination happen before the last-minute rush.",
        "Keep category names practical and short so the list remains easy to scan on mobile.",
        "Check the packing list by Spot before you leave so retrieval matches where the Things actually live.",
      ],
    },
  ],
  relatedSlugs: ["sets", "things", "social"],
});
