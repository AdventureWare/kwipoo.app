import { afterEach, describe, expect, it, vi } from "vitest";

async function loadFeatureFlags({
  docsOverride,
  pricingOverride,
}: {
  docsOverride?: string;
  pricingOverride?: string;
}) {
  vi.resetModules();
  vi.unstubAllEnvs();

  if (docsOverride !== undefined) {
    vi.stubEnv("PUBLIC_FEATURE_DOCS", docsOverride);
  }

  if (pricingOverride !== undefined) {
    vi.stubEnv("PUBLIC_FEATURE_PRICING", pricingOverride);
  }

  return import("../../src/lib/config/feature-flags");
}

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

describe("feature flags", () => {
  it("enables docs by default", async () => {
    const { FEATURE_FLAGS, isFeatureEnabled } = await loadFeatureFlags({});

    expect(FEATURE_FLAGS.docs).toBe(true);
    expect(isFeatureEnabled("docs")).toBe(true);
  });

  it("keeps pricing disabled by default", async () => {
    const { FEATURE_FLAGS, isFeatureEnabled } = await loadFeatureFlags({});

    expect(FEATURE_FLAGS.pricing).toBe(false);
    expect(isFeatureEnabled("pricing")).toBe(false);
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

  it("allows pricing to be explicitly enabled", async () => {
    const { FEATURE_FLAGS } = await loadFeatureFlags({
      pricingOverride: "true",
    });

    expect(FEATURE_FLAGS.pricing).toBe(true);
  });

  it("rejects invalid env values", async () => {
    await expect(
      loadFeatureFlags({
        docsOverride: "sometimes",
      }),
    ).rejects.toThrow('Invalid value for PUBLIC_FEATURE_DOCS: "sometimes"');
  });
});
