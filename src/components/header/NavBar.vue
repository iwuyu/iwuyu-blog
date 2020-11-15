<!-- NavBar -->
<template>
  <div class="navbar">
    <ul class="navbar-box"> 
      <li v-for="(item,index) in menu" :key="index" @click="itemClick(item.path)">
        <i class="iconfont" v-html="item.iconUrl"></i>
        {{item.name}}
        <i class="iconfont" v-html="item.down"></i>
        <ul class="category">
          <li v-for="(item2,index2) in item.category" :key="index2">{{item2.article_category_name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLabel, getCategory, getNewMessage, getSiteStatistics,getNotice } from 'network/getContent';
export default {
  name: 'NavBar',
  data() {
    return {
      menu:[
        {name:'首页',down:'',iconUrl:'&#xe652;',path:'/',category:[]},
        {name:'分类',down:'&#xe613;',iconUrl:'&#xe60e;',path:'/article',category:[]},
        {name:'标签',down:'&#xe613;',iconUrl:'&#xe767;',path:'/tool',category:[]},
        {name:'实战案例',down:'',iconUrl:'&#xe658;',path:'/demo',category:[]},
        {name:'关于博主',down:'',iconUrl:'&#xe638;',path:'/about',category:[]},
        {name:'GitHub',down:'',iconUrl:'&#xe628;',path:'',category:[]},
        {name:'登录/注册',down:'',iconUrl:'&#xe611;',path:'/login',category:[]}
      ],
      label:[],
      category:[]
    }
  },
  computed:{
    
  },
  methods:{
    itemClick(path) {
      if(path){
        this.$router.replace(path);
      }else {
        location.href="https://github.com/Jay-wj";
      }
    }
  },
  mounted() {
    /* 获取标签 */
    getLabel().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.label = data;
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
      }
    })

    /* 获取分类 */
    getCategory().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.menu[1].category = data;
        console.log(data)
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    })
  }
}

</script>

<style lang="scss" scoped>

  .navbar {
    width: 100%;
    height: 100%;
  }
  .navbar-box {
    background: transparent;
    border-bottom: 0;
  }

  .navbar ul {
    list-style: none;
    // display: flex;
    li {
      font-size: 14px;
      cursor: pointer;
      // align-items: center;
      display: inline-block;
      padding: 0 1rem;
      color: #fff;
      position: relative;
      &:hover .category {
        display: block;
        transition: 1s;
      }
      .category{
        display: none;
        position:absolute;
        background: rgba(0,0,0,.5);
        width: 150px;
        li{
          display:block;
          // width: 200px;
        }
      }
    }
  }

  li:hover {
    color: #9466ff;
  }
  @media screen and (max-width:900px) {
    .navbar-box {
      display: none !important;
    }
  }
</style>