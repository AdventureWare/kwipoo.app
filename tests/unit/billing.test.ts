import { afterEach, describe, expect, it, vi } from "vitest";

async function loadBillingConfig({
  checkoutUrl,
  signupUrl,
}: {
  checkoutUrl?: string;
  signupUrl?: string;
}) {
  vi.resetModules();
  vi.unstubAllEnvs();

  if (checkoutUrl !== undefined) {
    vi.stubEnv("PUBLIC_PREMIUM_CHECKOUT_URL", checkoutUrl);
  }

  if (signupUrl !== undefined) {
    vi.stubEnv("PUBLIC_PREMIUM_SIGNUP_URL", signupUrl);
  }

  return import("../../src/lib/config/billing");
}

afterEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
});

describe("billing config", () => {
  it("falls back to contact when no premium destination is configured", async () => {
    const { PREMIUM_PRIMARY_CTA, PREMIUM_SIGNUP_MODE } =
      await loadBillingConfig({});

    expect(PREMIUM_SIGNUP_MODE).toBe("contact");
    expect(PREMIUM_PRIMARY_CTA.label).toBe("Contact us about Premium");
    expect(PREMIUM_PRIMARY_CTA.href).toContain("mailto:");
  });

  it("uses the signup URL when checkout is not configured", async () => {
    const { PREMIUM_PRIMARY_CTA, PREMIUM_SIGNUP_MODE } =
      await loadBillingConfig({
        signupUrl: "https://kwipoo.vercel.app/signup?plan=premium",
      });

    expect(PREMIUM_SIGNUP_MODE).toBe("signup");
    expect(PREMIUM_PRIMARY_CTA.label).toBe("Create account and upgrade");
    expect(PREMIUM_PRIMARY_CTA.href).toBe(
      "https://kwipoo.vercel.app/signup?plan=premium",
    );
  });

  it("prefers checkout when both checkout and signup URLs are configured", async () => {
    const { PREMIUM_PRIMARY_CTA, PREMIUM_SIGNUP_MODE } =
      await loadBillingConfig({
        checkoutUrl: "https://payments.example.com/kwipoo-premium",
        signupUrl: "https://kwipoo.vercel.app/signup?plan=premium",
      });

    expect(PREMIUM_SIGNUP_MODE).toBe("checkout");
    expect(PREMIUM_PRIMARY_CTA.label).toBe("Continue to checkout");
    expect(PREMIUM_PRIMARY_CTA.href).toBe(
      "https://payments.example.com/kwipoo-premium",
    );
  });

  it("treats blank values as missing", async () => {
    const { PREMIUM_SIGNUP_MODE } = await loadBillingConfig({
      checkoutUrl: "   ",
      signupUrl: "",
    });

    expect(PREMIUM_SIGNUP_MODE).toBe("contact");
  });
});
