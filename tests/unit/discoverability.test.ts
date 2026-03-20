import { afterEach, describe, expect, it, vi } from "vitest";

async function loadDiscoverability({
  dev,
  docsOverride,
}: {
  dev: boolean;
  docsOverride?: string;
}) {
  vi.resetModules();
  vi.doMock("$app/environment", () => ({ dev }));
  vi.doMock("$env/dynamic/public", () => ({
    env: {
      PUBLIC_FEATURE_DOCS: docsOverride,
    },
  }));

  return import("../../src/lib/discoverability");
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("$app/environment");
  vi.doUnmock("$env/dynamic/public");
});

describe("discoverability builders", () => {
  it("keeps docs routes out of the sitemap when docs are disabled", async () => {
    const { buildSitemapXml, buildRobotsTxt } = await loadDiscoverability({
      dev: false,
    });

    const sitemap = buildSitemapXml();

    expect(sitemap).toContain("<loc>https://kwipoo.app/</loc>");
    expect(sitemap).not.toContain("https://kwipoo.app/docs");
    expect(sitemap).not.toContain("https://kwipoo.app/privacy-policy");
    expect(buildRobotsTxt()).toContain("https://kwipoo.app/sitemap.xml");
  });

  it("includes docs references and machine-readable endpoints when docs are enabled", async () => {
    const { buildLlmsFullTxt, buildLlmsTxt, buildSitemapXml } =
      await loadDiscoverability({
        dev: false,
        docsOverride: "true",
      });

    expect(buildSitemapXml()).toContain("<loc>https://kwipoo.app/docs</loc>");
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/docs/things</loc>",
    );
    expect(buildSitemapXml()).not.toContain(
      "https://kwipoo.app/terms-and-conditions",
    );
    expect(buildLlmsTxt()).toContain("Documentation: https://kwipoo.app/docs");
    expect(buildLlmsTxt()).toContain("llms-full.txt");
    expect(buildLlmsTxt()).toContain("Track your Things");
    expect(buildLlmsFullTxt()).toContain("## Documentation Map");
    expect(buildLlmsFullTxt()).toContain("### Track and organize");
    expect(buildLlmsFullTxt()).toContain("https://kwipoo.app/privacy-policy");
    expect(buildLlmsFullTxt()).toContain("https://kwipoo.app/docs/things");
  });
});
