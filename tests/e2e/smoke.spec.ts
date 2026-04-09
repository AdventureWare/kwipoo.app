import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from "@playwright/test";

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

test("@smoke homepage renders primary marketing content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Kwipoo/i);
  await expect(
    headingLocator(
      page,
      1,
      /life is busy\.?\s*your stuff shouldn't make it busier/i,
    ),
  ).toBeVisible();
  await expect(actionLocator(page, /create free account/i)).toBeVisible();
  await expectJsonLdScriptsToParse(page);
});

test("@smoke homepage keeps the primary CTA and product proof available without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const primaryCta = actionLocator(page, /create free account/i);
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
        /practical guides for using kwipoo in real situations/i,
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

test("@smoke pricing page renders the draft plan structure", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing");

    await expect(
      headingLocator(
        page,
        1,
        /placeholder pricing scaffolding for free, premium, and custom plans/i,
      ),
    ).toBeVisible();
    await expect(headingLocator(page, 3, /^free$/i)).toBeVisible();
    await expect(headingLocator(page, 3, /^premium$/i)).toBeVisible();
    await expect(headingLocator(page, 3, /^custom$/i)).toBeVisible();
    await expect(actionLocator(page, /speak to sales/i)).toBeVisible();
    await expectJsonLdScriptsToParse(page);
  } else {
    const pricingResponse = await page.goto("/pricing");
    expect(pricingResponse?.status()).toBe(404);
  }
});

test("@smoke premium signup flow route resolves to either a wired handoff or a gated 404", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing/premium");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /start the premium signup flow/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: /continue to checkout|create account and upgrade|contact us about premium/i,
      }),
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
