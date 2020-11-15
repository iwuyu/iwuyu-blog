<template>
<div class="demo_publish">
    <h1>发布Demo</h1>
    <h3>
      Demo名字:
    </h3>
    <el-input v-model="demo.demoName" ref="inputTitle" placeholder="请输入名字" clearable></el-input>
    <h3>
      Demo地址:
    </h3>
    <el-input v-model="demo.demoPath" ref="inputTitle" placeholder="请输入地址" clearable></el-input>
    <h3>
      Demo视频:
    </h3>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadUrl"
      name="video"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :with-credentials="true"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">demo视频</el-button>
      <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过30M</div>
    </el-upload>
    <h3>
      Demo简介:
    </h3>
    <el-input
      class="brief"
      type="textarea"
      :rows="4"
      placeholder="请输入Demo简介"
      v-model="demo.demoBrief"
      :show-word-limit="true"
      :maxlength="200">
    </el-input>
    <el-button type="primary" @click="PublishButton">Demo发布</el-button>
  </div>
</template>

<script>
import { cancelUpload, publishDemo } from "network/adminOperation";
import uploadImage from "network/uploadImage";

export default {
  name: "demoPublish",
  data(){
    return {
      uploadUrl:uploadImage.UPLOADIMG.BASEURL + uploadImage.UPLOADIMG.UPLOADDEMO,
      demo:{ demoName:'',
             demoPath:'',
             demoVideo:'',
             demoBrief:'',
            },
    }
  },
  methods: {
    // 发布Demo
    PublishButton() {
      if(this.demo.demoName&&this.demo.demoPath&&this.demo.demoVideo&&this.demo.demoBrief) {
        publishDemo(this.demo).then(res => {
          if(res.data.err == 0) {
            this.$message({
              type:'success',
              offset:'80',
              message:res.data.msg
            })
            this.getDemos();
          }else {
            this.$message({
              type:'error',
              offset:'80',
              message:res.data.msg
            })
          }
        }).catch(err => {})
      }else {
        this.$message({
          type:'warning',
          offset:'80',
          message:"太马虎了，信息没有填完哦！"
        })
      }
    },
    // 上传图片
    handleSuccess(res) {
      if (res.err == 0) {
        this.demo.demoVideo = res.data.videoUrl;
        this.$message.success(res.msg);
      } else {
        this.$message.warning(res.msg);
      }
    },

    // 提示限制上传个数
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },

    // 移除已上传文件
    beforeRemove(file, fileList) {
      this.$confirm(`确定移除 ${file.name}？`, "提示", {
        type: "warning",
      }).then(() => {
        return cancelUpload(this.demo.demoVideo)
          .then((res) => {
            this.$message.warning(res.data.msg);
          })
          .catch((err) => {});
      });
    },
  },
}
</script>

<style scoped>
.demo_publish {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.demo_publish h3 {
  margin: 1.5rem 0 0.5rem 0;
}

.demo_publish > .el-input,
.brief {
  width: 50%;
}
.demo_publish > .upload-demo,
.demo_publish > .el-button {
  display: block;
  margin-top: 1.5rem;
}
</style>