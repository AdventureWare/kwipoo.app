export const SITE_NAME = "Kwipoo";
export const SITE_TAGLINE =
  "Life is busy. Your stuff shouldn't make it busier.";
export const SITE_DESCRIPTION =
  "Kwipoo is a personal inventory and planning app that helps you track what you own, where it is stored, what belongs in each kit, and what you need for trips, hobbies, storage, and everyday life.";
export const SITE_KEYWORDS = [
  "personal inventory app",
  "home inventory app",
  "household inventory tracker",
  "inventory management app",
  "home organization app",
  "gear inventory app",
  "packing list app",
  "trip packing planner",
  "storage organization app",
  "household inventory",
  "gear organization",
  "equipment tracking app",
  "trip planning app",
].join(", ");
export const SITE_CATEGORY = "Productivity";
export const COMPANY_NAME = "AdventureWare";

export const MARKETING_SITE_URL = "https://kwipoo.app";
export const APP_URL = "https://kwipoo.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login`;
export const APP_SIGNUP_URL = `${APP_LOGIN_URL}?mode=sign_up`;

export const SUPPORT_EMAIL = "kwipoo-support@adventureware.com";
export const SUPPORT_EMAIL_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const COMPANY_WEBSITE_URL = "https://www.adventureware.com/";
export const DEFAULT_OG_IMAGE_PATH = "/assets/product_Feature.png";
export const DEFAULT_OG_IMAGE_ALT =
  "Kwipoo app interface showing personal inventory and planning tools";

export const SOCIAL_PROFILE_HREFS = {
  twitter: "https://twitter.com/KwipooApp",
  linkedin: "https://linkedin.com/company/kwipoo",
  instagram: "https://instagram.com/kwipoo",
} as const;

export const SOCIAL_PROFILE_URLS = Object.values(SOCIAL_PROFILE_HREFS);

export function isExternalHref(href: string): boolean {
  return (
    /^(?:[a-z]+:)?\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
