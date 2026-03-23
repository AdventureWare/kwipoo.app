import { error } from "@sveltejs/kit";
import {
  getRelatedResourceGuides,
  getResourceGuide,
} from "$lib/content/resources";

export function load({ params }) {
  const resourceGuide = getResourceGuide(params.slug);

  if (!resourceGuide) {
    error(404, "Resource guide not found");
  }

  return {
    resourceGuide,
    relatedResources: getRelatedResourceGuides(resourceGuide),
  };
}
