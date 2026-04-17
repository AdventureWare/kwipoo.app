import { defineConfig, devices } from "@playwright/test";

const manageWebServerInternally =
  process.env.KWIPOO_MANAGE_PLAYWRIGHT_PREVIEW !== "1";
const previewHost = "127.0.0.1";
const previewPort = process.env.KWIPOO_PLAYWRIGHT_PREVIEW_PORT ?? "4173";
const previewUrl = `http://${previewHost}:${previewPort}`;

const config = defineConfig({
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  retries: process.env.CI ? 1 : 0,
  webServer: manageWebServerInternally
    ? {
        command: `npm run build:e2e && npm run preview -- --host ${previewHost} --port ${previewPort}`,
        url: previewUrl,
        timeout: 120_000,
        reuseExistingServer: !process.env.CI,
      }
    : undefined,
  testDir: "tests/e2e",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: {
    baseURL: previewUrl,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "preview-desktop",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: previewUrl,
        viewport: { width: 1440, height: 960 },
      },
    },
    {
      name: "preview-mobile",
      use: {
        ...devices["iPhone 13"],
        baseURL: previewUrl,
      },
    },
    {
      name: "preview-narrow-mobile",
      use: {
        ...devices["iPhone SE"],
        baseURL: previewUrl,
      },
    },
  ],
});

export default config;
