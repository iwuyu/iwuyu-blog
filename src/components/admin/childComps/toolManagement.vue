<template>
  <div class="tool-management">
    <h1>历史素材&工具</h1>
    <h3>素材工具表</h3>
    <el-table :data="toolData" class="tooltable" style="width: 95%; ">
      <el-table-column label="Tool封面图" width="150">
        <template slot-scope="scope">
          <div class="tool_img">
            <img :src="scope.row.tool_image" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tool名" width="150">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.tool_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tool介绍">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.tool_brief }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tool地址" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.tool_path }}</span>
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
import { getTool } from 'network/getContent';
export default {
  name:'toolManagement',
  data() {
    return {
      baseurl:uploadImage.UPLOADIMG.BASEURL,
      toolData:[],
    }
  },
  methods:{
    // 获取Demo
    getTools() {
      getTool().then(res => {
        if(res.data.err === 0){
          let data = res.data.data;
          data.forEach(item => {
            item.tool_image = this.baseurl + item.tool_image;
          });
          this.toolData = data;
        }
      })
    },
  },
  mounted() {
    this.getTools();
  }
}
</script>

<style scoped>
.tool-management {
  padding: 1rem;
}
.tool-management h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.tool_img {
  height: 4rem;
}
.tool_img img {
  height: 100%;
  /* z-index: 999; */
}
</style>