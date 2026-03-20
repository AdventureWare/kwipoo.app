import { describe, expect, it } from "vitest";
import {
  normalizeSitePath,
  toAbsoluteMarketingUrl,
  toSeoJsonLd,
} from "$lib/seo";

describe("seo helpers", () => {
  it("normalizes paths for canonical URLs", () => {
    expect(normalizeSitePath("/")).toBe("/");
    expect(normalizeSitePath("/docs/")).toBe("/docs");
    expect(normalizeSitePath("privacy-policy?ref=footer")).toBe(
      "/privacy-policy",
    );
  });

  it("builds absolute marketing URLs", () => {
    expect(toAbsoluteMarketingUrl("/docs")).toBe("https://kwipoo.app/docs");
  });

  it("escapes HTML-sensitive characters inside JSON-LD payloads", () => {
    expect(toSeoJsonLd({ markup: "</script>" })).toContain("\\u003c/script>");
  });
});
