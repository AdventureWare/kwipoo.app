import type { AnalyticsEventProperties } from "$lib/analytics";

export const ANALYTICS_EVENT_NAMES = {
  marketingCtaClicked: "marketing_cta_clicked",
  resourceGuideSelected: "resource_guide_selected",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENT_NAMES)[keyof typeof ANALYTICS_EVENT_NAMES];

export type MarketingAnalyticsSource = "marketing_site";
export type ResourceGuideSelectionLocation =
  | "resources_hub"
  | "resource_guide_inline_related"
  | "resource_guide_bottom_related";

export type MarketingCtaLocation =
  | "header_desktop"
  | "header_mobile"
  | "hero"
  | "hero_existing_user"
  | "homepage_close"
  | "resource_guide_header"
  | "resource_guide_bottom"
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

export interface ResourceGuideSelectedProperties extends AnalyticsEventProperties {
  source: MarketingAnalyticsSource;
  location: ResourceGuideSelectionLocation;
  content_slug: string;
  content_title: string;
  content_audience?: string;
  content_format?: string;
  content_read_time?: string;
  destination?: string;
  parent_content_slug?: string;
  parent_content_title?: string;
  parent_content_audience?: string;
}

export interface ResourceGuideSelectedInput {
  location: ResourceGuideSelectionLocation;
  content_slug: string;
  content_title: string;
  content_audience?: string;
  content_format?: string;
  content_read_time?: string;
  destination?: string;
  parent_content_slug?: string;
  parent_content_title?: string;
  parent_content_audience?: string;
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

export function createResourceGuideSelectedProperties(
  properties: ResourceGuideSelectedInput,
): ResourceGuideSelectedProperties {
  return {
    ...properties,
    source: "marketing_site",
  };
}
