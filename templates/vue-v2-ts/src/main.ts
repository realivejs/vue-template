import Vue from "vue";
import App from "./App.vue";
import router from "./router";
<%_ if (options.needCompositionApi) { _%>
import VueCompsitionAPI from "@vue/composition-api";
<%_ } _%>
<%_ if (options.storeType === 'pinia') { _%>
import { pinia } from "@/store";
<%_ } _%>
<%_ if (options.storeType === 'vuex') { _%>
import { store } from "@/store";
<%_ } _%>
import '@/assets/styles/index.less';
<%_ if (options.needWindiCss) { _%>
import 'windi.css';
<%_ } _%>

Vue.config.productionTip = false;
<%_ if (options.needCompositionApi) { _%>
Vue.use(VueCompsitionAPI)
<%_ } _%>

new Vue({
  router,
  render: (h) => h(App),
  <%_ if (options.storeType === 'pinia') { _%>
  pinia
  <%_ } _%>
  <%_ if (options.storeType === 'vuex') { _%>
  store
  <%_ } _%>
}).$mount("#app");
