<template>
<div class="login">
  <app-header class="login_header"/>
  <div class="login_box" v-show="!isLogined">
    <lor @logined="logined()"/>
  </div>
  <div class="profile_box" v-show="isLogined">
    <profile @exitLogined="exitLogined()"/>
  </div>
</div>
</template>

<script>
import AppHeader from "components/AppHeader";
import Lor from './childComps/Lor';
import Profile from './childComps/Profile';
import { getCategory } from 'network/getContent';
import { userIsLogined } from 'network/userOperation';
export default {
  name: 'Login',
  data() {
    return {
      isLogined:false,
    }
  },
  components: {
    AppHeader,
    Lor,
    Profile
  },
  methods: {
    logined() {
      this.isLogined = !this.isLogined;
    },
    exitLogined() {
      this.isLogined = !this.isLogined;
    }
  },
  created(){
    if(typeof(localStorage.username) != "undefined"){
      userIsLogined(localStorage.username).then(res => {
        if(res.data.err === 0){
          this.isLogined = true;
          this.$message({
            type:'success',
            message:res.data.msg,
            offset:'80'
          })
        }else{
          localStorage.removeItem("username");
          this.$message({
            type:'error',
            message:res.data.msg,
            offset:'80'
          })
        }
      }).catch(err => {})
    }
  }
}
</script>

<style scoped>
  .login_header {
    background:transparent;
    border-bottom: 0;
  }
  .login_box {
    min-height: 100vh;
  }

</style>