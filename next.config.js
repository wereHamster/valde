const withTypescript = require("@zeit/next-typescript");

const urlLoader = mimetype => ({
  loader: "url-loader",
  options: {
    limit: 8192,
    fallback: "file-loader",
    mimetype,
    name: "[name]-[hash].[ext]",
    publicPath: "/_next/",
    outputPath: "static/"
  }
});

module.exports = withTypescript({
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: ["raw-loader"]
    });
    config.module.rules.push({
      test: /\.woff2$/,
      use: [urlLoader("font/woff2")]
    });

    config.node = {
      fs: "empty"
    };

    return config;
  }
});
