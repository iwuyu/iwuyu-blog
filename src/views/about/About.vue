<template>
<div class="about">
  <app-header class="header" title="嘿, 今天你笑了吗!"></app-header>
  <div class="about_content">
    <h1>你好, 我是物语</h1>
    <div class="word">
      <p><i class="iconfont icon-xiezi"></i>&nbsp; 生于一九九八, 爱音乐爱自由.</p>
      <p><i class="iconfont icon-xiezi"></i>&nbsp; 水墨染雨君画夕, 一介书生耳.</p>
      <p><i class="iconfont icon-xiezi"></i>&nbsp; 不戚戚于平凡, 不汲汲于伟大.</p>
      <p><i class="iconfont icon-xiezi"></i>&nbsp; 不追剧但游戏,坑货一个 skr~.</p>
      <p><i class="iconfont icon-xiezi"></i>&nbsp; 喜钻研爱技术,暂无成就.</p><br>
      <p>陌生人,你好呀! 感谢你的驻足,每一个人的成功之路或许都不尽相同，但我相信，成功都需要每一位想成功的人去努力去奋斗，而每一条成功之路，都是充满坎坷的，只有那些坚信自己目标，不断努力不断奋斗的人，才能取得最终的成功。但有一点我始终坚信，那就是，当你能把自己感动得哭了的时候，你就成功了</p><br>
      <p><strong>{{notice}}</strong></p>
    </div>
  </div>
</div>  
</template>

<script>
import AppHeader from "components/AppHeader";
import { getNotice } from 'network/getContent';
export default {
  name: 'About',
  components: {
    AppHeader
  },
  data(){
    return {
      notice:'',
    }
  },
  created() {
    getNotice().then(res => {
      if(res.data.err == 0) {
        this.notice = res.data.data.content;
      }else {
        this.$message({
          type: 'error',
          offset: '80',
          message:res.data.msg
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
 .about {
    margin-top: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    // align-items: center;
    
    .about_content {
      width: 80%;
      z-index: 2;
      opacity: 1;
      color: #666;
      h1 {
        height: 3rem;
        line-height: 3rem;
      }
      .word {
        margin-top: 1rem;
      }
      .word p {
        line-height: 3rem;
      }
    }
  }
  @media screen and (max-width: 900px) {
    .about_content {
      width: 90%;
    }
  }
  @media screen and (max-width: 600px) {
    .about_content {
      width: 100%;
    }
    .word {
      font-size: .9rem;
    }
  }
</style>