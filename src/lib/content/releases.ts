import { generatedReleaseNotes } from "./releases.generated";

export type ReleaseImportance = "quiet" | "notable" | "launch" | "urgent";
export type ReleasePlatformTarget = "web" | "ios_wrapper" | "android_wrapper";

export interface WebsiteReleaseNote {
  version: string;
  slug: string;
  publishedAt: string;
  title: string;
  summary: string;
  highlights: string[];
  details: string[];
  importance: ReleaseImportance;
  platformTargets: ReleasePlatformTarget[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const websiteReleaseNotes: WebsiteReleaseNote[] = generatedReleaseNotes;

export function getLatestWebsiteRelease(): WebsiteReleaseNote | null {
  return websiteReleaseNotes[0] ?? null;
}
