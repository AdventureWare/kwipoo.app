import { afterEach, describe, expect, it, vi } from "vitest";

const DEFAULT_PUBLIC_ENV = {
  PUBLIC_PREMIUM_CHECKOUT_URL: undefined,
};

async function loadBillingConfig({ checkoutUrl }: { checkoutUrl?: string }) {
  vi.resetModules();
  vi.doMock("$env/static/public", () => ({
    ...DEFAULT_PUBLIC_ENV,
    PUBLIC_PREMIUM_CHECKOUT_URL: checkoutUrl,
  }));

  return import("../../src/lib/config/billing");
}

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("$env/static/public");
});

describe("billing config", () => {
  it("defaults to the app-owned checkout and management routes", async () => {
    const {
      APP_BILLING_CHECKOUT_URL,
      APP_BILLING_MANAGE_URL,
      PREMIUM_CHECKOUT_URL,
      PREMIUM_MANAGE_URL,
    } = await loadBillingConfig({});

    expect(PREMIUM_CHECKOUT_URL).toBe(APP_BILLING_CHECKOUT_URL);
    expect(PREMIUM_MANAGE_URL).toBe(APP_BILLING_MANAGE_URL);
    expect(PREMIUM_CHECKOUT_URL).toContain("/billing/checkout");
    expect(PREMIUM_MANAGE_URL).toContain("/billing/manage");
  });

  it("allows checkout overrides for a different destination", async () => {
    const { PREMIUM_CHECKOUT_URL } = await loadBillingConfig({
      checkoutUrl: "https://payments.example.com/kwipoo-premium",
    });

    expect(PREMIUM_CHECKOUT_URL).toBe(
      "https://payments.example.com/kwipoo-premium",
    );
  });

  it("treats blank checkout overrides as missing", async () => {
    const { PREMIUM_CHECKOUT_URL, APP_BILLING_CHECKOUT_URL } =
      await loadBillingConfig({
        checkoutUrl: "   ",
      });

    expect(PREMIUM_CHECKOUT_URL).toBe(APP_BILLING_CHECKOUT_URL);
  });
});
