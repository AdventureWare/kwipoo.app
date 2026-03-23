import { env } from "$env/dynamic/public";

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
  env.PUBLIC_ANALYTICS_PROVIDER,
);
export const POSTHOG_KEY = normalizePublicValue(env.PUBLIC_POSTHOG_KEY);
export const POSTHOG_HOST =
  normalizePublicValue(env.PUBLIC_POSTHOG_HOST) ?? "https://us.i.posthog.com";
export const ANALYTICS_SCRIPT_URL = normalizePublicValue(
  env.PUBLIC_ANALYTICS_SCRIPT_URL,
);

export const ANALYTICS_ENABLED = Boolean(
  ANALYTICS_PROVIDER === "posthog" && POSTHOG_KEY,
);
