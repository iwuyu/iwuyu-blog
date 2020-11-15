<template>
  <div class="notice">
    <h1>发布公告</h1>
    <h3>公告内容</h3>
    <el-input
      class="brief"
      type="textarea"
      :rows="4"
      placeholder="请输入公告内容"
      v-model="notice"
      :show-word-limit="true"
      :maxlength="800">
    </el-input>
    <el-button class="publish_notice_btn" @click="publishNotice" type="primary">发布公告</el-button>
  </div>
</template>

<script>
import { publishNotice } from "network/adminOperation";
export default {
  name:"notice",
  data() {
    return {
      notice:'',
    }
  },
  methods: {
    publishNotice() {
      if(this.notice){
        publishNotice(this.notice).then(res => {
          if(res.data.err == 0) {
            this.$message({
              type:'success',
              offset:'80',
              message: res.data.msg
            })
          }else {
            this.$message({
              type:'error',
              offset:'80',
              message: res.data.msg
            })
          }
        }).catch(err => {})
      }else {
        this.$message({
          type:'warning',
          message:'公告内容不能为空！',
          offset:'80'
        })
      }
    }
  }
}
</script>

<style scoped>
.notice {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.notice h3 {
  margin: 1.5rem 0;
}
.publish_notice_btn {
  margin-top: 1.5rem;
}
.brief {
  width: 80%;
}
.el-button {
  display: block;
  margin-top: 1rem;
}
</style>