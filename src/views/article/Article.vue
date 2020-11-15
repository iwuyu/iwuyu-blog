<template>
  <div id="article">
    <app-header :search=true :class="[scrolled?'app_header':'app_header2',showHeader?'show_header':'none_header']"/>
    <div ref="homeElement">
      <home class="home_" ref="home" />
    </div>
    <div class="article_box">
      <article-list class="article_list"/>
      <!-- <side class="side-comp"/> -->
    </div>
  </div>
</template>

<script>
import AppHeader from "components/AppHeader";
import Home from '../home/Home'
import ArticleList from './childComps/ArticleList'
import Side from './childComps/Side';

export default {
  name: 'Article',
  components: {
    AppHeader,
    Home,
    ArticleList,
    Side,
  },
  data() {
    return {
      scrolled:false,
      showHeader:true,
      scrollTop: 0,
    }
  },
  methods: {
    handleScroll(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const relust = scrollTop - this.scrollTop;
      this.scrollTop = scrollTop;
      this.showHeader = scrollTop > -1 && relust < 0 ;
      if(scrollTop>this.$refs.homeElement.offsetHeight){
        this.scrolled = true;
      }else{
        this.scrolled = false;
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
 created() {
  
 }

}
</script>

<style lang="scss" scoped>
  #article {
    width: 100%;
  }
  .app_header {
    background: rgba(255,255,255,.8);
    transform: .5s;
  }
  .app_header2 {
    border-bottom: 0;
    background: transparent;
    transform: .5s;
  }
  .show_header {
    opacity: 1;
    /* 过渡时间为1秒 */
		transition:1s;
  }
  .none_header {
    transform:translateY(-60px);
    opacity: .1;
    /* 过渡时间为1秒 */
		transition:1s;
  }

  .article_box {
    padding-bottom: 20px;
    display: flex;
  }
  .article_list {
    width: 100%;
  }
  @media screen and (max-width:930px) {
    .side-comp {
      display: none;
    }
    .article_list {
      width: 100%;
    }
  }
</style>