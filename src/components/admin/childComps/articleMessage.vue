<template>
  <div class="article_message">
    <h1>文章评论</h1>
    <h3>选择文章</h3>
    <el-select v-model="articleId" placeholder="请选择文章">
      <el-option
        v-for="item in articleList"
        :key="item.article_id"
        :label="item.article_title"
        :value="item.article_id">
      </el-option>
    </el-select>
    <el-button class="select_btn" type="primary"  @click="getMessage(articleId)">确认查询</el-button>
    <h3>评论表</h3>
    <el-table :data="message"  style="width: 80%; ">
      <el-table-column label="评论者" width="200">
        <template slot-scope="scope">
          <el-tag size="medium" style="margin-right: 10px">{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论内容">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.message_content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论日期" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.message_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.reply.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMessageAndReply, hasMessage } from 'network/getContent';
import { getArticle, deleteMessage } from 'network/adminOperation';
export default {
  name: "articleMessage",
  data() {
    return {
      message:[],
      articleList:[],
      articleId:''
    }
  },
  methods:{
    getMessage(articleId) {
      this.message = [];
      this.dialogTableVisible = !this.dialogTableVisible;
      hasMessage(articleId).then(res => {
        if(res.data.err == 0) {
          if(res.data.data > 0){
            this.getMessageAndReply(articleId);
          }
        }
      })
    },
    // 获取留言与回复信息
    getMessageAndReply(articleId) {
      getMessageAndReply(articleId).then(res => {
        if(res.data.err == 0){
          let data = res.data.data;
          let messageFloor = 1;
          data.forEach(item => {
            item.messageFloor = messageFloor;
            messageFloor ++;
            let replyFloor = 1;
            item.reply.forEach(key => {
              key.replyFloor = replyFloor;
              replyFloor ++;
            })
          });
          this.message = data;
        }else {
          this.$message({
            type: 'info',
            message: res.data.msg
          });   
        }
      })
    },
    // 删除评论
    handleDelete(index, row) {
      this.$confirm('注意：此操作会删除该留言与其相关评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMessage(row.message_id,this.articleId).then(res => {
          if(res.data.err == 0){
            this.$message({
              type: 'success',
              message: res.data.msg,
              offset:'80'
            });
            location.reload();
          }else {
            this.$message({
              type: 'error',
              message: res.data.msg,
              offset:'80'
            })
          }
        }).catch(err => {})
      });
    } 
  },
  created() {
    getArticle().then(res => {
      // 获取文章
      if(res.data.err == 0){
        let data = res.data.data;
          this.articleList = data
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).catch(err => {})
  }
}
</script>
<style scoped>
.article_message {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.article_message h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.el-table {
  border-radius: 10px;
}
.el-select{
  width: calc(80% - 8rem);;
  margin-right: 1rem;
}
.select_btn {
  width: 7rem;
}
</style>