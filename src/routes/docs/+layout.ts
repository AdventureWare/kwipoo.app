import { error } from "@sveltejs/kit";
import {
  docsLandingTocItems,
  getDocsNavSections,
  getDocsPage,
  getDocsTocItems,
} from "$lib/content/docs";
import { isSiteSectionEnabled } from "$lib/site-sections";

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function load({ url }) {
  if (!isSiteSectionEnabled("docs")) {
    error(404, "Page not found");
  }

  const pathname = normalizePathname(url.pathname);
  const navSections = getDocsNavSections();

  if (pathname === "/docs") {
    return {
      navSections,
      tocItems: docsLandingTocItems,
    };
  }

  const slug = pathname.replace(/^\/docs\//, "");
  const docPage = getDocsPage(slug);

  return {
    navSections,
    tocItems: docPage ? getDocsTocItems(docPage) : [],
  };
}
