const { extendWebpack,extendDependencies, extendDevServe } = require("./scripts/extends");
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack(config) {
    extendWebpack(config);
  },
  transpileDependencies: extendDependencies(),
  devServer: extendDevServe(),
  lintOnSave: true,
});
