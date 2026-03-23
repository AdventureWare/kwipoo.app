import { browser } from "$app/environment";
import {
  ANALYTICS_ENABLED,
  ANALYTICS_PROVIDER,
  ANALYTICS_SCRIPT_URL,
  POSTHOG_HOST,
  POSTHOG_KEY,
} from "$lib/config/analytics";
import {
  ANALYTICS_EVENT_NAMES,
  createMarketingCtaClickedProperties,
  type MarketingCtaClickedInput,
  type MarketingPageViewProperties,
} from "$lib/analytics/schema";

export type AnalyticsEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type AnalyticsAdapter = {
  initialize: () => Promise<boolean>;
  page: (properties: AnalyticsEventProperties) => void;
  track: (event: string, properties?: AnalyticsEventProperties) => void;
};

type PostHogLike = {
  init: (apiKey: string, options?: Record<string, unknown>) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
  __kwipooInitialized?: boolean;
};

let initializationPromise: Promise<boolean> | undefined;

function getPostHog(): PostHogLike | undefined {
  return window.posthog;
}

function getNormalizedProperties(
  properties: AnalyticsEventProperties = {},
): Record<string, string | number | boolean | null> {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number | boolean | null>;
}

function getScriptElement(scriptUrl: string): HTMLScriptElement | null {
  return document.querySelector(`script[data-analytics-src="${scriptUrl}"]`);
}

async function loadAnalyticsScript(scriptUrl: string): Promise<void> {
  if (getScriptElement(scriptUrl)) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    script.async = true;
    script.src = scriptUrl;
    script.dataset.analyticsSrc = scriptUrl;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error(`Failed to load analytics script: ${scriptUrl}`));

    document.head.appendChild(script);
  });
}

const postHogAdapter: AnalyticsAdapter = {
  async initialize() {
    if (!POSTHOG_KEY) {
      return false;
    }

    if (!getPostHog() && ANALYTICS_SCRIPT_URL) {
      await loadAnalyticsScript(ANALYTICS_SCRIPT_URL);
    }

    const posthog = getPostHog();

    if (!posthog) {
      return false;
    }

    if (!posthog.__kwipooInitialized) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: false,
        capture_pageview: false,
        person_profiles: "identified_only",
      });
      posthog.__kwipooInitialized = true;
    }

    return true;
  },

  page(properties) {
    getPostHog()?.capture("$pageview", getNormalizedProperties(properties));
  },

  track(event, properties) {
    getPostHog()?.capture(event, getNormalizedProperties(properties));
  },
};

function getAnalyticsAdapter(): AnalyticsAdapter | undefined {
  if (ANALYTICS_PROVIDER === "posthog") {
    return postHogAdapter;
  }

  return undefined;
}

export function isAnalyticsEnabled(): boolean {
  return ANALYTICS_ENABLED;
}

export function initializeAnalytics(): Promise<boolean> {
  if (!browser || !ANALYTICS_ENABLED) {
    return Promise.resolve(false);
  }

  initializationPromise ??= (async () => {
    try {
      return (await getAnalyticsAdapter()?.initialize()) ?? false;
    } catch (error) {
      console.warn("Analytics initialization failed.", error);
      return false;
    }
  })();

  return initializationPromise;
}

export async function trackAnalyticsEvent(
  event: string,
  properties?: AnalyticsEventProperties,
): Promise<void> {
  if (!browser || !ANALYTICS_ENABLED) {
    return;
  }

  const initialized = await initializeAnalytics();

  if (!initialized) {
    return;
  }

  getAnalyticsAdapter()?.track(event, properties);
}

export function trackPageView(properties: MarketingPageViewProperties): void {
  if (!browser || !ANALYTICS_ENABLED) {
    return;
  }

  void initializeAnalytics().then((initialized) => {
    if (!initialized) {
      return;
    }

    getAnalyticsAdapter()?.page(properties);
  });
}

export function trackCtaClick(properties: MarketingCtaClickedInput): void {
  void trackAnalyticsEvent(
    ANALYTICS_EVENT_NAMES.marketingCtaClicked,
    createMarketingCtaClickedProperties(properties),
  );
}
