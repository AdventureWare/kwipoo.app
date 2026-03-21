export type FeatureBadgeTone = "beta" | "premium";

export interface FeatureBadge {
  label: string;
  tone: FeatureBadgeTone;
}

export const FEATURE_BADGE_PRESETS = {
  beta: {
    label: "Beta",
    tone: "beta",
  },
  premium: {
    label: "Premium",
    tone: "premium",
  },
} as const satisfies Record<FeatureBadgeTone, FeatureBadge>;
