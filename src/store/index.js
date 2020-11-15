import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabcontroleIsShow:false,
    labelId:'',
    categoryId:'',
    keyWord:'',
    loading:true,
  },
})
// 挂载到Vue实例上
export default store;