<template>
  <div class="replay_or_publish">
    <div class="compile">
      <textarea class="txtarea" maxlength="200" cols="100%" rows="5" v-model="messageContent" placeholder="你想说些什么呢..."></textarea>
      <el-button plain class="leave_btn" @click="leaveMessages">提交评论</el-button>
    </div>
    <div class="leavemessage">
      <div class="leaveitem" v-for="item in message">
        <div class="header">
          <div>
            <span><el-avatar shape="square" :size="35" fit="cover" :src="baseUrl+item.head_image"></el-avatar></span>
            <span class="name">&nbsp;{{item.username}}</span>
          </div>
          <div class="date_right">
            <span>{{item.messageFloor}}楼&nbsp;&nbsp;&nbsp;</span>
            <span>{{item.message_time}}</span>
          </div>
        </div>
        <div class="content">
          <span>{{item.message_content}}</span>
          <el-button class="replybtn"  @click="openReplyBox(item.message_id)" type="text" >回复</el-button>
          <el-drawer class="side-nav" :visible.sync="drawer" size="100%">
           
            <el-input class="serch-none-box" placeholder="请输入回复内容" v-model="replyContent" clearable>
              <el-button slot="append" @click="leaveReply()">确认</el-button>
            </el-input>
          </el-drawer>
        </div>
        <div class="reply_item" v-for="key in item.reply">
          <div class="header">
            <div>
              <span><el-avatar shape="square" :size="35" fit="cover" :src="baseUrl+key.head_image"></el-avatar></span>
              <span class="name">&nbsp;{{key.username}}</span>
            </div>
            <div class="date_right">
              <span>{{key.replyFloor}}楼&nbsp;</span>
              <span>{{key.reply_time}}</span>
            </div>
          </div>
          <div class="content">
            <span><span class="name">@ {{item.username}}</span>: {{key.reply_content}}</span>
          </div>
        </div>
        <el-divider></el-divider>
      </div>
      
    </div>
  </div>
</template>

<script>
import { leaveMessages, leaveReply, userIsLogined } from 'network/userOperation';
import { getMessageAndReply, hasMessage } from 'network/getContent';
import uploadImage from "network/uploadImage";

export default {
  name: "ReplayOrPublish",
  props: ['articleId'],
  data() {
    return {
      message:[], // 已留言内容
      baseUrl:uploadImage.UPLOADIMG.BASEURL,
      messageContent:'', // 文章留言内容
      replyContent:'', // 留言回复内容
      drawer: false,
      currentMessageId : null,
      messageCount: 0

    };
  },
  methods: {
    /* 留言start */
    leaveMessages(){
      if(localStorage.getItem("username")){
        userIsLogined(localStorage.username).then(res => {
          if(res.data.err === 0){
            /* 如果 留言不为空的话  */
            if(this.messageContent){
              let message = {};
              message.username = localStorage.getItem("username");
              message.messageContent = this.messageContent;
              message.articleId =  this.articleId;
              leaveMessages(message).then(res => {
                if(res.data.err == 0){
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    offset:'80'
                  });
                  this.messageContent = '';
                  location.reload();
                }else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg,
                    offset:'80'
                  });
                  this.$router.replace('/login')
                }
              }).catch(err => {})
            }
            /* 如果为空我们就不发起请求 给用户提示不能为空 */
            else {
              this.$message({
                message: "小主信息不能为空哦,(ノへ￣、)！",
                type: 'warning',
                offset:'80'
              });
            }
          }else {
            // token 过期
            localStorage.removeItem("username");
            this.$message({
              type: 'error',
              message: res.data.msg,
              offset:'80'
            });
          }
        }).catch(err => {})
      } else {
        this.$message({
          showClose: true,
          message: "请先去登陆再来留言哦,(ノへ￣、)！",
          type: 'warning',
          offset:'80'
        });
      }
    },
    /* 留言end */

    /* 有回复内容打开回复窗口 */
    openReplyBox(messageId){
      this.drawer = !this.drawer;
      this.currentMessageId = messageId;
    },

    /* 回复start */
    leaveReply(){
      if(localStorage.getItem("username")){
        userIsLogined(localStorage.username).then(res => {
          if(res.data.err === 0){
            /* 如果 留言不为空的话  */
            if(this.replyContent){
              let reply = {};
              reply.username = localStorage.getItem("username");
              reply.replyContent = this.replyContent;
              reply.messageId =  this.currentMessageId;
              leaveReply(reply).then(res => {
                if(res.data.err == 0){
                  this.$message({
                    message: res.data.msg,
                    type: 'success',
                    offset:'80'
                  });
                  this.replyContent = '';
                  this.currentMessageId = null;
                  location.reload();
                }else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg,
                    offset:'80'
                  });
                  this.$router.replace('/login')
                }
              }).catch(err => {})
            }
            /* 如果为空我们就不发起请求 给用户提示不能为空 */
            else {
              this.$message({
                type: 'error',
                message: "小主信息不能为空哦,(ノへ￣、)！",
                offset:'80'
              });
            }
          }else {
            // token 过期
            localStorage.removeItem("username");
            this.$message({
              type: 'error',
              message: res.data.msg,
              offset:'80'
            });
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: "请先去登陆再来回复哦,(ノへ￣、)！",
          offset:'80'
        });
      }
    },
    /* 回复end */

    /* 获取留言与回复信息 */
    getMessageAndReply(articleId) {
      getMessageAndReply(articleId).then(res => {
        if(res.data.err == 0){
          let data = res.data.data;
          let messageFloor = 1;
          data.forEach(item => {
            item.messageFloor = messageFloor;
            messageFloor ++;
            let replyFloor = 1;
            item.reply.forEach(key => {
              key.replyFloor = replyFloor;
              replyFloor ++;
            })
          });
          this.message = data;
        }else {
          this.$message({
            type: 'error',
            message: res.data.msg
          });   
        }
      }).catch(err => {})
    },
  },
  mounted() {
    /* 判断该文章有无留言 */
    hasMessage(this.articleId).then(res => {
      if(res.data.err == 0) {
        this.messageCount = res.data.data
        this.$emit('data',this.messageCount)
        if(res.data.data > 0){
          this.getMessageAndReply(this.articleId);
        }
      }else{
        this.$message({
          type: 'error',
          message: res.data.msg
        }); 
      }
    }).catch(err => {})
  },
}

</script>

<style>
.compile {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.txtarea {
  width: 97%;
  height: 6rem;
  line-height: 2rem;
  resize: none;
  outline: none;
  border-radius: 5px;
  border: 0.5px solid #9466ff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.leave_btn {
  width: 200px;
  padding: 13px 0;
  margin-top: 20px;
  border: none;
  border-radius: 45px;
  outline: none;
  background: #9466ff;
  color: #fff;
}
.leave_btn:hover {
  transform: scale(1.05);
  transition: 0.5s;
   background: #9466ff !important;
   color: #fff !important;
}
.leavemessage {
  margin-top: 1.7rem;
  padding: 0 1.5%;
}
.leavemessage .header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
}
.header .date_right {
  padding-top: 1.5rem;
}

 @media screen and (max-width: 600px) {
  .leavemessage {
    font-size: .9rem;
  }
}

.leavemessage .content {
  /* padding-bottom: .5rem; */
  display: flex;
  justify-content: space-between;
}
.leavemessage .content{
  padding-left: 2.5rem;
}
.reply_item {
  margin-left: 2.5rem;
  background: rgba(0, 0, 0, 0.05);
  padding: .5rem;
}
.name {
  color: #9466ff;
}

</style>