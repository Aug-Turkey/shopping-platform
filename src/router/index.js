import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

// 使用插件
Vue.use(VueRouter)
// 引入 Store
import store from '@/store/index'

// 把VueRouter原型对象的push保存一份，跳转需要用到
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写 push 方法
// 第一个参数：告诉原来push方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写 replace 方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}
// 配置路由
let router = new VueRouter({
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

// 全局守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.userInfo.name
  // 用户登录了
  if (token) {
    // 已登录不能访问登录页
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登录了，去的不是登录页
      if (name) {
        next()
      } else {
        // 没有用户信息,派发 action
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效:本地清空数据、服务器的token通知服务器清除
          await store.dispatch('logout');
          //回到登录页
          next('/login');
        }
      }
    }
  } else {
    //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
    let toPath = to.path;
    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      next('/login?redirect=' + toPath);
    } else {
      next();
    }
  }
})

export default router