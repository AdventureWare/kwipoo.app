import {
  isFeatureEnabled,
  type FeatureFlagName,
} from "$lib/config/feature-flags";

export type SiteSectionId =
  | "home"
  | "pricing"
  | "docs"
  | "resources"
  | "releaseHistory"
  | "support"
  | "deleteDataForm"
  | "privacyPolicy"
  | "termsAndConditions";

export type SiteSectionPath =
  | "/"
  | "/pricing"
  | "/docs"
  | "/resources"
  | "/releases"
  | "/support"
  | "/delete-data-form"
  | "/privacy-policy"
  | "/terms-and-conditions";

export type SiteSectionSurface = "headerDesktop" | "headerMobile" | "footer";
export type SiteSectionDiscoverability = "indexable" | "reference";

export interface SiteSection {
  id: SiteSectionId;
  label: string;
  href: SiteSectionPath;
  featureFlag?: FeatureFlagName;
  surfaces?: SiteSectionSurface[];
  surfaceLabels?: Partial<Record<SiteSectionSurface, string>>;
  surfaceOrder?: Partial<Record<SiteSectionSurface, number>>;
  discoverability?: SiteSectionDiscoverability;
}

export const SITE_SECTIONS: SiteSection[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    surfaces: ["headerDesktop"],
    surfaceOrder: {
      headerDesktop: 0,
    },
    discoverability: "indexable",
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
    featureFlag: "pricing",
    surfaces: ["headerDesktop", "headerMobile", "footer"],
    surfaceOrder: {
      headerDesktop: 1,
      headerMobile: 0,
      footer: 1,
    },
  },
  {
    id: "docs",
    label: "Docs",
    href: "/docs",
    featureFlag: "docs",
    surfaces: ["headerDesktop", "headerMobile", "footer"],
    surfaceLabels: {
      footer: "Documentation",
    },
    surfaceOrder: {
      headerDesktop: 2,
      headerMobile: 1,
      footer: 2,
    },
    discoverability: "indexable",
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    featureFlag: "resources",
    surfaces: ["headerDesktop", "headerMobile", "footer"],
    surfaceOrder: {
      headerDesktop: 3,
      headerMobile: 2,
      footer: 3,
    },
    discoverability: "indexable",
  },
  {
    id: "releaseHistory",
    label: "Releases",
    href: "/releases",
    featureFlag: "releaseHistory",
    surfaces: ["headerDesktop", "headerMobile", "footer"],
    surfaceLabels: {
      footer: "Release History",
    },
    surfaceOrder: {
      headerDesktop: 4,
      headerMobile: 3,
      footer: 4,
    },
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    surfaces: ["footer"],
    surfaceOrder: {
      footer: 0,
    },
    discoverability: "indexable",
  },
  {
    id: "deleteDataForm",
    label: "Delete Data Request",
    href: "/delete-data-form",
    surfaces: ["footer"],
    surfaceOrder: {
      footer: 5,
    },
    discoverability: "indexable",
  },
  {
    id: "privacyPolicy",
    label: "Privacy Policy",
    href: "/privacy-policy",
    surfaces: ["footer"],
    surfaceOrder: {
      footer: 6,
    },
    discoverability: "reference",
  },
  {
    id: "termsAndConditions",
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
    surfaces: ["footer"],
    surfaceOrder: {
      footer: 7,
    },
    discoverability: "reference",
  },
];

export function getSiteSection(id: SiteSectionId): SiteSection {
  const section = SITE_SECTIONS.find((entry) => entry.id === id);

  if (!section) {
    throw new Error(`Unknown site section: ${id}`);
  }

  return section;
}

export function isSiteSectionEnabled(id: SiteSectionId): boolean {
  const section = getSiteSection(id);

  return section.featureFlag ? isFeatureEnabled(section.featureFlag) : true;
}

export function getSiteSectionsForSurface(
  surface: SiteSectionSurface,
): SiteSection[] {
  return [...SITE_SECTIONS]
    .filter(
      (section) =>
        section.surfaces?.includes(surface) && isSiteSectionEnabled(section.id),
    )
    .sort(
      (left, right) =>
        (left.surfaceOrder?.[surface] ?? Number.POSITIVE_INFINITY) -
        (right.surfaceOrder?.[surface] ?? Number.POSITIVE_INFINITY),
    );
}

export function getSiteLinksForSurface(
  surface: SiteSectionSurface,
): Array<Pick<SiteSection, "href" | "id"> & { label: string }> {
  return getSiteSectionsForSurface(surface).map((section) => ({
    id: section.id,
    href: section.href,
    label: section.surfaceLabels?.[surface] ?? section.label,
  }));
}

export function getSitePathsByDiscoverability(
  discoverability: SiteSectionDiscoverability,
): string[] {
  return SITE_SECTIONS.filter(
    (section) =>
      section.discoverability === discoverability &&
      isSiteSectionEnabled(section.id),
  ).map((section) => section.href);
}
