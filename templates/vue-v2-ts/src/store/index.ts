<%_ if (options.storeType === 'vuex') { _%>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({})
<%_ } _%>
<%_ if (options.storeType === 'pinia') { _%>
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
export const pinia = createPinia()
<%_ } _%>