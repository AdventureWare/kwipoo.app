import { devices } from "@playwright/test";

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: "npm run preview -- --host localhost --port 4173",
    url: "http://localhost:4173",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: {
    baseURL: "http://localhost:4173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "preview-desktop",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://localhost:4173",
        viewport: { width: 1440, height: 960 },
      },
    },
    {
      name: "preview-mobile",
      use: {
        ...devices["iPhone 13"],
        baseURL: "http://localhost:4173",
      },
    },
    {
      name: "preview-narrow-mobile",
      use: {
        ...devices["iPhone SE"],
        baseURL: "http://localhost:4173",
      },
    },
  ],
};

export default config;
