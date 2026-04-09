import { SUPPORT_EMAIL_MAILTO } from "$lib/config/site";

const publicEnv = import.meta.env as Record<string, string | undefined>;

function normalizePublicUrl(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue === "" ? undefined : normalizedValue;
}

export const PREMIUM_SIGNUP_PATH = "/pricing/premium";
export const PREMIUM_CHECKOUT_URL = normalizePublicUrl(
  publicEnv.PUBLIC_PREMIUM_CHECKOUT_URL,
);
export const PREMIUM_SIGNUP_URL = normalizePublicUrl(
  publicEnv.PUBLIC_PREMIUM_SIGNUP_URL,
);
export const PREMIUM_CONTACT_HREF = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
  "Kwipoo Premium signup",
)}`;

export type PremiumSignupMode = "checkout" | "signup" | "contact";

export const PREMIUM_SIGNUP_MODE: PremiumSignupMode = PREMIUM_CHECKOUT_URL
  ? "checkout"
  : PREMIUM_SIGNUP_URL
    ? "signup"
    : "contact";

export const PREMIUM_PRIMARY_CTA =
  PREMIUM_SIGNUP_MODE === "checkout"
    ? {
        label: "Continue to checkout",
        href: PREMIUM_CHECKOUT_URL!,
      }
    : PREMIUM_SIGNUP_MODE === "signup"
      ? {
          label: "Create account and upgrade",
          href: PREMIUM_SIGNUP_URL!,
        }
      : {
          label: "Contact us about Premium",
          href: PREMIUM_CONTACT_HREF,
        };
