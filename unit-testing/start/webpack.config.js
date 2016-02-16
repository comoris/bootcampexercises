var webpackConfigFactory = require("./webpack.config.factory.js");
module.exports = webpackConfigFactory(process.env.NODE_ENV);
