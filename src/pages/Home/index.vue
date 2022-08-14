<template>
  <div>
    <!-- 三级联动全局组件 -->
    <TypeNav></TypeNav>
    <!-- 列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <MyRecommend></MyRecommend>
    <!-- 商品排行 -->
    <MyRank></MyRank>
    <!-- 猜你喜欢 -->
    <MyLike></MyLike>
    <!-- 楼层 -->
    <MyFloor v-for="floor in floorList" :key="floor.id" :list="floor"></MyFloor>
    <!-- 商标 -->
    <MyBrand></MyBrand>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import MyRecommend from '@/pages/Home/Recommend'
import MyRank from '@/pages/Home/Rank'
import MyLike from '@/pages/Home/Like'
import MyFloor from '@/pages/Home/Floor'
import MyBrand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
  name: 'MyHome',
  components: {
    ListContainer,
    MyRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  mounted() {
    // 派发action，获取小轮播图数据
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style>
</style>