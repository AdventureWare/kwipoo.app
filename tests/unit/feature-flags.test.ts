import { afterEach, describe, expect, it, vi } from "vitest";

async function loadFeatureFlags({
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

  return import("../../src/lib/config/feature-flags");
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("$app/environment");
  vi.doUnmock("$env/dynamic/public");
});

describe("feature flags", () => {
  it("enables docs by default in development", async () => {
    const { FEATURE_FLAGS, isFeatureEnabled } = await loadFeatureFlags({
      dev: true,
    });

    expect(FEATURE_FLAGS.docs).toBe(true);
    expect(isFeatureEnabled("docs")).toBe(true);
  });

  it("disables docs by default outside development", async () => {
    const { FEATURE_FLAGS } = await loadFeatureFlags({
      dev: false,
    });

    expect(FEATURE_FLAGS.docs).toBe(false);
  });

  it("allows explicit env overrides", async () => {
    const { FEATURE_FLAGS } = await loadFeatureFlags({
      dev: false,
      docsOverride: "true",
    });

    expect(FEATURE_FLAGS.docs).toBe(true);
  });

  it("rejects invalid env values", async () => {
    await expect(
      loadFeatureFlags({
        dev: false,
        docsOverride: "sometimes",
      }),
    ).rejects.toThrow('Invalid value for PUBLIC_FEATURE_DOCS: "sometimes"');
  });
});
