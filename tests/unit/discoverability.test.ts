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
    expect(buildRobotsTxt()).toContain("https://kwipoo.app/sitemap.xml");
  });

  it("includes docs references when docs are enabled", async () => {
    const { buildLlmsFullTxt, buildLlmsTxt, buildSitemapXml } =
      await loadDiscoverability({
        dev: false,
        docsOverride: "true",
      });

    expect(buildSitemapXml()).toContain("<loc>https://kwipoo.app/docs</loc>");
    expect(buildSitemapXml()).toContain(
      "<loc>https://kwipoo.app/docs/things</loc>",
    );
    expect(buildLlmsTxt()).toContain("Documentation: https://kwipoo.app/docs");
    expect(buildLlmsFullTxt()).toContain("Track your Things");
    expect(buildLlmsFullTxt()).toContain("https://kwipoo.app/docs/things");
  });
});
