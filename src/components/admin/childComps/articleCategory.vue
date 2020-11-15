<template>
  <div class="article_category">
    <h3>分类表</h3>
    <el-table :data="tableData" v-loading="loading" style="width: 100%; ">
      <el-table-column label="分类名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关标签" >
        <template slot-scope="scope">
          <el-tag size="medium" ref="cate" style="margin-right: 10px" v-for="(item,index) in scope.row.label" :key="index">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <hr/><hr/>
    <h3>添加分类</h3>
    <el-input
      class="add_category_box"
      placeholder="请输入分类名"
      v-model="categoryName"
      clearable>
    </el-input>
    <el-button type="primary" @click="addCategory">确认添加</el-button>
  </div>
</template>

<script>
import { addCategory, updateCategory, deleteCategory, getArticlesCount } from 'network/adminOperation';
import { getCategory, getLabel } from 'network/getContent'
export default {
  name: "articleCategory",
  data() {
    return {
      tableData: [],
      categoryName: '',
      obj: {},
      updateCategoryName:{
        oldCategoryName:'',
        newCategoryName:''
      },
      articleArr:[],
      loading: true
    };
  },
  methods: {
    // 添加分类
    addCategory() {
      if(this.categoryName){
        addCategory(this.categoryName).then(res => {
          if(res.data.err == 0){
            this.categoryName = ''
            this.$message({
              offset:'80',
              message: res.data.msg,
              type: 'success'
            });
            this.getData();
          }else {
            this.$message({
              offset:'80',
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch(err => {})
      }else{
        this.$message({
          offset:'80',
          message: '分类名不能为空',
          type:'warning'
        });
      }
    },
    // 修改分类
    handleEdit(index, row) {
      this.$prompt('请输入新的分类名', `当前分类名：${row.category}`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.updateCategoryName.oldCategoryName = row.category;
          this.updateCategoryName.newCategoryName = value;
          if(this.updateCategoryName.newCategoryName){
            return updateCategory(this.updateCategoryName)
          }else{
            return this.$message({
              type:'warning',
              message:'内容不可为空',
              offset:'80'
            });
          }
        }).then(res => {
          if(res.data.err == 0){
            this.$message({
              type: 'success',
              message: '修改成功',
              offset:'80'
            });
            this.getData();
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
      if(row.label.length > 0){
        this.$message({
          type: 'error',
          message: '该分类与其他元素有关联，不可删除!',
          offset:'80'
        })
      }else{
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCategory(row.category).then(res => {
            if(res.data.err == 0){
              this.$message({
                type: 'success',
                message: res.data.msg,
                offset:'80'
              });
              this.getData();
            }else {
              this.$message({
                type: 'error',
                message: res.data.msg,
                offset:'80'
              })
            }
          }).catch(err => {})
        })
      } 
    },  
    getData() {
      this.tableData = [];
      this.obj = {};
      getCategory().then(res => {
        if (res.data.err == 0) {
          let data = res.data.data;
          data.forEach((item,index) => {
            let newobj = {category:'',categoryid:'',label:[],article:[]}; // 定义子对象，存储分类名和标签名
            newobj.category = item.article_category_name;
            newobj.categoryid = item.article_category_id;
            this.tableData.push(newobj)
          })
          this.loading = false;
          // promise 返回获取标签函数
          return getLabel();
        }else {
          this.$message({
            type: 'error',
            message: '网络异常，请稍后重试！',
            offset:'80'
          })
        }
      }).then(res => {
        // 获取标签
        if (res.data.err == 0) {
          // 将获取的数据分类处理 之后暂存到obj对象中
          res.data.data.forEach((item,index) => {
            let categoryName = item.article_category_name;
            if(!this.obj.hasOwnProperty(categoryName)){ // obj中不包括该属性名
              this.obj[categoryName] = []; // 将该字段作为obj的属性名
              this.obj[categoryName].push(item);
            }else {
              this.obj[categoryName].push(item);
            }
          });
          // 遍历对象 获取对象中每个数组的值(对象)this.obj[key]
          Object.keys(this.obj).forEach((key,index) => {
            Object.keys(this.obj[key]).forEach((item,index2) => {
              if(this.tableData[index].category == this.obj[key][index2].article_category_name){
                this.tableData[index].label.push(this.obj[key][index2].article_label_name);
              }
            })
          });
        }else {
          this.$message({
            type: 'error',
            message: '网络异常，请稍后重试！',
            offset:'80'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },

  // 钩子 组件加载后运行
  created() {
    this.getData();
  },
}
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
.add_category_box{
  width: 35%;
  display: block;
  margin-bottom: 1rem;
}
.add_category_box .el-input{
  width: 100%;
}
</style>