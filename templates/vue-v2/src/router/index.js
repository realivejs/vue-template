import Vue from "vue";
import VueRouter from "vue-router";
import {routes} from './config'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

/**
 * @description
 *  需要遍历路由钩子再上方实例化后进行实现
 */

export default router