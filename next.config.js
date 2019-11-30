const withTypescript = require("@zeit/next-typescript");

const urlLoader = ({ mimetype, dev, isServer }) => ({
  loader: "url-loader",
  options: {
    limit: 256,
    fallback: "file-loader",
    mimetype,
    name: dev ? "[name].[ext]" : "[name]-[hash].[ext]",
    publicPath: `/_next/static/`,
    outputPath: `${isServer ? "../" : ""}static/`
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
