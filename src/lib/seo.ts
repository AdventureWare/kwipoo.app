import {
  APP_URL,
  COMPANY_NAME,
  COMPANY_WEBSITE_URL,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_PATH,
  MARKETING_SITE_URL,
  SITE_CATEGORY,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_PROFILE_URLS,
  SUPPORT_EMAIL,
} from "$lib/config/site";

export function normalizeSitePath(pathname: string): string {
  const pathOnly = pathname.split("?")[0]?.split("#")[0] ?? "/";

  if (!pathOnly || pathOnly === "/") {
    return "/";
  }

  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export function toAbsoluteMarketingUrl(pathname = "/"): string {
  return new URL(normalizeSitePath(pathname), MARKETING_SITE_URL).toString();
}

export const ORGANIZATION_ID = `${MARKETING_SITE_URL}#organization`;
export const WEBSITE_ID = `${MARKETING_SITE_URL}#website`;
export const SOFTWARE_APPLICATION_ID = `${MARKETING_SITE_URL}#software`;
export const DEFAULT_OG_IMAGE_URL = toAbsoluteMarketingUrl(
  DEFAULT_OG_IMAGE_PATH,
);
export const ROBOTS_TXT_URL = toAbsoluteMarketingUrl("/robots.txt");
export const SITEMAP_XML_URL = toAbsoluteMarketingUrl("/sitemap.xml");
export const LLMS_TXT_URL = toAbsoluteMarketingUrl("/llms.txt");
export const LLMS_FULL_TXT_URL = toAbsoluteMarketingUrl("/llms-full.txt");

export function toSeoJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function toJsonLdScriptTag(data: unknown): string {
  return `<script type="application/ld+json">${toSeoJsonLd(data)}<\\/script>`;
}

export function getOrganizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: COMPANY_NAME,
    url: MARKETING_SITE_URL,
    email: SUPPORT_EMAIL,
    logo: toAbsoluteMarketingUrl("/assets/logos/logo.svg"),
    sameAs: [...SOCIAL_PROFILE_URLS],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SUPPORT_EMAIL,
        url: MARKETING_SITE_URL,
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: COMPANY_WEBSITE_URL,
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: MARKETING_SITE_URL,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function getSoftwareApplicationJsonLd({
  softwareHelpUrl,
}: {
  softwareHelpUrl?: string;
} = {}) {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_APPLICATION_ID,
    name: SITE_NAME,
    applicationSubCategory: "Home Inventory & Planning",
    applicationCategory: "UtilitiesApplication",
    genre: SITE_CATEGORY,
    operatingSystem: "Web, iOS, Android",
    url: MARKETING_SITE_URL,
    downloadUrl: APP_URL,
    description: SITE_DESCRIPTION,
    image: DEFAULT_OG_IMAGE_URL,
    keywords: SITE_KEYWORDS,
    ...(softwareHelpUrl ? { softwareHelp: softwareHelpUrl } : {}),
    featureList: [
      "Track what you own",
      "Store item details and locations",
      "Organize storage with Places and Spots",
      "Build reusable Sets",
      "Plan trips and events",
      "Coordinate gear with other people",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteMarketingUrl(item.path),
    })),
  };
}

export { DEFAULT_OG_IMAGE_ALT };
