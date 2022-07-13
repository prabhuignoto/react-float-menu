// Generated using webpack-cli https://github.com/webpack/webpack-cli

const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const PostCSSpresetEnv = require("postcss-preset-env");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const NodeExternals = require("webpack-node-externals");
const pkg = require("./package.json");
const CopyPlugin = require("copy-webpack-plugin");
const { BannerPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  devtool: "source-map",
  entry: "./src/react-float-menu.ts",
  externals: [
    NodeExternals({
      allowlist: ["nanoid", "classnames"],
    }),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-transform-runtime"],
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer(), PostCSSpresetEnv()],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  output: {
    clean: true,
    filename: pkg.name + ".js",
    library: {
      name: pkg.name,
      type: "umd",
    },
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: pkg.name + ".css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "README.md",
          to: "README.md",
        },
      ],
    }),
    new BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} | ${pkg.author}`,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = (_, argv) => {
  if (argv.mode === "production") {
    config.mode = "production";
    config.optimization = {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    };
  } else if (argv.mode === "development") {
    config.mode = "development";
    config.plugins = config.plugins.concat([
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        openAnalyzer: true,
      }),
    ]);
  }
  return config;
};
