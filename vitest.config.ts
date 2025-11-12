import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  clearScreen: true,
  plugins: [react()],
  test: {
    cache: {
      dir: "./vitest_cache",
    },
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html", "lcov", "clover"],
      reportsDirectory: "./coverage",
    },
    environment: "jsdom",
    globals: true,
    include: ["src/**/*test.tsx"],
    maxThreads: 10,
    minThreads: 2,
    setupFiles: "./jest-setup.ts",
    // silent: true,
    threads: true,
    update: true,
    watch: true,
  },
});
