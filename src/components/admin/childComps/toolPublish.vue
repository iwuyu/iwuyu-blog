<template>
<div class="tool_publish">
    <h1>发布素材&工具</h1>
    <h3>
      素材&工具名字:
    </h3>
    <el-input v-model="tool.toolName" ref="inputTitle" placeholder="请输入名字" clearable></el-input>
    <h3>
      素材&工具地址:
    </h3>
    <el-input v-model="tool.toolPath" ref="inputTitle" placeholder="请输入地址" clearable></el-input>
    <h3>
      素材&工具封面图:
    </h3>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadUrl"
      name="toolImages"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :with-credentials="true"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">素材&工具封面图</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
    </el-upload>
    <h3>
      素材&工具简介:
    </h3>
    <el-input
      class="brief"
      type="textarea"
      :rows="4"
      placeholder="请输入素材&工具简介"
      v-model="tool.toolBrief"
      :show-word-limit="true"
      :maxlength="200">
    </el-input>
    <el-button type="primary" @click="PublishButton">Tool发布</el-button>
  </div>
</template>

<script>
import { articlePublish, cancelUpload, publishTool } from "network/adminOperation";
import uploadImage from "network/uploadImage";
import { getTool } from 'network/getContent';
import uploadArticleImage from './uploadArticleImage';

export default {
  name: "toolPublish",
  data(){
    return {
      uploadUrl:uploadImage.UPLOADIMG.BASEURL + uploadImage.UPLOADIMG.UPLOADTOOL,
      tool:{ toolName:'',
             toolPath:'',
             toolImage:'',
             toolBrief:'',
            },
    }
  },
  methods: {
    PublishButton() {
      if(this.tool.toolName&&this.tool.toolPath&&this.tool.toolImage&&this.tool.toolBrief) {
        publishTool(this.tool).then(res => {
          if(res.data.err == 0) {
            this.$message({
              type:'success',
              offset:'80',
              message:res.data.msg
            })
            location.reload();
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
          message:'太马虎了！内容不完整哦！'
        })
      }
    },
    // 上传图片
    handleSuccess(res) {
      if (res.err == 0) {
        this.tool.toolImage = res.data.imgUrl;
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
        return cancelUpload(this.tool.toolImage)
          .then((res) => {
            this.$message.warning(res.data.msg);
          })
          .catch((err) => {});
      });
    },
  },
}
</script scoped>

<style>
.tool_publish {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.tool_publish h3 {
  margin: 1.5rem 0 0.5rem 0;
}

.tool_publish > .el-input,
.brief {
  width: 50%;
}
.tool_publish > .upload-demo,
.tool_publish > .el-button {
  display: block;
  margin-top: 1.5rem;
}
</style>