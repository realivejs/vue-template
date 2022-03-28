const {
  getPresetPackages,
  createConfig,
  initCommand,
  injectComposition,
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
    sideEffects: ["*.css", "*.vue"],
    scripts: injectPkgScripts(options),
    dependencies,
    devDependencies,
  });

  // 根据模版类型选项渲染对应的项目模版
  api.render(`./templates/${templateType}`);

  // 渲染配置文件
  api.render((files) => {
    createConfig(files, options);
  });

  api.onCreateComplete(() => {
    initCommand(process.cwd());
  });
};

module.exports.hooks = (api, options) => {
  api.afterInvoke(() => {
    injectComposition(api, options);
    injectMobileAdaptive(api, options);
  });
};
