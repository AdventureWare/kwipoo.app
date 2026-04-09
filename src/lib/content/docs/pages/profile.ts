import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { defineDocsPage } from "./helpers";

export const profileDocsPage = defineDocsPage({
  slug: "profile",
  category: "Start here",
  eyebrow: "Personal setup",
  badge: FEATURE_BADGE_PRESETS.beta,
  title: "Manage your Profile",
  summary:
    "Use your Profile to update account details, review your collections, manage privacy, and reach social activity, notifications, chats, and settings.",
  description:
    "Profile is the main account hub in Kwipoo. It brings together your public profile, collection shortcuts, social activity, and the settings used to manage your account.",
  image: {
    src: "/assets/householdProfile@2x.png",
    alt: "Kwipoo profile view showing personal setup options",
  },
  sections: [
    {
      heading: "Why use Profile?",
      paragraphs: [
        "Profile is where your account comes together. It shows how you appear to other people, gives you a quick view of what you have added, and acts as the starting point for friends, notifications, chats, and settings.",
      ],
      bullets: [
        "Identity and presentation: Keep your profile photo, bio, and account details current.",
        "Collection overview: Review your Things, Sets, and Places from one familiar screen.",
        "Social control center: Open Friends, Find Friends, Notifications, and Chats from Profile.",
        "Settings hub: Manage privacy, defaults, account actions, updates, and support links.",
      ],
    },
    {
      heading: "What's on your Profile?",
      paragraphs: [
        "The main Profile screen combines a summary area at the top with collection tabs below it.",
      ],
      bullets: [
        "Profile summary: Your avatar, display identity, and optional bio.",
        "Counts: A quick total for `Things`, `Sets`, and `Places`.",
        "Social buttons: `Friends` with the current count and `Find Friends`.",
        "Header actions: `Notifications`, `Chats` when enabled, and `Settings`.",
        "Collection tabs: Switch between your current `Things`, `Sets`, and `Places` lists.",
      ],
    },
    {
      heading: "Edit your visible profile",
      paragraphs: [
        "Use the pencil action next to your avatar when you want to change how your profile appears to other people.",
      ],
      bullets: [
        "Update your `Profile photo` using the image uploader.",
        "Edit your `Bio` in the same drawer.",
        "Save with `Update` when you are finished.",
      ],
      callout: {
        tone: "tip",
        title: "Profile editing is separate from account settings",
        body: "The avatar pencil edits your public-facing profile details, while the gear icon opens account, privacy, defaults, and support settings.",
      },
    },
    {
      heading: "Review your collections from Profile",
      paragraphs: [
        "Your Profile is also the fastest way to browse the inventory you have already added without leaving your personal account area.",
      ],
      bullets: [
        "Use the tabs below the summary to switch between `Things`, `Sets`, and `Places`.",
        "The counts at the top help you sanity-check whether your inventory is growing the way you expect.",
        "Profile stays useful even when you are mainly there for social or settings tasks, because your collections remain one tap away.",
      ],
    },
    {
      heading: "Use the header actions",
      paragraphs: [
        "The Profile header contains the main shortcuts for account activity outside the collection tabs.",
      ],
      bullets: [
        "Notifications: Open the bell icon to review friend requests, event invites, and message alerts.",
        "Chats: If chats are enabled for your account, use the chats icon to open `Chat Center`.",
        "Settings: Use the gear icon to open the full settings list.",
      ],
    },
    {
      heading: "Open Settings",
      paragraphs: [
        "The `Settings` screen is organized into clear sections so account management stays predictable.",
      ],
      subsections: [
        {
          heading: "Preferences",
          bullets: [
            "`Account`: Personal Information, Username, Email, Password, and Delete Account.",
            "`Privacy`: Your profile-level visibility controls.",
            "`Defaults`: Your default weight unit for future item entry.",
          ],
        },
        {
          heading: "Updates",
          bullets: [
            "`What's New`: Open the current release notes from Settings.",
            "The installed app version is also shown at the bottom of the Settings screen.",
          ],
        },
        {
          heading: "Support and user actions",
          bullets: [
            "`Contact Us`: Reach the team by email or Discord.",
            "`Report a Problem`: Send a bug report with reproduction details.",
            "`Terms and Conditions` and `Privacy Policy`: Open the public website copies.",
            "`Log Out`: Sign out from the `User` section.",
          ],
        },
      ],
    },
    {
      heading: "Manage account details",
      paragraphs: [
        "The `Account` area inside Settings breaks account maintenance into focused screens instead of one long form.",
      ],
      subsections: [
        {
          heading: "Personal Information",
          bullets: [
            "Use `Personal Information` to update `First Name` and `Last Name`.",
            "The current screen requires `First Name` and keeps `Last Name` optional.",
          ],
        },
        {
          heading: "Username, email, and password",
          bullets: [
            "Use `Username` to change the name other people use to find you.",
            "Use `Email` to enter a new account email. Kwipoo sends a confirmation email to that address.",
            "Use `Password` to request a password reset link for the email already tied to your account.",
          ],
        },
        {
          heading: "Delete Account",
          bullets: [
            "Use `Delete Account` only when you want permanent removal.",
            "The app warns that deleting your account is permanent and removes all of your data.",
          ],
        },
      ],
    },
    {
      heading: "Manage privacy and defaults",
      paragraphs: [
        "Profile-level privacy affects how discoverable you are across Kwipoo, while defaults reduce repetitive setup when you add inventory.",
      ],
      subsections: [
        {
          heading: "Privacy",
          bullets: [
            "Use the `Privacy` settings screen to choose your profile visibility.",
            "Public: Anyone can view your profile and visible content.",
            "Friends Only: Only your Kwipoo friends can see your profile and friend-shared content.",
            "Owner Only: Your profile is hidden from other people.",
            "Even with a public profile, specific Things, Sets, Places, Spots, and Events can still be more restrictive.",
          ],
        },
        {
          heading: "Defaults",
          bullets: [
            "Use `Defaults` to choose your `Default Weight Unit`.",
            "That unit becomes the default when you create new items and review weight totals.",
          ],
        },
      ],
    },
    {
      heading: "Get help and stay current",
      bullets: [
        "Use `Contact Us` when you want direct support from the Kwipoo team.",
        "Use `Report a Problem` when you want to share reproduction details for a bug or issue.",
        "Include context like what you were doing, any error message, your device, and your browser or app version.",
        "Use `What's New` from Settings to review release notes when a new version is available.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Treat Profile as your personal home base: identity, inventory overview, social shortcuts, and settings all start here.",
        "Use the avatar pencil for presentation changes and the gear icon for account maintenance so you do not hunt through the wrong surface.",
        "Keep privacy and your public-facing profile aligned with how discoverable you want to be in the social features.",
        "Review `What's New` from Settings after updates so new workflows are easier to spot.",
      ],
    },
  ],
  relatedSlugs: ["getting-started", "social", "things"],
});
