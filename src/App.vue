<template>
  <div id="app">
    <!-- 顶部 -->
    <Header></Header>
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 底部  在Home，Search中显示，在登录，注册页面隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发action，获取商品分类列表数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>
body {
  padding-right: 0 !important;
}
</style>
