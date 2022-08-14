// home 小仓库
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api/index'
// 存储数据
const state = {
  // 三级联动数据
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // Floor轮播图数据
  floorList: [],
}
// 处理action
const actions = {
  // 通过API里的接口函数调用发起请求，获取三级联动数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList()
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取Floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST',result.data)
    }
  }
}
// 修改state的数据
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
// 理解为计算属性
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}