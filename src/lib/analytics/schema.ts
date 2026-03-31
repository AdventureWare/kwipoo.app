import type { AnalyticsEventProperties } from "$lib/analytics";

export const ANALYTICS_EVENT_NAMES = {
  marketingCtaClicked: "marketing_cta_clicked",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENT_NAMES)[keyof typeof ANALYTICS_EVENT_NAMES];

export type MarketingAnalyticsSource = "marketing_site";

export type MarketingCtaLocation =
  | "header_desktop"
  | "header_mobile"
  | "hero"
  | "homepage_close"
  | "hero_app_store"
  | "hero_google_play";

export type MarketingCtaKind = "signup" | "login" | "app_store";

export interface MarketingPageViewProperties extends AnalyticsEventProperties {
  source: MarketingAnalyticsSource;
  path: string;
  url: string;
  title: string;
  navigation_type: string;
  search?: string;
  referrer?: string;
}

export interface MarketingPageViewInput {
  path: string;
  url: string;
  title: string;
  navigation_type: string;
  search?: string;
  referrer?: string;
}

export interface MarketingCtaClickedProperties extends AnalyticsEventProperties {
  source: MarketingAnalyticsSource;
  location: MarketingCtaLocation;
  label: string;
  destination?: string;
  kind?: MarketingCtaKind;
}

export interface MarketingCtaClickedInput {
  location: MarketingCtaLocation;
  label: string;
  destination?: string;
  kind?: MarketingCtaKind;
}

export function createMarketingPageViewProperties(
  properties: MarketingPageViewInput,
): MarketingPageViewProperties {
  return {
    ...properties,
    source: "marketing_site",
  };
}

export function createMarketingCtaClickedProperties(
  properties: MarketingCtaClickedInput,
): MarketingCtaClickedProperties {
  return {
    ...properties,
    source: "marketing_site",
  };
}
