import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    include: ["phosphor-svelte"],
  },
  ssr: {
    noExternal: ["phosphor-svelte"],
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
