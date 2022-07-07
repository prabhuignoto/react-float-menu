module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "prettier",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "sort-keys-fix"],
  rules: {
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        ignoreCase: false,
        noSortAlphabetically: false,
        shorthandFirst: true,
      },
    ],
    "sort-keys": ["error", "asc", { caseSensitive: true, natural: true }],
    "sort-keys-fix/sort-keys-fix": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
