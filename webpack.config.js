const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const webpackMode = process.env.NODE_ENV;

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  mode: webpackMode,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  optimization: {
    minimizer:
      webpackMode === "production"
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
            new CssMinimizerPlugin(),
          ]
        : [],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        resolve: {
          extensions: ["", ".js", ".jsx"],
        },
      },
      {
        test: /\.?(js|jsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          webpackMode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      styles: path.resolve(__dirname, "src/styles"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
