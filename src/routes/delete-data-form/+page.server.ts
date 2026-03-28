import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { MARKETING_SITE_URL, SUPPORT_EMAIL_MAILTO } from "$lib/config/site";

const DELETE_REQUEST_SUBJECT = "Kwipoo data deletion request";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLATFORM_OPTIONS = new Set(["ios", "android", "web", "unknown"]);

function getStringValue(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function normalizeDetails(value: string): string {
  return value.replace(/\r\n/g, "\n").trim().slice(0, 2000);
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const accountEmail = getStringValue(formData, "accountEmail").toLowerCase();
    const fullName = getStringValue(formData, "fullName");
    const platform = getStringValue(formData, "platform");
    const details = normalizeDetails(getStringValue(formData, "details"));
    const isAccountOwner = formData.get("isAccountOwner") === "on";
    const understandsDeletion = formData.get("understandsDeletion") === "on";

    const values = {
      accountEmail,
      fullName,
      platform: PLATFORM_OPTIONS.has(platform) ? platform : "unknown",
      details,
      isAccountOwner,
      understandsDeletion,
    };

    const errors: Record<string, string> = {};

    if (!accountEmail) {
      errors.accountEmail = "Enter the email address tied to the account.";
    } else if (!EMAIL_PATTERN.test(accountEmail)) {
      errors.accountEmail = "Enter a valid email address.";
    }

    if (platform && !PLATFORM_OPTIONS.has(platform)) {
      errors.platform = "Choose one of the listed platform options.";
    }

    if (!isAccountOwner) {
      errors.isAccountOwner =
        "Confirm that you own the account or are authorized to make the request.";
    }

    if (!understandsDeletion) {
      errors.understandsDeletion =
        "Confirm that you understand the request may permanently delete the account and related data.";
    }

    if (Object.keys(errors).length > 0) {
      return fail(400, {
        errors,
        values,
      });
    }

    const platformLabel =
      values.platform === "ios"
        ? "iOS"
        : values.platform === "android"
          ? "Android"
          : values.platform === "web"
            ? "Web"
            : "Not sure";

    const messageBody = [
      "Please delete my Kwipoo account and associated user data.",
      "",
      `Account email: ${accountEmail}`,
      `Full name: ${fullName || "Not provided"}`,
      `Platform used: ${platformLabel}`,
      "",
      "Additional details:",
      details || "No additional details provided.",
      "",
      `Submitted from: ${MARKETING_SITE_URL}/delete-data-form`,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

    const mailtoHref =
      `${SUPPORT_EMAIL_MAILTO}?subject=${encodeURIComponent(DELETE_REQUEST_SUBJECT)}` +
      `&body=${encodeURIComponent(messageBody)}`;

    return {
      success: true,
      accountEmail,
      mailtoHref,
    };
  },
} satisfies Actions;
