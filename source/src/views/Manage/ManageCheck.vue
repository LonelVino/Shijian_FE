<template>
  <div class="manage-check manage-dev">
    <div class="title-line">
      <p class="title">
        项目审核
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
      <el-tab-pane label="未提交项目" name="0"></el-tab-pane>
      <el-tab-pane label="未审核项目" name="1"></el-tab-pane>
      <el-tab-pane label="已通过项目" name="3"></el-tab-pane>
      <el-tab-pane label="未通过项目" name="2"></el-tab-pane>
    </el-tabs>
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
        ref="filterTable"
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
          width="100"
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
          prop="project_theme"
          label="实践主题"
          width="110"
        >
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              placement="top-start"
            >
              <div slot="content">
                {{ PRACTICE_THEME_LIST[scope.row.project_theme] }}
              </div>
              <div class="line">
                {{ PRACTICE_THEME_LIST[scope.row.project_theme] }}
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
        <el-table-column
          prop="status"
          label="状态"
        >
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
        <el-table-column label="对该队伍的操作" width="230">
          <template slot-scope="scope">
            <div class="button-lists">
              <el-tooltip class="item" effect="dark" content="通过测验" placement="top">
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
              <el-tooltip class="item" effect="dark" content="不能通过测验" placement="top">
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
              <el-tooltip class="item" effect="dark" content="给出建议" placement="top">
                <el-button
                  icon="el-icon-edit"
                  circle
                  type="primary"
                  size="small"
                  class="button-lists-button"
                  @click="Suggest(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="队伍详情" placement="top">
                <el-button
                  type="info"
                  class="button-lists-button"
                  icon="el-icon-more"
                  circle
                  size="small"
                  @click="openDialog(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="发回重改" placement="top">
                <el-button
                  v-show="canRemake(scope.row)"
                  icon="el-icon-back"
                  circle
                  type="danger"
                  size="small"
                  class="button-lists-button"
                  @click="projectRemake(scope.row)"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </pager>
    <el-dialog v-dialogDrag title="详情" :visible.sync="dialogVisible" :fullscreen="isPhone">
      <TeamInfoDisplay :team-info="dialogRow" :teammates-info="teammates" />
      <el-button
        round
        type="success"
        :disabled="!canPass(dialogRow)"
        @click="projectPass(dialogRow)"
      >
        通过
      </el-button>
      <el-button
        round
        type="danger"
        :disabled="!canReject(dialogRow)"
        @click="projectReject(dialogRow)"
      >
        不通过
      </el-button>
      <el-button
        round
        type="danger"
        :disabled="!canRemake(dialogRow)"
        @click="projectRemake(dialogRow)"
      >
        发回重改
      </el-button>
      <el-button round type="success" size="small" @click="Suggest(dialogRow)">
        给出建议
      </el-button>
    </el-dialog>
    <el-dialog v-dialogDrag title="给出建议" :visible.sync="suggestDialogVisible" :fullscreen="isPhone">
      <el-input
        v-model="suggestion"
        type="textarea"
        class="suggest-content"
        :rows="4"
        :cols="10"
        placeholder="请填写您要给出的建议"
      ></el-input>
      <el-button round type="success" @click="submitSuggestion()">
        提交
      </el-button>
      <el-button round type="info" @click="suggestDialogVisible = false">
        取消
      </el-button>
    </el-dialog>
    <!-- 需要做一个弹出框来显示具体消息，或者更高大上的窒息操作 -->
  </div>
</template>

<script>
import Pager from '@/components/ArtPager'
import TeamInfoDisplay from '@/components/TeamInfoDisplay'
import statusMixin from '@/mixins/status'
import { mapGetters, mapMutations } from 'vuex'
import {
  getTeammateInfo,
  getAdminTeams,
  auditTeam,
  getOneTeamByName,
  withDraw,
  suggestion
} from '@/api/team'
import { showAsynConfirm } from '@/mixins/messageBox'
import { setTimeout } from 'timers'
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
  name: 'ManageCheck',
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
      // 挂靠单位
      belongs: 0,
      // 实践类型
      project_types: 0,
      // 搜索队伍
      select_name: {
        team_name: ''
      },
      // 建议弹窗以及建议
      suggestion: '',
      suggestDialogVisible: false,
      timelyRow: '',
      // 队伍信息
      dialogVisible: false,
      dialogRow: {},
      teammates: [],
      status: 'all', // table切换时队伍的状态
      projects: [],
      PRACTICE_TYPE_LIST: [
        '其他',
        '自主立项',
        '专项实践',
        's',
        's',
        's',
        's',
        's',
        's',
        's'
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
      ],
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
      ]
    }
  },
  // mounted() {
  //   console.log(this.user_info)
  // },
  computed: {
    ...mapGetters({
      user_info: 'user_info',
      isPhone: 'isPhone',
      currentTeamId: 'currentTeamId',
      canPanel: 'canPanel'
    })
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
      console.log(this.user_info)
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
    // 切换面板时刷新
    handleClick() {
      setTimeout(() => {
        this.changePages(1)
      }, 200)
    },
    // teams详情窗口
    openDialog(row) {
      this.dialogRow = row
      console.log(row)
      this.saveCurrentTeamId(row.team_id)
      setTimeout(() => {
        this.getTeammateInfo()
      }, 100)
      setTimeout(() => {
        this.dialogVisible = true
      }, 300)
    },
    _check(row, msg, boolean) {
      showAsynConfirm(msg, '已取消', done => {
        this._auditTeam(row.team_id, boolean)
        done()
        this.changePages(1)
        setTimeout(() => {
          this.dialogVisible = false
        }, 300)
      })
    },
    // 审核通过
    projectPass(row) {
      this._check(row, '确认该队伍的审核结果为通过？', 1)
    },
    // 审核不通过
    projectReject(row) {
      this._check(row, '确认该队伍的审核结果为不通过？', 0)
    },
    // 发回重改
    projectRemake(row) {
      showAsynConfirm(
        '确认将该队伍发回重改？队伍状态将转为未提交审核状态',
        '已取消',
        done => {
          this._withDraw(row, done)
        }
      )
    },
    // 执行审核，通过或者不通过
    async _auditTeam(team_id, data) {
      try {
        const return_data = await auditTeam(team_id, data)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '审核完成！'
        })
        setTimeout(() => {
          this.dialogVisible = false
        }, 300)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '审核失败，' + message
        })
      }
    },
    async _withDraw(row, done) {
      done()
      try {
        const data = await withDraw(row.team_id)
        this.changePages(1)
        this.$message({
          type: 'success',
          message: '已发回重改！'
        })
      } catch (message) {
        this.$message({
          type: 'error',
          message: '撤回失败，' + message
        })
      }
      this.changePages(1)
    },
    canPass(row) {
      return row.status == 1 || row.status == 2
    },
    // 根据状态判断是否可以不通过
    canReject(row) {
      return row.status == 1 || row.status == 3
    },
    // 根据状态判断是否可以发回重改
    canRemake(row) {
      return row.status == 2
    },
    // 给出建议dialog
    Suggest(row) {
      this.suggestDialogVisible = true
      this.timelyRow = row
      this.saveCurrentTeamId(row.team_id)
    },
    submitSuggestion() {
      showAsynConfirm('确认给出该建议？', '已取消', done => {
        this._submitSuggestion(done)
      })
    },
    async _submitSuggestion(done) {
      done()
      try {
        const data = await suggestion(this.currentTeamId, this.suggestion)
        this.$message({
          type: 'success',
          message: '成功给出建议！'
        })
        this.suggestDialogVisible = false
        this.suggestion = ''
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '未成功给出建议  ' + message
        })
      }
    },
    changePages(i) {
      this.$refs.refresh.turn(i)
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-check {
  .manage-check-remain {
    margin: 1em 0;
    margin-left: -1.8em;
  }

  .table-project {
    margin: 0 0 1em 0;
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

  .filter-buttons {
    margin-top: 1.5vw;
  }

  .warning {
    margin: 1em 0;
    color: red;
    font-weight: bold;
    height: 80px;
  }

  .button-lists {
    display: inline-block;
  }

  .button-lists-button {
    margin: 0.5em;
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
    justify-content: flex-end;
    flex-direction: row;
    min-width: 700px;
  }
  .search-display {
    p {
      white-space: nowrap;
      margin: 0.6vw
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: -1vw;
    margin-right: 0.5vw
  }
  .select-belong {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    p {
      font-size: 22px;
      font-family: "Microsoft YaHei";
      color: rgb(78, 64, 53);
      font-weight: bold;
      transform: scale(0.94, 1.08);
      margin-top: 0.3em;
      margin-right: 1.0em;
    }
    .select-display {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
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
      .select-title {
        height: 0;
        opacity: 0;
      }
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
    .title-line {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;;
    }
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
.el-table__row .cell .line {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
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
          margin-top: -14px;
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
    .el-form-item__label {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden
    }
  }
}
</style>
