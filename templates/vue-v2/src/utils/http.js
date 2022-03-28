import { createRequest } from "@realive/http";

/**
 * @description
 *  error，close分别对应 请求错误提示，请求提示关闭方法
 */
export const request = createRequest({
  baseURL: `/${process.env.VUE_APP_DEV_SERVER_MODULE}`,
  enhanceOptions: {
    message: {
      error(message) {
        // Notify({
        //   type: "danger",
        //   message,
        // });
      },
      close() {
        // Notify.clear();
      },
    },
  },
});