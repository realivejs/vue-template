import { RouteConfig } from 'vue-router'
import Example from '@/pages/example.vue' 

/**
 * @description
 *  这里只处理路由配置相关逻辑
 *  下方是使用例子，仅供初始化时示范，开发时请删除
 */
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Example',
    component: Example
  },

  {
    path: '/lazy-example',
    name: 'lazy-example',
    component: () => import(/** lazyExample */'@/pages/example.vue')
  }
]
