const webpack = require('webpack');
const path = require("path");

module.exports = {
  mode: "development",
  entry: { main: path.resolve("./src/my_script.js") },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.WEATHER_API_KEY": JSON.stringify(
        process.env.WEATHER_API_KEY
      ),
      "process.env.NEWS_API_KEY": JSON.stringify(process.env.NEWS_API_KEY),
    }),
  ],
};
