import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type MockPostHog = {
  init: ReturnType<typeof vi.fn>;
  capture: ReturnType<typeof vi.fn>;
  __kwipooInitialized?: boolean;
};

type MockScriptElement = {
  async: boolean;
  src: string;
  dataset: Record<string, string>;
  onload?: () => void;
  onerror?: () => void;
};

function createMockPostHog(): MockPostHog {
  return {
    init: vi.fn(),
    capture: vi.fn(),
  };
}

function createMockDocument() {
  const scripts: MockScriptElement[] = [];

  return {
    scripts,
    document: {
      head: {
        innerHTML: "",
        appendChild: vi.fn((node: MockScriptElement) => {
          scripts.push(node);
          return node;
        }),
      },
      createElement: vi.fn((tagName: string) => {
        if (tagName !== "script") {
          throw new Error(`Unsupported element in test: ${tagName}`);
        }

        return {
          async: false,
          src: "",
          dataset: {},
        } satisfies MockScriptElement;
      }),
      querySelector: vi.fn((selector: string) => {
        if (selector === "[data-analytics-src]") {
          return scripts.find((script) => script.dataset.analyticsSrc) ?? null;
        }

        const scriptMatch = selector.match(
          /^script\[data-analytics-src="(.+)"\]$/,
        );

        if (scriptMatch) {
          return (
            scripts.find(
              (script) => script.dataset.analyticsSrc === scriptMatch[1],
            ) ?? null
          );
        }

        return null;
      }),
    },
  };
}

let mockPostHog = createMockPostHog();
let mockDom = createMockDocument();

function setWindowPostHog(posthog: MockPostHog): void {
  const runtimeWindow = window as Window & {
    posthog?: {
      init: (apiKey: string, options?: Record<string, unknown>) => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
      __kwipooInitialized?: boolean;
    };
  };

  runtimeWindow.posthog = posthog as unknown as NonNullable<
    typeof runtimeWindow.posthog
  >;
}

async function loadAnalytics({
  scriptUrl,
  hasConsent = true,
}: {
  scriptUrl?: string;
  hasConsent?: boolean;
} = {}) {
  mockPostHog = createMockPostHog();

  vi.resetModules();
  vi.doMock("$app/environment", () => ({ browser: true }));
  vi.doMock("$lib/config/analytics", () => ({
    ANALYTICS_ENABLED: true,
    ANALYTICS_PROVIDER: "posthog",
    ANALYTICS_SCRIPT_URL: scriptUrl,
    POSTHOG_HOST: "https://us.i.posthog.com",
    POSTHOG_KEY: "phc_test_website_key",
  }));
  vi.doMock("$lib/analytics/consent", () => ({
    hasAnalyticsConsent: () => hasConsent,
  }));
  vi.doMock("posthog-js", () => ({
    default: mockPostHog,
  }));

  return {
    analytics: await import("../../src/lib/analytics"),
    posthog: mockPostHog,
  };
}

beforeEach(() => {
  mockDom = createMockDocument();
  vi.stubGlobal("window", {});
  vi.stubGlobal("document", mockDom.document);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
  vi.doUnmock("$app/environment");
  vi.doUnmock("$lib/config/analytics");
  vi.doUnmock("$lib/analytics/consent");
  vi.doUnmock("posthog-js");
});

describe("analytics initialization", () => {
  it("loads posthog-js directly when no analytics script url is configured", async () => {
    const { analytics, posthog } = await loadAnalytics();

    await expect(analytics.initializeAnalytics()).resolves.toBe(true);

    expect(posthog.init).toHaveBeenCalledWith(
      "phc_test_website_key",
      expect.objectContaining({
        api_host: "https://us.i.posthog.com",
        autocapture: false,
        capture_pageview: false,
        person_profiles: "identified_only",
      }),
    );
    expect(mockDom.document.querySelector("[data-analytics-src]")).toBeNull();

    await analytics.trackAnalyticsEvent("marketing_cta_clicked", {
      label: "Get Started",
      source: "marketing_site",
    });

    expect(posthog.capture).toHaveBeenCalledWith("marketing_cta_clicked", {
      label: "Get Started",
      source: "marketing_site",
    });
  });

  it("prefers the custom analytics script when one is configured", async () => {
    mockDom.document.head.appendChild.mockImplementation(
      (node: MockScriptElement) => {
        mockDom.scripts.push(node);
        setWindowPostHog(mockPostHog);
        node.onload?.();
        return node;
      },
    );

    const { analytics, posthog } = await loadAnalytics({
      scriptUrl: "https://cdn.example.com/posthog-stub.js",
    });

    await expect(analytics.initializeAnalytics()).resolves.toBe(true);

    expect(posthog.init).toHaveBeenCalledTimes(1);
    expect(
      mockDom.document.querySelector(
        'script[data-analytics-src="https://cdn.example.com/posthog-stub.js"]',
      ),
    ).not.toBeNull();
  });

  it("does not initialize or track before analytics consent", async () => {
    const { analytics, posthog } = await loadAnalytics({ hasConsent: false });

    await expect(analytics.initializeAnalytics()).resolves.toBe(false);
    await analytics.trackAnalyticsEvent("marketing_cta_clicked", {
      label: "Get Started",
    });
    analytics.trackPageView({
      source: "marketing_site",
      path: "/",
      url: "https://kwipoo.app/",
      title: "Kwipoo",
      navigation_type: "initial_load",
    });

    expect(posthog.init).not.toHaveBeenCalled();
    expect(posthog.capture).not.toHaveBeenCalled();
  });
});
