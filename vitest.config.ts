import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react],
  clearScreen: true,
  test: {
    coverage: {
      enabled: true,
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportsDirectory: "./coverage",
    },
    setupFiles: "./jest-setup.ts",
    environment: "jsdom",
    update: true,
    watch: true,
    threads: true,
    silent: true,
    globals: true,
  },
});
