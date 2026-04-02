import { getDocsEntityFieldsTable } from "../entity-reference";
import type { DocsPage, DocsSection } from "../schema";

export function defineDocsPage(page: DocsPage): DocsPage {
  return page;
}

interface EntityFieldsSectionOptions {
  slug: string;
  heading: string;
  paragraphs?: string[];
  summary?: string;
}

export function createEntityFieldsSection({
  slug,
  heading,
  paragraphs,
  summary,
}: EntityFieldsSectionOptions): DocsSection {
  // Use this only for sections that should mirror the app-backed entity field table.
  return {
    heading,
    summary,
    paragraphs,
    table: getDocsEntityFieldsTable(slug),
  };
}
