import {request} from '@/utils'

/**
 * @example
 *   export const getBasicInfoAPI = 'xxx/xxx/getBasicInfo'
 *   export function getBasicInfo(...args) {
 *     return request.post(getBasicInfoAPI, ...args);
 *   }
 * 
 * @description
 *   如果当前业务比较复杂也可以使用领域模型方式的书写你的service结构
 * 
 * @example
 *  
 *  推荐目录结构
 *  service 
 *    - card.js
 *    - common.js
 *    - user.js
 *    - index.js (出口文件)
 * 
 * 除出口文件外，领域模块对应的js内部书写和开头的example一致
 * 
 */