const {
  VUE_V2,
  VUE_V2_TS,
  VUE_V3,
  VUE_V3_TS,
  IVIEW,
  VANT,
} = require("./constants");

const { isVue2, isVue3 } = require("./helpers");

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
    // {
    //   type: "list",
    //   name: "needPinia",
    //   message: "选择你的状态管理工具",
    //   choices: [
    //     {
    //       name: "vuex",
    //       value: false,
    //       checked: true,
    //     },
    //     {
    //       name: "pinia",
    //       value: true,
    //     },
    //   ],
    // },

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
      type: "list",
      name: "uiFramework",
      message: "选择你需要的ui框架",
      choices: [
        {
          name: "view-design@4.7.0（iview）for pc",
          value: IVIEW,
        },
        {
          name: "vant-ui@2.6.11 for mobile",
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
