import { expect, test, type APIRequestContext } from "@playwright/test";

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

test("@smoke homepage renders primary marketing content", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Kwipoo/i);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /life is busy\.?\s*your stuff shouldn't make it busier/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /create a free account today/i }),
  ).toBeVisible();
});

test("@smoke homepage keeps the primary CTA and product proof available without horizontal overflow", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const primaryCta = page.getByRole("button", {
    name: /create free account/i,
  });
  const heroImage = page.getByRole("img", { name: /kwipoo app interface/i });

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
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /^documentation$/i,
      }),
    ).toBeVisible();

    await page.goto("/docs/getting-started");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /getting started with kwipoo/i,
      }),
    ).toBeVisible();
  } else {
    const docsResponse = await page.goto("/docs");
    expect(docsResponse?.status()).toBe(404);

    const guideResponse = await page.goto("/docs/getting-started");
    expect(guideResponse?.status()).toBe(404);
  }

  await page.goto("/privacy-policy");
  await expect(
    page.getByRole("heading", { level: 1, name: /privacy policy/i }),
  ).toBeVisible();

  await page.goto("/terms-and-conditions");
  await expect(
    page.getByRole("heading", { level: 1, name: /terms and conditions/i }),
  ).toBeVisible();
});

test("@smoke resources landing page and guide routes resolve consistently", async ({
  page,
  request,
}) => {
  if (await resourcesAreAvailable(request)) {
    await page.goto("/resources");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /practical guides for organizing real life with kwipoo/i,
      }),
    ).toBeVisible();

    await page.goto("/resources/outdoor-adventurers");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /never lose track of your gear again/i,
      }),
    ).toBeVisible();
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
    page.getByRole("heading", {
      level: 1,
      name: /contact kwipoo support when you need help/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /email support/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /kwipoo-support@adventureware\.com/i }),
  ).toBeVisible();
});

test("@smoke pricing page renders the draft plan structure", async ({
  page,
  request,
}) => {
  if (await pricingIsAvailable(request)) {
    await page.goto("/pricing");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /placeholder pricing scaffolding for free, premium, and custom plans/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /^free$/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /^premium$/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 3, name: /^custom$/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /speak to sales/i }).first(),
    ).toBeVisible();
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
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

  const docsLink = page.getByRole("link", { name: /documentation/i });

  if (await docsAreAvailable(request)) {
    await expect(docsLink).toBeVisible();
  } else {
    await expect(docsLink).toHaveCount(0);
  }

  const footerPricingLink = page
    .getByRole("contentinfo")
    .getByRole("link", { name: /^pricing$/i });

  if (await pricingIsAvailable(request)) {
    await expect(footerPricingLink).toBeVisible();
  } else {
    await expect(footerPricingLink).toHaveCount(0);
  }

  const resourcesLink = page
    .getByRole("contentinfo")
    .getByRole("link", { name: /^resources$/i });

  if (await resourcesAreAvailable(request)) {
    await expect(resourcesLink).toBeVisible();
  } else {
    await expect(resourcesLink).toHaveCount(0);
  }

  await expect(
    page.getByRole("link", { name: /privacy policy/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("contentinfo").getByRole("link", { name: /^support$/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /terms & conditions/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /twitter/i })).toBeVisible();
});
