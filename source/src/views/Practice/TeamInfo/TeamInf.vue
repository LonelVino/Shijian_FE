<template>
  <div id="teamInf" class="teamInf">
    <side-line></side-line>
    <div id="container" class="container">
      <div class="Teams">
        <h2 class="title-h2">
          你加入的队伍
        </h2>
        <pager ref="refresh" :page-size="4" :request-func="getList" :error-msg="'无法获取'">
          <el-table slot-scope="props" v-loading="loading" border class="team-table" :data="props.list">
            <el-table-column label="队伍名称" width="150">
              <template slot-scope="scope">
                <div class="line">
                  {{ scope.row.team_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" width="150">
              <template slot-scope="scope">
                <div class="line">
                  {{ scope.row.project_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="队伍信息" min-width="200">
              <template slot-scope="scope">
                <div class="info">
                  <b>队长</b>
                  ：{{ scope.row.leader_name }}
                </div>
                <div class="info">
                  <b>指导老师</b>
                  ：{{ scope.row.teacher_name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="队伍状态" width="130">
              <template slot-scope="scope">
                <el-popover placement="bottom" width="200" trigger="click">
                  <div class="info">
                    <b>队伍当前状态</b>
                    ：{{ scope.row.status | statusToReadable }}
                  </div>
                  <el-button
                    slot="reference"
                    circle
                    size="small"
                    type="info"
                    icon="el-icon-tickets"
                  ></el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column width="150">
              <template slot-scope="scope">
                <el-button class="team-detalis-button" @click="checkOneTeam(scope.row.team_id), openDialog(scope.row)">
                  队伍详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </pager>
      </div>
      <div v-if="isGetTeamId" id="teamInfoDisplay" v-loading="teaminf_loading" class="teaminf">
        <TeamInfoDisplay :team-info="dialogRow" :teammates-info="teammates" />
        <div class="tianchong"></div>
        <div v-loading="button_loading" class="actions">
          <div class="action1">
            <!-- 修改队伍信息 -->
            <div v-if="canEdit && canDismiss" class="row action-button-row">
              <el-button class="actions-button" plain @click="EditTeamInfo()">
                修改队伍信息
              </el-button>
            </div>
            <!-- 变更指导老师 -->
            <div v-if="canEdit && canDismiss" class="row action-button-row">
              <el-button
                class="actions-button"
                type="primary"
                plain
                @click="openChangeTeacher(form.teacher_name)"
              >
                变更指导老师
              </el-button>
            </div>
          </div>
          <div class="action2">
            <!-- 提交审核队伍 -->
            <div v-if="canSubmit" class="row action-button-row">
              <el-button class="actions-button" type="primary" plain @click="beforeSubmit()">
                提交审核队伍
              </el-button>
            </div>
            <!-- 撤回申请 -->
            <div v-if="canWithDraw" class="row action-button-row">
              <el-button class="actions-button" type="primary" plainplain @click="withDraw()">
                撤回审核
              </el-button>
            </div>
            <!-- 队伍出发 -->
            <div v-if="canSetout" class="row action-button-row">
              <el-button class="actions-button" type="warning" plain @click="setOut()">
                队伍出发
              </el-button>
            </div>
            <!-- 队伍返回 -->
            <div v-if="canReturn" class="row action-button-row">
              <el-button class="actions-button" type="warning" plain @click="Return()">
                队伍返回
              </el-button>
            </div>
            <!-- 队伍信息导出 -->
            <div class="row action-button-row">
              <el-button class="actions-button0" type="primary" plain @click="Download()">
                将队伍信息导出Excel
              </el-button>
            </div>
          </div>
          <div class="action3">
            <!-- 退出队伍 -->
            <div class="row action-button-row">
              <el-button
                class="actions-button"
                type="danger"
                plain
                :disabled="noExit"
                @click="Quit()"
              >
                退出队伍
              </el-button>
            </div>
            <!-- 解散队伍 -->
            <div v-if="canDismiss" class="row action-button-row">
              <el-button class="actions-button" type="danger" plain @click="Dismiss()">
                解散队伍
              </el-button>
            </div>
          </div>
          <p class="warnings" style="color:red">
            队长和副队长不可以退出队伍
          </p>
        </div>
      </div>
      <el-dialog
        v-dialogDrag
        title="变更指导老师"
        :fullscreen="isPhone"
        :visible.sync="changeTeacher"
      >
        <el-form :model="form">
          <el-form-item label="更改指导老师姓名" :label-width="formLabelWidth">
            <el-input v-model="editTeacherName" class="change-teacher-input" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="actions-button" @click="changeTeacher = false">
            取 消
          </el-button>
          <el-button
            class="actions-button"
            type="primary"
            @click="changeTeacher = false, changeTeacherInfo()"
          >
            确 定
          </el-button>
        </div>
      </el-dialog>
      <el-dialog
        v-dialogDrag
        title="队伍信息中存在的问题"
        :fullscreen="isPhone"
        :visible.sync="problemVisible"
      >
        <p>您的实践详情存在以下问题，不利于通过审核：</p>
        <div class="practice-problems">
          <p v-for="(p, index) in problems" :key="index" class="problem">
            {{ p }}
          </p>
        </div>
        <p>建议将每个部分长度控制在50~100字，总字数控制在150~200字之间。</p>
        <p class="problem">
          提交审核后将不可修改，如果你确定没有问题，继续提交请点击继续提交审核。
        </p>
        <el-button type="primary" @click="Submit">
          继续提交审核
        </el-button>
        <el-button type="primary" @click="problemVisible = false">
          取消
        </el-button>
      </el-dialog>
      <div id="TeamInfoDisplay" class="tianchong"></div>
      <div class="join">
        <el-button type="primary" @click="toJoinTeams()">
          去创建&加入队伍
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SideLine from '@/views/Practice/SideLine'
import statusMixin from '@/mixins/status'
import { mapGetters, mapMutations } from 'vuex'
import {
  getAllTeamInfo,
  changeTeacherName,
  withDraw,
  deleteTeamInfo,
  getTeammateInfo,
  dismissTeam
} from '@/api/team'
import { showAsynConfirm } from '@/mixins/messageBox'
import { openDownloadDialog } from '@/js/download'
import Pager from '@/components/ArtPager'
import TeamInfoDisplay from '@/components/TeamInfoDisplay'

export default {
  name: 'TeamInf',
  components: {
    SideLine,
    Pager,
    TeamInfoDisplay
  },
  mixins: [statusMixin],
  data() {
    return {
      dialogVisible: false,
      dialogRow: {},
      // 问题弹窗是否可见
      problemVisible: false,
      problems: [],
      // 修改老师弹窗是否可见
      changeTeacher: false,
      editTeacherName: '',
      // 所有的队伍
      teams: [],
      // 打开当前队伍的所有队员
      teammates: [],
      // 表格的loading
      loading: false,
      button_loading: false,
      isGetTeamId: false,
      teaminf_loading: false,
      form: {
        team_name: null,
        project_name: null,
        team_id: null,
        code: null,
        place: null,
        plan_begin_time: null,
        plan_end_time: null,
        project_type: null,
        event_background: null,
        event_aim: null,
        event_content: null,
        fee_transport: null,
        fee_print: null,
        fee_other: null,
        belong: 1,
        teacher_name: null,
        teacher_follow: null,
        status: 1
      },
      formLabelWidth: '150px'
    }
  },
  computed: {
    ...mapGetters({
      cas_user: 'cas_user',
      team: 'team',
      currentTeamId: 'currentTeamId',
      user_info: 'user_info',
      isPhone: 'isPhone',
      showDepartment: 'showDepartment'
    }),
    isLeader() {
      return this.user_info.user_id == this.form.leader_id
    },
    isViceLeader() {
      return this.user_info.user_id == this.form.leader_id
    },
    canEdit() {
      return this.form.status == 0 || (this.form.status == 2 && this.isLeader)
    },
    canSubmit() {
      return this.form.status == 0 || (this.form.status == 2 && this.isLeader)
    },
    canWithDraw() {
      return this.form.status == 1 && this.isLeader
    },
    canSetout() {
      return this.form.status == 3 && this.isLeader
    },
    canReturn() {
      return this.form.status == 4 && this.isLeader
    },
    noExit() {
      return this.isLeader || this.isViceLeader
    },
    canDismiss() {
      return this.isLeader
    }
  },
  mounted() {
    // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log("滚动距离" + scrollTop);
    // if(scrollTop > 400) {
    //   document.getElementById("container").scrollIntoView({block:"start",behavior:"smooth"});
    // }
    document.getElementById('container').scrollIntoView({ block: 'start', behavior: 'smooth' })
  },
  methods: {
    getList: getAllTeamInfo,
    ...mapMutations({
      setTeam: 'setTeam',
      saveCurrentTeamId: 'saveCurrentTeamId',
      setUncreated: 'setUncreated',
      setSecondLoad: 'setSecondLoad',
      setShowDepartment: 'setShowDepartment'
    }),
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
    checkOneTeam(data) {
      this.saveCurrentTeamId(data)
      this.teaminf_loading = true
      setTimeout(() => {
        this.getTeamInf(), (this.isGetTeamId = true)
        this.getTeammateInfo()
        this.dialogVisible = true
      }, 100)
      setTimeout(() => {
        this.teaminf_loading = false
      }, 600)
    },
    openDialog(row) {
      this.dialogRow = row
      this.button_loading = true
      setTimeout(() => {
        this.button_loading = false
        this.rollDown()
      }, 1000)
    },
    rollDown() {
      document.getElementById('TeamInfoDisplay').scrollIntoView({ block: 'end', behavior: 'smooth' })
    },
    toJoinTeams() {
      this.setUncreated(true)
      this.$router.push('/practice')
      this.setSecondLoad(0)
    },
    // 请求接口获取队伍信息
    getTeamInf() {
      axios
        .get('/api/team/' + this.currentTeamId)
        .then(response => {
          const data = response.data.data
          this.setTeam(data)
          this.dialogRow = data
          this.form = data
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: err.err_msg
          })
        })
    },
    // 修改队伍信息
    EditTeamInfo() {
      this.setUncreated(false)
      document.getElementById('container').scrollIntoView({ block: 'end', behavior: 'smooth' })
      this.$router.push('/practice/getinfo')
    },
    // 打开修改老师信息窗口
    openChangeTeacher(data) {
      this.changeTeacher = true
      this.editTeacherName = data
    },
    // 修改指导老师
    changeTeacherInfo() {
      showAsynConfirm(
        `确认变更指导老师为${this.editTeacherName}老师？`,
        '已取消变更指导老师',
        done => {
          this._changeTeacherInfo(done)
        }
      )
    },
    async _changeTeacherInfo(done) {
      this.changePages(1)
      try {
        const data = await changeTeacherName(this.currentTeamId, this.editTeacherName)
        this.checkOneTeam(this.currentTeamId)
        this.$message({
          type: 'success',
          message: '指导老师信息修改成功！'
        })
        done()
      } catch (message) {
        this.$message.warning(message)
      }
    },
    Download() {
      openDownloadDialog('/api/outExcel/' + this.currentTeamId.toString())
      this.$message('下载已经开始，若长时间没有反应请重试或尝试切换浏览器')
    },
    beforeSubmit() {
      const project = this.team
      const backgroundLen = project.event_background.length
      const aimLen = project.event_aim.length
      const contentLen = project.event_content.length
      const totalLen = backgroundLen + aimLen + contentLen
      function tryAddTip(tips, name, len) {
        if (len < 50 || len > 100) {
          const tip = `${name}共${len}字，${len < 50 ? '太短' : '太长'}；`
          tips.push(tip)
        }
      }
      const tips = []
      tryAddTip(tips, '实践背景', backgroundLen)
      tryAddTip(tips, '实践目的', aimLen)
      tryAddTip(tips, '活动内容', contentLen)
      if (totalLen < 150 || totalLen > 300) {
        const tip = `总长度共${totalLen}字，${
          totalLen < 150 ? '太短' : '太长'
        }；`
        tips.push(tip)
      }
      if (tips.length > 0) {
        this.problems = tips
        this.problemVisible = true
      } else {
        this.Submit()
      }
    },
    Submit() {
      showAsynConfirm('确定要提交队伍审核？', '已取消提交', done => {
        this._Submit(done)
      })
    },
    _Submit(done) {
      axios
        .put('/api/submitTeam/' + this.currentTeamId)
        .then(response => {
          this.changePages(1)
          done()
          if (response.data.success == 1) {
            this.$message({
              type: 'success',
              message: '你已成功提交审核！'
            })
            this.checkOneTeam(this.currentTeamId)
            this.button_loading = true
            this.problemVisible = false
            setTimeout(() => {
              this.button_loading = false
            }, 500)
          } else {
            this.$message({
              type: 'warning',
              message: '提交审核失败！'
            })
          }
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: err.err_msg
          })
        })
    },
    withDraw() {
      showAsynConfirm('确定要撤回队伍的审核？', '已取消撤回', done => {
        this._withDraw(done)
      })
    },
    async _withDraw(done) {
      try {
        const data = await withDraw(this.currentTeamId)
        this.$message({
          type: 'success',
          message: '已撤回！'
        })
        this.checkOneTeam(this.currentTeamId)
        this.button_loading = true
        setTimeout(() => {
          this.button_loading = false
        }, 500)
      } catch (message) {
        this.$message({
          type: 'error',
          message: '撤回失败，' + message
        })
      }
      done()
      this.changePages(1)
    },
    setOut() {
      showAsynConfirm(
        '确定要出发？出发后如果返回，项目将会被提交。',
        '已取消出发',
        done => {
          this._setOut(done)
        }
      )
    },
    _setOut(done) {
      done()
      axios
        .put('/api/outTeam/' + this.currentTeamId)
        .then(response => {
          console.log(response)
          this.changePages(1)
          this.$message({
            type: 'success',
            message: '你的队伍已经出发！'
          })
          this.checkOneTeam(this.currentTeamId)
          this.button_loading = true
          setTimeout(() => {
            this.button_loading = false
          }, 500)
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: err.err_msg
          })
        })
    },
    Return() {
      showAsynConfirm(
        '确定要返回？一旦返回，项目将会被提交并且等待被测验。',
        '已取消返回',
        done => {
          this._Return(done)
        }
      )
    },
    _Return(done) {
      done()
      axios
        .put('/api/returnTeam/' + this.currentTeamId)
        .then(response => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '你的队伍已经成功返回！'
          })
          this.checkOneTeam(this.currentTeamId)
          this.changePages(1)
          this.button_loading = true
          setTimeout(() => {
            this.button_loading = false
          }, 500)
        })
        .catch(err => {
          this.$message({
            type: 'warning',
            message: err.err_msg
          })
        })
    },
    Quit() {
      showAsynConfirm('确定要退出队伍？', '已取消', done => {
        this._Quit(done)
      })
    },
    async _Quit(done) {
      try {
        const data = await deleteTeamInfo(this.currentTeamId)
        this.$message({
          type: 'success',
          message: '已退出队伍！'
        })
        this.changePages(1)
        this.$router.push('/practice/teaminf')
      } catch (message) {
        this.$message({
          type: 'error',
          message: '退出失败，' + message
        })
      }
      done()
    },
    Dismiss() {
      showAsynConfirm(
        '确定要解散队伍？如果解散，后果自负！！！',
        '已取消',
        done => {
          this._Dismiss(done)
        }
      )
    },
    async _Dismiss(done) {
      try {
        const data = await dismissTeam(this.currentTeamId)
        this.$message({
          type: 'success',
          message: '已解散队伍，请确保队员周知！'
        })
        done()
        this.changePages(1)
        this.$router.push('/practice')
      } catch (message) {
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
p {
  height: 20px;
}

.Teams {
  margin-top: 40px;
}

.teaminf {
  margin-top: 40px;
}

.title-h2 {
  margin-bottom: 10px;
}

.el-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 50px;
  margin-bottom: 20px;
}

#el-col-1 {
  margin-right: 60%;
}

#el-col-2 {
  margin-right: 40%;
}

#el-col-3 {
  margin-right: 23%;
}

#el-col-4 {
  margin-right: 20%;
}

.infor-display {
  display: flex;
  flex-direction: column;
}

.row {
  height: 50px;
}

.tianchong {
  height: 50px;
}

.change-teacher-input {
  margin: 0em 0;
}

.button-list {
  display: flex;
  flex-direction: column;
}

.actions {
  display: flex;
  flex-direction: column;
  .action1,
  .action2,
  .action3 {
    display: flex;
    flex-direction: row;
    .row {
      width: 200px;
      margin-right: 20px;
    }
  }
}
.problem {
  color: red;
  font-weight: bold;
}

@media screen and (max-width: 940px) {
  .title-h2 {
    font-size: 14px;
  }
  .team-details-button {
    transform: scale(0.90,0.90)
  }
  .actions-button {
    width: 120px;
    font-size: 12px;
  }
  .actions-button0 {
    width: 150px;
    font-size: 10px;
  }
  .info {
    font-size: 14px;
  }
  .warnings {
    font-size: 14px;
  }
  .join {
    transform: scale(0.90,0.90);
    margin: -40px 0 0 -20px;;
  }
}

@media screen and (max-width: 540px) {
  .title-h2 {
    font-size: 12px;
  }
  .team-details-button {
    transform: scale(0.80,0.80)
  }
  .actions-button {
    transform: scale(0.80,0.80);
    margin: -10px;
    font-size: 12px;
  }
  .actions-button0 {
    transform: scale(0.80,0.80);
    font-size: 10px;
    margin: -10px;
  }
  .info {
    font-size: 12px;
  }
  .warnings {
    font-size: 12px;
  }
  .join {
    transform: scale(0.80,0.80);
    margin: -40px 0 0 -20px;;
  }
}

@media screen and (max-width: 400px) {
  .actions{
    .action1,
    .action2,
    .action3 {
      display: flex;
      flex-direction: column;
    }
  }
  .team-details-button {
    transform: scale(0.70,0.70);
  }
  .actions-button {
    transform: scale(0.78,0.78);
    margin: -25px -15px;
    font-size: 12px;
  }
  .actions-button0 {
    transform: scale(0.78,0.78);
    font-size: 10px;
    margin: -25px -15px;
  }
  .action-button-row {
    margin: -5px 0;
  }
  .info {
    font-size: 12px;
  }
  .warnings {
    font-size: 12px;
  }
  .join {
    transform: scale(0.80,0.80);
    margin: -40px 0 0 -20px;;
  }
}
</style>

<style lang="scss">
.el-table__row
{
  .cell {
    .line {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

@media screen and (max-width: 940px) {
  .teamInf {
    .el-table .cell {
      font-size: 15px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 540px) {
  .teamInf {
    .el-table .cell {
      font-size: 13px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 410px) {
  .teamInf{
    .el-table th > .cell {
      font-size: 12px;
    }
    .el-table .cell {
      font-size: 12px;
    }
    .el-table th, .el-table td {
      padding: 4px 0;
      width: 60px;
    }
  }
}
</style>
