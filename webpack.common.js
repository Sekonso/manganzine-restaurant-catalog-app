const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 60,
          progressive: true,
        }),
      ],
    }),

    new MiniCssExtractPlugin(),

    new WebpackPwaManifest({
      id: "manganzine-catalogoue-pwa",
      name: "Manganzine restaurant catalog app",
      short_name: "Manganzine",
      description: "Progressive web apps daftar katalog restoran",
      theme_color: "#e10135",
      background_color: "#e10135",
      orientation: "any",
      display: "standalone",
      dir: "auto",
      lang: "id",
      icons: [
        {
          src: path.resolve(__dirname, "src/assets/icons/icon_rounded.png"),
          sizes: [96, 128, 192, 256, 384, 512],
        },
        {
          src: path.resolve(
            __dirname,
            "src/assets/src/assets/icons/icon_maskable.png"
          ),
          size: "1024x1024",
          purpose: "maskable",
        },
      ],
    }),

    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "./sw.bundle.js",
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev/list"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "restaurant-api-dicoding-list",
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev/images/"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "restaurant-api-dicoding-images",
          },
        },

        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://restaurant-api.dicoding.dev/detail/"),
          handler: "NetworkFirst",
          options: {
            cacheName: "restaurant-api-dicoding-detail",
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith("https://kit.fontawesome.com/4d69af1ea6.js"),
          handler: "CacheFirst",
          options: {
            cacheName: "fontawesome-kit",
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "google-fonts-webfonts",
          },
        },
      ],
    }),
  ],
};
