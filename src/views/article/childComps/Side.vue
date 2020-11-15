<template>
  <div class="side">
    <!-- 公告 -->
    <side-item class="side_item" :side-item="notice">
      <p class="notice" style="-webkit-line-clamp: 5;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;overflow: hidden;">{{notice.content}}</p>
    </side-item>
    <!-- 分类 -->
    <side-item class="side_item" :side-item="category">
      <ul class="tag_cloud">
        <li class="tag_item" @click="categoryClick(item.article_category_id)" v-for="(item,index) in category.content" :key="index">{{item.article_category_name}}</li>
      </ul>
    </side-item>
    <!-- 标签 -->
    <side-item class="side_item" :side-item="label">
      <ul class="tag_cloud">
        <li class="tag_item" @click="labelClick(item.article_label_id)" v-for="(item,index) in label.content" :key="index">{{item.article_label_name}}</li>
      </ul>
    </side-item>
    <!-- 最新留言 -->
    <side-item class="side_item" :side-item="newMessage">
      <div class="comment" v-for="(value,index) in newMessage.content" :key="index">
        <div class="comment_img">
          <img :src="value.head_image" alt="">
        </div>
        <div class="comment_content">
          <p class="commenter">{{value.username}}</p>
          <p class="comment_information">{{value.message_content}}</p>
          <p class="comment_url">评: {{value.article_title}}</p>
        </div>
      </div>
    </side-item>
    <!-- 站点统计 -->
    <side-item class="side_item" :side-item="siteStatistics">
      <ul class="site">
        <li class="site_item" v-for="(item,index) in siteStatistics.content" :key="index">
          {{item.lable}}&nbsp;{{item.lableValue}}{{item.unit}}
        </li>
      </ul>
    </side-item>
  </div>
</template>

<script>
import SideItem from './SideItem';
import {tagCloud} from 'utils/tagcloud';
// import Bus from 'utils/bus.js';
import uploadImage from "network/uploadImage";
import { getLabel, getCategory, getNewMessage, getSiteStatistics,getNotice } from 'network/getContent';
export default {
  name: 'Side',
  data() {
    return{
      tagName: '',
      notice:{iconUrl:'&#xe626;',title:'公告',content:''},
      label:{iconUrl:'&#xe794;',title:'标签云',content:[]},
      category:{iconUrl:'&#xe629;',title:'分 类',content:[]},
      newMessage:{iconUrl:'&#xe6a0;',title:'最新评论',content:[]},
      siteStatistics:{iconUrl:'&#xe649;',title:'站点统计',content:[
                                                                   {lable:'标签:',lableValue:0,unit:'个'},
                                                                   {lable:'分类:',lableValue:0,unit:'个'},
                                                                   {lable:'文章:',lableValue:0,unit:'篇'},
                                                                   {lable:'评论:',lableValue:0,unit:'条'},
                                                                   {lable:'最后更新:',lableValue:''}
                                                                  ]}
    }
  },
  components: {
    SideItem
  },
  methods: {
    labelClick(labelId) {
      let date = Date.parse(new Date());
      // Bus.$emit('labelId', labelId) ;
      this.$store.state.labelId = labelId + date;
    },
    categoryClick(categoryId) {
      let date = Date.parse(new Date());
      this.$store.state.categoryId = categoryId + date;
      // Bus.$emit('categoryId', categoryId);
    }
  },
  created() {
    /* 获取标签 */
    getLabel().then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.label.content = data;
        /* 获取分类 */
        return getCategory();
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
      }
    }).then(res => {
      if(res.data.err == 0){
        let data = res.data.data;
        this.category.content = data;
        tagCloud();
        /* 获取最新评论 */
        return getNewMessage();
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).then(res => {
      if(res.data.err == 0){
        tagCloud();
        let data = res.data.data;
        data.forEach(item => {
          item.head_image = uploadImage.UPLOADIMG.BASEURL + item.head_image;
        });
        this.newMessage.content = data;
         /* 获取公告 */
        return getNotice();
      }else {
        this.$message({
          type: 'error',
          message: res.data.msg
        })
      }
    }).then(res => {
      if(res.data.err == 0) {
        this.notice.content = res.data.data.content;
        /* 获取站点统计信息 */
        return getSiteStatistics();
      }else {
        this.$message({
          type: 'error',
          offset: '80',
          message:res.data.msg
        })
      }
    }).then(res => {
      if(res.data.err == 0) {
        let data = res.data.data;
        let index = 0;
        Object.keys(data).forEach(item => {
          this.siteStatistics.content[index].lableValue = data[item];
          index ++;
          if(index == item.length-1){}
          // console.log(this.siteStatistics.content)
        })
      }else {
        this.$message({
          type: 'error',
          offset: '80',
          message:res.data.msg
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .side {
    width: 280px;
    margin-left: 20px;
  }
  .side_item {
    margin-bottom: 20px;
  }
  .notice {
    line-height: 21px;
  }
  .comment{
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .comment_img img{
    width: 50px;
    border-radius: 45px;
  }
  .comment_content {
    margin-left: 10px;
    overflow: hidden;
  }
  .commenter,.comment_url {
    height: 30px;
    line-height: 30px;
    color:#9466ff;
  }
  .commenter {
    font-size: 16px;
  }
  .comment_url {
    font-size: 13px;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    /* line-height: 1.8; */
  }
  .site {
    width: 100%;
    list-style:none;
    display: flex;
    flex-flow: wrap;
  }
  .site_item {
    width: 50%;
    padding: 8px 0;
  }
  .site_item:last-child{
    width: 100%;
  }
  
  .tag_cloud {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    
    justify-content: flex-start;
  }

  .tag_item {
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .tag_item:hover {
    transform: rotate3d(10, 20, 0, 30deg);
    cursor: pointer;
    transition: .5s;
  }
  
</style>