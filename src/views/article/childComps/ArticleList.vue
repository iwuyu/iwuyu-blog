<template>
<div class="article_list">
  <!-- <p class="article_p">文章列表 <img src="../../../assets/img/yeshu.gif" alt=""></p> -->
  <div class="article_item">
    <div class="space" v-for="(item,index) in articleLists" :key="index">
      <div class="art_top"></div>
      <!--文章配图-->
      <div class="art_img">
        <img :src="item.article_image" />
      </div>
      <!--文章内容-->
      <div class="content">
        <div class="time">{{item.article_time}}</div>
        <header>
          <!-- <span class="article_category">{{item.article_category_name}}</span>
          <span class="article_title">{{item.article_label_name}}</span> -->
          <span class="a" @click="toDetail(item.article_id)">{{item.article_title}}</span>
        </header>
        <section>
          <p class="summary" data-v-19a52a1e>{{item.article_synopsis}}</p>
        </section>
        <footer>
          <!--时间、浏览量、评论量、点赞量-->
          <div class="feed_back">
            <span>{{item.article_category_name}} |</span>&nbsp;
            <span>{{item.article_label_name}}</span>&nbsp;
            <i class="iconfont icon-huo">&nbsp;{{item.num_views}}</i>&nbsp;
            <i class="iconfont icon-pinglun">&nbsp;{{item.article_messagecount}}</i>&nbsp;
            <i class="iconfont icon-good like" :class="{likeStyle:liked(item.article_id)}" @click="likeArticle(item.article_id)">&nbsp;{{item.num_likes}}</i>
          </div>
          <!-- <div class="enter_detail" @click="toDetail(item.article_id)">阅读详情</div> -->
        </footer>
      </div>
    </div>
    <div class="page">
      <el-pagination small :page-size="page.pageSize" :current-page.sync="page.pageNo" @current-change="pageChange" layout="prev, pager, next" :total="articleCounts"></el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import Page from "./Page";
// import Bus from 'utils/bus.js';
import { articleLike, userIsLogined } from 'network/userOperation';
import uploadImage from "network/uploadImage";
import { getArticlePage, getLabelPage, getCategoryPage, getKeyWordPage } from 'network/getContent';

export default {
  name: "ArticleList",
  components: {
    Page
  },
  data() {
    return {
      articleLists: [],
      articleCounts: 0,
      // 文章页码与每页显示数量
      page: {
        pageNo:1,  //页码
        pageSize:5,  // 每页数量
      },
      categoryId:'',
      labelId:'',
      keyWord:''
    };
  },
  computed:{
    currentLabelId: {
      get (){
        let date = Date.parse(new Date());
        // 获取事件总线labelId
        // Bus.$on('labelId', labelId => { this.labelId = labelId + date });
        this.labelId = this.$store.state.labelId;
        return this.labelId;
      }
    },
    currentCategoryId: {
      get (){
        let date = Date.parse(new Date());
        // 获取事件总线categoryId
        // Bus.$on('categoryId', categoryId => { this.categoryId = categoryId + date });
        this.categoryId = this.$store.state.categoryId;
        return this.categoryId;
      }
    },
    currentKeyWord: {
      get (){
        // 获取事件总线keyWord
        // Bus.$on('keyWord', keyWord => { this.keyWord = keyWord });
        this.keyWord = this.$store.state.keyWord;
        return this.keyWord;
      }
    },
    liked() {
      return function(id) {
        return localStorage.getItem(`like${id}`)
      }
    },
  },
  filters:{
    timeFilter(V) {
      return V.toString().slice(0,10)
    }
  },
  methods: {
    toDetail(path) {
      this.$store.state.detailId = path;
      this.$router.push("/detail/" + path);
    },
    pageChange() {
      getArticlePage(this.page).then(res => {
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }
      })
    },
    likeArticle(articleId) {
      if(localStorage.getItem('username')) {
        if(localStorage.getItem(`like${articleId}`)) {
          this.$message({
            message: '你已经为这篇文章点过赞了噢~o(*￣▽￣*)o',
            type: 'warning',
            offset:'80'
          });
        } else {
          userIsLogined(localStorage.username).then(res => {
            if(res.data.err === 0){
              /* 发送请求 */
              articleLike(articleId).then(res => {
                if(res.data.err == 0){
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success',
                    offset:'80'
                  });
                  localStorage.setItem(`like${articleId}`,articleId);
                  this.articleLists.forEach(item => {
                    if(item.article_id == articleId){
                      item.num_likes += 1;
                    }
                  })
                }else {
                  this.$message({
                    message: res.data.msg,
                    type: 'error',
                    offset:'80'
                  });
                }
              })
            }else {
              // token已过期
              localStorage.removeItem("username");
              this.$message({
                message: res.data.msg,
                type: 'error',
                offset:'80'
              });
            }
          })
        }
      } else {
        this.$message({
          message: "请先去登陆再来点赞噢小主！(ノへ￣、)",
          type: 'error',
          offset:'80'
        });
      }
    },
  },
  watch: {
    currentLabelId(value) {
      value = value.toString().substring(11,13);
      getLabelPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
    currentCategoryId(value) {
      value = value.toString().substring(11,13);
      getCategoryPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err == 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
    currentKeyWord(value) {
      getKeyWordPage(this.page,value).then(res => {
        this.articleCounts = res.data.count;
        if(res.data.err === 0) {
          let data = res.data.data;
          data.forEach(item => {
            item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
          });
          this.articleLists = data;
        }else {
          console.log(res.data.msg)
        }
      })
    },
  },
  created() {
    getArticlePage(this.page).then(res => {
       this.articleCounts = res.data.count;
      if(res.data.err == 0) {
        let data = res.data.data;
        data.forEach(item => {
          item.article_image = uploadImage.UPLOADIMG.BASEURL + item.article_image;
        });
        this.articleLists = data;
      }else {
        console.log(res.data.msg)
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.article_list {
  // max-width: 1200px;
  padding-left: 0;
  background: #fff;
  border-radius: 5px;
  // padding: 0 15px;
}

.article_p{
  height: 60px;
  line-height: 60px;
  border-bottom: .5px solid rgba(100, 100, 100, .3);
}

.article_p img {
  height: 50%;
}

.article_item {
  width: 1200px;
  border-radius: 5px;
  margin: auto;
	position: relative;
  text-align: center;
  border-top: 1px solid #eaeaea;
}

.article_item:after{
	content: '';
	width: 1px;
	height: calc(100% + 100px);
	position: absolute;
	top: -100px;
	left: 50%;
	background: #eaeaea;
	z-index: 0;
}
/*篇幅   存放一整篇文章的所有元素   每一篇文章是一个篇幅*/
.article_item,
header,
section,
footer,
.content,
.space {
  overflow: auto;
}
.space {
  margin-top: 4rem;
  padding-bottom: 10px;
  position: relative;
  z-index: 1;
  &:nth-child(odd){
  	text-align: left;
  	.content{
  		left: 660px;
  	}
  }
  &:nth-child(even){
  	text-align: right;
  	.content{
  		text-align: left;
  		right: 660px;
  	}
  }
}

.space:hover .art_img>img{
  transform: scale(.98);
  transition: 0.8s;
}
/*文章图片  存放在篇幅左侧*/
.art_img {
  width: 680px;
	height: 440px;
	font-size: 0;
	display: inline-block;
	position: relative;
	cursor: pointer;
	z-index: 3;
	overflow: hidden;
	transition: all .3s;
}
.art_img > img {
  width: 100%;
  height: 100%; 
  border-radius: 5px;
}

.time {
  padding: .8rem 0;
  font-size: .8rem;
}

/*文章主体  存放在篇幅右侧*/
.content {
  width: 500px;
	height: 400px;
	position: absolute;
	top: 20px;
  // left: 55%;
	padding: 80px 80px 0 80px;
	border: 1px solid #eaeaea;
	border-radius: 6px;
}
/*文章头部   存放类型与文章标题 */
.content > header {
  margin-bottom: 10px;
}
/*文章类型图标  用span元素 内可写入类型名称*/
.article_title,.article_category {
  color: white;
  font-size: 10px;
  background-color: #67C23A;
  position: relative;
  padding: 5px 10px 4px 10px;
  border-radius: 3px;
  top: -3px;
}
.article_category {
  background-color: #409EFF;
  margin-right: .2rem;
}
/*类型图标伪元素  用于制作图标尖口*/
.article_title:after {
  content: "";
  width: 7px;
  height: 7px;
  top: 6px;
  right: -2px;
  background-color: #67C23A;
  transform: rotate(45deg);
  position: absolute;
}
/*文章标题*/
header .a {
  /* margin-left: 20px; */
  font-size: 20px;
  color: #2b2b2b;
  cursor: pointer;
}
/* header .a:hover{
  color: #9966ff;
  
} */
header .a:hover{
	background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
	radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
	background-size: 20px 20px;
	background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
	animation: waveFlow 1s infinite linear;
}
@keyframes waveFlow {
	from { background-position-x: -10px, 0; }
	to { background-position-x: -30px, -20px; }
}
/*文章内容*/
.summary {
  font-size: 14px;
  color: #666;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  line-height: 1.8;
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  overflow: hidden;
}
/*文章尾部*/
footer {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
	color: #999;
	position: absolute;
	bottom: 80px;
	left: 80px;
}
.feed_back i {
  /* color: gold; */
  font-size: 13px;
}

.like:hover{
  cursor: pointer;
  color: pink;
}
.enter_detail {
  background: #9466ff;
  color: #fff;
  font-size: 12px;
  height: 1.6rem;
  width: 4rem;
  text-align: center;
  line-height: 1.6rem;
	border-radius: 5px;
	cursor: pointer;
}

.page {
  text-align: center;
  padding: 20px 0;
}
.page_item {
  padding: 5px 10px;
  margin-left: 5px;
  border: 1px solid #ccc;
}

@media screen and (max-width: 1200px){
	.article_item{
    width: 900px;
    text-align: center;
		.space{
			.art_img{
				width: 480px;
				height: 310px;
			}
			.content{
				top: 10px;
				width: 420px;
				height: 290px;
				padding: 50px 60px 0 60px;
				footer{
					bottom: 50px;
					left: 60px;
				}
				.a{
					margin-top: 10px;
					line-height: 25px;
				}
				.summary{
					-webkit-line-clamp: 2;
				}
			}
			&:nth-child(odd) .content{
				left: 450px;
			}
			&:nth-child(even) .content{
				right: 450px;
			}
		}
	}
}
@media screen and (max-width: 900px){
	.article_item{
		width: 100%;
		.space{
			margin-top: 60px;
			background: #fff;
			border-bottom: 1px solid #eaeaea;
			.art_img{
				width: 100%;
				height: auto;
				display: block;
				text-align: center;
				border: none;
				img{
					width: 680px;
					max-width: 100%;
				}
			}
			.content{
				position: static;
				width: 96%;
				padding: 40px 20px 40px;
				margin: auto;
				border: none;
				background: #fff;
				height: auto;
				footer{
					position: static;
					margin: 20px 0 0 0;
				}
			}
		}
	}
}

@media screen and (max-width: 780px){
	.article_item{
		width: 100%;
		.space{
			.art_img{
				width: 100%;
				height: auto;
        img{
          border-radius: 0;
        }
      }
      .content{
        padding: 40px 10px;
      }
		}
	}
}



// @media screen and (max-width: 610px) {
//   .art_img {
//     float: none;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//   }
//   .content > header {
//     margin-top: 10px;
//   }
// }
// @media screen and (min-width: 610px) {
//   .art_img {
//     padding-right: 10px;
//   }
// }
</style>