const { VUE_V2, VUE_V2_TS, VUE_V3, VUE_V3_TS, IVIEW } = require("../constants");

/**
 * 是否为vue2.0
 * @param {string} templateType - 模版类型
 * @returns {boolean}
 */
function isVue2(templateType) {
  return VUE_V2 === templateType || VUE_V2_TS === templateType;
}

/**
 * 是否为vue3.0
 * @param {string} templateType - 模版类型
 * @returns {boolean}
 */
function isVue3(templateType) {
  return VUE_V3 === templateType || VUE_V3_TS === templateType;
}

/**
 * 是否包含typescript
 * @param {string} templateType - 模版类型
 * @returns {boolean}
 */
function hasTs(templateType) {
  return templateType.indexOf("ts") > -1;
}

/**
 * 是否为iview
 * @param {string} uiFramework - ui框架
 * @returns {boolean}
 */
function isIviewUI(uiFramework) {
  return IVIEW === uiFramework;
}

module.exports = {
  hasTs,
  isVue2,
  isVue3,
  isIviewUI,
};
