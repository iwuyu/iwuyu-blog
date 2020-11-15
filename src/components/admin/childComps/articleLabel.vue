<template>
  <div class="article_category">
    <h3>标签表</h3>
    <el-table :data="newTableData" v-loading="loading" style="width: 100%; ">
      <el-table-column label="标签名">
        <template slot-scope="scope">
          <el-tag size="medium" style="margin-right: 10px">{{ scope.row.article_label_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="所属分类">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.article_category_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <hr><hr>

    <h3>添加标签</h3>
    <el-select class="add_label_box" v-model="label.categoryId" placeholder="请选择分类">
      <el-option
        v-for="item in categroies"
        :key="item.article_category_id"
        :label="item.article_category_name"
        :value="item.article_category_id">
      </el-option>
    </el-select>
    <el-input
      class="add_label_box"
      placeholder="请输入标签名"
      v-model="label.labelName"
      clearable>
    </el-input>
    <el-button type="primary" @click="addLabel">确认添加</el-button>
  </div>
</template>

<script>
import { addLabel, updateLabel, deleteLabel, getArticle } from 'network/adminOperation';
import { getCategory, getLabel } from 'network/getContent'
export default {
  name: "articleLabel",
  data() {
    return {
      tableData: [],
      newTableData:[],
      categroies: [],
      label: {
        categoryId:'',
        labelName:''
      },
      updateLabelName:{
        oldLabelName: '',
        newLabelName: ''
      },
      loading: true
    };
  },
  methods: {
    /* 添加标签 */
    addLabel() {
      if(this.label.categoryId && this.label.labelName){
        addLabel(this.label).then(res => {
          if(res.data.err == 0) {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'success',
              offset:'80'
            });
            this.label.labelName = '';
            this.label.categoryId = '';
            this.getTableData();
          }else {
            this.$message({
            showClose: true,
            message: res.data.msg,
            type: 'error',
            offset:'80'
          });
          }
        })
      }else {
        this.$message({
          type:'warning',
          message:'内容不完整！',
          offset:'80'
        })
      }
    },
    /* 修改标签 */
    handleEdit(index, row) {
      this.$prompt('请输入新的标签名', `当前标签名：${row.article_label_name}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.updateLabelName.oldLabelName = row.article_label_name;
          this.updateLabelName.newLabelName = value;
          if(this.updateLabelName.newLabelName) {
            return updateLabel(this.updateLabelName)
          }else {
            return this.$message({
              type:'warning',
              message:'内容不能够为空',
              offset:'80'  
            })
          }
        }).then(res => {
          if(res.data.err == 0){
            this.$message({
              type: 'success',
              message: '修改成功',
              offset:'80'
            });
            this.getTableData();
          }else {
            this.$message({
            type: 'error',
            message: res.data.msg,
            offset:'80'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
            offset:'80'
          });       
        });
    },
    handleDelete(index, row) {
      if(row.article.length > 0){
        this.$message({
          type: 'error',
          message: '该标签涉及到文章，不可删除！',
          offset:'80'
        })
      }else{
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLabel(row.article_label_id).then(res => {
            if(res.data.err == 0){
              this.$message({
                type: 'success',
                message: res.data.msg,
                offset:'80'
              });
              this.getTableData();
            }else {
              this.$message({
                type: 'error',
                message: res.data.msg,
                offset:'80'
              })
            }
          })
        })
      }
    },
    // 获取数据
    getTableData() {
      this.tableData = [];
      this.newTableData = [];
      this.categroies = [];
        // 获取分类
      getCategory().then(res => {
        if(res.data.err == 0) {
          this.categroies = res.data.data;
          // 返回获取标签函数
          return getLabel();
        }else{
          this.$message({
            type: 'error',
            message: res.data.msg,
            offset:'80'
          })
        }
      }).then(res => {
        // 获取标签
        if(res.data.err == 0) {
          this.tableData = res.data.data;
          // 往原数据中添加到新数组里
          this.tableData.map((item,index) => {
            this.newTableData.push(Object.assign({},item,{article:[]}));
            // 释放原数组
            this.tableData = '';
          })
          this.loading = false;
        }else {
          this.$message({
            type: 'error',
            message: res.data.msg,
            offset:'80'
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style scoped>
.article_category {
  width: 80%;
  margin: 0 auto;
  padding: 1.5rem;
}
.article_category h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.el-table {
  border-radius: 10px;
  margin-bottom: 2rem;
}
.add_label_box{
  width: 35%;
  display: block;
  margin-bottom: 1rem;
}
</style>