<template>
  <div class="search">
    <span class="serch-none-btn" v-show="search" @click="drawer = true"><strong><i class="iconfont icon-tubiao_huaban"></i>&nbsp;</strong></span>
    <span class="nav-none-btn" @click="[navDrawer = true]"><strong><i class="iconfont icon-icon-"></i></strong></span>
    <el-drawer
      class="side-nav"
      :visible.sync="drawer"
      direction="ttb"
      size="100%">
      <el-input
      class="serch-none-box"
      placeholder="请输入文章题目关键字"
      v-model="keyWord"
      clearable>
        <el-button slot="append" icon="el-icon-search" class="search-btn" @click="searchKeyWord"></el-button>
      </el-input>
      <div class="catAndLab">
      <div class="side_title">
        <i class="iconfont" v-html="category.iconUrl"></i>&nbsp;{{category.title}}
      </div>
      <ul class="tag_cloud">
        <li class="tag_item" @click="categoryClick(item.article_category_id)" v-for="(item,index) in category.content" :key="index">{{item.article_category_name}}</li>
      </ul>
      <div class="side_title">
        <i class="iconfont" v-html="label.iconUrl"></i>&nbsp;{{label.title}}
      </div>
      <ul class="tag_cloud">
        <li class="tag_item" @click="labelClick(item.article_label_id)" v-for="(item,index) in label.content" :key="index">{{item.article_label_name}}</li>
      </ul>
      </div>
    </el-drawer>
    <el-drawer
      class="menu"
      :visible.sync="navDrawer"
      direction="ttb"
      size="100%">
      <!-- <div class="menu"> -->
        <ul class="menuItem">
          <li v-for="(item,index) in menu" :key="index" @click="menuClick(item.path)">{{item.name}}</li>
        </ul>
      <!-- </div> -->
    </el-drawer>
  </div>
</template>

<script>
import {tagCloud} from 'utils/tagcloud';
import { getLabel, getCategory} from 'network/getContent';
export default {
  name:'Search',
  props:{
    search: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      label:{iconUrl:'&#xe794;',title:'标签云',content:[]},
      category:{iconUrl:'&#xe629;',title:'分 类',content:[]},
      menu:[
        {name:'首页',iconUrl:'&#xe652;',path:'/'},
        {name:'实战案例',iconUrl:'&#xe658;',path:'/demo'},
        {name:'素材工具',iconUrl:'&#xe767;',path:'/tool'},
        {name:'关于博主',iconUrl:'&#xe638;',path:'/about'},
        {name:'GitHub',iconUrl:'&#xe628;',path:''},
        {name:'登录/注册',iconUrl:'&#xe611;',path:'/login'}
      ],
      drawer: false,
      navDrawer: false,
      keyWord: ''
    }
  },
  methods: {
    // 显隐导航栏
    navActive() {
      this.$store.state.tabcontroleIsShow = !this.$store.state.tabcontroleIsShow;
    },
    labelClick(labelId) {
      let date = Date.parse(new Date());
      this.$store.state.labelId = labelId + date;
      this.$router.replace("article");
      this.drawer = false;
    },
    categoryClick(categoryId) {
      let date = Date.parse(new Date());
      this.$store.state.categoryId = categoryId + date;
      this.$router.replace("article");
      this.drawer = false;
      document.documentElement.scrollTop = window.screen.height -60;
    },
    searchKeyWord() {
      this.$store.state.keyWord = this.keyWord;
      this.$router.replace("article");
      this.keyWord = '';
      this.drawer = false;
      document.documentElement.scrollTop = window.screen.height -60;
    },
    menuClick(path) {
      this.navDrawer = !this.navDrawer
      if(path){
        this.$router.replace(path);
      }else {
        location.href="https://github.com/Jay-wj";
      }
    }
  },
  created() {
    /* 获取标签 */
    getLabel().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.label.content = data;
        return tagCloud();
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
      }
    }).catch(err => {});

    /* 获取分类 */
    getCategory().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.category.content = data;
        /* 获取最新评论 */
        return tagCloud();;
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).catch(err => {});

    tagCloud();
  }
}
</script>

<style lang="scss" scoped>
  .search{
    text-align: right;
    position: relative;
  }
  .serch-none-btn,.nav-none-btn {
    position:absolute;
    right: 1rem;
    top: 0;
    color: #777;
  }
  .serch-none-btn i,.nav-none-btn i {
    font-size:1.5rem;
  }

  /* .input_keyword {
    width: 250px !important;
  }*/

  .serch-none-box,.catAndLab {
    padding: 0 20%;
  } 
  
  .serch-none-btn {
    right: 3rem;
  }
  .serch-none-btn:hover,.nav-none-btn:hover {
    transform: scale(1.12);
    /* color: #9466ff; */
    transition: .5s;
  }
  .serch-none-box {
    padding: 0 20% ;
  }
  .tag_cloud {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    
    justify-content: flex-start;
  }

  .tag_item {
    line-height: 1.5rem;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    background-color: #ba9efa;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tag_item:hover {
    transform: rotate3d(10, 20, 0, 30deg);
    cursor: pointer;
    transition: .5s;
  }

  .side_title {
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin: 1rem 0;
    border-bottom: 1px solid rgba(100,100,100,.2);
  }

  .menuItem {
    text-align: center;
    cursor: pointer;
    li:hover {
      color: #000;
    }
  }
  @media screen and (max-width:600px) {
    .serch-none-box,.catAndLab {
      padding: 1rem;
    }
  }
</style>