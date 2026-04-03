import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootScriptPath = path.resolve(
  scriptDir,
  "../../scripts/sync-shared-brand-theme.mjs",
);

const result = spawnSync(
  process.execPath,
  [rootScriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
