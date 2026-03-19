import { describe, expect, it } from "vitest";
import { load } from "../../src/routes/docs/[slug]/+page";

describe("docs page load", () => {
  it("returns the requested doc page and its related pages", () => {
    const result = load({
      params: { slug: "things" },
    } as Parameters<typeof load>[0]);

    expect(result.docPage.slug).toBe("things");
    expect(result.relatedDocs.map((page) => page.slug)).toEqual([
      "places",
      "spots",
      "sets",
    ]);
  });

  it("throws a 404 error for an unknown docs slug", () => {
    try {
      load({
        params: { slug: "missing-page" },
      } as Parameters<typeof load>[0]);
      throw new Error("Expected docs load to throw for an unknown slug");
    } catch (error) {
      expect(error).toMatchObject({ status: 404 });
    }
  });
});
