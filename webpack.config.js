var path = require('path');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: "./lib/rebound.js",
  resolve: {
    modules: [ path.resolve(__dirname, "lib"), "node_modules" ],
    extensions: [ '.js', '.json' ]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
};
