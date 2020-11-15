<template>
  <div class="detail">
    <app-header :title="articleDetail.article_title"></app-header>
    <!-- <el-page-header @back="goBack" content></el-page-header> -->
    <!-- 文章 -->
    <div class="detail_header">
      <p class="art_title">{{articleDetail.article_title}}</p>
      <ul class="art_about">
        <li>
          <i class="iconfont icon-wode">&nbsp;{{author}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-rili">&nbsp;{{articleDetail.article_time}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-huo">&nbsp;{{articleDetail.num_views}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-pinglun">&nbsp;{{messageCount}}</i>&nbsp;&nbsp;
        </li>
        <li>
          <i class="iconfont icon-good">&nbsp;{{articleDetail.num_likes}}</i>
        </li>
      </ul>
    </div>
    <div class="tag_box">
      <el-tag type="success" size="small">{{articleDetail.article_category_name}}</el-tag>
      <el-tag type="danger" size="small">{{articleDetail.article_label_name}}</el-tag>
    </div>
    <div class="markdown-body">
      <div class="article_message hljs renderNav" v-html="articleDetail.article_content"></div>
    </div>

    <!-- 分享 -->
    <div class="detail_share">
      <span style="{color:#9944ff;}">分享文章:</span>
      <el-tooltip 
        v-for="(item,index) in shareIcon"
        :key="item.id" 
        effect="dark" 
        :content="item.content" 
        :placement="item.direction">
        <i @click="ArticleShare(index)" :class="item.icon"></i>
      </el-tooltip>
      <QrcodeVue v-show="qrcode" class="erweima" :value="detailURL"/>
    </div>

    <!-- 打赏 -->
    <Reward/>  

    <!-- 留言与回复 -->
    <replay-or-publish :articleId="id" @data="getMessageCount($event)"/>
  </div>
</template>

<script>
import AppHeader from "components/AppHeader";
import Reward from "components/common/Reward";
import ReplayOrPublish from "components/common/replayOrpublish/ReplayOrPublish";
import { getArticleDetail, getMessageAndReply } from 'network/getContent';
import uploadImage from 'network/uploadImage';
import QrcodeVue from "qrcode.vue";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default {
  name: "Detail",
  components: {
    AppHeader,
    Reward,
    ReplayOrPublish,
    QrcodeVue
  },
  data() {
    return {
      id: null,
      author:'codejay',
      articleDetail: {},
      imgurl:'../../assets/img/hose.png',
      messageCount:0,
      share_img:'',
      share_brief: '',
      share_title:'',
      qrcode: false,
      shareIcon: [
        {
          content: "分享到微博",
          icon: "iconfont icon-weibo",
          direction: "top"
        },
        {
          content: "分享到微信",
          icon: "iconfont icon-gongzhonghao",
          direction: "top"
        },
        { content: "分享到QQ", icon: "iconfont icon-qq", direction: "top" },
        {
          content: "分享到QQ空间",
          icon: "iconfont icon-qzone",
          direction: "top"
        }
      ],
    };
  },
  computed: {
    detailURL() {
      return window.location.href;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMessageCount(data) {
      this.messageCount = data;
    },
    ArticleShare(i) {
      let link;
      switch (i) {
        case 0: // 微博
          link = `http://service.weibo.com/share/share.php?url=${location.href}&title=${this.share_title}&pics=${this.share_img}&appkey='2706825840'`;
          window.location.href = link;
          break;
        case 1: // 微信
          this.qrcode = !this.qrcode;
          break;
        case 2: // qq
          link = `http://connect.qq.com/widget/shareqq/index.html?url=${location.href}&sharesource=qzone&title=${this.share_title}&pics=${this.share_img}&summary=${this.share_brief}&desc=${this.share_brief}`;
          window.location.href = link;
          break;
        case 3: // qq空间
          link = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${location.href}&sharesource=qzone&title=${this.share_title}&pics=${this.share_img}&summary=${this.share_brief}`;
          window.location.href = link;
          break;
      }
    },
  },
  mounted(){
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    
  },
  created() {
    this.id = this.$route.params.id
    getArticleDetail(this.id).then(res => {
      if(res.data.err == 0){
        let data = res.data.data[0];
        data.article_content = marked(data.article_content);
        this.share_img = uploadImage.UPLOADIMG.BASEURL + data.article_image;
        this.share_title = data.article_title;
        this.share_brief = data.article_synopsis;
        this.articleDetail = data;
      }else {
        this.$message({
          type:'success',
          offset:'80',
          message:res.data.msg
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
};
</script>

<style>
@import"../../assets/css/detail.css";

.detail {
  padding: 60px 0 20px 0;
  background: #fff;
}
.el-page-header {
  line-height: 30px;
  padding-left: 1.2%;
}
.detail_header {
  text-align: center;
}
.art_title {
  font-size: 24px;
  padding: 20px 20px;
}
.art_about {
  color: rgba(100, 100, 100, 0.7);
  list-style: none;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.art_about .iconfont {
  font-size: 13px;
}
.tag_box {
  display: flex;
  justify-content: center;
}
.tag_box > .el-tag {
  margin: 0 3px;
}

.image {
  height: 10rem;
  display: flex;
  margin-top: 2rem;
  justify-content: center;
}

.image img {
  height: 100%;
}
.article_message {
  border-left: 1.5px dotted #2980b9;
  border-top: 1.5px dotted #633bd3;
  border-right: 1.5px dotted #192f44;
  border-bottom: 1.5px dotted #27ae60;
  width:97%;
  background: #fff;
  line-height: 1.7rem;
  padding: 1rem;
  margin: 3rem auto 0 auto;
  border-radius: 5px;
}
@media screen and (max-width: 610px) {
  .article_message {
    width: 98%;
  }
  .detail_share span {
    display: none;
  }
}

.detail_share {
    position: relative;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    }
    .erweima {
      position: absolute;
      top: -130px;
      background: #fff;
      padding: 0.4rem 0.4rem 0 0.4rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
    }
  .detail_share span {
      color: #333;
      margin-right: 1rem;
    }
    .detail_share i {
      padding: 0.6rem 0.63rem;
      border-radius: 50%;
      font-size: 1.4rem;
      margin: 0 1rem;
      cursor: pointer;
      transition: all 0.6s;
    }
    i.icon-weibo {
      border: 1px solid rgb(255, 153, 0);
      color: rgb(255, 153, 0);
    }
    i.icon-weibo:hover {
      background: rgb(255, 153, 0);
      color: white;
    }
    i.icon-gongzhonghao {
      border: 1px solid lightgreen;
      color: lightgreen;
    }
    i.icon-gongzhonghao:hover {
      background: lightgreen;
      color: white;
    }
    i.icon-qq {
      border: 1px solid skyblue;
      color: skyblue;
    }
    i.icon-qq:hover {
      background: skyblue;
      color: white;
    }
    i.icon-qzone {
      border: 1px solid yellow;
      color: yellow;
    }
    i.icon-qzone:hover {
      background: yellow;
      color: white;
    }
    .reward{
      text-align: center;
      font-size: .9rem;
      color: gold;
      cursor: pointer;
      margin-bottom: 2rem;
    }
    
</style>