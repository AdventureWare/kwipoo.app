import { describe, expect, it } from "vitest";
import {
  LLMS_TXT_URL,
  SITEMAP_XML_URL,
  getSoftwareApplicationJsonLd,
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

  it("exports discovery URLs from the marketing domain", () => {
    expect(SITEMAP_XML_URL).toBe("https://kwipoo.app/sitemap.xml");
    expect(LLMS_TXT_URL).toBe("https://kwipoo.app/llms.txt");
  });

  it("includes help and keyword data in software application schema", () => {
    expect(
      getSoftwareApplicationJsonLd({
        softwareHelpUrl: "https://kwipoo.app/docs",
      }),
    ).toMatchObject({
      softwareHelp: "https://kwipoo.app/docs",
    });
    expect(getSoftwareApplicationJsonLd().keywords).toContain(
      "personal inventory app",
    );
  });

  it("escapes HTML-sensitive characters inside JSON-LD payloads", () => {
    expect(toSeoJsonLd({ markup: "</script>" })).toContain("\\u003c/script>");
  });
});
