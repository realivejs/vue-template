const { VUE_V2, VUE_V2_TS, VUE_V3, VUE_V3_TS } = require("./prompts");

const { IVIEW, VANT } = require("./uiFramework");

const COMMON_PACKAGES = {
  dependencies: {
    "core-js": "^3.6.5",
    "@realive/http": "^1.0.8",
  },
  devDependencies: {
    eslint: "^8.11.0",
    less: "^4.1.2",
    "less-loader": "6.0.0",
    "lint-staged": "^9.5.0",
    husky: "^7.0.4",
    prettier: "^2.5.1",
    "style-resources-loader": "^1.5.0",
    "@commitlint/cli": "^16.1.0",
    "@commitlint/config-angular": "^16.0.0",
    stylelint: "^14.5.0",
    "eslint-formatter-codeframe": "^7.32.1",
    "eslint-webpack-plugin": "^3.1.1",
    "@realive/eslint-config-prettier": "^1.1.0",
    "@realive/stylelint-config-prettier": "^1.1.0",
    "@realive/stylelint-config-vue": "^1.2.0",
  },
};

const COMPOSITION_API_PACKAGES = {
  dependencies: {
    "@vue/composition-api": "1.4.6",
  },
};

const PINIA_PACKAGES = {
  dependencies: {
    pinia: "^2.0.12",
  },
};

const BASE_PACKAGES = {
  [VUE_V2]: {
    dependencies: {
      vue: "2.6.13",
      vuex: "3.6.2",
      "vue-router": "3.2.0",
    },
    devDependencies: {
      "vue-template-compiler": "2.6.13",
      "@realive/eslint-config-vue-v2-normal": "^1.3.0",
    },
  },
  [VUE_V2_TS]: {
    devDependencies: {
      typescript: "4.5.3",
      "@realive/eslint-config-vue-v2": "^1.1.0",
    },
  },
  [VUE_V3]: {
    dependencies: {
      vue: "^3.0.0",
      "vue-router": "^4.0.0-0",
      vuex: "^4.0.0-0",
    },
    devDependencies: {
      "@vue/compiler-sfc": "^3.0.0",
      "@realive/eslint-config-vue": "^1.1.0",
    },
  },
  [VUE_V3_TS]: {
    devDependencies: {
      typescript: "4.5.3",
      "@realive/eslint-config-vue": "^1.1.0",
    },
  },
};

const UI_PACKAGES = {
  [IVIEW]: {
    dependencies: {
      "view-design": "^4.7.0",
    },
    devDependencies: {
      "babel-plugin-import": "^1.13.3",
    },
  },
  [VANT]: {
    dependencies: {
      vant: "^2.6.11",
    },
    devDependencies: {
      "babel-plugin-import": "^1.13.3",
    },
  },
};

const MOBILE_PACKAGES = {
  devDependencies: {
    "postcss-px-to-viewport": "1.1.1",
  },
};

module.exports = {
  BASE_PACKAGES,
  COMPOSITION_API_PACKAGES,
  PINIA_PACKAGES,
  UI_PACKAGES,
  COMMON_PACKAGES,
  MOBILE_PACKAGES,
};
