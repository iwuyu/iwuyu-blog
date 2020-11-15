<template>
  <div id="page">
    <div class="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:"Page",
  data() {
    return {
      currentPage:0, // 当前页码
      pageSize:6, // 每页显示数量
    }
  },
  props: {
    total: {
      type: Number,
      default: 10
    },
  },
  methods: {
    /* 向父组件发送每页显示数量 */
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit('pageSize',this.pageSize)
    },
    /* 向父组件发送第几页 */
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('currentPage',this.currentPage)
    }
  },
}
</script>

<style  scoped>
  #page {
    padding: 1rem 0;
  }
    
  .right {
    text-align: right;
  }
  
</style>