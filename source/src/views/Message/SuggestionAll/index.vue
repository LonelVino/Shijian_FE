<template>
  <div class="msgAll">
    <div class="header">
      <p>此功能暂时未开放</p>
    </div>
    <!-- <div class="main">
      <div class="tabs">
        <el-tabs
          type="border-card"
          class="el-tab"
          :tab-position="tabPosition"
          @tab-click="handleClick()"
          v-model="status"
        >
          <el-tab-pane name="all" label="全部">
            <div v-loading="loading">
               如果没有消息 -->
              <!-- <div class="no-message" >
                <p>（暂时没有建议）</p>
              </div> -->
              <!-- 如果有消息 -->
              <!-- <div class="message">
                <a class="msgline clickable"><MessageLine
                  v-for="(item, key, index) in messages"
                  :key="index"
                  :row="item"
                  @showrow="showDetails()"
                /></a>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="0" label="我的">
            <div v-loading="loading"> -->
              <!-- 如果没有消息 -->
              <!-- <div class="no-message" v-show="messages.length == 0">
                <p>（暂时没有信息）</p>
              </div> -->
              <!-- 如果有消息 -->
              <!-- <div class="message">
                <a class="msgline clickable"><MessageLine
                  v-for="(item, key, index) in messages"
                  :key="index"
                  :row="item"
                  @showrow="showDetails()"
                /></a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-button 
        v-if="(this.status == 'all'|| this.status == 0)" 
        class="all-button" type="primary"
        @click="ReadAllMessage()">提出建议</el-button>
      </div>
    </div> --> 
  </div>
</template>

<script>
import MessageLine from "../MessageAll/MessageLine";
import { getCurrentAllmessage, getAllRead } from "@/api/message.js";

export default {
  name: "MessageSquare",
  components: {
    MessageLine,
  },
  data() {
    return {
      loading: false,
      status: "all",
      tabPosition: "top",
      messages: [],
      row: {},
      total: null
    };
  },
  mounted() {
    this.handleGet(this.status);
  },
  methods: {
    async handleGet(status) {
      this.loading = true;
      try {
        const data = await getCurrentAllmessage(status);
        //消息总数
        this.total = data.total;
        //消息模块详情
        const message_data = data.data;
        this.row = message_data;
        this.messages = message_data;
        //消息标题处理
        for(let i=0;i<this.total;i++) {
          if(message_data[i].content.indexOf("审") != -1) {
            this.row[i].title = "队伍审核"
          }
          if(message_data[i].content.indexOf("留") != -1) {
            this.row[i].title = "留言回复"
          }
          if(message_data[i].content.indexOf("招") != -1) {
            this.row[i].title = "新的成员"
          }
        }
        this.loading = false;
      } catch (err) {
        this.messages = [];
        this.loading = false;
        this.$message({
          type: "error",
          message: err
        });
      }
    },
    async ReadAllMessage() {
      try {
        const data = await getAllRead();
        this.handleGet(this.status)
      } catch (err) {
        this.$message({
          type: "error",
          message: err
        });
      }
    },
    // 切换面板时刷新
    handleClick() {
      this.handleGet(this.status)
    },
  }
};
</script>

<style>
.el-tabs__header {
  line-height: 60px;
}
</style>


<style lang="scss" scoped>
.header p {
  font-size: 25px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  transform: scale(0.94, 1.08);
  margin-bottom: 10px;
  margin-left: -10px;
}
.el-tab {
  height: 100%;
  width: 100%;
  min-height: 400px;
}
.message {
  overflow: auto;
}

.all-button {
  position: absolute;
  float: bottom;
  margin-top: 10px;
}

.clickable {
    cursor: pointer;
    &:hover {
      background: gray;
    }
  }
@media screen and (max-width: 830px) {
  .header p {
    font-size: 18px;
  }
  .Message-line {
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {
  .header p {
    font-size: 14px;
  }
  .Message-line {
    font-size: 14px;
  }
}

@media screen and (max-width: 410px) {
  .header p {
    font-size: 12px;
  }
  .Message-line {
    font-size: 12px;
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 940px) {
  .msgAll {
    .el-tabs__nav {
      height: 60px;
    }
    .el-tabs__item {
      transform: scale(0.90,0.90)
    }
  }
}

@media screen and (max-width: 540px) {
  .msgAll {
    .el-tabs__nav {
      height: 50px;
      margin-top:-10px;
    }
    .el-tabs__item {
      transform: scale(0.80,0.80)
    }
  }
}
</style>