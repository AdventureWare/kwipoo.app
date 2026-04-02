import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { defineDocsPage } from "./helpers";

export const socialDocsPage = defineDocsPage({
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
});
