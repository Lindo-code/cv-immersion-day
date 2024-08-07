const path = require("path");

module.exports = {
  mode: 'development',
  entry: { main: path.resolve("./my_script.js") },
  output: {
    path: path.resolve(__dirname, "build"),
  },
};