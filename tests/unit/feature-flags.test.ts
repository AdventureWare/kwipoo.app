import { afterEach, describe, expect, it, vi } from "vitest";

async function loadFeatureFlags({ docsOverride }: { docsOverride?: string }) {
  vi.resetModules();
  vi.doMock("$env/dynamic/public", () => ({
    env: {
      PUBLIC_FEATURE_DOCS: docsOverride,
    },
  }));

  return import("../../src/lib/config/feature-flags");
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("$env/dynamic/public");
});

describe("feature flags", () => {
  it("enables docs by default", async () => {
    const { FEATURE_FLAGS, isFeatureEnabled } = await loadFeatureFlags({});

    expect(FEATURE_FLAGS.docs).toBe(true);
    expect(isFeatureEnabled("docs")).toBe(true);
  });

  it("allows explicit env overrides to disable docs", async () => {
    const { FEATURE_FLAGS } = await loadFeatureFlags({
      docsOverride: "false",
    });

    expect(FEATURE_FLAGS.docs).toBe(false);
  });

  it("allows explicit env overrides", async () => {
    const { FEATURE_FLAGS } = await loadFeatureFlags({
      docsOverride: "true",
    });

    expect(FEATURE_FLAGS.docs).toBe(true);
  });

  it("rejects invalid env values", async () => {
    await expect(
      loadFeatureFlags({
        docsOverride: "sometimes",
      }),
    ).rejects.toThrow('Invalid value for PUBLIC_FEATURE_DOCS: "sometimes"');
  });
});
