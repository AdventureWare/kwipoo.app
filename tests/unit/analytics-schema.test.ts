import { describe, expect, it } from "vitest";
import {
  ANALYTICS_EVENT_NAMES,
  createMarketingCtaClickedProperties,
  createMarketingPageViewProperties,
} from "../../src/lib/analytics/schema";

describe("analytics schema", () => {
  it("keeps event names centralized", () => {
    expect(ANALYTICS_EVENT_NAMES.marketingCtaClicked).toBe(
      "marketing_cta_clicked",
    );
  });

  it("builds marketing CTA properties with a stable source", () => {
    expect(
      createMarketingCtaClickedProperties({
        location: "hero",
        label: "Create Free Account",
        destination: "https://kwipoo.vercel.app/login?mode=sign_up",
        kind: "signup",
      }),
    ).toEqual({
      source: "marketing_site",
      location: "hero",
      label: "Create Free Account",
      destination: "https://kwipoo.vercel.app/login?mode=sign_up",
      kind: "signup",
    });
  });

  it("builds marketing pageview properties with a stable source", () => {
    expect(
      createMarketingPageViewProperties({
        path: "/",
        url: "https://kwipoo.app/",
        title: "Kwipoo",
        navigation_type: "initial_load",
        search: "",
      }),
    ).toEqual({
      source: "marketing_site",
      path: "/",
      url: "https://kwipoo.app/",
      title: "Kwipoo",
      navigation_type: "initial_load",
      search: "",
    });
  });
});
