import Vue from 'vue'
import Vuex from 'vuex'
/*import mutations from './mutation'
import actions from './action'*/

Vue.use(Vuex)

const state = {
  'navbarList' : '' //导航栏数据
}

export default new Vuex.Store({
  state
})
