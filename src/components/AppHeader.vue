<!-- AppHeader -->
<template>
  <div class="app-header">
    <!-- <loading/> -->
    <!-- <div class="header"> -->
      <div class="left" @click="$router.replace('/home')"><logo class="left"/></div>
      <!-- <nav-bar/> -->
      <div class="center" :class="showCenter?'show_center':'none_center'">{{title}}</div>
      <div class="right"><search class="right" :search="search"/></div>
    <!-- </div> -->
    <div></div>
  </div>
</template>

<script>
import Logo from './header/Logo';
import NavBar from './header/NavBar';
import Search from './header/Search';
import loading from './header/loadingTab';

export default {
  name: 'AppHeader',
  components: {
    Logo,
    NavBar,
    Search,
    loading
  },
  props:['search','title'],
  data() {
    return {
      scrollTop:0,
      showCenter:true,
    }
  },  
  methods: {
    handleScroll(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const relust = scrollTop - this.scrollTop;
      this.scrollTop = scrollTop;
      this.showCenter = scrollTop > -1 && relust < 0 ;
    }
  },
 mounted() {
   window.addEventListener('scroll', this.handleScroll)
 }
}

</script>

<style scoped>
  .app-header {
    width: 100%;
    height: 4rem;
    background: rgba(255,255,255,.9);
    border-bottom: 1px solid #eaeaea;

    position: fixed;
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;

    z-index: 9999;
  }

  .header{
    max-width: 100%;
    line-height: 60px;
    display: flex;
  }

  .left {
    line-height: 60px;
    width: 23%;
    padding-left: .5rem;
  }

  .center {
    flex: 1;
    /* line-height: 60px; */
    padding:0 1.5rem 0 1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #666;
  }

  .show_center {
    opacity: 1;
    /* 过渡时间为1秒 */
		transition:1s;
  }
  .none_center {
    transform:translateY(-60px);
    opacity: .1;
    /* 过渡时间为1秒 */
		transition:1s;
  }

  .right {
    line-height: 60px;
    float: right;
    padding-right: 1rem;
    width: 17%;
  }

  @media screen and (min-width:1200px) {
    .left {
      padding-left: .5rem;
    }
    .right {
      padding-right: 1rem;
    }
  }

  @media screen and (max-width:900px) {
    .left {
      padding-left: 0;
    }
    .right {
      padding-right: .5rem;
    }
  }
</style>