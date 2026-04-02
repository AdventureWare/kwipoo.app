import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { defineDocsPage } from "./helpers";

export const socialDocsPage = defineDocsPage({
  slug: "social",
  category: "Plan and collaborate",
  eyebrow: "Shared coordination",
  badge: FEATURE_BADGE_PRESETS.beta,
  title: "Coordinate through Social",
  summary:
    "Use Kwipoo's social features to find people, manage friends, review shared collections, respond to notifications, and coordinate through profile-based collaboration tools.",
  description:
    "In the current app, social features are spread across Profile, public profile pages, Notifications, Events, and Chat Center. Together they help you discover people, control what is shared, and coordinate around real inventory.",
  image: {
    src: "/assets/socialFeatureAsset@2x.png",
    alt: "Kwipoo Social feature showing shared inventory and collaboration",
  },
  sections: [
    {
      heading: "Why Use Social?",
      paragraphs: [
        "Kwipoo is not only a place to track your own Things. It also lets you connect inventory to real people. That makes the app more useful for coordination, inspiration, gift ideas, event planning, and deciding what already exists in your wider circle before you buy or duplicate something.",
      ],
      bullets: [
        "Shared discovery: Browse another person's visible Things, Sets, and Places when their privacy settings allow it.",
        "Faster coordination: Use friends, notifications, and Event collaboration together instead of tracking plans in isolation.",
        "Practical decision-making: Check what already exists in your network before buying, gifting, or packing.",
        "Context-aware communication: Keep event conversation and message review tied to the people and plans involved.",
      ],
    },
    {
      heading: "Where social features live",
      paragraphs: [
        "There is not a standalone Social tab in the current app. Most social actions start from your `Profile`, from another person's public profile page, or from collaboration surfaces like `Notifications`, `Events`, and `Chat Center`.",
      ],
      bullets: [
        "Profile: Open `Friends`, `Find Friends`, `Notifications`, `Chats`, and `Settings`.",
        "Public profiles: View another person's shared collections and friend-request state.",
        "Notifications: Review friend requests, event invites, and message alerts.",
        "Events and Chat Center: Continue group coordination after the connection already exists.",
      ],
    },
    {
      heading: "Find and add friends",
      subsections: [
        {
          heading: "Search for people",
          bullets: [
            "Open your `Profile`.",
            "Open `Find Friends`.",
            "Search by username or by first and last name.",
            "Enter at least a few characters so results can load.",
            "Use `View More Results` if the first result set is full and you need a broader list.",
            "Select a user to view their profile.",
          ],
        },
        {
          heading: "Send a friend request",
          bullets: [
            "Open the person's public profile page.",
            "Use `Send Friend Request` if you are not already connected.",
            "If a request is already pending, the page shows `Friend Request Pending` instead of another send action.",
            "If the account is private or Friends Only, you may need an accepted friendship before you can view their shared collections.",
          ],
        },
        {
          heading: "Respond to incoming friend requests",
          bullets: [
            "Open `Notifications` from your Profile header to review new requests.",
            "Friend-request notifications open a request card with the current details.",
            "If you open the sender's profile directly, a pending incoming request can show `Accept` and `Decline` actions there.",
          ],
        },
      ],
    },
    {
      heading: "Manage your friends list",
      paragraphs: [
        "Your own Profile summary includes a `Friends` button with the current count. That drawer is the main place to review and clean up your active connections.",
      ],
      bullets: [
        "Open `Friends` from your Profile.",
        "Search inside the list if you need to find one person quickly.",
        "Open a friend's username to jump to their public profile page.",
        "Use `Delete` next to a friend when you want to remove the connection.",
      ],
    },
    {
      heading: "View shared profiles and collections",
      subsections: [
        {
          heading: "When access is allowed",
          bullets: [
            "A visible profile can show the person's counts plus tabs for their shared `Things`, `Sets`, and `Places`.",
            "Friends can see content that is shared with `Friends Only` visibility.",
            "Public profiles can be discovered and viewed more broadly when the owner's privacy settings allow it.",
          ],
        },
        {
          heading: "When access is restricted",
          bullets: [
            "If the account is private, Kwipoo shows a locked-profile message instead of the collection tabs.",
            "If the user is not yet your friend, you may only see the friend-request controls and limited public information.",
            "Signed-out visitors can still land on public profiles, but the page prompts them to `Create Account / Log In` for deeper access.",
          ],
        },
      ],
    },
    {
      heading: "Use notifications for social activity",
      paragraphs: [
        "The bell icon on your Profile opens `Notifications`. In the current app, that feed is the main review surface for new social activity.",
      ],
      bullets: [
        "Unread counts appear on the Profile header bell.",
        "The feed can include friend requests, accepted friend requests, event invites, direct-message alerts, and event-message alerts.",
        "Use the check action in the header to mark all unread notifications as read.",
        "Individual notifications can open the relevant request or invite details before you respond.",
      ],
    },
    {
      heading: "Use Chat Center and event conversation",
      paragraphs: [
        "If chats are enabled for your account, your Profile header includes a chats shortcut that opens `Chat Center`.",
      ],
      bullets: [
        "Use `Chat Center` to review your existing conversations in one list.",
        "Search chats by name when the list gets longer.",
        "The chat list can include both direct conversations and event-based conversations.",
        "Group-event conversation is also reachable from the `Conversation` action inside Event details.",
      ],
      callout: {
        tone: "tip",
        title: "Chat follows existing relationships and plans",
        body: "The current app clearly exposes Chat Center and event conversation, but the visible shortcut for starting a brand-new direct chat from another person's profile is not currently surfaced in the public profile UI.",
      },
    },
    {
      heading: "Privacy and control",
      paragraphs: [
        "Profile privacy is the foundation for what other people can discover about you. Your profile setting works together with item-level visibility on Things, Sets, Places, Spots, and Events.",
      ],
      bullets: [
        "Public: Anyone can view your profile and visible items.",
        "Friends Only: Only your Kwipoo friends can see your profile and friend-shared content.",
        "Owner Only: Your profile is hidden from other people.",
        "Even with a public profile, individual inventory items can still be more restrictive.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Treat `Find Friends` as the starting point, but use public profiles and notifications to finish the connection flow.",
        "Keep your profile privacy aligned with how broadly you want your inventory to be discoverable.",
        "Review shared `Things`, `Sets`, and `Places` before trips, gifts, or purchases so you can make decisions with real context.",
        "Use Events when the collaboration is plan-specific and Chat Center when you need to continue the conversation later.",
      ],
    },
  ],
  relatedSlugs: ["events", "sets", "profile"],
});
