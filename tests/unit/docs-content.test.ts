import { describe, expect, it } from "vitest";
import {
  docsCategoryOrder,
  docsPages,
  getDocsCategoryGroups,
  getDocsEntityFieldsTable,
  getDocsEntityReference,
  getDocsNavSections,
  getDocsPage,
  getDocsPageLabel,
  getRelatedDocsPages,
} from "$lib/content/docs";

describe("docs content helpers", () => {
  it("keeps category groups in the declared order and includes every page once", () => {
    const categoryGroups = getDocsCategoryGroups();
    const groupedSlugs = categoryGroups.flatMap((group) =>
      group.pages.map((page) => page.slug),
    );

    expect(categoryGroups.map((group) => group.category)).toEqual([
      ...docsCategoryOrder,
    ]);
    expect(groupedSlugs.sort()).toEqual(
      docsPages.map((page) => page.slug).sort(),
    );
  });

  it("keeps every related doc reference resolvable", () => {
    for (const page of docsPages) {
      expect(
        getRelatedDocsPages(page).map((relatedPage) => relatedPage.slug),
      ).toEqual(page.relatedSlugs);
    }
  });

  it("builds docs navigation only from valid page slugs", () => {
    const navSections = getDocsNavSections();
    const featureItems = navSections.find(
      (section) => section.title === "Features",
    );

    expect(featureItems).toBeDefined();

    for (const item of featureItems?.items ?? []) {
      expect(item.slug).toBeTruthy();
      expect(getDocsPage(item.slug ?? "")).toBeDefined();
      expect(item.href).toBe(`/docs/${item.slug}`);
    }
  });

  it("returns stable labels for known and unknown docs slugs", () => {
    expect(getDocsPageLabel("places")).toBe("Places");
    expect(getDocsPageLabel("create-account")).toBe("Create your account");
    expect(getDocsPageLabel("getting-started")).toBe(
      "Getting started with Kwipoo",
    );
    expect(getDocsPageLabel("missing-page")).toBe("Documentation");
  });

  it("builds entity field tables from the generated app docs reference", () => {
    const fieldSectionHeadings = new Map([
      ["things", "Fields for a Thing"],
      ["places", "Fields for a Place"],
      ["spots", "Fields for a Spot"],
      ["sets", "Fields for a Set"],
      ["events", "Fields for an Event"],
    ]);

    for (const [slug, heading] of fieldSectionHeadings) {
      const page = getDocsPage(slug);
      const entityReference = getDocsEntityReference(slug);
      const section = page?.sections.find((entry) => entry.heading === heading);

      expect(entityReference).toBeDefined();
      expect(section?.table).toEqual(getDocsEntityFieldsTable(slug));
      expect(section?.table?.rows).toHaveLength(
        entityReference?.fields.length ?? 0,
      );
    }
  });
});
