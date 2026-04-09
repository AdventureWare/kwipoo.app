import { createEntityFieldsSection, defineDocsPage } from "./helpers";

export const placesDocsPage = defineDocsPage({
  slug: "places",
  category: "Track and organize",
  eyebrow: "Storage structure",
  title: "Organize with Places",
  summary:
    "Use Places for the broad locations where you keep things, such as home, office, garage, or storage.",
  description:
    "Places are the top level of Kwipoo's location model. They tell you the general home for an item before you narrow it down with Spots.",
  image: {
    src: "/assets/placesFeatureAsset@2x.png",
    alt: "Kwipoo Places feature showing organized storage locations",
  },
  sections: [
    {
      heading: "Why use Places?",
      paragraphs: [
        "A Place represents a real-world location where you keep Things, such as your home, office, garage, or storage unit. Places give you the broad location layer, while Spots handle the more precise shelf, drawer, bin, room, or compartment inside that place.",
      ],
      bullets: [
        "Location structure: Use Places for the top layer of your storage map.",
        "Flexible detail: Stay broad with a simple place list, or add Spots only where precision matters.",
        "Useful context: Save a photo, type, description, and address details when they help you recognize or revisit the place later.",
        "Sharing control: Set each Place to Public, Friends Only, or Owner Only based on how visible it should be.",
      ],
      callout: {
        tone: "tip",
        title: "Start broad, then add detail only where it pays off",
        body: "Most people do not need every room or shelf documented on day one. A clear Place plus one or two important Spots is often enough to start.",
      },
    },
    {
      heading: "Add a Place",
      bullets: [
        "Open `Places` from the main navigation.",
        "Use the primary `Add Place` action.",
        "Enter the required field: `Place Name`.",
        "Review the default `Type` and `Visibility` values and change them if needed.",
        "Add a photo if visual recognition will help.",
        "Add optional description and address details only if they add real value.",
        "Save the Place so it appears in your Places collection.",
      ],
    },
    createEntityFieldsSection({
      slug: "places",
      heading: "Fields for a Place",
      paragraphs: [
        "Only `Place Name` is required. Type and visibility start with defaults, and address fields are optional. The form also supports an optional place photo for quicker visual recognition.",
      ],
    }),
    {
      heading: "Use Places to hold Spots",
      paragraphs: [
        "Open a Place to review its summary and manage the Spots inside it. This is where Places become more than a flat list and start acting as the container for your actual storage structure.",
      ],
      bullets: [
        "Use `Add Spot` from the Place detail view when you want more precision inside that place.",
        "If the Place is simple, you can stop at one or two spots instead of mapping everything.",
        "Each Spot can then hold the Things assigned to that exact location.",
      ],
    },
    {
      heading: "View, edit, and delete Places",
      paragraphs: [
        "Select a Place card to open its detail view. That screen shows the place photo, type, address, description, and current Spots.",
      ],
      bullets: [
        "Use the pencil action in the Place detail view to edit the Place.",
        "Use the trash action to delete a Place you no longer need.",
        "Deleting a Place also removes its Spots, so use that action carefully.",
        "Shared editable Places can still be opened and updated, but photo changes are currently limited for shared-place edits.",
      ],
    },
    {
      heading: "Privacy and visibility",
      bullets: [
        "Public: Anyone can see this Place if your profile is public.",
        "Friends Only: Only your Kwipoo friends can view this Place.",
        "Owner Only: The Place is visible only to you.",
      ],
    },
    {
      heading: "Pro tips",
      bullets: [
        "Use Place names that match how you already think, such as Home, Garage, Office, or Storage Unit.",
        "Add a photo when the place is easier to recognize visually than by text alone.",
        "Only fill in address fields for places you may need to revisit, compare, or share later.",
        "Add Spots where the broad place is still too vague to answer where something lives.",
        "Review Place names and Spot structure occasionally so the storage map stays natural.",
      ],
    },
  ],
  relatedSlugs: ["spots", "things", "getting-started"],
});
