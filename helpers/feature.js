const fs = require("fs");
const { EOL } = require("os");
const { hasTs } = require("./check");

/**
 * 读取文件
 * @param {string} pathname
 * @returns {string}
 */
function readFile(pathname) {
  return fs.readFileSync(pathname, {
    encoding: "utf-8",
  });
}

/**
 * 写入文件
 * @param {string} pathname
 * @returns {void}
 */
function writeFile(filename, content) {
  fs.writeFileSync(filename, content.join(EOL), { encoding: "utf-8" });
}

/**
 * 注入移动端适配
 * @param {object} api generator
 * @param {object} options prompt
 * @returns {void}
 */
function injectMobileAdaptive(api, options) {
  const { needMobileAdapter } = options;

  if (needMobileAdapter) {
    const htmlPath = "public/index.html";
    // 注入html文件
    const htmlContent = readFile(api.resolve(htmlPath));
    const htmlLines = htmlContent.split(/\r?\n/g);

    const targetIndex = htmlLines.findIndex((line) =>
      line.match(/content="IE=edge"/)
    );

    htmlLines.splice(
      targetIndex + 1,
      0,
      '\t\t<meta name="renderer" content="webkit"></meta>'
    );

    htmlLines.splice(
      targetIndex + 2,
      0,
      '\t\t<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"></meta>'
    );

    writeFile(htmlPath, htmlLines);
  }
}

/**
 * 注入package script
 * @param {object} options prompt
 * @returns
 */
function injectPkgScripts(options) {
  const { templateType } = options;
  const scripts = {
    prepare: "node -e \"try { require('husky').install() } catch (e) {}\"",
    "lint:style": "stylelint '**/*.{css,html,vue}' --fix",
    "lint:script": "eslint '**/*.{js,vue,json}' --fix",
    "lint:all": "yarn run lint:script && yarn run lint:style",
  };

  if (hasTs(templateType)) {
    scripts["lint:script"] = "eslint '**/*.{ts,js,vue,json}' --fix";
  }

  return scripts;
}

module.exports = {
  injectPkgScripts,
  injectMobileAdaptive,
};
