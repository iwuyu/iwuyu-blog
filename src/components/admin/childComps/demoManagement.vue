<template>
  <div class="demo-management">
    <h1>历史Demo</h1>
    <h3>素材工具表</h3>
    <el-table :data="demoData" class="demotable" style="width: 95%; ">
      <el-table-column label="demo视频" width="150">
        <template slot-scope="scope">
          <div class="demo_video">
            <video  controls>
              <source :src="scope.row.demo_video" type="video/mp4">
            </video>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Demo名" width="100">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.demo_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Demo介绍">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 2;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.demo_brief }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tool地址" width="270">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.demo_path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import uploadImage from "network/uploadImage";
import { getCategory, getLabel, getDemo } from 'network/getContent';
export default {
  name:'demoManagement',
  data() {
    return {
      baseurl:uploadImage.UPLOADIMG.BASEURL,
      demoData:[],
    }
  },
  methods:{
    // 获取Demo
    getDemos() {
      getDemo().then(res => {
        if(res.data.err === 0){
          let data = res.data.data;
          data.forEach(item => {
            item.demo_video = this.baseurl + item.demo_video;
          });
          this.demoData = data;
        }
      })
    },
  },
  mounted() {
    this.getDemos();
  }
}
</script>

<style scoped>
.demo-management {
  padding: 1rem;
}
.demo-management h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.demo_video {
  height: 4rem;
}
.demo_video video {
  height: 100%;
  /* z-index: 999; */
}
</style>