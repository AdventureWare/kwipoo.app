import { error } from "@sveltejs/kit";
import { getDocsPage, getRelatedDocsPages } from "$lib/content/docs";

export function load({ params }) {
  const docPage = getDocsPage(params.slug);

  if (!docPage) {
    error(404, "Documentation page not found");
  }

  return {
    docPage,
    relatedDocs: getRelatedDocsPages(docPage),
  };
}
