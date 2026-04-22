import * as staticPublicEnv from "$env/static/public";
import { APP_URL, SUPPORT_EMAIL_MAILTO } from "$lib/config/site";

const publicEnv = staticPublicEnv as Record<string, string | undefined>;

function normalizePublicUrl(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue === "" ? undefined : normalizedValue;
}

export const PREMIUM_SIGNUP_PATH = "/pricing/premium";
export const APP_BILLING_CHECKOUT_URL = `${APP_URL}/billing/checkout`;
export const APP_BILLING_MANAGE_URL = `${APP_URL}/billing/manage`;
export const PREMIUM_CHECKOUT_URL =
  normalizePublicUrl(publicEnv.PUBLIC_PREMIUM_CHECKOUT_URL) ??
  APP_BILLING_CHECKOUT_URL;
export const PREMIUM_MANAGE_URL = APP_BILLING_MANAGE_URL;
export const PREMIUM_CONTACT_HREF = `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(
  "Kwipoo Premium signup",
)}`;
