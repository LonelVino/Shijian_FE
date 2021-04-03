<template>
  <div class="square">
    <div class="header">
      <p>招募广场</p>
    </div>
    <div class="main">
      <div class="tabs">
        <el-tabs
          v-model="activeName"
          type="border-card"
          class="el-tab"
          :tab-position="tabPosition"
          @tab-click="handleClick()"
        >
          <el-tab-pane name="2" label="全部显示">
            <div v-loading="loading">
              <pager
                ref="refresh"
                :page-size="6"
                :request-func="getList"
                :error-msg="'无法获取'"
                :recruit-data="type2"
              >
                <template slot-scope="scope">
                  <!-- 如果没有消息 -->
                  <div v-show="scope.list.length == 0" class="no-recruit">
                    <p>（暂时没有信息，等待你的发布！）</p>
                  </div>
                  <!-- 如果有消息 -->
                  <div class="message">
                    <RecruitLine
                      v-for="(item, key, index) in scope.list"
                      :key="index"
                      ref="line_refresh"
                      :row="item"
                      @showrow="showDetails()"
                    />
                  </div>
                </template>
              </pager>
            </div>
          </el-tab-pane>
          <el-tab-pane label="仅等待招募" name="0">
            <div v-loading="loading">
              <pager
                ref="objectRecruit"
                :page-size="6"
                :request-func="getList"
                :error-msg="'无法获取'"
                :recruit-data="type0"
              >
                <template slot-scope="scope">
                  <!-- 如果没有消息 -->
                  <div v-show="scope.list.length == 0" class="no-recruit">
                    <p>（暂时没有信息，等待你的发布！）</p>
                  </div>
                  <!-- 如果有消息 -->
                  <div class="message">
                    <RecruitLine
                      v-for="(item, key, index) in scope.list"
                      v-show="item.recruit_type == 0"
                      :key="index"
                      ref="line_refresh"
                      :row="item"
                      @showrow="showDetails()"
                    />
                  </div>
                </template>
              </pager>
            </div>
          </el-tab-pane>
          <el-tab-pane label="仅队长招募" name="1">
            <div v-loading="loading">
              <pager
                ref="subjectRecruit"
                :page-size="6"
                :request-func="getList"
                :error-msg="'无法获取'"
                :recruit-data="type1"
              >
                <template slot-scope="scope">
                  <!-- 如果没有消息 -->
                  <div v-show="scope.list.length == 0" class="no-recruit">
                    <p>（暂时没有信息，等待你的发布！）</p>
                  </div>
                  <!-- 如果有消息 -->
                  <div class="message">
                    <RecruitLine
                      v-for="item in scope.list"
                      v-show="item.recruit_type == 1"
                      :key="item.index"
                      ref="line_refresh"
                      class="recruit-line"
                      :row="item"
                      @showrow="showDetails()"
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
import Pager from '@/components/ArtPager'
import RecruitLine from './RecruitLine.vue'
import { getAllRecruits } from '@/api/recruit'

export default {
  name: 'RecruitSquare',
  components: {
    RecruitLine,
    Pager
  },
  data() {
    return {
      loading: false,
      activeName: '2',
      tabPosition: 'top',
      recruits: [],
      row: {},
      type1: '1',
      type0: '0',
      type2: 'all',
      total: null
    }
  },
  methods: {
    getList: getAllRecruits,
    async handleGet() {
      this.loading = true
      try {
        const data = await getAllRecruits()
        const recruit_data = data.data
        this.row = recruit_data
        this.recruits = recruit_data
        this.loading = false
      } catch (err) {
        this.$message({
          type: 'error',
          message: err
        })
      }
    },
    handleClick() {
      if (this.activeName == 0) {
        this.$refs.objectRecruit.turn(1)
      } else if (this.activeName == 1) {
        this.$refs.subjectRecruit.turn(1)
      } else {
        this.$refs.refresh.turn(1)
      }
    }
  }
}
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

@media screen and (max-width: 830px) {
  .header p {
    font-size: 18px;
  }
  .recruit-line {
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {
  .header p {
    font-size: 14px;
  }
  .recruit-line {
    font-size: 14px;
  }
}

@media screen and (max-width: 410px) {
  .header p {
    font-size: 12px;
  }
  .recruit-line {
    font-size: 12px;
  }
}
</style>

<style lang="scss">

@media screen and (max-width: 940px) {
  .square {
    .el-tabs__nav {
      height: 60px;
    }
    .el-tabs__item {
      transform: scale(0.90,0.90)
    }
  }
}

@media screen and (max-width: 540px) {
  .square {
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
