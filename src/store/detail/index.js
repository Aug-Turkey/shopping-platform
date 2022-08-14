// detail 小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
// 封装临时游客身份模块uuid，生成一个随机字符串
import { getUUID } from '@/utils/uuid_token'
// 存储数据
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
// 处理action
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if (result.code === 200) {
      commit('')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
// 修改state的数据
const mutations = {
  GOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
// 理解为计算属性
const getters = {
  categoryView(state) {
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}