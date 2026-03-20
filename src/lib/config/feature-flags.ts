import { dev } from "$app/environment";
import { env } from "$env/dynamic/public";

const TRUE_FLAG_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_FLAG_VALUES = new Set(["0", "false", "no", "off"]);

function parseBooleanFlag(
  flagName: string,
  value: string | undefined,
): boolean | undefined {
  if (value === undefined || value.trim() === "") {
    return undefined;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (TRUE_FLAG_VALUES.has(normalizedValue)) {
    return true;
  }

  if (FALSE_FLAG_VALUES.has(normalizedValue)) {
    return false;
  }

  throw new Error(
    `Invalid value for ${flagName}: "${value}". Expected one of ${[
      ...TRUE_FLAG_VALUES,
      ...FALSE_FLAG_VALUES,
    ].join(", ")}.`,
  );
}

function resolveBooleanFlag(
  flagName: string,
  value: string | undefined,
  fallback: boolean,
): boolean {
  return parseBooleanFlag(flagName, value) ?? fallback;
}

export const FEATURE_FLAGS = {
  docs: resolveBooleanFlag("PUBLIC_FEATURE_DOCS", env.PUBLIC_FEATURE_DOCS, dev),
} as const;

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(flag: FeatureFlagName): boolean {
  return FEATURE_FLAGS[flag];
}
