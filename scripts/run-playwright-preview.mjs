import { spawn } from "node:child_process";
import process from "node:process";

const PREVIEW_URL = "http://127.0.0.1:4173";
const PREVIEW_START_TIMEOUT_MS = 120_000;
const PREVIEW_POLL_INTERVAL_MS = 500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPreview(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Ignore connection failures while the preview server starts.
    }

    await sleep(PREVIEW_POLL_INTERVAL_MS);
  }

  throw new Error(`Preview server did not become ready at ${url}`);
}

function spawnCommand(command, args, extraEnv = {}) {
  return spawn(command, args, {
    cwd: process.cwd(),
    env: {
      ...process.env,
      ...extraEnv,
    },
    stdio: "inherit",
  });
}

async function main() {
  const playwrightArgs = process.argv.slice(2);
  const buildProcess = spawnCommand("npm", ["run", "build:e2e"]);

  const buildExitCode = await new Promise((resolve, reject) => {
    buildProcess.once("error", reject);
    buildProcess.once("exit", (code, signal) => {
      if (signal) {
        resolve(1);
        return;
      }

      resolve(code ?? 1);
    });
  });

  if (buildExitCode !== 0) {
    process.exitCode = buildExitCode;
    return;
  }

  const previewProcess = spawnCommand("npm", [
    "run",
    "preview",
    "--",
    "--host",
    "127.0.0.1",
    "--port",
    "4173",
  ]);

  let previewExitedEarly = false;
  let shuttingDownPreview = false;

  previewProcess.once("exit", (code, signal) => {
    if (shuttingDownPreview) {
      return;
    }

    previewExitedEarly = true;

    if (code !== null && code !== 0) {
      console.error(`Preview server exited early with code ${code}.`);
    } else if (signal) {
      console.error(`Preview server exited early with signal ${signal}.`);
    }
  });

  const stopPreview = () => {
    if (!previewProcess.killed) {
      shuttingDownPreview = true;
      previewProcess.kill("SIGTERM");
    }
  };

  process.on("SIGINT", stopPreview);
  process.on("SIGTERM", stopPreview);

  try {
    await waitForPreview(PREVIEW_URL, PREVIEW_START_TIMEOUT_MS);

    if (previewExitedEarly) {
      throw new Error("Preview server stopped before Playwright started.");
    }

    const playwrightProcess = spawnCommand(
      "npx",
      ["playwright", "test", ...playwrightArgs],
      { KWIPOO_MANAGE_PLAYWRIGHT_PREVIEW: "1" },
    );

    const exitCode = await new Promise((resolve, reject) => {
      playwrightProcess.once("error", reject);
      playwrightProcess.once("exit", (code, signal) => {
        if (signal) {
          resolve(1);
          return;
        }

        resolve(code ?? 1);
      });
    });

    process.exitCode = exitCode;
  } finally {
    stopPreview();
  }
}

await main();
