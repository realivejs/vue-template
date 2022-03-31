const {
  getPresetPackages,
  createConfig,
  initCommand,
  injectMainFile,
  injectMobileAdaptive,
  injectPkgScripts,
} = require("./helpers");

module.exports = (api, options) => {
  const { templateType } = options;
  const { dependencies, devDependencies } = getPresetPackages(options);

  // 删除vue-cli默认创建的目录和文件结构
  api.render((files) => {
    Object.keys(files).forEach((path) => {
      if (!path.includes("package.json")) delete files[path];
    });
  });

  // 扩展vue-cli生成的package文件
  api.extendPackage({
    sideEffects: ["*.css", "*.vue", "*.less"],
    scripts: injectPkgScripts(options),
    dependencies,
    devDependencies,
  });

  // 根据模版类型选项渲染对应的项目模版
  api.render(`./templates/${templateType}`, options);

  // 渲染配置文件
  api.render((files) => {
    createConfig(files, options);
  });

  // 单独渲染vue.config文件，render方法当参数为function时，内部不传递option
  api.render({
    "scripts/extends.js": "./config-template/vue.extend.config.tpl",
    "vue.config.js": "./config-template/vue.config.tpl",
  });

  api.onCreateComplete(() => {
    initCommand(process.cwd());
  });
};

module.exports.hooks = (api, options) => {
  api.afterInvoke(() => {
    injectMainFile(api, options);
    injectMobileAdaptive(api, options);
  });
};
