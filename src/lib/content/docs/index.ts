import type { FeatureBadge } from "$lib/types/feature-badges";
import { docsPages } from "./pages";
import {
  generatedDocsEntityReferences,
  getDocsEntityFieldsTable,
  getDocsEntityReference,
} from "./entity-reference";
import {
  docsCategoryDescriptions,
  docsCategoryOrder,
  type DocsCategory,
  type DocsCategoryGroup,
  type DocsNavSection,
  type DocsPage,
  type DocsTocItem,
} from "./schema";

const docsStartHereNavItems = [
  { slug: "getting-started", label: "Welcome" },
  { slug: "create-account", label: "Create your account" },
  { slug: "profile", label: "Profile" },
] as const;

const docsFeatureNavItems = [
  { slug: "places", label: "Places" },
  { slug: "spots", label: "Spots" },
  { slug: "things", label: "Things" },
  { slug: "sets", label: "Sets" },
  { slug: "events", label: "Events" },
  { slug: "social", label: "Social" },
] as const;

export const docsLandingTocItems: DocsTocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "start-here", label: "Start Here" },
  { id: "browse-topics", label: "Browse Topics" },
  { id: "content-roadmap", label: "Content Roadmap" },
] as const;

export function getDocsHref(slug: string): string {
  return slug === "getting-started" ? "/docs" : `/docs/${slug}`;
}

export function getDocsPage(slug: string): DocsPage | undefined {
  return docsPages.find((page) => page.slug === slug);
}

export function getDocsPagesByCategory(category: DocsCategory): DocsPage[] {
  return docsPages.filter((page) => page.category === category);
}

export function getDocsCategoryGroups(): DocsCategoryGroup[] {
  return docsCategoryOrder.map((category) => ({
    category,
    description: docsCategoryDescriptions[category],
    pages: getDocsPagesByCategory(category),
  }));
}

export function getDocsNavSections(): DocsNavSection[] {
  return [
    {
      title: "Getting Started",
      items: docsStartHereNavItems.map((item) => ({
        label: item.label,
        href: getDocsHref(item.slug),
        slug: item.slug,
        badge: getDocsPage(item.slug)?.badge,
      })),
    },
    {
      title: "Features",
      items: docsFeatureNavItems.map((item) => ({
        label: item.label,
        href: `/docs/${item.slug}`,
        slug: item.slug,
        badge: getDocsPage(item.slug)?.badge,
      })),
    },
  ];
}

export function getDocsSectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDocsTocItems(docPage: DocsPage): DocsTocItem[] {
  return docPage.sections.map((section) => ({
    id: getDocsSectionId(section.heading),
    label: section.heading,
  }));
}

export function getDocsPageLabel(slug: string): string {
  return (
    docsFeatureNavItems.find((item) => item.slug === slug)?.label ??
    getDocsPage(slug)?.title ??
    "Documentation"
  );
}

export function getDocsPageBadge(slug: string): FeatureBadge | undefined {
  return getDocsPage(slug)?.badge;
}

export function getRelatedDocsPages(docPage: DocsPage): DocsPage[] {
  return docPage.relatedSlugs
    .map((slug) => getDocsPage(slug))
    .filter((page): page is DocsPage => Boolean(page));
}

export { docsPages, docsCategoryDescriptions, docsCategoryOrder };
export {
  generatedDocsEntityReferences,
  getDocsEntityFieldsTable,
  getDocsEntityReference,
};
export type {
  DocsCallout,
  DocsCategory,
  DocsCategoryGroup,
  DocsCodeSample,
  DocsExample,
  DocsNavSection,
  DocsPage,
  DocsSection,
  DocsSubsection,
  DocsTable,
  DocsTocItem,
} from "./schema";
export type {
  DocsEntityFieldReference,
  DocsEntityReference,
  DocsFieldStatus,
} from "./entity-reference";
