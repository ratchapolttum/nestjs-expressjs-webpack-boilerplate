const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const path = require("node:path");
const sourceMapSupport = require("source-map-support");

sourceMapSupport.install({
  environment: "node",
  handleUncaughtExceptions: true,
  hookRequire: true
});

/**
 * Compile the source code
 *
 * @param {import("webpack").Configuration} initial
 *
 * @returns {import("webpack").Configuration}
 */
module.exports = function compile(initial) {
  return {
    ...initial,
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2"
    },
    target: "node",
    mode: ["staging", "production"].includes(process.env.NODE_ENV) ? "production" : "development",
    devtool: "source-map",
    optimization: {
      ...initial.optimization,
      minimizer: [
        new TerserWebpackPlugin({
          extractComments: false,
          parallel: true,
          terserOptions: {
            ecma: 2020,
            keep_classnames: true,
            keep_fnames: true,
            mangle: true
          }
        })
      ]
    },
    plugins: [
      ...initial.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "environments",
            to: "environments"
          },
          {
            from: "resources",
            to: "resources"
          }
        ]
      })
    ]
  };
};
