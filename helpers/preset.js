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

const { hasTs, isVuex, isPinia } = require("./check");
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
    needCompositionApi,
    storeType,
    needWindiCss,
    uiFramework,
    needMobileAdapter,
  } = options;
  const baseType = `vue-v${templateType.match(/\d/)[0]}`;

  let basePkgs = BASE_PACKAGES[baseType];

  if (VUE_V2_TS === templateType) {
    delete basePkgs.devDependencies["@realive/eslint-config-vue-v2-normal"];
    basePkgs = mergePackages(basePkgs, BASE_PACKAGES[VUE_V2_TS]);
  }

  if (VUE_V3_TS === templateType) {
    basePkgs = mergePackages(basePkgs, BASE_PACKAGES[VUE_V3_TS]);
  }

  if (hasTs(templateType)) {
    basePkgs.devDependencies["@vue/cli-plugin-typescript"] = "4.5.11";
  }

  if (needCompositionApi) {
    basePkgs = mergePackages(basePkgs, COMPOSITION_API_PACKAGES);
  }

  if (isVuex(storeType)) {
    basePkgs = mergePackages(basePkgs, VUEX_PACKAGES);
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
