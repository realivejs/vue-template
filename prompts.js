const {
  VUE_V2,
  VUE_V2_TS,
  VUE_V3,
  VUE_V3_TS,
  IVIEW,
  VANT,
  VUEX,
  PINIA,
} = require("./constants");

const { isVue2 } = require("./helpers");

module.exports = (pkg) => {
  const prompts = [
    {
      type: "list",
      name: "templateType",
      message: "选择你需要的模版",
      choices: [VUE_V2, VUE_V2_TS, VUE_V3, VUE_V3_TS],
      validate: (templateType) => !!templateType,
    },

    {
      type: "list",
      name: "needCompositionApi",
      message: "是否需要composition-api",
      when: (answers) => isVue2(answers.templateType),
      choices: [
        {
          name: "是",
          value: true,
          checked: true,
        },
        {
          name: "否",
          value: true,
        },
      ],
    },

    // todo
    {
      type: "checkbox",
      name: "storeType",
      message: "选择你的状态管理工具",
      choices: [
        {
          name: "vuex@3(vue官网store)",
          value: VUEX,
        },
        {
          name: "pinia@2(如果使用typescript，建议选择)",
          value: PINIA,
          checked: true,
        },
      ],
    },

    {
      type: "list",
      name: "needWindiCss",
      message: "是否使用windi.css",
      choices: [
        {
          name: "是",
          value: true,
          checked: true,
        },
        {
          name: "否",
          value: false,
        },
      ],
    },

    {
      type: "checkbox",
      name: "uiFramework",
      message: "选择你需要的ui框架",
      choices: [
        {
          name: "view-design@4（iview）for pc",
          value: IVIEW,
        },
        {
          name: "vant-ui@2 for mobile",
          value: VANT,
        },
      ],
    },

    {
      type: "list",
      name: "needMobileAdapter",
      message: "是否为移动端项目（自动添加meta、适配能力）",
      choices: [
        {
          name: "yes",
          value: true,
        },
        {
          name: "no",
          value: false,
        },
      ],
    },
  ];

  return prompts;
};
