import { FEATURE_BADGE_PRESETS } from "$lib/types/feature-badges";
import { defineDocsPage } from "./helpers";

export const profileDocsPage = defineDocsPage({
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
          bullets: ["Use the gear icon in the top right of the Profile page."],
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
});
