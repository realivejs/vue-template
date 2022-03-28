const path = require('path');
const eslintWebpackPlugin = require("eslint-webpack-plugin");

/**
 * 配置eslint（vue-cli内置的eslint版本太低，为了满足其他插件升级，重新配置）
 * @param {object} config
 * @returns {void}
 */
function setEslintFormat(config) {
  const cwd = process.cwd();

  config.plugin('eslint').use(eslintWebpackPlugin, [
    {
      extensions: ['.js', '.jsx', '.vue'],
      cwd,
      context: cwd,
      threads: false,
      cache: true,
      eslintPath: require.resolve('eslint'),
      formatter: 'codeframe',
      emitWarning: true,
      fix: true,
    },
  ]);
}

/**
 * @description 设置less变量注入到vue文件中
 * @returns {object} less style-resources-loader配置
 */
function setGlobalLessVariates(config) {
  function unit(rule) {
    rule
      .use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [path.resolve(__dirname, '../src/assets/styles/variates.less')]
      })
  }

  const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  types.forEach((type) => unit(config.module.rule('less').oneOf(type)))
}

/**
 * 配置dev-server
 * @param {object} config
 * @returns {void}
 */
function extendDevServe() {
  const {
    VUE_APP_DEV_SERVER_PORT,
    VUE_APP_DEV_SERVER_TARGET,
    VUE_APP_DEV_SERVER_MODULE,
  } = process.env;

  return VUE_APP_DEV_SERVER_TARGET ? {
    disableHostCheck: true,
    port: VUE_APP_DEV_SERVER_PORT,
    overlay: false,
    proxy: {
      [VUE_APP_DEV_SERVER_MODULE]: {
        target: VUE_APP_DEV_SERVER_TARGET,
      },
    },
  } : {}
  
}

/**
 * 配置需要经过babel编译的包
 * @returns {void}
 */
function extendDependencies() {
  return ["counselor-sdk", "@realive/http"];
};

module.exports = {
  extendWebpack(config) {
    setEslintFormat(config);
    setGlobalLessVariates(config);
  },
  extendDependencies,
  extendDevServe,
};
