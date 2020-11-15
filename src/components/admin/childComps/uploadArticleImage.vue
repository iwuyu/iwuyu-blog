<template>
<div class="upload_article_image">
  <div class="showTool" v-show="isShowTool">
    <div class="cencle_tool" @click="switchTool">X</div>
    <el-switch
    v-model="selectUpload"
    inactive-color="#13ce66"
    active-text="上传文章图"
    inactive-text="删除文章图">
    </el-switch>
    <div class="upload_box" v-show="selectUpload">
      <h3>上传文章图</h3>
      <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadImageUrl"
      name="articleImages"
      :on-success="handleSuccess"
      multiple
      :limit="1"
      :with-credentials="true"
      :on-exceed="handleExceed">
      <el-button size="small" type="primary">文章内图</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
      </el-upload>
      <el-input class="image_src" v-model="uploadImageSrc" placeholder="图片链接"></el-input>
    </div>
    <div class="delete_box" v-show="!selectUpload">
      <h3>删除原有文章图</h3>
      <el-input v-model="deleteImageSrc" placeholder="请输入图片链接(以public开头)"></el-input>
      <el-button class="delete_btn" type="primary" @click="deleteImg">确认删除</el-button>
    </div>
  </div>
  <div class="displayTool" v-show="!isShowTool" @click="switchTool">
    <el-tooltip class="item" effect="dark" content="点击 上传/删除 文章内容图片" placement="left">
      <i class="iconfont icon-xiangce"></i>
    </el-tooltip>
    
  </div>
</div>
  
</template>

<script>
import { cancelUpload } from "network/adminOperation";
import uploadImage from "network/uploadImage";

export default {
  name:"uploadArticleImage",
  data() {
    return {
      uploadImageUrl:uploadImage.UPLOADIMG.BASEURL + uploadImage.UPLOADIMG.UPLOADIMAGEURL,
      baseurl:uploadImage.UPLOADIMG.BASEURL,
      selectUpload:true,
      isShowTool:false,
      uploadImageSrc:'',
      deleteImageSrc:''
    }
  },
  methods: {
    switchTool(){
      this.isShowTool = !this.isShowTool;
    },
    // 上传图片
    handleSuccess(res) {
      if (res.err == 0) {
        this.uploadImageSrc = this.baseurl + res.data.imgUrl;
        this.$message.success(res.msg);
      } else {
        this.$message.error(res.msg);
      }
    },

    // 提示限制上传个数
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },

    // 移除已上传图片
    deleteImg() {
      this.$confirm(`确定删除？`, "提示", {
        type: "warning",
      }).then(() => {
        return cancelUpload(this.deleteImageSrc)
          .then((res) => {
            this.$message.success(res.data.msg);
          })
          .catch((err) => {});
      });
    },
  }
}
</script>

<style scoped>
  .upload_article_image {
    
    right: 1.5rem;
    bottom: 30%;
    position: absolute;
    z-index:9999 !important;
    text-align: center;

  }
  .showTool {
    width: 20rem;
    padding: 1rem;
    border-radius: 5px;
    background: rgba(0, 0, 0, .2);
  }

  .cencle_tool {
    text-align: right;
    right: .5rem;
  }

  .cencle_tool:hover{
    cursor: pointer;
    color: red;
  }

  .delete_btn {
    margin-top: 1rem;
  }

  .displayTool i{
    font-size: 2rem;
    color: #409EFF;
  }

  .image_src {
    margin-top: 1rem;
  }
</style>