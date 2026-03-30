import { describe, expect, it } from "vitest";
import { FEATURE_FLAGS } from "$lib/config/feature-flags";
import {
  getSiteLinksForSurface,
  getSitePathsByDiscoverability,
  isSiteSectionEnabled,
} from "$lib/site-sections";

describe("site sections", () => {
  it("builds header navigation from the shared section registry", () => {
    expect(getSiteLinksForSurface("headerDesktop")).toEqual([
      { id: "home", href: "/", label: "Home" },
      ...(FEATURE_FLAGS.pricing
        ? [{ id: "pricing", href: "/pricing", label: "Pricing" }]
        : []),
      ...(FEATURE_FLAGS.docs
        ? [{ id: "docs", href: "/docs", label: "Docs" }]
        : []),
      ...(FEATURE_FLAGS.resources
        ? [{ id: "resources", href: "/resources", label: "Resources" }]
        : []),
      ...(FEATURE_FLAGS.releaseHistory
        ? [{ id: "releaseHistory", href: "/releases", label: "Releases" }]
        : []),
    ]);

    expect(getSiteLinksForSurface("headerMobile")).toEqual([
      ...(FEATURE_FLAGS.pricing
        ? [{ id: "pricing", href: "/pricing", label: "Pricing" }]
        : []),
      ...(FEATURE_FLAGS.docs
        ? [{ id: "docs", href: "/docs", label: "Docs" }]
        : []),
      ...(FEATURE_FLAGS.resources
        ? [{ id: "resources", href: "/resources", label: "Resources" }]
        : []),
      ...(FEATURE_FLAGS.releaseHistory
        ? [{ id: "releaseHistory", href: "/releases", label: "Releases" }]
        : []),
    ]);
  });

  it("preserves footer-specific labels where needed", () => {
    expect(getSiteLinksForSurface("footer")).toEqual([
      { id: "support", href: "/support", label: "Support" },
      ...(FEATURE_FLAGS.pricing
        ? [{ id: "pricing", href: "/pricing", label: "Pricing" }]
        : []),
      ...(FEATURE_FLAGS.docs
        ? [{ id: "docs", href: "/docs", label: "Documentation" }]
        : []),
      ...(FEATURE_FLAGS.resources
        ? [{ id: "resources", href: "/resources", label: "Resources" }]
        : []),
      ...(FEATURE_FLAGS.releaseHistory
        ? [
            {
              id: "releaseHistory",
              href: "/releases",
              label: "Release History",
            },
          ]
        : []),
      {
        id: "deleteAccountForm",
        href: "/delete-account-form",
        label: "Delete Account Request",
      },
      {
        id: "deleteDataForm",
        href: "/delete-data-form",
        label: "Delete Data Request",
      },
      { id: "privacyPolicy", href: "/privacy-policy", label: "Privacy Policy" },
      {
        id: "termsAndConditions",
        href: "/terms-and-conditions",
        label: "Terms & Conditions",
      },
    ]);
  });

  it("exposes only the intended discoverable section paths", () => {
    expect(getSitePathsByDiscoverability("indexable")).toEqual([
      "/",
      "/docs",
      "/resources",
      "/support",
    ]);
    expect(getSitePathsByDiscoverability("reference")).toEqual([
      "/delete-account-form",
      "/delete-data-form",
      "/privacy-policy",
      "/terms-and-conditions",
    ]);
  });

  it("mirrors feature-flag availability for gated sections", () => {
    expect(isSiteSectionEnabled("pricing")).toBe(FEATURE_FLAGS.pricing);
    expect(isSiteSectionEnabled("releaseHistory")).toBe(
      FEATURE_FLAGS.releaseHistory,
    );
  });
});
