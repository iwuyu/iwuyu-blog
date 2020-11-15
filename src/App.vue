<template>
  <div id="app" class="swiper">
    <el-backtop :visibility-height="300"><i class="iconfont icon-huojian"></i></el-backtop>
      <keep-alive exclude="Detail,admin">
        <router-view @click="tabIsShow"></router-view>
      </keep-alive>
    <app-footer v-show="!$store.state.loading"/>
    <loading-tab v-show="$store.state.loading"/>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import loadingTab from 'components/header/loadingTab';

export default {
  name: "app",
  components: {
    AppHeader,
    AppFooter,
    loadingTab,
  },
  data() {
    return {
      showNav: "",
      reg: "/detail/",
      reg2: "/admin"
    };
  },
  methods: {
    tabIsShow() {
      if (this.$store.state.tabcontroleIsShow)
      return;
    }
  },
};
</script>

<style>
@import "assets/css/base.css";

#app {
  height: 100%;
  width: 100%;
  background-color: #fff;
  -webkit-overflow-scrolling: touch;
}

.swiper {
  height: 100vh;
}

.el-backtop i {
  display: -webkit-flex;
  display: flex;
  font-size: 26px;
  color: #9944ff;
}

</style>
