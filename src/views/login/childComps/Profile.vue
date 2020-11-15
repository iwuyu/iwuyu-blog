<template>
  <div class="profile">
    <div class="profile_content">
      <img class="user_avatar" :src="imgSrc" alt="">
      <span class="username">{{username}}</span>
      <div class="user_btn">
        <el-button class="exit" type="primary" size="mini" @click="test">退出登录</el-button>
        <el-button class="operation_btn" type="success" size="mini" @click="showOp">操作</el-button>
      </div>
      <div class="operation" v-show="showOperation">
        <el-upload
          class="avatar-uploader"
          name="avator"
          ref="upload"
          :action="uploadImageUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-camera-solid avatar-uploader-icon"></i>
        </el-upload>
        <h6>更换头像注意事项：仅支持jpg格式哦！</h6>
      </div>
    </div>
  </div>
</template>
 
<script>
import {getUserInfo,updateAvatar} from '../../../network/userOperation';
import uploadImage from "../../../network/uploadImage";
import { cancelUpload } from "../../../network/adminOperation";
export default {
  name:"Profile",
  data() {
    return {
      showOperation:false,
      imgSrc:'',
      imageUrl: '',
      baseUrl:uploadImage.UPLOADIMG.BASEURL,
      uploadImageUrl:uploadImage.UPLOADIMG.BASEURL + uploadImage.UPLOADIMG.UPLOADAVATAR,
      username:'',
      avatarImage:'',
      
    };
  },
  watch: {
  },
  methods: {
    test(){
      localStorage.clear();
      this.$emit("exitLogined",false);
      this.$message({
        type:'success',
        offset:'80',
        message:'不舍~ 期待您的下次登录哦！'
      })
    },
    showOp(){
      this.showOperation = !this.showOperation;
    },
    handleAvatarSuccess(res) {
      if (res.err == 0) {
        this.imageUrl = this.baseUrl + res.data.imgUrl;
        let updateData = {};
        updateData.username = localStorage.getItem("username");
        updateData.avatar = res.data.imgUrl;
        updateAvatar(updateData).then(res => {
          if(res.data.err == 0){
            if(this.avatarImage.indexOf("default") == -1){
              cancelUpload(this.avatarImage).then((res) => {
                this.$message({
                  showClose: true,
                  message: res.data.msg,
                  type: 'success',
                  offset:'80'
                });
              }).catch((err) => {});
            }
            location.reload();
          }
        })
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'warning',
          offset:'80'
        });
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'warning',
          offset:'80'
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    if(localStorage.getItem("username")){
      getUserInfo(localStorage.getItem('username')).then(res => {
        if(res.data.err == 0) {
          this.username = res.data.data[0].username;
          this.imgSrc = this.baseUrl + res.data.data[0].head_image;
          this.avatarImage = res.data.data[0].head_image;
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

}
</script>

<style lang="scss" scoped>
.profile {
  margin-top: 80px;
  width: 100%;
  .profile_content {
    top:5rem;
    z-index: 2;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    .user_avatar {
      width: 7rem;
      height: 7rem;
      border-radius: 1rem;
    }
    .username {
      margin-top: 1rem;
      font-size: 2rem;
    }
    .user_btn {
      margin-top: 2rem;
    }
    .operation {
      margin: 1rem auto;
      padding: 1rem;
      border-radius: 5px;
      border: 1px solid #fff;
      .avatar-uploader { 
        width: 78px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        margin: 1rem auto;
        &:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #000;
          width: 78px;
          height: 78px;
          line-height: 78px;
        }
        .avatar {
          width: 78px;
          height: 78px;
          display: block;
        }
      }
      h6 {
        text-align: center;
      }
    }
  }
}
 @media screen and (max-width: 600px) {
  .operation {
    width: 100%;
  }
}
</style>