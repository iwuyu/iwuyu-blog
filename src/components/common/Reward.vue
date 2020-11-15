<template>
  <div id="reward">
    <el-popover
      class="reward_box"
      placement="bottom"
      width="350"
      trigger="click">
      <div class="pay_img">
        <img v-show="isWeixin" src="../../assets/img/reward/weixin.png" alt="">
        <img v-show="!isWeixin" src="../../assets/img/reward/zhifubao.jpg" alt="">
      </div>
      <div class="choose_pay">
        <el-radio-group v-model="radio" @change="tolloge">
          <el-radio label=1><i class="iconfont icon-gongzhonghao">微信</i></el-radio>
          <el-radio label=2><i class="iconfont icon-zhifubao">支付宝</i></el-radio>
        </el-radio-group>
      </div>
      <p class="reward" slot="reference"><i class="iconfont icon-dashang">打赏作者</i></p>
  </el-popover>
  </div>
</template>

<script>
export default {
  name:'Reward',
  data(){
    return {
      radio:1,
      isWeixin:true,
    }
  },
  methods:{
    tolloge() {
      this.isWeixin = !this.isWeixin;
    }
  }
}
</script>

<style scoped>
  #reward {
    display: flex;
    justify-content:center;
  }
 .reward{
    text-align: center;
    font-size: .9rem;
    color: gold;
    cursor: pointer;
    margin-bottom: 2rem;
  }
  .reward_box .pay_img{
    max-width: 30rem;
    padding: 1rem 5rem;
  }
  .pay_img img{
    width: 100%;
  }
  .choose_pay{
    text-align: center;
    margin-top: 1rem;
  }
  .choose_pay i.icon-gongzhonghao {
    border: none;
  }
  .choose_pay i.icon-gongzhonghao:hover {
      background: none;
      color: lightgreen;
    }
  .choose_pay i.icon-zhifubao{
    color: #409EFF;
  }
    
</style>