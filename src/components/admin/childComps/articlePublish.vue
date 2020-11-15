<template>
  <div class="article_publish">
    <h1 v-show="!edit">发布文章</h1>
    <h1 v-show="edit">修改文章</h1>
    <h3>
      <i class="el-icon-paperclip"></i>&nbsp;文章标题:
    </h3>
    <el-input v-model="articleDate.title" ref="inputTitle" placeholder="请输入文章标题" clearable></el-input>
    <h3>
      <i class="el-icon-paperclip"></i>&nbsp;文章分类:
    </h3>
    <el-select
      v-model="articleDate.categroy"
      ref="categoryName"
      placeholder="请选择"
      @change="currentCategory"
    >
      <el-option
        v-for="item in categroies"
        :key="item.article_category_id"
        :label="item.article_category_name"
        :value="item.article_category_id"
      ></el-option>
    </el-select>
    <h3>
      <i class="el-icon-paperclip"></i>&nbsp;文章标签:
    </h3>
    <el-select v-model="articleDate.label" placeholder="请选择">
      <el-option
        v-for="item in labels"
        :key="item.article_label_id"
        :label="item.article_label_name"
        :value="item.article_label_id"
      ></el-option>
    </el-select>
    <div v-show="edit" class="edit_image">
      <el-image :src="editImg"></el-image>
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadUrl"
      name="images"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :with-credentials="true"
      :on-exceed="handleExceed"
    >
      <el-button size="small" type="primary">文章封面图</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
    </el-upload>
    <h3>
      <i class="el-icon-paperclip"></i>&nbsp;文章简介:
    </h3>
    <el-input
      class="brief"
      type="textarea"
      :rows="4"
      placeholder="请输入文章简介"
      v-model="articleDate.brief"
      :show-word-limit="true"
      :maxlength="200"
    ></el-input>
    <upload-article-image/>
    <h3>
      <i class="el-icon-paperclip"></i>&nbsp;文章内容:
    </h3>
    <div id="editor">
      <mavon-editor style="height: 100%"  v-model="articleDate.content" ref="md"></mavon-editor>
    </div>
    <el-button v-show="!edit" type="primary" @click="PublishButton">文章发布</el-button>
    <el-button v-show="edit" type="primary" @click="editButton">确认修改</el-button>
  </div>
</template>

<script>
import { articlePublish, cancelUpload, updateArticle } from "network/adminOperation";
import uploadImage from "network/uploadImage";
import { getCategory, getLabel } from 'network/getContent';
import uploadArticleImage from './uploadArticleImage';

export default {
  name: "articlePublish",
  components: {
    uploadArticleImage,
  },
  data() {
    return {
      uploadUrl:uploadImage.UPLOADIMG.BASEURL + uploadImage.UPLOADIMG.UPLOADURL,
      baseurl:uploadImage.UPLOADIMG.BASEURL,
      articleDate: {
        imgsrc: "",
        title: "",
        brief: "",
        content: "",
        label: "",
        categroy: "",
      },
      obj: {},
      categroies: [],
      currentvalue: "",
      labels: [],
      editImg:'',
      editArticleId: null,
      edit:false
    };
  },
  props: {
    list: {}
  },
  methods: {
    // 发布文章
    PublishButton() {
      if(this.articleDate.imgsrc&&this.articleDate.title&&this.articleDate.brief&&this.articleDate.content&&this.articleDate.label&&this.articleDate.categroy){
        articlePublish(this.articleDate).then((res) => {
          if (res.data.err == 0) {
            // 成功
            this.$message({
              message: res.data.msg,
              type: 'success',
              offset:'80'
            });
            // 清空所有输入框内数据
            Object.keys(this.articleDate).forEach(
              (key) => (this.articleDate[key] = "")
            );
            this.$refs.upload.clearFiles();
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              offset:'80'
            });
          }
        }).catch(err => {})
      }else {
        this.$message({
          type:'warning',
          message:'太马虎了！内容不完整哦！',
          offset:'80'
        })
      }
    },
    editButton() {
      updateArticle(this.articleDate,this.editArticleId).then((res) => {
        if (res.data.err == 0) {
          // 成功
          this.$message({
            message: res.data.msg,
            type: 'success',
            offset:'80'
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            offset:'80'
          });
        }
      }).catch(err => {})
    },
    // 上传图片
    handleSuccess(res) {
      if (res.err == 0) {
        this.articleDate.imgsrc = res.data.imgUrl;
        this.$message.warning(res.msg);
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
        return cancelUpload(this.articleDate.imgsrc)
          .then((res) => {
            this.$message.warning(res.data.msg);
          })
          .catch((err) => {});
      });
    },

    // 当前分类 根据当前分类获取对应标签
    currentCategory() {
      // 重选分类，将label选项框清空
      this.articleDate.label = "";
      // 遍历对象 获取对象中每个数组的值this.obj[key]
      Object.keys(this.obj).forEach((key) => {
        // 如果所选分类的value与所遍历的值的article_category_id相匹配
        if (this.articleDate.categroy == this.obj[key][0].article_category_id) {
          // 把该值赋值给labels
          this.labels = this.obj[key];
        }
      });
    },
    async getTicket () {
      let {article_title:title,article_category_id:categroy,article_label_id:label,article_image:imgsrc,article_synopsis:brief,article_content:content,article_id:articleId} = this.list;
      imgsrc = imgsrc.split(this.baseurl)[1];
      this.articleDate.title = title;
      this.articleDate.categroy = categroy;
      this.articleDate.label = label;
      this.articleDate.imgsrc = imgsrc;
      this.articleDate.brief = brief;
      this.articleDate.content = content;
      this.editArticleId = articleId;
      this.editImg = this.baseurl+this.articleDate.imgsrc;
    }
  },

  watch: {
    list () {
      this.getTicket().then(res => {
        this.edit = true;
        return this.currentCategory();
      }).then(() => {
        this.articleDate.label = this.list.article_label_id;
      })
    }
  },
  
  mounted() {
    this.$refs.inputTitle.focus();
  },

  // 钩子 组件加载后运行
  created() {
    // 获取分类
    getCategory().then((res) => {
      if (res.data.err == 0) {
        this.categroies = res.data.data;
      }else{
        this.$message({
          message: res.data.msg,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})

    // 获取标签
    getLabel().then((res) => {
      if (res.data.err == 0) {
        res.data.data.forEach((item, index) => {
          let categoryName = item.article_category_name;
          if (!this.obj.hasOwnProperty(categoryName)) {
            // obj中不包括该属性名
            this.obj[categoryName] = []; // 将该字段作为obj的属性名
            this.obj[categoryName].push(item);
          } else {
            this.obj[categoryName].push(item);
          }
        });
      }else{
        this.$message({
          message: res.data.msg,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})
  },
};
</script>

<style scoped>
.article_publish {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.article_publish h3 {
  margin: 1.5rem 0 0.5rem 0;
}

.article_publish > .el-input,
.article_publish > .el-select,
.brief {
  width: 50%;
}
.article_publish > .upload-demo,
.article_publish > .el-button {
  margin-top: 1.5rem;
}
#editor {
  margin: auto;
  width: 100%;
  height: 600px;
}

.edit_image {
  margin-top: 1.5rem;
  height: 7.5rem;
  width: 10.5rem;
}
.edit_image .el-image {
  height: 100%;
  
}
</style>