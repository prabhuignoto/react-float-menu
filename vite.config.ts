import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { readFileSync } from "fs";
import { resolve } from "path";

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "./package.json"), "utf-8")
);

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react(),
    dts({
      include: ["src", "globals.d.ts"],
      exclude: ["src/**/*.test.tsx", "src/**/*.scss"],
      rollupTypes: true,
      tsconfigPath: "./tsconfig.json",
      logLevel: "error",
      compilerOptions: {
        skipLibCheck: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/react-float-menu.ts"),
      name: "ReactFloatMenu",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          format: "es",
          entryFileNames: "react-float-menu.esm.js",
          chunkFileNames: "[name].[hash].esm.js",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "react-float-menu.cjs",
          chunkFileNames: "[name].[hash].cjs",
          dir: "dist",
        },
        {
          format: "umd",
          name: "ReactFloatMenu",
          entryFileNames: "react-float-menu.umd.js",
          chunkFileNames: "[name].[hash].umd.js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          dir: "dist",
        },
      ],
    },
    sourcemap: true,
    minify: "terser",
    cssCodeSplit: true,
  },
});
