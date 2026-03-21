import { error } from "@sveltejs/kit";
import { isFeatureEnabled } from "$lib/config/feature-flags";

export function load() {
  if (!isFeatureEnabled("pricing")) {
    error(404, "Page not found");
  }
}
