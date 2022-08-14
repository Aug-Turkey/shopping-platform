import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index'
// 引入仓库
import store from '@/store/index'
// 三级联动组件 --- 全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图 --- 全局组件
import Carousel from '@/components/Carousel'
// 分页器 --- 全局组件
import MyPagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(MyPagination.name, MyPagination)
// 引入MockServe.js  ---   mock虚拟数据
import '@/mock/mockServe'
// 引入 swiper 样式
import 'swiper/css/swiper.css'
// 统一接口api文件夹里的请求函数
import * as API from '@/api'
// 按需引入组件库
import { Icon, Pagination, MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Icon);
Vue.use(Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import img from '@/assets/1.jpg'
// 引入图片懒加载 vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // 图片懒加载默认图片
  loading: img
})
// 表单校验插件
import '@/plugins/validate'


new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')