import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { collectWebsiteReleaseNotes } from "../../scripts/sync-app-releases.mjs";

const tempDirectories: string[] = [];

async function createTempDirectory() {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "kwipoo-website-releases-"),
  );
  tempDirectories.push(directory);
  return directory;
}

async function writeFile(filePath: string, content: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf8");
}

afterEach(async () => {
  await Promise.all(
    tempDirectories
      .splice(0)
      .map((directory) => fs.rm(directory, { recursive: true, force: true })),
  );
});

describe("collectWebsiteReleaseNotes", () => {
  it("supplements a stale derived website feed with newer draft records and changelog entries", async () => {
    const appRoot = await createTempDirectory();
    const sourcePath = path.join(
      appRoot,
      "releases",
      "derived",
      "website",
      "releases.json",
    );

    await writeFile(
      path.join(appRoot, "package.json"),
      JSON.stringify({ version: "1.7.1" }, null, 2),
    );
    await writeFile(
      path.join(appRoot, "CHANGELOG.md"),
      [
        "# kwipoo",
        "",
        "## 1.7.1",
        "",
        "### Patch Changes",
        "",
        "- metadata - Fix the thing cost field so decimal amounts stay in place while typing.",
        "",
        "## 1.7.0",
        "",
        "### Minor Changes",
        "",
        "- metadata - Add a new Import Things flow so you can paste a list of things and save them faster.",
        "",
        "## 1.6.0",
        "",
        "### Minor Changes",
        "",
        "- metadata - Add an Add Similar flow so you can start a new thing from an existing one.",
        "- metadata - Add an Add Multiple flow for saving several things in one session.",
        "",
      ].join("\n"),
    );
    await writeFile(
      sourcePath,
      JSON.stringify(
        {
          releases: [
            {
              version: "1.5.4",
              slug: "welcome-quick-start-and-faster-add-flows",
              publishedAt: "2026-03-25",
              title: "A clearer start and faster everyday entry",
              summary: "Canonical release summary.",
              highlights: ["Canonical highlight."],
              details: ["Canonical detail."],
              importance: "notable",
              platformTargets: ["web", "ios_wrapper", "android_wrapper"],
            },
          ],
        },
        null,
        2,
      ),
    );
    await writeFile(
      path.join(appRoot, "releases", "drafts", "1.7.1.json"),
      JSON.stringify(
        {
          version: "1.7.1",
          slug: "release-1-7-1",
          publishedAt: "2026-04-01",
          title: "Draft 1.7.1 release",
          summary:
            "Draft release built from 2 pending Changesets. Edit this summary before publishing.",
          highlights: [
            "Fix the thing cost field so decimal amounts stay in place while typing.",
            "Fix place and thing image uploads so successful uploads update production records immediately.",
          ],
          details: [
            "Fix the thing cost field so decimal amounts stay in place while typing.",
            "Fix place and thing image uploads so successful uploads update production records immediately.",
          ],
          importance: "quiet",
          channels: ["in_app_history", "website", "app_store"],
          platformTargets: ["web", "ios_wrapper", "android_wrapper"],
        },
        null,
        2,
      ),
    );
    await writeFile(
      path.join(appRoot, "releases", "drafts", "1.7.0.json"),
      JSON.stringify(
        {
          version: "1.7.0",
          slug: "release-1-7-0",
          publishedAt: "2026-03-31",
          title: "Draft 1.7.0 release",
          summary:
            "Draft release built from 29 pending Changesets. Edit this summary before publishing.",
          highlights: [
            "Add a new Import Things flow so you can paste a list of things, review them, and save them with shared defaults.",
            "Improve auth and drawer interactions so buttons show loading state more consistently.",
          ],
          details: [
            "Add a new Import Things flow so you can paste a list of things, review them, and save them with shared defaults.",
            "Improve auth and drawer interactions so buttons show loading state more consistently.",
          ],
          importance: "notable",
          channels: ["in_app_history", "website", "app_store"],
          platformTargets: ["web", "ios_wrapper", "android_wrapper"],
          ctaLabel: "Open What's New",
          ctaHref: "/updates",
        },
        null,
        2,
      ),
    );

    const snapshot = await collectWebsiteReleaseNotes({
      sourcePath,
      changelogPublishedAtResolver: async (_repoRoot, version) =>
        version === "1.6.0" ? "2026-03-28" : null,
    });

    expect(snapshot.usedFallback).toBe(true);
    expect(snapshot.currentVersion).toBe("1.7.1");
    expect(snapshot.releases.map((release) => release.version)).toEqual([
      "1.7.1",
      "1.7.0",
      "1.6.0",
      "1.5.4",
    ]);
    expect(snapshot.releases[0]).toMatchObject({
      version: "1.7.1",
      title: "Thing cost field and place and thing image uploads",
    });
    expect(snapshot.releases[0].summary).not.toContain("Draft release built");
    expect(snapshot.releases[2]).toMatchObject({
      version: "1.6.0",
      publishedAt: "2026-03-28",
      importance: "notable",
    });
  });

  it("fails when the current app version still has no website-visible release entry", async () => {
    const appRoot = await createTempDirectory();
    const sourcePath = path.join(
      appRoot,
      "releases",
      "derived",
      "website",
      "releases.json",
    );

    await writeFile(
      path.join(appRoot, "package.json"),
      JSON.stringify({ version: "1.7.1" }, null, 2),
    );
    await writeFile(
      path.join(appRoot, "CHANGELOG.md"),
      [
        "# kwipoo",
        "",
        "## 1.5.4",
        "",
        "### Patch Changes",
        "",
        "- x - Old.",
      ].join("\n"),
    );
    await writeFile(
      sourcePath,
      JSON.stringify(
        {
          releases: [
            {
              version: "1.5.4",
              slug: "release-1-5-4",
              publishedAt: "2026-03-25",
              title: "Existing release",
              summary: "Existing summary.",
              highlights: ["Existing highlight."],
              details: ["Existing detail."],
              importance: "quiet",
              platformTargets: ["web", "ios_wrapper", "android_wrapper"],
            },
          ],
        },
        null,
        2,
      ),
    );

    await expect(
      collectWebsiteReleaseNotes({
        sourcePath,
        changelogPublishedAtResolver: async () => null,
      }),
    ).rejects.toThrow("missing app version 1.7.1");
  });
});
