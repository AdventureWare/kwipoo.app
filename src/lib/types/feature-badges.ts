export type FeatureBadgeTone =
  | "beta"
  | "premium"
  | "comingSoon"
  | "info"
  | "neutral";

export interface FeatureBadge {
  label: string;
  tone: FeatureBadgeTone;
}

export function createFeatureBadge(
  label: string,
  tone: FeatureBadgeTone = "neutral",
): FeatureBadge {
  return {
    label,
    tone,
  };
}

export const FEATURE_BADGE_PRESETS = {
  beta: createFeatureBadge("Beta", "beta"),
  premium: createFeatureBadge("Premium", "premium"),
  comingSoon: createFeatureBadge("Coming Soon", "comingSoon"),
  new: createFeatureBadge("New", "info"),
  updated: createFeatureBadge("Updated", "neutral"),
} as const satisfies Record<string, FeatureBadge>;
