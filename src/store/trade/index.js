// trade 小仓库
import { reqAddressInfo, reqOrderInfo } from '@/api/index'
// 存储数据
const state = {
  address: [],
  orderInfo: {}
}
// 处理action
const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取商品清单
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo()
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}
// 修改state的数据
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state,orderInfo) {
    state.orderInfo = orderInfo
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