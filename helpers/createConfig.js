const fs = require("fs");
const path = require("path");
const { IVIEW, VANT } = require("../constants");

const { isVue2, hasTs, isVue3 } = require("./check");

/**
 * 读取配置模版
 * @param {string} templateName
 * @returns {string}
 */
function readConfigTemplate(templateName) {
  return fs.readFileSync(
    path.resolve(__dirname, `../config-template/${templateName}.tpl`),
    {
      encoding: "utf-8",
    }
  );
}

/**
 * 转换配置文件为jsonstring
 * @param {*} config
 * @returns
 */
function transformConfigToJSONStr(config) {
  return `module.exports = ${JSON.stringify(config, null, 2)}`;
}

/**
 * 根据prompt回答创建eslint配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createEslintConfig(files, options) {
  const { templateType } = options;

  const config = {
    root: true,
    extends: ["@realive/eslint-config-prettier"],
  };

  if (isVue2(templateType)) {
    config.extends.unshift(
      `@realive/eslint-config-vue-${hasTs(templateType) ? "v2" : "v2-normal"}`
    );
  }

  if (isVue3(templateType)) {
    config.extends.unshift(`@realive/eslint-config-vue`);
  }

  files[".eslintrc.js"] = transformConfigToJSONStr(config);
}

/**
 * 根据prompt回答创建babel配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createBabelConfig(files, options) {
  const { uiFramework } = options;

  const config = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [],
  };

  if (IVIEW === uiFramework) {
    config.plugins.push([
      "import",
      {
        libraryName: "view-design",
        libraryDirectory: "src/components",
      },
    ]);
  }

  if (VANT === uiFramework) {
    config.plugins.push([
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
    ]);
  }

  files["babel.config.js"] = transformConfigToJSONStr(config);
}

/**
 * 创建stylelint配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createStylelintConfig(files) {
  const config = {
    root: true,
    extends: [
      "@realive/stylelint-config-vue",
      "@realive/stylelint-config-prettier",
    ],
  };

  files[".stylelintrc.js"] = transformConfigToJSONStr(config);
}

/**
 * 根据模版类型创建typescript shim文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createTsShimPolyfill(files, options) {
  const { templateType } = options;

  if (hasTs(templateType)) {
    if (isVue2(templateType)) {
      files["shims-tsx.d.ts"] = readConfigTemplate("shims-tsx.d");
      files["shims-vue.d.ts"] = readConfigTemplate("shims-vue2.d");
    }

    if (isVue3(templateType)) {
      files["shims-vue.d.ts"] = readConfigTemplate("shims-vue.d");
    }

    files["shims-global.d.ts"] = readConfigTemplate("shims-global.d");
  }
}

/**
 * 创建git相关配置文件
 * @param {object} files
 * @returns {void}
 */
function createGitConfig(files) {
  files[".gitignore"] = `
.DS_Store
node_modules
/dist


# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
  `;
}

/**
 * 创建editorconfig相关配置文件
 * @param {object} files
 * @returns {void}
 */
function createEditorConfig(files) {
  files[".editorconfig"] = `root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
`;
}

/**
 * 创建commitlint相关配置文件
 * @param {object} files
 * @returns {void}
 */
function createCommitLintConfig(files) {
  const config = { extends: ["@commitlint/config-angular"] };

  files[".commitlintrc.js"] = transformConfigToJSONStr(config);
}

/**
 * 创建Lintstaged相关配置文件
 * @param {object} files
 * @returns {void}
 */
function createLintstagedConfig(files) {
  const config = {
    "{packages,scripts}/**/*.{js,ts,md,json}": ["eslint --fix"],
  };

  files[".lintstagedrc.js"] = transformConfigToJSONStr(config);
}

/**
 * 根据模版类型创建prettier配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createPrettierConfig(files, options) {
  const config = {
    singleQuote: true,
    trailingComma: "all",
    endOfLine: "lf",
    printWidth: 100,
    proseWrap: "never",
    arrowParens: "avoid",
    htmlWhitespaceSensitivity: "ignore",
    overrides: [
      {
        files: ["*.js"],
        options: {
          parser: "babel",
        },
      },
      {
        files: ["*.json"],
        options: {
          parser: "json",
        },
      },
    ],
  };

  const { templateType } = options;

  if (hasTs(templateType)) {
    config.overrides.push({
      files: "*.ts",
      options: {
        parser: "typescript",
      },
    });
  }

  files[".prettierrc.js"] = transformConfigToJSONStr(config);
}

/**
 * 创建vue.config.js文件,并预制规则
 * @param {object} files
 * @returns {void}
 */
function createVueConfigConfig(files) {
  files["scripts/extends.js"] = readConfigTemplate("vue.extend.config");
  files["vue.config.js"] = readConfigTemplate("vue.config");
}

/**
 * 创建env相关文件
 * @param {object} files
 * @returns {void}
 */
function createEnvConfig(files) {
  files[".env"] = readConfigTemplate("env");
  files[".env.development.local"] = readConfigTemplate("env.development.local");
}

/**
 * 创建vscode settings相关文件
 * @param {object} files
 * @returns {void}
 */
function createVsconfigSettingConfig(files) {
  files[".vscode/settings.json"] = readConfigTemplate("vscode.settings");
}

/**
 * 创建postcss.config配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createPostcssConfig(files, options) {
  const { isMobile } = options;

  files[".postcssrc.js"] = isMobile
    ? readConfigTemplate("postcss.mobile.config")
    : " ";
}

/**
 * 根据prompt回答创建配置文件
 * @param {object} files
 * @param {{templateType: string}} options
 * @returns {void}
 */
function createConfig(files, options) {
  createEslintConfig(files, options);
  createBabelConfig(files, options);
  createStylelintConfig(files, options);
  createTsShimPolyfill(files, options);
  createGitConfig(files);
  createCommitLintConfig(files);
  createEditorConfig(files);
  createLintstagedConfig(files);
  createPrettierConfig(files, options);
  createVueConfigConfig(files);
  createEnvConfig(files);
  createVsconfigSettingConfig(files);
  createPostcssConfig(files, options);
}

module.exports = {
  createConfig,
};
