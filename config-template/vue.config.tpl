const { extendWebpack,extendDependencies, extendDevServe } = require("./scripts/extends");

module.exports = {
  chainWebpack(config) {
    extendWebpack(config);
  },
  transpileDependencies: extendDependencies(),
  devServer: extendDevServe(),
  lintOnSave: true,
};
