<template>
  <div class="square">
    <div class="header">
      <p>我已发布的招募</p>
    </div>
    <div class="main">
      <div class="tabs">
        <el-tabs
          type="border-card"
          class="el-tab"
          :tab-position="tabPosition"
          @tab-click="handleClick()"
          v-model="activeName"
        >
          <el-tab-pane name="2" label="我已发布">
            <div v-loading="loading">
              <pager :pageSize="4" :requestFunc="getList" :errorMsg="'无法获取'" :extraData="'1'" ref="refresh">
                <template slot-scope="scope">
                  <!-- 如果没有消息 -->
                  <div class="no-recruit" v-show="scope.list.length == 0">
                    <!--recruits.length == 0 -->
                    <p>（暂时没有信息，等待你的发布！）</p>
                  </div>
                  <!-- 如果有消息 -->
                  <div class="message">
                    <RecruitLine
                      v-for="(item, key, index) in scope.list"
                      :key="index"
                      :row="item"
                      @refresh="refresh"
                      v-show="item.status == 1"
                    />
                  </div>
                </template>
              </pager>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Pager from "@/components/ArtPager";
import RecruitLine from "@/components/RecruitLine.vue";
import { getMyRecruits } from "@/api/recruit";

export default {
  name: "RecruitSquare",
  components: {
    Pager,
    RecruitLine
  },
  data() {
    return {
      activeName: "2",
      tabPosition: "top",
      loading: false,
      visible: false
    };
  },
  methods: {
    getList: getMyRecruits,
    refresh() {
      this.$refs.refresh.turn(1);
    }
  }
};
</script>

<style>
.el-tabs__header {
  line-height: 60px;
}
</style>


<style scoped>
* {
  overflow: hidden;
}
.header p {
  font-size: 25px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  transform: scale(0.94, 1.08);
  margin-bottom: 15px;
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

@media screen and (max-width: 830px) {
  .header p {
    font-size: 18px;
    margin-left: 2px;
  }
  .recruit-line {
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {
  .header p {
    font-size: 14px;
    margin-left:2px;
  }
  .recruit-line {
    font-size: 14px;
  }
}

@media screen and (max-width: 410px) {
  .header p {
    font-size: 12px;
    margin-left:2px;
  }
  .recruit-line {
    font-size: 12px;
  }
}
</style>

