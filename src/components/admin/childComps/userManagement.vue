<template>
  <div class="user_management">
    <h1>用户管理</h1>
    <h3>用户表</h3>
    <el-table :data="users" v-loading="loading"  style="width: 100%; ">
      <el-table-column label="用户头像" width="120">
        <template slot-scope="scope">
          <div class="user_avatar_box">
            <img class="user_avatars" :src="scope.row.head_image" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="150">
        <template slot-scope="scope">
          <el-tag size="medium" style="margin-right: 10px">{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="250">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="250">
        <template slot-scope="scope">
          <span>{{ scope.row.registration_time|formateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAllUserInfo, deleteUser} from 'network/adminOperation';
import uploadImage from "network/uploadImage";
export default {
  name: "userManagement",
  data() {
    return {
      baseUrl:uploadImage.UPLOADIMG.BASEURL,
      users:[],
      loading: true,
    }
  },
  methods:{
    handleDelete(index,row) {
      this.$confirm('注意：此操作会删除该用户的留言与评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.username).then(res => {
          if(res.data.err == 0){
            this.$message({
              type:'success',
              offset:'80',
              message:res.data.msg
            })
            location.reload();
          }else {
            this.$message({
              type:'error',
              offset:'80',
              message:res.data.msg
            })
          }
        }).catch(err => {})
      })
    }
  },
  filters:{
    formateDate(datetime) {
      function addDateZero(num) {
          return (num < 10 ? "0" + num : num);
      }
      let d = new Date(datetime);
      let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
      return formatdatetime;
    },
  },
  created() {
    getAllUserInfo().then(res => {
      if(res.data.err == 0) {
        res.data.data.forEach(item => {
          item.head_image = this.baseUrl+item.head_image;
        });
        this.users = res.data.data;
        this.loading = false;
        this.$message({
          type: 'success',
          offset:'80',
          message: "已为你查询到以下信息！！"
        })
      }else {
        this.$message({
          type: 'error',
          offset:'80',
          message: res.data.msg
        })
      }
    }).catch(err => {})
  },

}
</script>

<style scoped>
.user_management {
  width: 80%;
  margin: 0 auto;
  padding: 1.5rem;
}
.user_management h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.el-table {
  border-radius: 10px;
}
.user_avatar_box {
  height: 3rem;
}
.user_avatars {
  height: 100%;
}
</style>