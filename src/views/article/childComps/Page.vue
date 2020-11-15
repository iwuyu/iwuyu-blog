<template>
  <div class="page">
    <el-pagination small :page-size="page.pageSize" :current-page.sync="page.pageNo" @current-change="pageChange" layout="prev, pager, next" :total="articleCounts"></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Page",
  props: ["articleCounts"],
  data() {
    return {
      page:{
        pageNo:1,
        pageSize:4,
      }
    };
  },
  methods: {
    pageChange() {
      this.$emit('nextPage', this.page);
    }
  }
};
</script>

<style>
.page {
  text-align: center;
  padding: 20px 0;
}
.page_item {
  padding: 5px 10px;
  margin-left: 5px;
  border: 1px solid #ccc;
}
</style>