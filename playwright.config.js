import { defineConfig, devices } from "@playwright/test";

const config = defineConfig({
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  retries: process.env.CI ? 1 : 0,
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "tests/e2e",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "preview-desktop",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://127.0.0.1:4173",
        viewport: { width: 1440, height: 960 },
      },
    },
    {
      name: "preview-mobile",
      use: {
        ...devices["iPhone 13"],
        baseURL: "http://127.0.0.1:4173",
      },
    },
    {
      name: "preview-narrow-mobile",
      use: {
        ...devices["iPhone SE"],
        baseURL: "http://127.0.0.1:4173",
      },
    },
  ],
});

export default config;
