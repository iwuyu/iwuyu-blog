<template>
  <div class="admin_login">
	<div class="admin_login_box">
    <h1>ADMIN Login</h1>
    <input class="username" v-model="formLogin.user" type="text" name="" placeholder="UserName">
    <input class="passworld" v-model="formLogin.password" type="password" name="" placeholder="PassWord">
    <input type="submit" @click="adminLogin" name="" placeholder="Login">
</div>
  
</div>
</template>

<script>
import {adminLogin} from 'network/adminOperation';
export default {
  name:'adminLogin',
  data() {
    return {
      formLogin:{
        user:"",
        password:""
      },
    }
  },
  methods: {
    adminLogin() {
      if (this.formLogin.user.length <= 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: "用户名不能为空呀！",
            offset:'80'
          });
      } else if(this.formLogin.password.length <= 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: "密码不能为空呀！",
            offset:'80'
          });
      } else {
        let encode = encodeURI(this.formLogin.password);
        let password = btoa(encode);
        adminLogin(this.formLogin.user,password).then(res => {
          console.log(res)
          if (res.data.err === 0) {
            this.$router.replace('/admin/article/management');
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'success',
              offset:'80'
            });
          }else {
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.msg,
              offset:'80'
            });
          }
        }).catch((err) => {})
      }
    }
  }
}
</script>

<style>
.admin_login{
  height: 100vh;
}
.admin_login_box {
	width:40%;
	padding:40px;
	position:absolute;
	top:50%;
  left:50%;
  border-radius: 10px;
	transform:translate(-50%,-50%);
	background:rgba(0,0,0,.6);
	text-align:center;
}
@media screen and (max-width:930px) {
    .admin_login_box {
      width:60%;
    }
    .admin_login_box input[type = "text"],.admin_login_box input[type = "password"],.admin_login_box input[type = "submit"] {
      min-width: 90%;
    }
}
@media screen and (max-width:470px) {
  .admin_login_box {
      width:90%;
    }
  .admin_login_box input[type = "text"],.admin_login_box input[type = "password"],.admin_login_box input[type = "submit"] {
      min-width: 100%;
    }
}
.admin_login_box h1 {
	color:white;
	text-transform:uppercase;
	font-weight:500;
}
.admin_login_box input[type = "text"],.admin_login_box input[type = "password"],.admin_login_box input[type = "submit"] {
	border:0;
	background:none;
	display:block;
	margin:30px auto;
	text-align:center;
	border:2px solid #3498db;
	padding:14px 10px;
	width:70%;
	outline:none;
	color:white;
	border-radius:24px;
	transition:0.25s;
}
.admin_login_box input[type = "text"]:focus,.admin_login_box input[type = "password"]:focus {
	width:70%;
	border-color:#2ecc71;
}
.admin_login_box input[type = "submit"] {
  border:2px solid #2ecc71;
	cursor:pointer;
}
.admin_login_box input[type = "submit"]:hover {
	background:#2ecc71;
}
</style>