import type { FeatureBadge } from "$lib/types/feature-badges";

export const docsCategoryOrder = [
  "Start here",
  "Track and organize",
  "Plan and collaborate",
] as const;

export type DocsCategory = (typeof docsCategoryOrder)[number];

export interface DocsCallout {
  title: string;
  body: string;
  tone?: "note" | "tip" | "warning";
}

export interface DocsCodeSample {
  label: string;
  language?: string;
  code: string;
}

export interface DocsExample {
  title: string;
  summary: string;
  steps: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface DocsSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface DocsTable {
  columns: string[];
  rows: string[][];
}

export interface DocsSection {
  heading: string;
  summary?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: DocsSubsection[];
  table?: DocsTable;
  callout?: DocsCallout;
  codeSample?: DocsCodeSample;
  example?: DocsExample;
}

export interface DocsPage {
  slug: string;
  category: DocsCategory;
  eyebrow: string;
  badge?: FeatureBadge;
  title: string;
  summary: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  sections: DocsSection[];
  relatedSlugs: string[];
}

export interface DocsCategoryGroup {
  category: DocsCategory;
  description: string;
  pages: DocsPage[];
}

export interface DocsNavSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    slug?: string;
    badge?: FeatureBadge;
  }>;
}

export interface DocsTocItem {
  id: string;
  label: string;
}

export const docsCategoryDescriptions: Record<DocsCategory, string> = {
  "Start here":
    "Foundational guides for getting your account set up and building a system you will actually use.",
  "Track and organize":
    "Core concepts for understanding what you own, where it lives, and how to keep it easy to find.",
  "Plan and collaborate":
    "Features that help you prepare for trips, routines, and shared gear without starting from scratch each time.",
};
