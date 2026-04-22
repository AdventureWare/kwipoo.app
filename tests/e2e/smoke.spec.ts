import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { APP_URL } from "../../src/lib/config/site";

const PREVIEW_URL = `http://127.0.0.1:${process.env.KWIPOO_PLAYWRIGHT_PREVIEW_PORT ?? "4173"}`;

type AnalyticsCapturePayload = {
  event: string;
  properties?: Record<string, string | number | boolean | null>;
};

async function docsAreAvailable(request: APIRequestContext): Promise<boolean> {
  const response = await request.get("/docs");

  return response.status() === 200;
}

async function pricingIsAvailable(
  request: APIRequestContext,
): Promise<boolean> {
  const response = await request.get("/pricing");

  return response.status() === 200;
}

async function resourcesAreAvailable(
  request: APIRequestContext,
): Promise<boolean> {
  const response = await request.get("/resources");

  return response.status() === 200;
}

async function expectJsonLdScriptsToParse(page: Page): Promise<void> {
  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  expect(scripts.length).toBeGreaterThan(0);

  for (const scriptContent of scripts) {
    expect(scriptContent).not.toMatch(/\{[A-Za-z]+StructuredData\}/);
    expect(() => JSON.parse(scriptContent)).not.toThrow();
  }
}

async function expectCanonicalUrl(
  page: Page,
  expectedUrl: string,
): Promise<void> {
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    expectedUrl,
  );
}

function headingLocator(page: Page, level: 1 | 2 | 3, text: RegExp) {
  return page.locator(`h${level}`).filter({ hasText: text }).first();
}

function actionLocator(page: Page, text: RegExp) {
  return page.locator("a, button").filter({ hasText: text }).first();
}

function imageLocator(page: Page, altText: string) {
  return page.locator(`img[alt="${altText}"]`).first();
}

function footerLocator(page: Page) {
  return page.locator("footer, [role='contentinfo']").first();
}

async function installAnalyticsStub(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const trackedWindow = window as typeof window & {
      __kwipooPosthogEvents?: AnalyticsCapturePayload[];
      __kwipooPosthogInit?: {
        apiKey: string;
        options?: Record<string, unknown>;
      } | null;
      posthog?: {
        __kwipooInitialized?: boolean;
        init: (apiKey: string, options?: Record<string, unknown>) => void;
        capture: (event: string, properties?: Record<string, unknown>) => void;
      };
    };

    trackedWindow.__kwipooPosthogEvents = [];
    trackedWindow.__kwipooPosthogInit = null;
    trackedWindow.posthog = {
      __kwipooInitialized: false,
      init(apiKey, options) {
        trackedWindow.__kwipooPosthogInit = { apiKey, options };
        this.__kwipooInitialized = true;
      },
      capture(event, properties) {
        trackedWindow.__kwipooPosthogEvents?.push({
          event,
          properties: properties as
            | Record<string, string | number | boolean | null>
            | undefined,
        });
      },
    };
  });
}

async function getAnalyticsEvents(
  page: Page,
): Promise<AnalyticsCapturePayload[]> {
  return page.evaluate(() => {
    const trackedWindow = window as typeof window & {
      __kwipooPosthogEvents?: AnalyticsCapturePayload[];
    };

    return trackedWindow.__kwipooPosthogEvents ?? [];
  });
}

test("@smoke homepage renders primary marketing content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Kwipoo/i);
  await expect(
    headingLocator(
      page,
      1,
      /organize what you own\s*so you can find it, use it, and stop buying it twice/i,
    ),
  ).toBeVisible();
  await expect(actionLocator(page, /start free/i)).toBeVisible();
  await expectJsonLdScriptsToParse(page);
});

test("@smoke homepage emits pageview and CTA analytics with the marketing handoff payload", async ({
  page,
}) => {
  await installAnalyticsStub(page);
  await page.goto(
    "/?utm_source=newsletter&utm_medium=email&utm_campaign=spring-launch",
  );

  await page.waitForFunction(() => {
    const trackedWindow = window as typeof window & {
      __kwipooPosthogEvents?: Array<{ event: string }>;
    };

    return trackedWindow.__kwipooPosthogEvents?.some(
      (payload) => payload.event === "$pageview",
    );
  });

  const primaryCta = actionLocator(page, /start free/i).first();
  await expect(primaryCta).toBeVisible();
  await primaryCta.evaluate((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.target = "_blank";
    }
  });
  const popupPromise = page
    .waitForEvent("popup", { timeout: 5_000 })
    .catch(() => null);
  await primaryCta.click();
  const popup = await popupPromise;
  await popup?.close();

  await page.waitForFunction(() => {
    const trackedWindow = window as typeof window & {
      __kwipooPosthogEvents?: Array<{ event: string }>;
    };

    return trackedWindow.__kwipooPosthogEvents?.some(
      (payload) => payload.event === "marketing_cta_clicked",
    );
  });

  const analyticsEvents = await getAnalyticsEvents(page);
  const pageviewEvent = analyticsEvents.find(
    (payload) => payload.event === "$pageview",
  );
  const ctaEvent = analyticsEvents.find(
    (payload) => payload.event === "marketing_cta_clicked",
  );

  expect(pageviewEvent?.properties).toMatchObject({
    source: "marketing_site",
    path: "/",
    search:
      "?utm_source=newsletter&utm_medium=email&utm_campaign=spring-launch",
    navigation_type: "initial_load",
    url: `${PREVIEW_URL}/?utm_source=newsletter&utm_medium=email&utm_campaign=spring-launch`,
  });
  expect(ctaEvent?.properties).toMatchObject({
    source: "marketing_site",
    location: "hero",
    label: "Start Free",
    kind: "signup",
  });

  const ctaDestination = new URL(
    String(ctaEvent?.properties?.destination ?? ""),
  );
  expect(ctaDestination.origin).toBe(APP_URL);
  expect(ctaDestination.pathname).toBe("/login");
  expect(ctaDestination.searchParams.get("mode")).toBe("sign_up");
  expect(ctaDestination.searchParams.get("utm_source")).toBe("newsletter");
  expect(ctaDestination.searchParams.get("utm_medium")).toBe("email");
  expect(ctaDestination.searchParams.get("utm_campaign")).toBe("spring-launch");
  expect(ctaDestination.searchParams.get("landing_path")).toBe("/");
  expect(ctaDestination.searchParams.get("cta_location")).toBe("hero");
  expect(ctaDestination.searchParams.get("cta_kind")).toBe("signup");
});

test("@smoke homepage keeps the primary CTA and product proof available without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const primaryCta = actionLocator(page, /start free/i);
  const heroImage = imageLocator(page, "Kwipoo app interface");

  await expect(primaryCta).toBeVisible();
  await expect(heroImage).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(hasHorizontalOverflow).toBeFalsy();

  if (testInfo.project.name !== "preview-desktop") {
    const viewport = page.viewportSize();
    const ctaBounds = await primaryCta.boundingBox();

    expect(viewport).not.toBeNull();
    expect(ctaBounds).not.toBeNull();

    if (viewport && ctaBounds) {
      expect(ctaBounds.y + ctaBounds.height).toBeLessThanOrEqual(
        viewport.height,
      );
    }
  }
});

test("@smoke docs and legal pages render the expected headings", async ({
  page,
  request,
}) => {
  if (await docsAreAvailable(request)) {
    await page.goto("/docs");
    await expect(headingLocator(page, 1, /^documentation$/i)).toBeVisible();
    await expectCanonicalUrl(page, "https://kwipoo.app/docs");
    await expectJsonLdScriptsToParse(page);

    await page.goto("/docs/getting-started");
    await expect(
      headingLocator(page, 1, /getting started with kwipoo/i),
    ).toBeVisible();
    await expectCanonicalUrl(page, "https://kwipoo.app/docs/getting-started");
    await expectJsonLdScriptsToParse(page);
  } else {
    const docsResponse = await page.goto("/docs");
    expect(docsResponse?.status()).toBe(404);

    const guideResponse = await page.goto("/docs/getting-started");
    expect(guideResponse?.status()).toBe(404);
  }

  await page.goto("/privacy-policy");
  await expect(headingLocator(page, 1, /privacy policy/i)).toBeVisible();
  await expectJsonLdScriptsToParse(page);

  await page.goto("/terms-and-conditions");
  await expect(headingLocator(page, 1, /terms and conditions/i)).toBeVisible();
  await expectJsonLdScriptsToParse(page);
});

test("@smoke resources landing page and guide routes resolve consistently", async ({
  page,
  request,
}) => {
  if (await resourcesAreAvailable(request)) {
    await page.goto("/resources");
    await expect(
      headingLocator(
        page,
        1,
        /pick the guide that matches the problem you want to solve/i,
      ),
    ).toBeVisible();
    await expectJsonLdScriptsToParse(page);

    await page.goto("/resources/outdoor-adventurers");
    await expect(
      headingLocator(page, 1, /keep outdoor gear organized and trip-ready/i),
    ).toBeVisible();
    await expectJsonLdScriptsToParse(page);
  } else {
    const resourcesResponse = await page.goto("/resources");
    expect(resourcesResponse?.status()).toBe(404);

    const guideResponse = await page.goto("/resources/outdoor-adventurers");
    expect(guideResponse?.status()).toBe(404);
  }
});

test("@smoke resources hub guide clicks emit discovery analytics", async ({
  page,
  request,
}) => {
  if (!(await resourcesAreAvailable(request))) {
    test.skip(true, "Resources are not available");
  }

  await installAnalyticsStub(page);
  await page.goto("/resources");

  const guideLink = page.getByRole("link", {
    name: /build a home inventory you can actually keep updated/i,
  });
  await expect(guideLink).toBeVisible();
  await guideLink.click();

  await expect(page).toHaveURL(
    /\/resources\/home-inventory-that-stays-updated$/,
  );

  const analyticsEvents = await getAnalyticsEvents(page);
  const selectionEvent = analyticsEvents.find(
    (payload) => payload.event === "resource_guide_selected",
  );

  expect(selectionEvent?.properties).toMatchObject({
    source: "marketing_site",
    location: "resources_hub",
    content_slug: "home-inventory-that-stays-updated",
    content_title: "Build a home inventory you can actually keep updated",
    content_audience: "Home organizers and households",
    content_format: "Guide",
    content_read_time: "8 min read",
    destination: "/resources/home-inventory-that-stays-updated",
  });
});

test("@smoke resource guide CTA analytics include guide attribution", async ({
  page,
  request,
}) => {
  if (!(await resourcesAreAvailable(request))) {
    test.skip(true, "Resources are not available");
  }

  await installAnalyticsStub(page);
  await page.goto(
    "/resources/home-inventory-that-stays-updated?utm_source=search&utm_medium=organic&utm_campaign=resource-proof",
  );

  const guidePrimaryCta = actionLocator(page, /start free/i).first();
  await expect(guidePrimaryCta).toBeVisible();
  await guidePrimaryCta.evaluate((element) => {
    if (element instanceof HTMLAnchorElement) {
      element.target = "_blank";
    }
  });

  const popupPromise = page
    .waitForEvent("popup", { timeout: 5_000 })
    .catch(() => null);
  await guidePrimaryCta.click();
  const popup = await popupPromise;
  await popup?.close();

  await page.waitForFunction(() => {
    const trackedWindow = window as typeof window & {
      __kwipooPosthogEvents?: Array<{ event: string }>;
    };

    return trackedWindow.__kwipooPosthogEvents?.some(
      (payload) => payload.event === "marketing_cta_clicked",
    );
  });

  const analyticsEvents = await getAnalyticsEvents(page);
  const ctaEvent = analyticsEvents.find(
    (payload) => payload.event === "marketing_cta_clicked",
  );

  expect(ctaEvent?.properties).toMatchObject({
    source: "marketing_site",
    location: "resource_guide_header",
    label: "Start Free",
    kind: "signup",
    content_slug: "home-inventory-that-stays-updated",
    content_title: "Build a home inventory you can actually keep updated",
    content_audience: "Home organizers and households",
  });

  const ctaDestination = new URL(
    String(ctaEvent?.properties?.destination ?? ""),
  );
  expect(ctaDestination.origin).toBe(APP_URL);
  expect(ctaDestination.pathname).toBe("/login");
  expect(ctaDestination.searchParams.get("mode")).toBe("sign_up");
  expect(ctaDestination.searchParams.get("utm_source")).toBe("search");
  expect(ctaDestination.searchParams.get("utm_medium")).toBe("organic");
  expect(ctaDestination.searchParams.get("utm_campaign")).toBe(
    "resource-proof",
  );
  expect(ctaDestination.searchParams.get("landing_path")).toBe(
    "/resources/home-inventory-that-stays-updated",
  );
  expect(ctaDestination.searchParams.get("cta_location")).toBe(
    "resource_guide_header",
  );
  expect(ctaDestination.searchParams.get("cta_kind")).toBe("signup");
});

test("@smoke resource guide related-guide clicks emit in-guide discovery analytics", async ({
  page,
  request,
}) => {
  if (!(await resourcesAreAvailable(request))) {
    test.skip(true, "Resources are not available");
  }

  await installAnalyticsStub(page);
  await page.goto("/resources/home-inventory-that-stays-updated");

  const inlineRelatedSection = page.locator("section").filter({
    has: page.getByRole("heading", {
      name: /related guides in the same workflow/i,
    }),
  });
  const inlineRelatedGuide = inlineRelatedSection.getByRole("link", {
    name: /organize storage bins so you can find things later/i,
  });
  await expect(inlineRelatedGuide).toBeVisible();
  await inlineRelatedGuide.click();

  await expect(page).toHaveURL(
    /\/resources\/organize-storage-bins-find-things-later$/,
  );

  const analyticsEvents = await getAnalyticsEvents(page);
  const selectionEvent = analyticsEvents.find(
    (payload) =>
      payload.event === "resource_guide_selected" &&
      payload.properties?.location === "resource_guide_inline_related",
  );

  expect(selectionEvent?.properties).toMatchObject({
    source: "marketing_site",
    location: "resource_guide_inline_related",
    content_slug: "organize-storage-bins-find-things-later",
    content_title: "Organize storage bins so you can find things later",
    content_audience: "Households using bins, totes, and seasonal storage",
    content_format: "Guide",
    content_read_time: "7 min read",
    destination: "/resources/organize-storage-bins-find-things-later",
    parent_content_slug: "home-inventory-that-stays-updated",
    parent_content_title:
      "Build a home inventory you can actually keep updated",
    parent_content_audience: "Home organizers and households",
  });
});

test("@smoke support page renders the support entry points", async ({
  page,
}) => {
  await page.goto("/support");

  await expect(
    headingLocator(page, 1, /contact kwipoo support when you need help/i),
  ).toBeVisible();
  await expect(actionLocator(page, /^email support$/i)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /kwipoo-support@adventureware\.com/i }),
  ).toBeVisible();
  await expectJsonLdScriptsToParse(page);
});

test("@smoke account deletion page renders the account deletion request path", async ({
  page,
}) => {
  await page.goto("/delete-account-form");

  await expect(
    headingLocator(page, 1, /request deletion of your kwipoo account/i),
  ).toBeVisible();
  await expect(
    actionLocator(page, /submit account deletion request/i),
  ).toBeVisible();
  await expectJsonLdScriptsToParse(page);
});

test("@smoke pricing page renders the live freemium plan structure", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing");

    await expect(
      headingLocator(
        page,
        1,
        /free for up to 100 things\. premium when you need real room to grow\./i,
      ),
    ).toBeVisible();
    await expect(headingLocator(page, 3, /^free$/i)).toBeVisible();
    await expect(headingLocator(page, 3, /^premium$/i)).toBeVisible();
    await expect(headingLocator(page, 3, /^custom$/i)).toBeVisible();
    await expect(actionLocator(page, /buy premium/i)).toBeVisible();
    await expect(
      actionLocator(page, /manage( your)? subscription/i),
    ).toBeVisible();
    await expect(actionLocator(page, /speak to sales/i)).toBeVisible();
    await expectJsonLdScriptsToParse(page);
  } else {
    const pricingResponse = await page.goto("/pricing");
    expect(pricingResponse?.status()).toBe(404);
  }
});

test("@smoke premium page exposes purchase and management handoffs or a gated 404", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing/premium");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /buy premium or manage the subscription you already have/i,
      }),
    ).toBeVisible();
    await expect(actionLocator(page, /buy premium/i)).toBeVisible();
    await expect(
      actionLocator(page, /manage( your)? subscription/i),
    ).toBeVisible();
    await expectJsonLdScriptsToParse(page);
  } else {
    const premiumSignupResponse = await page.goto("/pricing/premium");
    expect(premiumSignupResponse?.status()).toBe(404);
  }
});

test("@smoke mock premium checkout route renders an interactive purchase shell", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing/premium/mock-checkout");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /try the premium purchase process without taking a real payment/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /review mock purchase/i }),
    ).toBeVisible();
    await expectJsonLdScriptsToParse(page);
  } else {
    const mockCheckoutResponse = await page.goto(
      "/pricing/premium/mock-checkout",
    );
    expect(mockCheckoutResponse?.status()).toBe(404);
  }
});

test("@smoke homepage footer links and social actions remain accessible on narrow screens", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const footer = footerLocator(page);

  await footer.scrollIntoViewIfNeeded();

  const docsLink = footer.getByRole("link", { name: /documentation/i });

  if (await docsAreAvailable(request)) {
    await expect(docsLink).toBeVisible();
  } else {
    await expect(docsLink).toHaveCount(0);
  }

  const footerPricingLink = footer.getByRole("link", { name: /^pricing$/i });

  if (await pricingIsAvailable(request)) {
    await expect(footerPricingLink).toBeVisible();
  } else {
    await expect(footerPricingLink).toHaveCount(0);
  }

  const resourcesLink = footer.getByRole("link", { name: /^resources$/i });

  if (await resourcesAreAvailable(request)) {
    await expect(resourcesLink).toBeVisible();
  } else {
    await expect(resourcesLink).toHaveCount(0);
  }

  await expect(
    page.getByRole("link", { name: /privacy policy/i }),
  ).toBeVisible();
  await expect(footer.getByRole("link", { name: /^support$/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /delete account request/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /terms & conditions/i }),
  ).toBeVisible();
  await expect(footer.getByLabel(/twitter/i)).toBeVisible();
});
