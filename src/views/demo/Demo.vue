<template>
<div class="demo">
  <app-header title="嘿, 朕为你打下的江山!"></app-header>
  <div class="demo_box">
    <ul>
      <li class="demo_item" v-for="(item,index) in demo" :key="index">
        <video style="width:21rem; border-radius:5px" controls>
          <source :src="item.demo_video" type="video/mp4">
        </video>
        <h4>{{item.demo_name}}</h4>
        <p class="demo_brief">{{item.demo_brief}}</p>
        <p class="demo_date"> 上传日期：{{item.demo_date}}</p>
        <a class="demo_code_link" :href="item.demo_path" target="_blank"><button class="demo_code_btn">查看源码</button></a>
      </li>
    </ul>
  </div>
</div>
  
</template>

<script>
import AppHeader from "components/AppHeader";
import {getDemo} from 'network/getContent';
import uploadImage from 'network/uploadImage'

export default {
  name: 'Demo',
  components:{
    AppHeader
  },
  data() {
    return {
      demo:[]
    }
  },
  created() {
    getDemo().then(res => {
      if(res.data.err == 0){
        res.data.data.forEach(item => {
          item.demo_video = uploadImage.UPLOADIMG.BASEURL + item.demo_video;
        });
        this.demo = res.data.data;
      }else {
        this.$message({
          type:'error',
          offset:'80',
          message:res.data.msg
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
  .demo_box {
    padding-top: 80px;
    max-width: 1200px;
  }
  .demo_box ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-self: start;
    justify-content: space-around;
  }
  .demo_item {
    margin-bottom: 2rem;
    padding: 1rem;
    max-width: 23rem;
    border-radius: 10px;
    background: rgba(0,0,0,.5);
  }
  .demo_item h4{
    text-align: center;
    line-height: 2rem;
    color: #fff;
  }
  .demo_item p {
    font-size: .8rem;
    color: #fff;
    line-height: 1.4rem;
  }
  .demo_brief:hover{
    color: #9466ff;
  }
  .demo_date {
    text-align: right;
  }
  .demo_code_btn {
    margin-top: 1rem;
    width: 100%;
    background-color: #9466ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: .4rem;
  }
  .demo_code_btn:hover{
    transform: scale(1.03);
    transition: .5s;
  }
</style>