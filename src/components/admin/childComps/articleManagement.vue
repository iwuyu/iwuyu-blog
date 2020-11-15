<template>
  <div class="article_management">
    <h1>文章管理</h1>
    <div class="search">
      <el-select class="change" v-model="param.categoryId" @change="selectCategoryChanged" filterable placeholder="请选择文章分类">
        <el-option
          v-for="item in categoryData"
          :key="item.article_category_id"
          :label="item.article_category_name"
          :value="item.article_category_id">
        </el-option>
      </el-select>
      <el-select class="change" v-model="param.labelId" @change="selectLabelChanged" filterable placeholder="请选择标签">
        <el-option
          v-for="item in labelData"
          :key="item.article_label_id"
          :label="item.article_label_name"
          :value="item.article_label_id">
        </el-option>
      </el-select>
      <el-input
        class="input-keywork"
        v-model="param.keyword"
        @blur="inputEnd"
        placeholder="请输入关键字"
        clearable
      ></el-input>
    </div>
    <el-table :data="tableData" v-loading="loading" style="width: 100%; ">
      <el-table-column label="文章配图" width="100" >
        <template slot-scope="scope">
          <div class="article_img">
            <img :src="scope.row.article_image" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标题">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.article_title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览数" width="100">
        <template slot-scope="scope">
          <span >浏览: {{ scope.row.num_views }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" width="100">
        <template slot-scope="scope">
          <span >点赞: {{ scope.row.num_likes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 0px">评论: {{ scope.row.article_messagecount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="170">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 0px"> {{ scope.row.article_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="900"
            trigger="click">
              <articlePublish :list="list">
                <div class="article_img">
                  <img :src="scope.row.article_image" alt="">
                </div>
              </articlePublish>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" slot="reference">编辑</el-button>
          </el-popover>
          <el-button class="article_del" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
  </div>
</template>

<script>
import { getArticle, getArticlesCount, deleteArticle } from 'network/adminOperation';
import { getCategory, getLabel } from 'network/getContent';
import uploadImage from "network/uploadImage";
import articlePublish from './articlePublish';
import Page from '../../page/Page';

export default {
  name: 'articleManagement',
  components: {
    articlePublish,
    Page
  },
  data() {
    return {
      total:0, // 商品总数
      dialogFormVisible: false,
      param:{
        categoryId:"", // 当前分类
        labelId:"", //当前标签
        keyword:"", // 关键字
        currentPage:1, // 当前页码
        pageSize:6 // 每页数据量
      },
      categoryData:[],
      labelData:[],
      tableData:[],
      categoryId:'',
      obj:{},
      list:{},
      loading: true
    }
  },
  methods: {
    /* 初始化获取文章数量 */
    getArticleCount(param) {
      getArticlesCount(param).then(res => {
        let data = res.data;
        if(data.err === 0) {
          this.total = data.data[0].count;
        }else {
          this.$message({
            type:"error",
            message: "商品数量获取失败请稍后重试！"
          })
        }
      }).catch(err => {console.log(err)})
    },

    /* 初始化获取文章 */
    getArticlesData(param) {
      getArticle(param).then(res => {
        // 获取文章
        if(res.data.err == 0){
          let data = res.data.data;
          data.forEach((item,index) => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
            // this.$set(this.tableData, index, item)
          });
          this.tableData = data;
          this.loading = false;
        }else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }).catch(err => {})
    },

    /* 选中分类 搜索该分类的数据 */
    selectCategoryChanged(val){
      this.categoryId = val;
      this.param.currentPage = 1; // 初始化页码，默认第一页
      this.param.keyword = ""; // 初始化关键字框
      this.param.labelId = "";
      this.getArticleCount(this.param); // 获取该分类的总数
      this.getArticlesData(this.param); // 获取该分类的商品
    },
    /* 选中标签 搜索该标签的数据 */
    selectLabelChanged(val){
      this.param.currentPage = 1; // 初始化页码，默认第一页
      this.param.keyword = ""; // 初始化关键字框
      this.getArticleCount(this.param); // 获取该分类的总数
      this.getArticlesData(this.param); // 获取该分类的商品
    },

    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getArticleCount(this.param); // 获取商品所有数量
      this.getArticlesData(this.param); // 获取商品数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getArticleCount(this.param); // 获取对应条件的所有商品数量
      this.getArticlesData(this.param); // 获取对应条件的商品
    },


    /* 关键字查询input失去焦点查询 */
    inputEnd(val){
      this.param.categoryId = ""; // 分类初始化
      this.param.labelId = ""
      this.getArticleCount(this.param); // 获取该关键字所有商品的总数
      this.getArticlesData(this.param); // 获取该关键字的商品
    },

    handleEdit(index, row) {
      this.list = row;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const imgsrcs = row.article_image.split('/');
        const imgsrc = imgsrcs[imgsrcs.length - 1];
        deleteArticle(row.article_id,imgsrc).then(res => {
          if(res.data.err == 0){
            this.$message({
              type: 'success',
              message: res.data.msg
            });
          }else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(err => {})
      })
    },
    
  },
  watch:{
    categoryId(){
      // 遍历对象 获取对象中每个数组的值this.obj[key]
      Object.keys(this.obj).forEach((key) => {
        // 如果所选分类的value与所遍历的值的article_category_id相匹配
        if (this.categoryId == this.obj[key][0].article_category_id) {
          // 把该值赋值给labels
          this.labelData = this.obj[key];
        }
      });
    }
  },
  mounted() {
    /* 获取所有商品数量 */
    this.getArticleCount(this.param);

    /* 获取商品*/
    this.getArticlesData(this.param);
  
   // 获取分类
    getCategory().then((res) => {
      if (res.data.err == 0) {
        this.categoryData = res.data.data;
      }else{
        this.$message({
          message: res.data.msg,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})

    // 获取标签
    getLabel().then((res) => {
      if (res.data.err == 0) {
        res.data.data.forEach((item, index) => {
          let categoryName = item.article_category_name;
          if (!this.obj.hasOwnProperty(categoryName)) {
            // obj中不包括该属性名
            this.obj[categoryName] = []; // 将该字段作为obj的属性名
            this.obj[categoryName].push(item);
          } else {
            this.obj[categoryName].push(item);
          }
        });
      }else{
        this.$message({
          message: res.data.msg,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})
  }
}
</script>

<style>
  .article_management {
    margin: 0 auto;
    width: 80%;
    padding:1rem 1.5rem;
  }
  .article_management h1 {
    margin-bottom: 1rem;
  }
  .search {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  .change {
    margin-right: 1rem;
  }
  .input-keywork {
    width: 16rem;
    display: inline-block;
  }
  .el-table {
    margin-top: 1rem;
    border-radius: 10px;
  }
  .article_img {
    height: 2rem;
  }
  .article_img img {
    height: 100%;
    z-index: 999;
  }
  .el-popover {
    height: 100vh;
    margin-top: -.7rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .article_del {
    margin-left: 1rem;
  }

</style>