<template>
  <div class="side_item">
    <div class="side_title">
      <i class="iconfont" v-html="sideItem.iconUrl"></i>&nbsp;{{sideItem.title}}
    </div>
    <div class="side_content"><slot>我是内容</slot></div>

  </div>
</template>

<script>
export default {
  name: 'SideItem',
  props: {
    sideItem:{
      type: Object,
      default() {
        return {}
      }
    }
  },


}
</script>

<style>
  .side_item {
    background: #fff;
    border-radius: 5px;
    padding:0 10px;
  }

  .side_title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(100,100,100,.2);
  }
  .side_content {
    padding: 5px 0;
    font-size: 14px;
  }
</style>