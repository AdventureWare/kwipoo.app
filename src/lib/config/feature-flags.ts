const publicEnv = import.meta.env as Record<string, string | undefined>;

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
  docs: resolveBooleanFlag(
    "PUBLIC_FEATURE_DOCS",
    publicEnv.PUBLIC_FEATURE_DOCS,
    true,
  ),
  resources: resolveBooleanFlag(
    "PUBLIC_FEATURE_RESOURCES",
    publicEnv.PUBLIC_FEATURE_RESOURCES,
    true,
  ),
  pricing: resolveBooleanFlag(
    "PUBLIC_FEATURE_PRICING",
    publicEnv.PUBLIC_FEATURE_PRICING,
    false,
  ),
  releaseHistory: resolveBooleanFlag(
    "PUBLIC_FEATURE_RELEASE_HISTORY",
    publicEnv.PUBLIC_FEATURE_RELEASE_HISTORY,
    true,
  ),
} as const;

export type FeatureFlagName = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(flag: FeatureFlagName): boolean {
  return FEATURE_FLAGS[flag];
}
