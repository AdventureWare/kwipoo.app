import type { DocsTable } from "./schema";
import { generatedDocsEntityReferences } from "./entity-reference.generated";

export type DocsFieldStatus = "Required" | "Optional" | "Defaulted";

export interface DocsEntityFieldReference {
  key: string;
  label: string;
  status: DocsFieldStatus;
  description: string;
  example: string;
}

export interface DocsEntityReference {
  slug: string;
  label: string;
  summary: string;
  routePath: string;
  schemaExport: string;
  schemaFile: string;
  formFile: string;
  routeFiles: string[];
  fields: DocsEntityFieldReference[];
}

export function getDocsEntityReference(
  slug: string,
): DocsEntityReference | undefined {
  return generatedDocsEntityReferences.find((entity) => entity.slug === slug);
}

export function getDocsEntityFieldsTable(slug: string): DocsTable {
  const entity = getDocsEntityReference(slug);

  if (!entity) {
    throw new Error(`Unknown docs entity reference: ${slug}`);
  }

  return {
    columns: ["Field", "Description", "Status", "Example"],
    rows: entity.fields.map((field) => [
      field.label,
      field.description,
      field.status,
      field.example,
    ]),
  };
}

export { generatedDocsEntityReferences };
