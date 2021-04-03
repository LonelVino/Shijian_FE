<template>
  <div class="main-container manage-dev">
    <div class="Teams">
      <p class="title">
        所有队伍
      </p>
      <pager
        ref="refresh"
        :page-size="6"
        :request-func="getList"
        :error-msg="'无法获取'"
        :extra-data="status"
      >
        <el-table
          slot-scope="props"
          v-loading="loading"
          border
          :data="props.list"
        >
          <el-table-column label="队伍名称">
            <template slot-scope="scope">
              <div class="line">
                {{ scope.row.team_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <div class="line">
                {{ scope.row.project_name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="队伍信息" min-width="250px;">
            <template slot-scope="scope">
              <div class="info">
                队长：{{ scope.row.leader_name }}
              </div>
              <div class="info">
                指导老师：{{ scope.row.teacher_name }}
              </div>
              <div class="info">
                挂靠单位：{{ BELONGTO_LIST[scope.row.belong] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
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
              <el-tooltip class="item" effect="dark" content="解散队伍" placement="top">
                <el-button
                  icon="el-icon-close"
                  type="danger"
                  size="small"
                  class="button-lists-button"
                  @click="Dismiss(scope.row)"
                >
                  解散
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </pager>
      <el-dialog v-dialogDrag title="详情" :visible.sync="dialogVisible" :fullscreen="isPhone">
        <TeamInfoDisplay :team-info="dialogRow" :teammates-info="teammates" />
      </el-dialog>
      <el-dialog
        v-dialogDrag
        title="提出建议"
        :visible.sync="suggest.visible"
        :fullscreen="isPhone"
        class="suggest-dialog"
      >
        <div class="suggest-content">
          <el-input
            v-model="suggest.row.content"
            type="textarea"
            class="suggest-content"
            :rows="4"
            :cols="10"
            placeholder="请填写您要给出的建议"
          ></el-input>
          <el-button type="primary" @click="submitSuggestion()">
            提交
          </el-button>
          <el-button @click="suggest.visible = false">
            关闭
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
import Pager from '@/components/ArtPager'
import TeamInfoDisplay from '@/components/TeamInfoDisplay'
import { getByUserId } from '@/api/common'
import {
  getTeammateInfo,
  getAdminTeams,
  suggestion,
  dismissTeam
} from '@/api/team'
import { BELONGTO_LIST } from '@/mixins/consts'
import { showAsynConfirm } from '@/mixins/messageBox'

export default {
  name: 'ManageTeam',
  components: {
    Pager,
    TeamInfoDisplay
  },
  data() {
    return {
      BELONGTO_LIST,
      dialogVisible: false,
      dialogRow: {},
      teammates: [],
      suggest: {
        visible: false,
        row: {
          team_id: '',
          content: ''
        }
      },
      status: 'all',
      teams: null,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
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
        this.teams = data.data
        this.loading = false
      } catch (message) {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    async getUserName() {
      try {
        const data = await getByUserId(this.teamInfo.leader_id)
        this.leader_name = data.user_name
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取发布者姓名,' + e
        })
      }
    },
    resetAll() {
      this.loading = true
      setTimeout(() => {
        this.changePages(1)
        this.loading = false
      }, 500)
    },
    // 获取队友信息
    async getTeammateInfo() {
      this.loading = true
      try {
        const data = await getTeammateInfo(this.currentTeamId)
        this.teammates = data.data
        this.loading = false
      } catch (message) {
        this.$message.warning(message)
      }
    },
    // 队伍详情窗口
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
    // 打开给出建议对话框
    Suggest(row) {
      this.suggest.visible = true
      this.suggest.row.team_id = row.team_id
      this.saveCurrentTeamId(row.team_id)
    },
    submitSuggestion() {
      if (this.suggest.row.content == '') {
        this.$message({
          type: 'warning',
          message: '建议不能为空！'
        })
      } else {
        showAsynConfirm('确认给出该建议？', '已取消', done => {
          this._submitSuggestion(done)
        })
      }
    },
    async _submitSuggestion(done) {
      done()
      try {
        const data = await suggestion(
          this.currentTeamId,
          this.suggest.row.content
        )
        this.$message({
          type: 'success',
          message: '建议提交成功！'
        })
        this.suggest.visible = false
        this.suggest.row.content = ''
        this.changePages(1)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '提交未成功  ' + message
        })
      }
    },
    Dismiss(row) {
      showAsynConfirm('确定要解散队伍？请您慎重考虑！！！', '已取消', done => {
        this._Dismiss(done)
      })
      this.saveCurrentTeamId(row.team_id)
    },
    async _Dismiss(done) {
      try {
        const data = await dismissTeam(this.currentTeamId)
        this.$message({
          type: 'success',
          message: '已解散队伍！'
        })
        done()
        this.changePages(1)
      } catch (message) {
        done()
        this.$message({
          type: 'error',
          message: '解散失败，' + message
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
.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.title-link {
  font-weight: bold;
  cursor: pointer;
}

.title-link:hover {
  text-decoration: underline;
}

.info {
  font-size: 12px;
}

.suggest-title,
.suggest-content {
  margin-bottom: 10px;
}

.belongs-button {
  height: 2.5em;
}
.select-belong {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5em;
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
  }
  .select-button {
    display: flex;
    flex-direction: row;
    margin-left: 1em;
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

</style>

<style lang="scss">
.suggest-content {
  textarea {
    resize: none;
  }
}
@media screen and (max-width: 1000px) {
  .manage-dev{
    .Teams {
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
    .Teams {
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
        }
      }
    }
    .el-table th > .cell {
      font-size: 14px;
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
    .Teams {
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

