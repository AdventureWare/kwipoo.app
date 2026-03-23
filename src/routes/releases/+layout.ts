import { error } from "@sveltejs/kit";
import { isSiteSectionEnabled } from "$lib/site-sections";

export function load() {
  if (!isSiteSectionEnabled("releaseHistory")) {
    error(404, "Page not found");
  }
}
