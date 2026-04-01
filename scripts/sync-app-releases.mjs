import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import prettier from "prettier";

const execFileAsync = promisify(execFile);

const DEFAULT_APP_RELEASES_PATH =
  "/Users/colinfreed/Projects/AdventureWare/Products/Kwipoo/app/releases/derived/website/releases.json";

const OUTPUT_PATH = path.resolve("src/lib/content/releases.generated.ts");
const DRAFT_SUMMARY_PREFIX = "Draft release built from";
const DEFAULT_PLATFORM_TARGETS = ["web", "ios_wrapper", "android_wrapper"];
const TITLE_MAX_LENGTH = 84;
const SUMMARY_MAX_LENGTH = 280;

/**
 * @typedef {"quiet" | "notable" | "launch" | "urgent"} ReleaseImportance
 */

/**
 * @typedef {{
 *   version: string;
 *   slug: string;
 *   publishedAt: string;
 *   title: string;
 *   summary: string;
 *   highlights: string[];
 *   details: string[];
 *   importance: ReleaseImportance;
 *   platformTargets: string[];
 *   ctaLabel?: string;
 *   ctaHref?: string;
 * }} WebsiteReleaseNote
 */

/**
 * @typedef {{
 *   version: string;
 *   slug: string;
 *   publishedAt: string;
 *   title: string;
 *   summary: string;
 *   highlights: string[];
 *   details: string[];
 *   importance: ReleaseImportance;
 *   channels: string[];
 *   platformTargets: string[];
 *   ctaLabel?: string;
 *   ctaHref?: string;
 * }} ReleaseRecord
 */

/**
 * @typedef {{
 *   version: string;
 *   bullets: string[];
 *   hasMajorChanges: boolean;
 *   hasMinorChanges: boolean;
 * }} ChangelogSection
 */

function resolveAppReleasesPath() {
  const explicitFile = process.env.KWIPOO_APP_RELEASES_FILE;

  if (explicitFile) {
    return explicitFile;
  }

  const explicitRepo = process.env.KWIPOO_APP_REPO_PATH;

  if (explicitRepo) {
    return path.join(
      explicitRepo,
      "releases",
      "derived",
      "website",
      "releases.json",
    );
  }

  return DEFAULT_APP_RELEASES_PATH;
}

/**
 * @param {string} version
 */
function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);

  if (!match) {
    throw new Error(`Invalid semver version: ${version}`);
  }

  return match.slice(1).map((part) => Number(part));
}

/**
 * @param {string} left
 * @param {string} right
 */
function compareVersionsDesc(left, right) {
  const leftParts = parseVersion(left);
  const rightParts = parseVersion(right);

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return rightParts[index] - leftParts[index];
    }
  }

  return 0;
}

/**
 * @param {{ version: string; publishedAt: string }} left
 * @param {{ version: string; publishedAt: string }} right
 */
function compareReleaseRecordsDesc(left, right) {
  if (left.publishedAt !== right.publishedAt) {
    return right.publishedAt.localeCompare(left.publishedAt);
  }

  return compareVersionsDesc(left.version, right.version);
}

/**
 * @param {string} left
 * @param {string} right
 */
function isVersionAtOrBefore(left, right) {
  return compareVersionsDesc(left, right) >= 0;
}

/**
 * @param {string} left
 * @param {string} right
 */
function isVersionNewer(left, right) {
  return compareVersionsDesc(left, right) < 0;
}

/**
 * @param {unknown} error
 */
function isMissingFileError(error) {
  return (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ENOENT"
  );
}

/**
 * @param {string} candidatePath
 */
async function pathExists(candidatePath) {
  try {
    await fs.access(candidatePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * @param {string} sourcePath
 */
async function resolveAppRepoRoot(sourcePath) {
  const explicitRepo = process.env.KWIPOO_APP_REPO_PATH;

  if (explicitRepo) {
    return explicitRepo;
  }

  let currentDirectory = path.dirname(sourcePath);

  while (currentDirectory !== path.dirname(currentDirectory)) {
    if (
      (await pathExists(path.join(currentDirectory, "package.json"))) &&
      (await pathExists(path.join(currentDirectory, "CHANGELOG.md")))
    ) {
      return currentDirectory;
    }

    currentDirectory = path.dirname(currentDirectory);
  }

  if (
    (await pathExists(path.join(currentDirectory, "package.json"))) &&
    (await pathExists(path.join(currentDirectory, "CHANGELOG.md")))
  ) {
    return currentDirectory;
  }

  return null;
}

/**
 * @param {unknown} candidate
 */
function validateReleaseFeed(candidate) {
  if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
    throw new Error("Website release feed must be an object.");
  }

  const releases = /** @type {{ releases?: unknown }} */ (candidate).releases;

  if (!Array.isArray(releases)) {
    throw new Error("Website release feed must include a releases array.");
  }

  for (const [index, release] of releases.entries()) {
    validateWebsiteRelease(
      release,
      `Website release entry ${typeof release === "object" && release && "version" in release ? release.version : index + 1}`,
    );
  }

  return releases;
}

/**
 * @param {WebsiteReleaseNote} release
 * @param {string} [context]
 */
function validateWebsiteRelease(release, context = "Website release entry") {
  if (!release || typeof release !== "object" || Array.isArray(release)) {
    throw new Error(`${context} must be an object.`);
  }

  /** @type {(keyof WebsiteReleaseNote)[]} */
  const requiredStringFields = [
    "version",
    "slug",
    "publishedAt",
    "title",
    "summary",
    "importance",
  ];

  for (const field of requiredStringFields) {
    if (
      typeof release[field] !== "string" ||
      release[field].trim().length === 0
    ) {
      throw new Error(`${context} is missing "${field}".`);
    }
  }

  if (!/^\d+\.\d+\.\d+$/.test(release.version)) {
    throw new Error(`${context} has an invalid version "${release.version}".`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(release.publishedAt)) {
    throw new Error(
      `${context} has an invalid publishedAt date "${release.publishedAt}".`,
    );
  }

  if (!Array.isArray(release.highlights) || !Array.isArray(release.details)) {
    throw new Error(`${context} must include highlights and details arrays.`);
  }

  if (!Array.isArray(release.platformTargets)) {
    throw new Error(`${context} must include a platformTargets array.`);
  }
}

/**
 * @param {ReleaseRecord} record
 * @param {string} [context]
 */
function validateReleaseRecord(record, context = "Release record") {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`${context} must be an object.`);
  }

  /** @type {(keyof ReleaseRecord)[]} */
  const requiredStringFields = [
    "version",
    "slug",
    "publishedAt",
    "title",
    "summary",
    "importance",
  ];

  for (const field of requiredStringFields) {
    if (
      typeof record[field] !== "string" ||
      record[field].trim().length === 0
    ) {
      throw new Error(`${context} is missing "${field}".`);
    }
  }

  /** @type {(keyof ReleaseRecord)[]} */
  const requiredArrayFields = [
    "highlights",
    "details",
    "channels",
    "platformTargets",
  ];

  for (const field of requiredArrayFields) {
    if (!Array.isArray(record[field])) {
      throw new Error(`${context} field "${field}" must be an array.`);
    }
  }

  if (record.ctaLabel !== undefined && typeof record.ctaLabel !== "string") {
    throw new Error(`${context} has an invalid ctaLabel value.`);
  }

  if (record.ctaHref !== undefined && typeof record.ctaHref !== "string") {
    throw new Error(`${context} has an invalid ctaHref value.`);
  }
}

/**
 * @param {string} value
 * @param {number} maxLength
 */
function shortenText(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

/**
 * @param {string} value
 */
function sentenceCase(value) {
  if (!value) {
    return value;
  }

  return value[0].toUpperCase() + value.slice(1);
}

/**
 * @param {string} value
 */
function normalizeSentence(value) {
  const trimmedValue = value.trim().replace(/\s+/g, " ").replace(/`/g, "");

  if (!trimmedValue) {
    return "";
  }

  return /[.!?]$/.test(trimmedValue) ? trimmedValue : `${trimmedValue}.`;
}

/**
 * @param {string} value
 */
function cleanHeadlinePhrase(value) {
  return value
    .replace(/`/g, "")
    .replace(
      /^(Add|Improve|Fix|Make|Keep|Show|Move|Prevent|Return|Reduce|Restore|Update|Standardize|Polish|Refine|Tighten|Speed up)\s+/i,
      "",
    )
    .replace(/^(a|an|the)\s+/i, "")
    .split(
      /\s+(?:so|with|while|instead of|after|before|by|across|when|without)\s+/i,
    )[0]
    .replace(/[.,;:]+$/g, "")
    .trim();
}

/**
 * @param {string} version
 * @param {string[]} bullets
 */
function buildFallbackTitle(version, bullets) {
  const phrases = [
    ...new Set(bullets.map(cleanHeadlinePhrase).filter(Boolean)),
  ];

  if (phrases.length === 0) {
    return `Kwipoo ${version} update`;
  }

  if (phrases.length === 1) {
    return shortenText(sentenceCase(phrases[0]), TITLE_MAX_LENGTH);
  }

  return shortenText(
    `${sentenceCase(phrases[0])} and ${phrases[1]}`,
    TITLE_MAX_LENGTH,
  );
}

/**
 * @param {string[]} bullets
 */
function buildFallbackSummary(bullets) {
  return shortenText(
    bullets.slice(0, 3).map(normalizeSentence).join(" "),
    SUMMARY_MAX_LENGTH,
  );
}

/**
 * @param {string} value
 * @param {string} version
 */
function isDraftPlaceholderTitle(value, version) {
  return value.trim() === `Draft ${version} release`;
}

/**
 * @param {string} value
 */
function isDraftPlaceholderSummary(value) {
  return value.trim().startsWith(DRAFT_SUMMARY_PREFIX);
}

/**
 * @param {WebsiteReleaseNote} release
 * @returns {WebsiteReleaseNote}
 */
function normalizeReleaseEntry(release) {
  const normalizedRelease = {
    version: release.version,
    slug: release.slug,
    publishedAt: release.publishedAt,
    title: release.title,
    summary: release.summary,
    highlights: [...release.highlights],
    details: [...release.details],
    importance: release.importance,
    platformTargets: [...release.platformTargets],
    ...(release.ctaLabel ? { ctaLabel: release.ctaLabel } : {}),
    ...(release.ctaHref ? { ctaHref: release.ctaHref } : {}),
  };

  const fallbackBullets =
    normalizedRelease.highlights.length > 0
      ? normalizedRelease.highlights
      : normalizedRelease.details;

  if (
    fallbackBullets.length > 0 &&
    isDraftPlaceholderTitle(normalizedRelease.title, normalizedRelease.version)
  ) {
    normalizedRelease.title = buildFallbackTitle(
      normalizedRelease.version,
      fallbackBullets,
    );
  }

  if (
    fallbackBullets.length > 0 &&
    isDraftPlaceholderSummary(normalizedRelease.summary)
  ) {
    normalizedRelease.summary = buildFallbackSummary(fallbackBullets);
  }

  validateWebsiteRelease(
    normalizedRelease,
    `Website release ${normalizedRelease.version}`,
  );

  return normalizedRelease;
}

/**
 * @param {ReleaseRecord} record
 * @returns {WebsiteReleaseNote}
 */
function toWebsiteReleaseRecord(record) {
  validateReleaseRecord(record, `Release record ${record.version}`);

  return normalizeReleaseEntry({
    version: record.version,
    slug: record.slug,
    publishedAt: record.publishedAt,
    title: record.title,
    summary: record.summary,
    highlights: [...record.highlights],
    details: [...record.details],
    importance: record.importance,
    platformTargets: [...record.platformTargets],
    ...(record.ctaLabel ? { ctaLabel: record.ctaLabel } : {}),
    ...(record.ctaHref ? { ctaHref: record.ctaHref } : {}),
  });
}

/**
 * @param {string} directoryPath
 * @param {string} contextLabel
 * @returns {Promise<ReleaseRecord[]>}
 */
async function readReleaseRecordDirectory(directoryPath, contextLabel) {
  try {
    const fileNames = (await fs.readdir(directoryPath))
      .filter((fileName) => fileName.endsWith(".json"))
      .sort();
    const records = [];

    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      const record = JSON.parse(await fs.readFile(filePath, "utf8"));
      validateReleaseRecord(record, `${contextLabel} ${fileName}`);

      if (record.version !== fileName.replace(/\.json$/, "")) {
        throw new Error(
          `${contextLabel} ${fileName} must match version ${record.version}.`,
        );
      }

      records.push(record);
    }

    records.sort(compareReleaseRecordsDesc);
    return records;
  } catch (error) {
    if (isMissingFileError(error)) {
      return [];
    }

    throw error;
  }
}

/**
 * @param {string} changelogText
 * @returns {Map<string, ChangelogSection>}
 */
function parseChangelogSections(changelogText) {
  /** @type {Map<string, ChangelogSection>} */
  const sections = new Map();
  const lines = changelogText.split(/\r?\n/);
  /** @type {ChangelogSection | null} */
  let currentSection = null;

  for (const line of lines) {
    const versionMatch = /^## (\d+\.\d+\.\d+)$/.exec(line.trim());

    if (versionMatch) {
      if (currentSection) {
        sections.set(currentSection.version, currentSection);
      }

      currentSection = {
        version: versionMatch[1],
        bullets: [],
        hasMajorChanges: false,
        hasMinorChanges: false,
      };
      continue;
    }

    if (!currentSection) {
      continue;
    }

    const trimmedLine = line.trim();

    if (trimmedLine === "### Major Changes") {
      currentSection.hasMajorChanges = true;
      continue;
    }

    if (trimmedLine === "### Minor Changes") {
      currentSection.hasMinorChanges = true;
      continue;
    }

    if (trimmedLine.startsWith("- ")) {
      const separatorIndex = trimmedLine.lastIndexOf(" - ");
      const bulletText =
        separatorIndex >= 0
          ? trimmedLine.slice(separatorIndex + 3).trim()
          : trimmedLine.slice(2).trim();

      if (bulletText) {
        currentSection.bullets.push(bulletText);
      }
    }
  }

  if (currentSection) {
    sections.set(currentSection.version, currentSection);
  }

  return sections;
}

/**
 * @param {string} appRepoRoot
 * @param {string} version
 */
export async function resolveChangelogPublishedAtFromGit(appRepoRoot, version) {
  try {
    const { stdout } = await execFileAsync(
      "git",
      [
        "-C",
        appRepoRoot,
        "log",
        "--format=%cs",
        "-n",
        "1",
        "-S",
        `## ${version}`,
        "--",
        "CHANGELOG.md",
      ],
      { encoding: "utf8" },
    );

    const publishedAt = stdout.trim().split(/\r?\n/)[0]?.trim();

    return /^\d{4}-\d{2}-\d{2}$/.test(publishedAt) ? publishedAt : null;
  } catch {
    return null;
  }
}

/**
 * @param {ChangelogSection} section
 * @param {string} publishedAt
 * @returns {WebsiteReleaseNote}
 */
function buildChangelogFallbackRelease(section, publishedAt) {
  const bullets = section.bullets.map(normalizeSentence).filter(Boolean);
  const importance = section.hasMajorChanges
    ? "launch"
    : section.hasMinorChanges
      ? "notable"
      : "quiet";

  return normalizeReleaseEntry({
    version: section.version,
    slug: `release-${section.version.replace(/\./g, "-")}`,
    publishedAt,
    title: buildFallbackTitle(section.version, bullets),
    summary: buildFallbackSummary(bullets),
    highlights: bullets.slice(0, 3),
    details: bullets,
    importance,
    platformTargets: [...DEFAULT_PLATFORM_TARGETS],
  });
}

/**
 * @param {string} appRepoRoot
 */
async function readAppPackageVersion(appRepoRoot) {
  const packageJson = JSON.parse(
    await fs.readFile(path.join(appRepoRoot, "package.json"), "utf8"),
  );

  if (typeof packageJson.version !== "string") {
    throw new Error(`App package.json at ${appRepoRoot} is missing a version.`);
  }

  parseVersion(packageJson.version);
  return packageJson.version;
}

/**
 * @param {{
 *   sourcePath: string;
 *   changelogPublishedAtResolver?: (
 *     appRepoRoot: string,
 *     version: string,
 *   ) => Promise<string | null>;
 * }} options
 */
export async function collectWebsiteReleaseNotes({
  sourcePath,
  changelogPublishedAtResolver = resolveChangelogPublishedAtFromGit,
}) {
  const appRepoRoot = await resolveAppRepoRoot(sourcePath);
  let sourceText = null;

  try {
    sourceText = await fs.readFile(sourcePath, "utf8");
  } catch (error) {
    if (!isMissingFileError(error)) {
      throw error;
    }
  }

  const derivedReleases = sourceText
    ? validateReleaseFeed(JSON.parse(sourceText)).map(normalizeReleaseEntry)
    : [];

  if (!appRepoRoot) {
    return {
      releases: derivedReleases,
      appRepoRoot: null,
      currentVersion: null,
      usedFallback: false,
    };
  }

  const currentVersion = await readAppPackageVersion(appRepoRoot);
  const latestDerivedVersion = derivedReleases[0]?.version ?? null;
  const releasesByVersion = new Map(
    derivedReleases.map((release) => [release.version, release]),
  );
  let usedFallback = false;

  /**
   * @param {string} version
   */
  const shouldSupplementVersion = (version) =>
    isVersionAtOrBefore(version, currentVersion) &&
    (!latestDerivedVersion || isVersionNewer(version, latestDerivedVersion));

  const [publishedRecords, draftRecords] = await Promise.all([
    readReleaseRecordDirectory(
      path.join(appRepoRoot, "releases", "records"),
      "Published release record",
    ),
    readReleaseRecordDirectory(
      path.join(appRepoRoot, "releases", "drafts"),
      "Draft release record",
    ),
  ]);

  for (const record of [...publishedRecords, ...draftRecords]) {
    if (
      !record.channels.includes("website") ||
      !shouldSupplementVersion(record.version) ||
      releasesByVersion.has(record.version)
    ) {
      continue;
    }

    releasesByVersion.set(record.version, toWebsiteReleaseRecord(record));
    usedFallback = true;
  }

  const changelogPath = path.join(appRepoRoot, "CHANGELOG.md");

  if (await pathExists(changelogPath)) {
    const changelogSections = parseChangelogSections(
      await fs.readFile(changelogPath, "utf8"),
    );

    for (const [version, section] of changelogSections.entries()) {
      if (
        !shouldSupplementVersion(version) ||
        releasesByVersion.has(version) ||
        section.bullets.length === 0
      ) {
        continue;
      }

      const publishedAt = await changelogPublishedAtResolver(
        appRepoRoot,
        version,
      );

      if (!publishedAt) {
        continue;
      }

      releasesByVersion.set(
        version,
        buildChangelogFallbackRelease(section, publishedAt),
      );
      usedFallback = true;
    }
  }

  if (!releasesByVersion.has(currentVersion)) {
    throw new Error(
      [
        `The website release history is still missing app version ${currentVersion}.`,
        "Make sure the app repo has either:",
        "- a fresh releases/derived/website/releases.json snapshot,",
        "- a website-targeted release record in releases/records or releases/drafts, or",
        "- a matching CHANGELOG.md entry that can be used as a fallback.",
      ].join("\n"),
    );
  }

  return {
    releases: [...releasesByVersion.values()].sort(compareReleaseRecordsDesc),
    appRepoRoot,
    currentVersion,
    usedFallback,
  };
}

/**
 * @param {string} sourcePath
 * @param {unknown[]} releases
 */
export async function buildOutput(sourcePath, releases) {
  return prettier.format(
    [
      "// This file is generated by `npm run releases:sync`. Do not edit by hand.",
      `// Source: ${sourcePath}`,
      'import type { WebsiteReleaseNote } from "./releases";',
      "",
      `export const generatedReleaseNotes: WebsiteReleaseNote[] = ${JSON.stringify(releases, null, 2)};`,
      "",
    ].join("\n"),
    {
      parser: "typescript",
    },
  );
}

async function main() {
  const checkOnly = process.argv.includes("--check");
  const ifAvailable = process.argv.includes("--if-available");
  const sourcePath = resolveAppReleasesPath();

  let snapshot;

  try {
    snapshot = await collectWebsiteReleaseNotes({ sourcePath });
  } catch (error) {
    if (
      ifAvailable &&
      isMissingFileError(error) &&
      !(await resolveAppRepoRoot(sourcePath))
    ) {
      console.log(
        `Kwipoo app release sources not found near ${sourcePath}. Keeping existing website release snapshot.`,
      );
      return;
    }

    throw error;
  }

  if (
    ifAvailable &&
    snapshot.releases.length === 0 &&
    snapshot.appRepoRoot === null
  ) {
    console.log(
      `Kwipoo app release sources not found near ${sourcePath}. Keeping existing website release snapshot.`,
    );
    return;
  }

  const nextOutput = await buildOutput(sourcePath, snapshot.releases);

  if (checkOnly) {
    const currentOutput = await fs.readFile(OUTPUT_PATH, "utf8");

    if (currentOutput !== nextOutput) {
      throw new Error(
        [
          "The generated website release snapshot is out of sync with the app release sources.",
          `Run: KWIPOO_APP_RELEASES_FILE="${sourcePath}" npm run releases:sync`,
        ].join("\n"),
      );
    }

    console.log("Website release snapshot is in sync.");
    return;
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, nextOutput, "utf8");

  if (snapshot.usedFallback) {
    console.log(
      `Updated ${OUTPUT_PATH} using fallback release sources from ${snapshot.appRepoRoot}.`,
    );
    return;
  }

  console.log(`Updated ${OUTPUT_PATH}`);
}

const isMainModule =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMainModule) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
