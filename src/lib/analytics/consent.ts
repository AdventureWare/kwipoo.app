import { browser } from "$app/environment";

export type AnalyticsConsentPreference = "accepted" | "declined";

export const ANALYTICS_CONSENT_STORAGE_KEY = "kwipoo.analyticsConsent";
export const ANALYTICS_CONSENT_CHANGED_EVENT =
  "kwipoo:analytics-consent-changed";
export const ANALYTICS_CONSENT_SETTINGS_EVENT =
  "kwipoo:analytics-consent-settings";

export type AnalyticsConsentChangedDetail = {
  preference: AnalyticsConsentPreference;
};

function getNavigatorWithPrivacySignals(): Navigator & {
  globalPrivacyControl?: boolean;
} {
  return navigator as Navigator & { globalPrivacyControl?: boolean };
}

export function isGlobalPrivacyControlEnabled(): boolean {
  return (
    browser && getNavigatorWithPrivacySignals().globalPrivacyControl === true
  );
}

export function getAnalyticsConsentPreference():
  | AnalyticsConsentPreference
  | undefined {
  if (!browser) {
    return undefined;
  }

  if (isGlobalPrivacyControlEnabled()) {
    return "declined";
  }

  const storedPreference = window.localStorage.getItem(
    ANALYTICS_CONSENT_STORAGE_KEY,
  );

  if (storedPreference === "accepted" || storedPreference === "declined") {
    return storedPreference;
  }

  return undefined;
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsentPreference() === "accepted";
}

export function setAnalyticsConsentPreference(
  preference: AnalyticsConsentPreference,
): void {
  if (!browser) {
    return;
  }

  window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, preference);
  window.dispatchEvent(
    new CustomEvent<AnalyticsConsentChangedDetail>(
      ANALYTICS_CONSENT_CHANGED_EVENT,
      {
        detail: { preference },
      },
    ),
  );
}

export function openAnalyticsConsentSettings(): void {
  if (!browser) {
    return;
  }

  window.dispatchEvent(new Event(ANALYTICS_CONSENT_SETTINGS_EVENT));
}
