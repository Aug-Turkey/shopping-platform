import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import home from './home/index'
import search from './search/index'
import detail from './detail/index'
import shopcart from './shopcart/shopcart'
import user from './user/index'
import trade from './trade/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})