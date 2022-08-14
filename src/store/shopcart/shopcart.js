// shopcart 小仓库
import { reqCartList, reqDeleteCartBaId, reqUpdateCheckedById } from '@/api/index'
// 存储数据
const state = {
  cartList: []
}
// 处理action
const actions = {
  // 获取购物车列表
  async getCartList({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartBaId(skuId)
    if (result.code === 200) {
      commit('')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 修改购物车选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      commit('')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 刪除全部选中产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车中全部产品
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的Promise添加到数组中
      PromiseAll.push(promise)
    })
    // 数组中每个promise返回的结果都成功，返回的结果即为成功
    // 有一个失败，则结果为失败
    return Promise.all(PromiseAll)
  },
  // 修改全部产品勾选状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
// 修改state的数据
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
// 理解为计算属性
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}