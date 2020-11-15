<template>
  <div class="home">
    <div class="loading">· 物语</div>
     <div class="home_nav">我只希望你快乐，即使你的快乐中不再有我。 —— 《最长的旅程》</div>
      <!--<li v-for="(item,index) in menu" :key="index" @click="itemClick(item.path)">
        <i class="iconfont" v-html="item.iconUrl"></i>
        {{item.name}}
      </li>
    </ul>
    <ul class="home_link">
      <li v-for="(item,index) in link" :key="index">{{item}}</li>
    </ul> -->
  </div>
</template>

<script>
import { blogName } from "./childComps/demo";
export default {
  name: "Home",
  data() {
    return {
      menu: [
        { name: "文章列表", iconUrl: "&#xe60e;", path: "/article" },
        { name: "实战案例", iconUrl: "&#xe658;", path: "/demo" },
        { name: "关于博主", iconUrl: "&#xe638;", path: "/about" },
        { name: "素材&工具", iconUrl: "&#xe767;", path: "/tool" },
        { name: "GitHub", iconUrl: "&#xe628;", path: "" },
        { name: "登录/注册", iconUrl: "&#xe611;", path: "/login" }
      ],
      link: {
        qq: "QQ: 1466202385",
        weixin: "微信: wj167758",
        qqGroup: "QQ群: 703608749"
      }
    };
  },
  methods: {
    itemClick(path) {
      if(path){
        this.$router.replace(path);
      }else {
        location.href="https://github.com/Jay-wj";
      }
    }
  },
  mounted() {
    blogName();
  },
  created() {
    blogName();
  }
  
};
</script>

<style>
.home {
  width: 100%;
  height: 100vh;
  font-family: "Exo", sans-serif;
  color: #fff;
  opacity: .7;
  background: linear-gradient(
    125deg,
    #2980b9,
    #633bd3,
    #8e44ad,
    #192f44,
    #27ae60
  );
  background-size: 800%;
  animation: gradientBG 15s ease infinite;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.loading {
  transform: translateY(-6rem);
  --color: #fff;
  --duration: 2000ms;
  font-family: Roboto, Arial;
  font-size: 50px;
  position: relative;
  white-space: nowrap;
  user-select: none;
  color: var(--color);
  opacity: 1;
}
.loading span {
  --x: 0;
  --y: 0;
  --move-y: 0;
  --move-y-s: 0;
  --delay: 0ms;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  text-indent: calc(var(--x) * -1);
  overflow: hidden;
  transform: translate(var(--x), var(--y));
}
.loading.start div {
  opacity: 0;
}
.loading.start span {
  animation: move var(--duration) ease-in-out var(--delay);
}

@keyframes move {
  30% {
    transform: translate(var(--x), var(--move-y));
  }
  82% {
    transform: translate(var(--x), var(--move-y-s));
  }
}
.home_nav,
.home_link {
  display: flex;
  list-style: none;
  font-size: 0.9rem;

  align-items: center;
}
.home_nav li,
.home_link li {
  padding: 0 5px;
  cursor: pointer;
}
.home_nav i {
  font-size: 0.9rem;
}
.home_link {
  transform: translateY(1rem);
}
@media screen and (max-width: 610px) {
  .loading {
    font-size: 25px;
  }
  .home_nav,
  .home_link,
  .home_nav i {
    font-size: 0.65rem;
  }
  .home_nav li {
    padding: 0 3px;
  }
}
</style>