import { afterEach, describe, expect, it, vi } from "vitest";

const DEFAULT_PUBLIC_ENV = {
  PUBLIC_PREMIUM_CHECKOUT_URL: undefined,
  PUBLIC_PREMIUM_ANNUAL_CHECKOUT_URL: undefined,
  PUBLIC_PREMIUM_LIFETIME_CHECKOUT_URL: undefined,
  PUBLIC_LIFETIME_OFFER_ENABLED: undefined,
};

async function loadBillingConfig({
  checkoutUrl,
  lifetimeOfferEnabled,
}: {
  checkoutUrl?: string;
  lifetimeOfferEnabled?: string;
}) {
  vi.resetModules();
  vi.doMock("$env/static/public", () => ({
    ...DEFAULT_PUBLIC_ENV,
    PUBLIC_PREMIUM_CHECKOUT_URL: checkoutUrl,
    PUBLIC_LIFETIME_OFFER_ENABLED: lifetimeOfferEnabled,
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
      APP_BILLING_ANNUAL_CHECKOUT_URL,
      APP_BILLING_LIFETIME_CHECKOUT_URL,
      APP_BILLING_MANAGE_URL,
      LIFETIME_OFFER_ENABLED,
      PREMIUM_ANNUAL_CHECKOUT_URL,
      PREMIUM_CHECKOUT_URL,
      PREMIUM_LIFETIME_CHECKOUT_URL,
      PREMIUM_MANAGE_URL,
    } = await loadBillingConfig({});

    expect(PREMIUM_CHECKOUT_URL).toBe(APP_BILLING_CHECKOUT_URL);
    expect(PREMIUM_ANNUAL_CHECKOUT_URL).toBe(APP_BILLING_ANNUAL_CHECKOUT_URL);
    expect(PREMIUM_LIFETIME_CHECKOUT_URL).toBe(
      APP_BILLING_LIFETIME_CHECKOUT_URL,
    );
    expect(PREMIUM_MANAGE_URL).toBe(APP_BILLING_MANAGE_URL);
    expect(PREMIUM_CHECKOUT_URL).toContain("plan=premium_monthly");
    expect(PREMIUM_ANNUAL_CHECKOUT_URL).toContain("plan=premium_annual");
    expect(PREMIUM_LIFETIME_CHECKOUT_URL).toContain("plan=lifetime_premium");
    expect(PREMIUM_MANAGE_URL).toContain("/billing/manage");
    expect(LIFETIME_OFFER_ENABLED).toBe(false);
  });

  it("shows the lifetime offer only when explicitly enabled", async () => {
    const { LIFETIME_OFFER_ENABLED } = await loadBillingConfig({
      lifetimeOfferEnabled: "true",
    });

    expect(LIFETIME_OFFER_ENABLED).toBe(true);
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
