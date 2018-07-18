const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: ["catalog/loader", "raw-loader"]
    });

    return config;
  }
});
