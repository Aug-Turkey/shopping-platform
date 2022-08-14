// 引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Search from '@/pages/Search'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'

export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/pages/Home'), meta: { show: true } },
  { path: '/detail/:skuId', component: () => import('@/pages/Detail'), meta: { show: true } },
  { path: '/login', component: () => import('@/pages/Login'), meta: { show: false } },
  { path: '/search/:keyword?', component: () => import('@/pages/Search'), meta: { show: true }, name: 'search' },
  { path: '/register', component: () => import('@/pages/Register'), meta: { show: false } },
  { path: '/addcartsuccess', component: () => import('@/pages/AddCartSuccess'), meta: { show: true }, name: 'addcartsuccess' },
  { path: '/shopcart', component: () => import('@/pages/ShopCart'), meta: { show: true }, name: 'shopcart' },
  {
    // 路由独享守卫
    path: '/trade', component: () => import('@/pages/Trade'), meta: { show: true }, name: 'trade', beforeEnter: (to, from, next) => {
      // 去交易页面必须从购物车组件进来，其他页面不能直接进入交易页面
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay', component: () => import('@/pages/Pay'), meta: { show: true }, name: 'pay', beforeEnter: (to, from, next) => {
      // 去支付页面必须从交易页面组件进来
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess', component: () => import('@/pages/PaySuccess'), meta: { show: true }, name: 'paysuccess', beforeEnter: (to, from, next) => {
      // 去支付成功必须从支付页面组件进来
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center', component: () => import('@/pages/Center'), meta: { show: true }, name: 'center', children: [
      { path: 'myorder', component: () => import('@/pages/Center/myOrder'), meta: { show: true } },
      { path: 'grouporder', component: () => import('@/pages/Center/groupOrder'), meta: { show: true } },
      { path: '/center', redirect: '/center/myorder' }
    ]
  }
]