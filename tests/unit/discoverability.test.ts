import { afterEach, describe, expect, it, vi } from "vitest";

async function loadDiscoverability({
  docsOverride,
  resourcesOverride,
}: {
  docsOverride?: string;
  resourcesOverride?: string;
}) {
  vi.resetModules();
  vi.doMock("$env/dynamic/public", () => ({
    env: {
      PUBLIC_FEATURE_DOCS: docsOverride,
      PUBLIC_FEATURE_RESOURCES: resourcesOverride,
    },
  }));

  return import("../../src/lib/discoverability");
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("$env/dynamic/public");
});

describe("discoverability builders", () => {
  it("keeps docs routes out of the sitemap when docs are disabled", async () => {
    const { buildSitemapXml, buildRobotsTxt } = await loadDiscoverability({
      docsOverride: "false",
    });

    const sitemap = buildSitemapXml();

    expect(sitemap).toContain("<loc>https://kwipoo.app/</loc>");
    expect(sitemap).not.toContain("https://kwipoo.app/docs");
    expect(sitemap).toContain("https://kwipoo.app/privacy-policy");
    expect(sitemap).toContain("https://kwipoo.app/terms-and-conditions");
    expect(buildRobotsTxt()).toContain("https://kwipoo.app/sitemap.xml");
  });

  it("includes docs references and machine-readable endpoints when docs are enabled", async () => {
    const { buildLlmsFullTxt, buildLlmsTxt, buildSitemapXml } =
      await loadDiscoverability({});

    expect(buildSitemapXml()).toContain("<loc>https://kwipoo.app/docs</loc>");
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/docs/things</loc>",
    );
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/resources</loc>",
    );
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/resources/outdoor-adventurers</loc>",
    );
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/releases</loc>",
    );
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/terms-and-conditions</loc>",
    );
    expect(buildLlmsTxt()).toContain("Documentation: https://kwipoo.app/docs");
    expect(buildLlmsTxt()).toContain("Resources: https://kwipoo.app/resources");
    expect(buildLlmsTxt()).toContain("llms-full.txt");
    expect(buildLlmsTxt()).toContain("Track your Things");
    expect(buildLlmsFullTxt()).toContain("## Documentation Map");
    expect(buildLlmsFullTxt()).toContain("### Track and organize");
    expect(buildLlmsFullTxt()).toContain("https://kwipoo.app/privacy-policy");
    expect(buildLlmsFullTxt()).toContain("https://kwipoo.app/docs/things");
  });

  it("keeps resources routes out of the sitemap when resources are disabled", async () => {
    const { buildSitemapXml } = await loadDiscoverability({
      resourcesOverride: "false",
    });

    const sitemap = buildSitemapXml();

    expect(sitemap).not.toContain("https://kwipoo.app/resources");
    expect(sitemap).not.toContain(
      "https://kwipoo.app/resources/outdoor-adventurers",
    );
  });
});
