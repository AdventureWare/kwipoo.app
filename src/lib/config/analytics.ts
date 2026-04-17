import * as staticPublicEnv from "$env/static/public";

const publicEnv = staticPublicEnv as Record<string, string | undefined>;

function normalizePublicValue(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue === "" ? undefined : normalizedValue;
}

export type AnalyticsProvider = "posthog";

function resolveAnalyticsProvider(
  value: string | undefined,
): AnalyticsProvider | undefined {
  const normalizedValue = normalizePublicValue(value)?.toLowerCase();

  if (normalizedValue === undefined) {
    return undefined;
  }

  if (normalizedValue === "posthog") {
    return "posthog";
  }

  throw new Error(
    `Invalid value for PUBLIC_ANALYTICS_PROVIDER: "${value}". Expected "posthog" or a blank value.`,
  );
}

export const ANALYTICS_PROVIDER = resolveAnalyticsProvider(
  publicEnv.PUBLIC_ANALYTICS_PROVIDER,
);
export const POSTHOG_KEY = normalizePublicValue(publicEnv.PUBLIC_POSTHOG_KEY);
export const POSTHOG_HOST =
  normalizePublicValue(publicEnv.PUBLIC_POSTHOG_HOST) ??
  "https://us.i.posthog.com";
export const ANALYTICS_SCRIPT_URL = normalizePublicValue(
  publicEnv.PUBLIC_ANALYTICS_SCRIPT_URL,
);

export const ANALYTICS_ENABLED = Boolean(
  ANALYTICS_PROVIDER === "posthog" && POSTHOG_KEY,
);
