export const SITE_NAME = "Kwipoo";
export const COMPANY_NAME = "AdventureWare";

export const MARKETING_SITE_URL = "https://kwipoo.app";
export const APP_URL = "https://kwipoo.vercel.app";
export const APP_LOGIN_URL = `${APP_URL}/login`;

export const SUPPORT_EMAIL = "kwipoo-support@adventureware.com";
export const SUPPORT_EMAIL_MAILTO = `mailto:${SUPPORT_EMAIL}`;

export const COMPANY_WEBSITE_URL = "https://www.adventureware.com/";

export function isExternalHref(href: string): boolean {
  return (
    /^(?:[a-z]+:)?\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
