import { APP_URL, MARKETING_SITE_URL } from "$lib/config/site";

const APP_ORIGIN = new URL(APP_URL).origin;
const MARKETING_HANDOFF_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

export function buildMarketingAppHandoffHref({
  href,
  currentPath,
  currentSearch,
  ctaLocation,
  ctaKind,
}: {
  href: string;
  currentPath: string;
  currentSearch: string;
  ctaLocation?: string;
  ctaKind?: string;
}) {
  let destination: URL;

  try {
    destination = new URL(href, MARKETING_SITE_URL);
  } catch {
    return href;
  }

  if (destination.origin !== APP_ORIGIN) {
    return href;
  }

  const currentParams = new URLSearchParams(currentSearch);

  for (const key of MARKETING_HANDOFF_QUERY_KEYS) {
    const value = currentParams.get(key);

    if (value && !destination.searchParams.has(key)) {
      destination.searchParams.set(key, value);
    }
  }

  if (currentPath && !destination.searchParams.has("landing_path")) {
    destination.searchParams.set("landing_path", currentPath);
  }

  if (ctaLocation && !destination.searchParams.has("cta_location")) {
    destination.searchParams.set("cta_location", ctaLocation);
  }

  if (ctaKind && !destination.searchParams.has("cta_kind")) {
    destination.searchParams.set("cta_kind", ctaKind);
  }

  return destination.toString();
}
