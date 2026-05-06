import { describe, expect, it } from "vitest";
import { isExternalHref, shouldResolveInternalHref } from "$lib/config/site";

describe("site link helpers", () => {
  it("identifies external browser destinations", () => {
    expect(isExternalHref("https://kwipoo.app/docs")).toBe(true);
    expect(isExternalHref("//cdn.example.com/app.js")).toBe(true);
    expect(isExternalHref("mailto:kwipoo-support@adventureware.com")).toBe(
      true,
    );
    expect(isExternalHref("tel:+15555555555")).toBe(true);
    expect(isExternalHref("/docs/things")).toBe(false);
  });

  it("only sends root-relative internal paths through SvelteKit resolve", () => {
    expect(shouldResolveInternalHref("/docs/things")).toBe(true);
    expect(shouldResolveInternalHref("/docs/things#fields")).toBe(true);
    expect(shouldResolveInternalHref("./docs/things")).toBe(false);
    expect(shouldResolveInternalHref("../docs/things")).toBe(false);
    expect(shouldResolveInternalHref("#fields")).toBe(false);
    expect(shouldResolveInternalHref("?tab=details")).toBe(false);
    expect(shouldResolveInternalHref("https://kwipoo.app/docs")).toBe(false);
    expect(shouldResolveInternalHref("//cdn.example.com/app.js")).toBe(false);
    expect(
      shouldResolveInternalHref("mailto:kwipoo-support@adventureware.com"),
    ).toBe(false);
  });
});
