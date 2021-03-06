const {
  VUE_V2_TS,
  VUE_V3_TS,
  BASE_PACKAGES,
  COMPOSITION_API_PACKAGES,
  PINIA_PACKAGES,
  UI_PACKAGES,
  COMMON_PACKAGES,
  MOBILE_PACKAGES,
  WIND_CSS_PACKAGES,
  VUEX_PACKAGES,
} = require("../constants");

const { isVuex, isPinia, isVue2 } = require("./check");
const { run } = require("./command");

/**
 * 合并对象
 * @param {JSON} basePkgs
 * @param {JSON} extendPkgs
 * @returns {JSON}
 */
function mergePackages(basePkgs, extendPkgs) {
  return {
    dependencies: {
      ...(basePkgs.dependencies || {}),
      ...(extendPkgs.dependencies || {}),
    },
    devDependencies: {
      ...(basePkgs.devDependencies || {}),
      ...(extendPkgs.devDependencies || {}),
    },
  };
}

/**
 * 根据prompt回答获取预设package
 * @param {{templateType: string, needCompositionApi: boolean, needPinia: boolean, needWindiCss: boolean, uiFramework: string }} options
 * @returns {{dependencies: JSON, devDependencies: JSON}}
 */
function getPresetPackages(options) {
  const {
    templateType,
    storeType,
    needWindiCss,
    uiFramework,
    needMobileAdapter,
  } = options;

  let { needCompositionApi } = options;

  const baseType = `vue-v${templateType.match(/\d/)[0]}`;

  let basePkgs = BASE_PACKAGES[baseType];

  // vue2选择pinia必须安装composition-api
  if (isVue2(templateType) && isPinia(storeType)) {
    needCompositionApi = true;
  }

  if (VUE_V2_TS === templateType) {
    delete basePkgs.devDependencies["@realive/eslint-config-vue-v2-normal"];
    basePkgs = mergePackages(basePkgs, BASE_PACKAGES[VUE_V2_TS]);
  }

  if (VUE_V3_TS === templateType) {
    basePkgs = mergePackages(basePkgs, BASE_PACKAGES[VUE_V3_TS]);
  }

  if (needCompositionApi) {
    basePkgs = mergePackages(basePkgs, COMPOSITION_API_PACKAGES);
  }

  if (isVuex(storeType)) {
    if (isVue2(templateType)) {
      basePkgs = mergePackages(basePkgs, VUEX_PACKAGES);
    }
  }

  if (isPinia(storeType)) {
    basePkgs = mergePackages(basePkgs, PINIA_PACKAGES);
  }

  if (needWindiCss) {
    basePkgs = mergePackages(basePkgs, WIND_CSS_PACKAGES);
  }

  if (uiFramework) {
    basePkgs = mergePackages(basePkgs, UI_PACKAGES[uiFramework]);
  }

  if (needMobileAdapter) {
    basePkgs = mergePackages(basePkgs, MOBILE_PACKAGES);
  }

  basePkgs = mergePackages(basePkgs, COMMON_PACKAGES);

  return basePkgs;
}

/**
 * 初始化命令
 * @param {string} cwd
 * @param {{templateType: string, needCompositionApi: boolean, needPinia: boolean, needWindiCss: boolean, uiFramework: string }} options
 * @returns {void}
 */
function initCommand(cwd) {
  run("yarn run lint:all", { cwd });

  run("npx husky add .husky/pre-commit npm run lint:all", {
    cwd,
  });

  run(
    'npx husky add .husky/commit-msg npx --no-install commitlint --edit "$1"',
    {
      cwd,
    }
  );
}

module.exports = {
  initCommand,
  getPresetPackages,
};
