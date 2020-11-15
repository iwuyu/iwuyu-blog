<template>
  <div class="tool">
    <app-header title="嗨，今天你笑了吗？"></app-header>
    <div class="tool_box">
      <ul class="polaroids">
			  <li v-for="(item,index) in tool" :key="index">
          <a :href="item.tool_path" target="_blank" :title="item.tool_name">
            <img :src="item.tool_image" :alt="item.tool_name">
            <p class="tool_conduct">{{item.tool_brief}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
  
</template>

<script>
import AppHeader from "components/AppHeader";
import {getTool} from 'network/getContent';
import uploadImage from 'network/uploadImage';
export default {
  name: 'Tool',
  components: {
    AppHeader
  },
  data() {
    return {
      tool:[]
    }
  },
  created() {
    getTool().then(res => {
      if(res.data.err == 0){
        res.data.data.forEach(item => {
          item.tool_image = uploadImage.UPLOADIMG.BASEURL + item.tool_image;
        });
        this.tool = res.data.data;
      }else {
        this.$message({
          type:'error',
          offset:'80',
          message:res.data.msg
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
  @import "../../assets/css/picture.css";
  .tool {
    padding-top: 80px;
  }

  
  
</style>