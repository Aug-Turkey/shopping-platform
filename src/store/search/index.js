// search 小仓库
import { reqGetSearchInfo } from '@/api/index'
// 存储数据
const state = {
  searchList: {}
}
// 处理action
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// 修改state的数据
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
// 理解为计算属性
const getters = {
  // 当前仓库中的state
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  },
  attrsList(state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}