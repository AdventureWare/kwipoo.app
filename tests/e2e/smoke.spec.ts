import { expect, test } from "@playwright/test";
import { DOCS_ENABLED } from "../../src/lib/config/site";

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

  const primaryCta = page.getByRole("button", { name: /open in browser/i });
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
}) => {
  if (DOCS_ENABLED) {
    await page.goto("/docs");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /welcome to kwipoo documentation/i,
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

test("@smoke homepage footer links and social actions remain accessible on narrow screens", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

  const docsLink = page.getByRole("link", { name: /documentation/i });

  if (DOCS_ENABLED) {
    await expect(docsLink).toBeVisible();
  } else {
    await expect(docsLink).toHaveCount(0);
  }

  await expect(
    page.getByRole("link", { name: /privacy policy/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /terms & conditions/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /twitter/i })).toBeVisible();
});
