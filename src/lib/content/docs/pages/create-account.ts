import { defineDocsPage } from "./helpers";

export const createAccountDocsPage = defineDocsPage({
  slug: "create-account",
  category: "Start here",
  eyebrow: "Account access",
  title: "Create your account",
  summary:
    "Create a Kwipoo account with email, Google, or Apple, confirm access if needed, and understand what the first session looks like.",
  description:
    "This guide covers the available sign-in methods, the confirmation step for email accounts, and what happens when you enter Kwipoo for the first time.",
  image: {
    src: "/assets/householdProfile@2x.png",
    alt: "Kwipoo account and profile setup view",
  },
  sections: [
    {
      heading: "Choose your signup method",
      summary:
        "Kwipoo supports a standard email flow plus provider-based sign-in.",
      bullets: [
        "Use `Create Account` on the login page if you want to sign up with email and password.",
        "Use `Continue with Google` or `Continue with Apple` if you prefer a provider-based account.",
        "When you come back later, sign in with the same method you used to create the account.",
      ],
      callout: {
        tone: "note",
        title: "Email signup needs confirmation",
        body: "Email-and-password accounts do not start an active session immediately. Kwipoo sends a confirmation email first, then lets you finish signing in from that link.",
      },
    },
    {
      heading: "Create an account with email",
      paragraphs: [
        "If you choose the email flow, Kwipoo asks for an email address and a password with at least six characters. After you submit the form, the app creates the account and sends a confirmation message before your first full login.",
      ],
      bullets: [
        "Open the login page and switch to `Create your account`.",
        "Enter your email address and password.",
        "Submit the form, then check your inbox for the confirmation email.",
        "If the message does not appear right away, check spam or Promotions.",
      ],
      example: {
        title: "What to expect after signup",
        summary:
          "The confirmation screen appears right away so you know the account was created successfully.",
        steps: [
          "Submit the signup form.",
          "Look for the `Check your email` confirmation screen.",
          "Open the message and use the confirmation link to finish the first sign-in.",
        ],
      },
    },
    {
      heading: "Finish your first sign-in",
      paragraphs: [
        "After the confirmation step, Kwipoo sends new accounts into the welcome flow. That first-run screen teaches the core model in the same order the app expects you to use it: `Places`, then `Spots`, then `Things`.",
        "The goal of that first session is not to catalog everything. The app is designed to get you to one useful real-world path quickly so you can answer where an item lives without guessing.",
      ],
      bullets: [
        "Start with one broad place such as `Home`, `Garage`, or `Office`.",
        "Add a spot inside that place only when extra precision will help.",
        "Add your first Thing once the location structure exists.",
      ],
    },
    {
      heading: "Complete the basic profile details",
      paragraphs: [
        "Once your account is active, add the basic identity details that make the rest of the app easier to use and easier to share safely with other people.",
      ],
      bullets: [
        "Add your first name.",
        "Add a last name if you want one saved on the account.",
        "Choose a username.",
        "Set your profile privacy preference.",
        "Review or update those details later from Profile settings.",
      ],
    },
    {
      heading: "If you need help getting back in",
      paragraphs: [
        "Use the normal login mode for returning sessions, and use the password reset flow only if you created the account with email and no longer know the password.",
      ],
      bullets: [
        "Use `Log In` for existing email, Google, or Apple accounts.",
        "Use `Forgot your password?` from the login screen to request an email reset link.",
        "Provider-based accounts should continue through the same provider instead of resetting an email password.",
      ],
    },
  ],
  relatedSlugs: ["getting-started", "profile", "things"],
});
