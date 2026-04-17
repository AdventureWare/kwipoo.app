import { describe, expect, it } from "vitest";
import { buildMarketingAppHandoffHref } from "../../src/lib/analytics/handoff";

describe("marketing app analytics handoff", () => {
  it("preserves lean acquisition context on app signup links", () => {
    expect(
      buildMarketingAppHandoffHref({
        href: "https://kwipoo.vercel.app/login?mode=sign_up",
        currentPath: "/pricing",
        currentSearch:
          "?utm_source=instagram&utm_medium=social&utm_campaign=spring-launch",
        ctaLocation: "hero",
        ctaKind: "signup",
      }),
    ).toBe(
      "https://kwipoo.vercel.app/login?mode=sign_up&utm_source=instagram&utm_medium=social&utm_campaign=spring-launch&landing_path=%2Fpricing&cta_location=hero&cta_kind=signup",
    );
  });

  it("does not overwrite handoff values already present on the destination", () => {
    expect(
      buildMarketingAppHandoffHref({
        href: "https://kwipoo.vercel.app/login?mode=sign_up&utm_source=partner&landing_path=%2Fresources&cta_location=header_desktop&cta_kind=signup",
        currentPath: "/pricing",
        currentSearch:
          "?utm_source=instagram&utm_medium=social&utm_campaign=spring-launch",
        ctaLocation: "hero",
        ctaKind: "signup",
      }),
    ).toBe(
      "https://kwipoo.vercel.app/login?mode=sign_up&utm_source=partner&landing_path=%2Fresources&cta_location=header_desktop&cta_kind=signup&utm_medium=social&utm_campaign=spring-launch",
    );
  });

  it("leaves non-app links unchanged", () => {
    expect(
      buildMarketingAppHandoffHref({
        href: "https://kwipoo.app/support",
        currentPath: "/",
        currentSearch: "?utm_source=instagram",
        ctaLocation: "hero",
        ctaKind: "signup",
      }),
    ).toBe("https://kwipoo.app/support");
  });
});
