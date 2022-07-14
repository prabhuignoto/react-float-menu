import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      bundler: "webpack",
      framework: "react",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  retries: 2,
  waitForAnimations: true,
});
