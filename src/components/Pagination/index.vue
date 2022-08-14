<template>
  <div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchList.pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="searchList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="searchList.total">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyPagination',
  data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      }
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.searchParams.pageSize = pageSize
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    handleCurrentChange(pageNo) {
      this.searchParams.pageNo = pageNo
      this.$store.dispatch('getSearchList', this.searchParams)
    }
  },
  computed: {
    ...mapState({
      searchList: state => {
        return state.search.searchList
      }
    })
  }
}
</script>

<style>
</style>