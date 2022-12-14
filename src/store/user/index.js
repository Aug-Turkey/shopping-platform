import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'

// 登录与注册模块
const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {}
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 这个接口是把验证码返回，但是正常情况，后台把验证码发到用户手机上
    let result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    if (result.code === 200) {
      commit('')
      return 'ok'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 登录
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    // 服务器下发 token
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储 token
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    let result = await reqLogout()
    if (result.code === 200) {
      localStorage.removeItem('TOKEN')
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    // 清空仓库中相关用户信息
    state.token = ''
    state.userInfo = {}
  }
}
const getters = {}
export default {
  state,
  actions,
  mutations,
  getters
}