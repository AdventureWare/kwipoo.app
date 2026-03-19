import { error } from "@sveltejs/kit";
import { DOCS_ENABLED } from "$lib/config/site";

export function load() {
  if (!DOCS_ENABLED) {
    error(404, "Page not found");
  }
}
