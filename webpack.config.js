const path = require("path");

module.exports = {
  entry: "./src/renderer.js", // your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "resources/js"),
  },
  mode: "production",
  devServer: {
    proxy: {
      "/user/api.php": {
        target: "https://catbox.moe",
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
