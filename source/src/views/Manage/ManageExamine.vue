<template>
  <div class="manage-examine manage-dev">
    <div class="title-line">
      <p class="title">
        项目测验
      </p>
      <p class="org">
        当前挂靠单位：{{ BELONGTO_LIST[user_info.org] }}
      </p>
    </div>
    <div class="filter">
      <div class="search">
        <div v-if="canPanel" class="search-name">
          <div class="search-display">
            <p>队伍名</p>
            <el-input
              v-model="select_name.team_name"
              placeholder="请输入队伍名"
              clearable
            >
            </el-input>
          </div>
          <div class="select-button">
            <el-button class="belongs-button" type="success" @click="getOneTeamByName()">
              搜索
            </el-button>
            <el-button class="belongs-button" type="info" @click="resetAll()">
              恢复默认
            </el-button>
          </div>
        </div>
      </div>
      <!-- 挂靠单位 -->
      <div v-if="canPanel" class="select-belong">
        <div class="select-display">
          <div v-if="user_info.org<=1" class="select-1">
            <FitForm ref="form_belong" :mirrors="mirrors_belongs" />
          </div>
          <div class="select-2">
            <FitForm ref="form_type" :mirrors="mirrors_type" />
          </div>
        </div>
        <div class="select-button">
          <el-button class="belongs-button" type="success" @click="select()">
            筛选
          </el-button>
          <el-button class="belongs-button" type="info" @click="resetAll()">
            恢复默认
          </el-button>
        </div>
      </div>
    </div>
    <el-tabs v-model="status" class="table-tab" @tab-click="handleClick">
      <el-tab-pane label="全部项目" name="all"></el-tab-pane>
      <el-tab-pane label="已出行队伍" name="4"></el-tab-pane>
      <el-tab-pane label="已返回未测验队伍" name="5"></el-tab-pane>
      <el-tab-pane label="已通过测验项目" name="7"></el-tab-pane>
      <el-tab-pane label="未通过测验项目" name="6"></el-tab-pane>
      <el-tab-pane label="校级答辩项目" name="8"></el-tab-pane>
    </el-tabs>
    <!-- <p class="manage-examine-remain title">剩余项目数：{{ pagination.total }}</p> -->
    <pager
      ref="refresh"
      :page-size="6"
      :request-func="getList"
      :error-msg="'无法获取'"
      :extra-data="status"
      :belong-data="belongs"
      :type-data="project_types"
    >
      <el-table
        v-loading="loading"
        slot-scope="props"
        border
        class="table-project"
        :data="props.list"
      >
        <el-table-column label="队伍名称" width="160">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.team_name }}
              </div>
              <div class="line">
                {{ scope.row.team_name }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="projecta_name"
          label="项目名称"
          width="160"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.project_name }}
              </div>
              <div class="line">
                {{ scope.row.project_name }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_type"
          label="项目类型"
          width="160"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ PRACTICE_TYPE_LIST[scope.row.project_type] }}
              </div>
              <div class="line">
                {{ PRACTICE_TYPE_LIST[scope.row.project_type] }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_form"
          label="实践形式"
          width="110"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ PRACTICE_FORM_LIST[scope.row.project_form] }}
              </div>
              <div class="line">
                {{ PRACTICE_FORM_LIST[scope.row.project_form] }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ scope.row.status | statusToReadable }}
              </div>
              <div class="line">
                {{ scope.row.status | statusToReadable }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="对该队伍的操作"
          width="230"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="通过测验"
              placement="top"
            >
              <el-button
                v-show="canPass(scope.row)"
                icon="el-icon-success"
                circle
                type="success"
                class="button-lists-button"
                size="small"
                @click="projectPass(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="推荐至校级答辩"
              placement="top"
            >
              <el-button
                v-show="canRecommon(scope.row)"
                icon="el-icon-arrow-up"
                circle
                type="success"
                class="button-lists-button"
                size="small"
                @click="projectRecommon(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="不能通过测验"
              placement="top"
            >
              <el-button
                v-show="canReject(scope.row)"
                icon="el-icon-error"
                circle
                type="danger"
                class="button-lists-button"
                size="small"
                @click="projectReject(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="取消校级答辩资格"
              placement="top"
            >
              <el-button
                v-show="canRecRej(scope.row)"
                icon="el-icon-arrow-down"
                circle
                type="danger"
                class="button-lists-button"
                size="small"
                @click="projectRecRej(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="给出建议"
              placement="top"
            >
              <el-button
                icon="el-icon-edit"
                circle
                type="primary"
                size="small"
                class="button-lists-button"
                @click="Suggest(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="队伍详情"
              placement="top"
            >
              <el-button
                type="info"
                class="button-lists-button"
                icon="el-icon-more"
                circle
                size="small"
                @click="openDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </pager>
    <el-dialog
      v-dialogDrag
      title="详情"
      :fullscreen="isPhone"
      :visible.sync="dialogVisible"
    >
      <TeamInfoDisplay :team-info="dialogRow" :teammates-info="teammates" />
      <!-- 项目通过测验   -->
      <el-button
        round
        type="success"
        :disabled="!canPass(dialogRow)"
        @click="projectPass(dialogRow)"
      >
        通过
      </el-button>
      <!-- 项目不通过测验   -->
      <el-button
        round
        type="danger"
        :disabled="!canReject(dialogRow)"
        @click="projectReject(dialogRow)"
      >
        不通过
      </el-button>
      <!-- 推荐项目校级答辩   -->
      <el-button
        round
        type="success"
        :disabled="!canRecommon(dialogRow)"
        @click="projectRecommon(dialogRow)"
      >
        推荐答辩
      </el-button>
      <!-- 取消项目校级答辩   -->
      <el-button
        round
        type="danger"
        :disabled="!canRecRej(dialogRow)"
        @click="projectRecRej(dialogRow)"
      >
        取消答辩资格
      </el-button>
      <el-button
        round
        type="success"
        size="small"
        @click="Suggest(dialogRow)"
      >
        给出建议
      </el-button>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="给出建议"
      :visible.sync="suggestDialogVisible"
      :fullscreen="isPhone"
    >
      <el-input
        v-model="suggestion"
        type="textarea"
        class="suggest-content"
        :rows="4"
        :cols="10"
        placeholder="请填写您要给出的建议"
      >
      </el-input>
      <el-button
        round
        type="success"
        @click="submitSuggestion()"
      >
        提交
      </el-button>
      <el-button round type="info" @click="suggestDialogVisible = false">
        取消
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import Pager from '@/components/ArtPager'
import TeamInfoDisplay from '@/components/TeamInfoDisplay'
import statusMixin from '@/mixins/status'
import { mapGetters, mapMutations } from 'vuex'
import { showAsynConfirm } from '@/mixins/messageBox'
import { getTeammateInfo,
  getAdminTeams,
  teamIsPass,
  suggestion,
  getOneTeamByName,
  toSchoolLevel,
  cancelToSchool } from '@/api/team'
import FitForm from '@/components/FitForm.vue'
import { BELONGTOS, PRACTICE_TYPES } from '@/mixins/consts.js'

const mirrors_belongs = [
  {
    type: 'select',
    label: '挂靠单位',
    prop: 'belongs',
    options: BELONGTOS
  }
]

const mirrors_type = [
  {
    type: 'select',
    label: '实践类型',
    prop: 'project_types',
    options: PRACTICE_TYPES
  }
]

export default {
  name: 'ManageExamine',
  components: {
    Pager,
    TeamInfoDisplay,
    FitForm
  },
  mixins: [statusMixin],
  data() {
    return {
      mirrors_belongs,
      mirrors_type,
      loading: false,
      status: 'all',
      // 挂靠单位
      belongs: 0,
      // 实践类型
      project_types: 0,
      // 建议弹窗以及建议
      suggestion: '',
      select_name: {
        team_name: ''
      },
      suggestDialogVisible: false,
      projects: [],
      teammates: [],
      // 队伍信息
      dialogVisible: false,
      dialogRow: {},
      BELONGTO_LIST: [
        '无挂靠单位',
        '校团委',
        '大学生党委',
        '文治书院',
        '南洋书院',
        '宗濂书院',
        '彭康书院',
        '仲英书院',
        '启德书院',
        '励志书院',
        '崇实书院',
        '钱学森书院',
        '材料学院',
        '数学学院',
        '电信学部',
        '生命学院',
        '能动学院',
        '外国语学院',
        '理学院',
        '经金学院',
        '医学部',
        '电气学院',
        '人居学院',
        '人文学院',
        '化工学院',
        '机械学院',
        '软件学院',
        '航天学院',
        '公管学院',
        '马克思主义学院',
        '法学院',
        '新媒体学院',
        '金禾经济中心',
        '管理学院',
        '创新创业学院',
        '前沿院',
        '继续教育学院',
        '网络教育学院',
        '国际教育学院',
        '体育中心'
      ],
      PRACTICE_TYPE_LIST: [
        '其他',
        '自主立项',
        '专项实践'
      ],
      PRACTICE_THEME_LIST: [
        '特色实践(其他)',
        '脱贫攻坚',
        '西迁精神',
        '政府见习',
        '一带一路',
        '红色寻访',
        '志愿服务'
      ],
      PRACTICE_FORM_LIST: [
        '其他',
        '社会调查',
        '理论宣讲',
        '生产实习',
        '科技创新',
        '返乡实践',
        '网络线上'
      ]
    }
  },
  computed: {
    ...mapGetters({
      user_info: 'user_info',
      isPhone: 'isPhone',
      currentTeamId: 'currentTeamId',
      canPanel: 'canPanel'
    })
  },
  mounted() {
    document.getElementById('manage-examine').scrollIntoView()
  },
  methods: {
    ...mapMutations({
      saveCurrentTeamId: 'saveCurrentTeamId'
    }),
    // 给pager方法
    getList: getAdminTeams,
    async getTeams() {
      this.loading = true
      try {
        const data = await getAdminTeams(this.status)
        this.projects = data.data
        this.loading = false
      } catch (message) {
        this.$message({
          type: 'error',
          message: '获取队伍信息失败  ' + message
        })
      }
    },
    // 搜索单只队伍
    async getOneTeamByName() {
      try {
        const data = await getOneTeamByName(this.select_name)
        this.teams = data
        this.saveCurrentTeamId(data[0].team_id)
        this.openDialog(data[0])
      } catch (err) {
        this.$message({
          type: 'error',
          message: '没有搜索到对应的队伍'
        })
      }
    },
    async getTeammateInfo() {
      this.loading = true
      try {
        const data = await getTeammateInfo(this.currentTeamId)
        this.teammates = data.data
        this.loading = false
      } catch (message) {
        this.$message({
          type: 'error',
          message: '获取该队伍信息失败  ' + message
        })
      }
    },
    // 根据belongs筛选
    // 根据belongs筛选
    async select() {
      const form_1 = this.$refs['form_belong']
      const form_2 = this.$refs['form_type']
      let data_1 = ''
      if (this.user_info.org <= 1) {
        data_1 = form_1.getData()
      }
      const data_2 = form_2.getData()
      console.log(data_1, data_2)
      if (this.user_info.org <= 1) {
        this.belongs = data_1.belongs
      } else {
        this.belongs = 0
      }
      this.project_types = data_2.project_types
      this.loading = true
      setTimeout(() => {
        this.changePages(1)
        this.loading = false
      }, 500)
    },
    // 重置
    resetAll() {
      const form_1 = this.$refs['form_belong']
      const form_2 = this.$refs['form_type']
      let data_1 = ''
      if (this.user_info.org <= 1) {
        data_1 = form_1.setData(0)
      }
      const data_2 = form_2.setData(0)
      console.log(data_1, data_2)
      this.belongs = 0
      this.project_types = 0
      this.loading = true
      setTimeout(() => {
        this.changePages(1)
        this.loading = false
      }, 500)
    },
    // 执行审核，通过或者不通过
    async _teamIsPass(team_id, data) {
      try {
        const return_data = await teamIsPass(team_id, data)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    async _toSchoolLevel(team_id) {
      try {
        const return_data = await toSchoolLevel(team_id)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '成功推荐到校级答辩'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    async _cancelToSchool(team_id) {
      try {
        const return_data = await cancelToSchool(team_id)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '已取消校级答辩的资格'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: '操作失败，' + message
        })
      }
    },
    _check(row, msg, boolean) {
      showAsynConfirm(msg, '已取消', (done) => {
        this._teamIsPass(row.team_id, boolean)
        done()
        this.changePages(1)
      })
    },
    _checkRec(row, msg, boolean) {
      showAsynConfirm(msg, '已取消', (done) => {
        if (boolean) {
          this._toSchoolLevel(row.team_id)
        } else if (!boolean) {
          this._cancelToSchool(row.team_id)
        }
        done()
        this.changePages(1)
      })
    },
    // 审核通过
    projectPass(row) {
      this._check(row, '确认要通过该队伍的审核？', 1)
    },
    // 审核不通过
    projectReject(row) {
      this._check(row, '确认不通过该队伍的审核？', 0)
    },
    // 推荐到校级
    projectRecommon(row) {
      this._checkRec(row, '确认推荐该队伍到校级答辩？', 1)
    },
    // 取消推荐到校级
    projectRecRej(row) {
      this._checkRec(row, '确认取消该队伍校级答辩的资格？', 0)
    },
    // 根据状态判断是否可以通过
    canPass(row) {
      return row.status == 5 || row.status == 6
    },
    // 根据状态判断是否可以不通过
    canReject(row) {
      return row.status == 5 || row.status == 7
    },
    canRecommon(row) {
      return row.status == 7
    },
    canRecRej(row) {
      return row.status == 8
    },
    // 切换页面
    changePages(i) {
      this.$refs.refresh.turn(i)
      this.dialogVisible = false
    },
    // 切换面板时刷新
    handleClick() {
      setTimeout(() => {
        this.changePages(1)
      }, 200)
    },
    // teams详情窗口
    openDialog(row) {
      this.dialogRow = row
      this.saveCurrentTeamId(row.team_id)
      setTimeout(() => {
        this.getTeammateInfo()
      }, 100)
      setTimeout(() => {
        this.dialogVisible = true
      }, 300)
    },
    // 给出建议dialog
    Suggest(row) {
      this.suggestDialogVisible = true
      this.timelyRow = row
      this.saveCurrentTeamId(row.team_id)
    },
    submitSuggestion() {
      showAsynConfirm('确认给出该建议？', '已取消', (done) => {
        this._submitSuggestion(done)
      })
    },
    async _submitSuggestion(done) {
      done()
      try {
        const data = await suggestion(this.currentTeamId, this.suggestion)
        this.$message({
          type: 'success',
          message: '建议提交成功！'
        })
        this.suggestDialogVisible = false
        this.suggestion = ''
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '提交未成功  ' + message
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-examine {
  .manage-examine-remain {
    margin: 0.5em 0;
    margin-left: -1.8em;
  }
  .button-lists-button {
    margin: 0 0.5em;
  }
  .title {
    font-size: 25px;
    font-family: "Microsoft YaHei";
    color: rgb(78, 64, 53);
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-bottom: 15px;
    margin-left: -1.0em;
    margin-top: 0.3em;
  }
  .suggest-content {
    margin-bottom: 1em;
  }
  .title-line {
    display: flex;
    .title {
      flex-grow: 1;
    }
  }
  .filter {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .belongs-button {
    height: 2.5em;
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0.5vw;
  }
  .search-name {
    width: 56.5%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    min-width: 700px;
  }
  .search-display {
    p {
      white-space: nowrap;
      margin: 0.6vw;
    }
    display: flex;
    flex-direction: row;
    margin-left: -1vw;
    margin-right: 0.5vw
  }
  .select-display {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .select-belong {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 65%;
    min-width: 700px;
    p {
      font-size: 22px;
      font-family: "Microsoft YaHei";
      color: rgb(78, 64, 53);
      font-weight: bold;
      transform: scale(0.94, 1.08);
      margin-top: 0.3em;
      margin-right: 1.0em;
    };
    .select-button {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 900px) {
    .select-belong {
      .select-display {
        display: flex;
        flex-direction: column;
      }
      .select-button {
        margin-top: 35px;
      }
    }
  }
  @media screen and (max-width: 700px) {
    .select-belong p {
      font-size: 18px;
    }
    .select-belong {
      flex-direction: column;
      .select-button {
        margin-top: -25px;
        margin-bottom: 20px;
      }
      .belongs-button {
        transform: scale(0.9,0.9);
      }
    }
  }
  @media screen and (max-width: 410px) {
    .select-belong {
      p{
        font-size: 15px;
      }
      .belongs-button {
        transform: scale(0.8,0.8);
      }
    }
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 1000px) {
  .manage-dev{
    .title-line {
      font-size: 16px;
      .title {
        width: 80px;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 16px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 15px;
    }
    .el-table .cell {
      font-size: 15px;
    }
    .el-table th, .el-table td {
      padding: 8px 0;
    }
  }
}

@media screen and (max-width: 700px) {
  .manage-dev{
    .title-line {
      font-size: 14px;
      .title {
        width: 80px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 14px;
          padding: 0 10px;
          margin-top: -10px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 14px;
    }
    .el-form--inline .form-field .el-form-item__label {
      width: 100px;
    }
    .el-table .cell {
      font-size: 14px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
    }
  }
}

@media screen and (max-width: 410px) {
  .manage-dev{
    .title-line {
      font-size: 12px;
      .title {
        width: 70px;
        font-size: 12px;
        margin-left: 6px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 12px;
          padding: 0 5px;
          margin-top: -20px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 12px;
    }
    .el-table .cell {
      font-size: 12px;
    }
    .el-table th, .el-table td {
      padding: 4px 0;
    }
  }
}
</style>

