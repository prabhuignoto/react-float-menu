export default {
  plugins: {
    "postcss-preset-env": {
      stage: 2,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
      },
    },
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true,
            },
            normalizeUnicode: false,
          },
        ],
      },
    }),
  },
};
