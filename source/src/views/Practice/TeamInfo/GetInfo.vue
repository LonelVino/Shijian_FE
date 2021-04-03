<template>
  <div id="getInfo" class="getInfo">
    <side-line></side-line>
    <div id="container" class="container">
      <div class="headIntro">
        <h5 style="height:100px;">
          填写队伍立项信息
        </h5>
      </div>
      <div class="forms">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <div class="line1">
            <el-form-item label="团队名称" prop="team_name" class="line-item">
              <el-input v-model="ruleForm.team_name"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" prop="project_name" class="project_name line-item">
              <el-input v-model="ruleForm.project_name"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="实践地点" prop="place" class="line-item">
            <el-input v-model="ruleForm.place" placeholder="请输入实践地点"></el-input>
          </el-form-item>
          <div class="row">
            <el-form-item label="实践类型" prop="project_type" class="project_type line-item">
              <el-select
                v-model="ruleForm.project_type"
                placeholder="请选择实践类型"
                class="project-type-select"
              >
                <el-option
                  v-for="(item,index) in practice_types"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="实践主题" prop="project_theme" class="project_form line-item">
              <el-select
                v-model="ruleForm.project_theme"
                placeholder="请选择实践主题"
                class="project-type-select"
              >
                <el-option
                  v-for="(item,index) in practice_themes"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="实践形式" prop="project_form" class="project_type line-item">
              <el-select
                v-model="ruleForm.project_form"
                placeholder="请选择实践形式"
                class="project-type-select"
              >
                <el-option
                  v-for="(item,index) in practice_forms"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="date">
            <el-form-item label="活动时间" class="date1" prop="plan_region_time">
              <el-date-picker
                v-model="ruleForm.plan_region_time"
                class="date-picker"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item label="实践目的" prop="event_aim" class="event_aim line-item">
            <el-input
              v-model="ruleForm.event_aim"
              class="event_aim_editor"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请填写实践目的"
            ></el-input>
          </el-form-item>
          <el-form-item label="实践背景" prop="event_background" class="event_background line-item">
            <el-input
              v-model="ruleForm.event_background"
              class="event_background_editor"
              type="textarea"
              placeholder="请填写实践背景"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动内容" prop="event_content" class="event_content line-item">
            <el-input
              v-model="ruleForm.event_content"
              class="event_content_editor"
              type="textarea"
              placeholder="请填写活动内容"
            ></el-input>
          </el-form-item>
          <div class="fees">
            <el-form-item label="交通费" prop="fee_transport">
              <el-input v-model="ruleForm.fee_transport"></el-input>
            </el-form-item>
            <el-form-item class="fee-print" label="印刷费" prop="fee_print">
              <el-input v-model="ruleForm.fee_print"></el-input>
            </el-form-item>
            <el-form-item class="fee-other" label="其他费用" prop="fee_other">
              <el-input v-model="ruleForm.fee_other"></el-input>
            </el-form-item>
          </div>
          <div class="IDs">
            <el-form-item label="副队长NetId" prop="vice_leader_net_id" class="vice_leader_netid">
              <el-input
                v-model="ruleForm.vice_leader_net_id"
                class="vice_leader_netid_input"
                placeholder="请输入副队长NetID"
                @blur="searchViceLeader()"
              ></el-input>
            </el-form-item>
            <el-form-item label="指导老师姓名" prop="teacher_name" class="teacher_name">
              <el-input
                v-model="ruleForm.teacher_name"
                prop="teacher_name"
                class="teacher_name_input"
                placeholder="请输入指导老师姓名"
              ></el-input>
            </el-form-item>
          </div>
          <div class="names">
            <el-form-item label="副队长姓名" prop="vice_leader_name" class="vice_leader_name">
              <el-input
                v-model="ruleForm.vice_leader_name"
                :disabled="true"
                class="vice_leader_name_input"
              ></el-input>
            </el-form-item>
          </div>
          <div class="workspace">
            <el-form-item label="挂靠单位" prop="belong" class="belong">
              <el-select v-model="ruleForm.belong" placeholder="请选择挂靠单位" class="belong-select">
                <el-option label="校团委" value="1"></el-option>
                <el-option label="大学生党委" value="2"></el-option>
                <el-option label="文治书院" value="3"></el-option>
                <el-option label="南洋书院" value="4"></el-option>
                <el-option label="宗濂书院" value="5"></el-option>
                <el-option label="彭康书院" value="6"></el-option>
                <el-option label="仲英书院" value="7"></el-option>
                <el-option label="启德书院" value="8"></el-option>
                <el-option label="励志书院" value="9"></el-option>
                <el-option label="崇实书院" value="10"></el-option>
                <el-option label="钱学森书院" value="11"></el-option>
                <el-option label="材料学院" value="12"></el-option>
                <el-option label="数学学院" value="13"></el-option>
                <el-option label="电信学院" value="14"></el-option>
                <el-option label="生命学院" value="15"></el-option>
                <el-option label="能动学院" value="16"></el-option>
                <el-option label="外国语学院" value="17"></el-option>
                <el-option label="理学院" value="18"></el-option>
                <el-option label="经金学院" value="19"></el-option>
                <el-option label="医学部" value="20"></el-option>
                <el-option label="电气学院" value="21"></el-option>
                <el-option label="人居学院" value="22"></el-option>
                <el-option label="人文学院" value="23"></el-option>
                <el-option label="化工学院" value="24"></el-option>
                <el-option label="机械学院" value="25"></el-option>
                <el-option label="软件学院" value="26"></el-option>
                <el-option label="航天学院" value="27"></el-option>
                <el-option label="公管学院" value="28"></el-option>
                <el-option label="马克思主义学院" value="29"></el-option>
                <el-option label="法学院" value="30"></el-option>
                <el-option label="新媒体学院" value="31"></el-option>
                <el-option label="金禾经济中心" value="32"></el-option>
                <el-option label="管理学院" value="33"></el-option>
                <el-option label="创新创业学院" value="34"></el-option>
                <el-option label="前沿院" value="35"></el-option>
                <el-option label="继续教育学院" value="36"></el-option>
                <el-option label="网络教育学院" value="37"></el-option>
                <el-option label="国际教育学院" value="38"></el-option>
                <el-option label="体育中心" value="39"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="ruleForm.belong == 1 || ruleForm.belong == 2 || showDepartment" label="职能单位" prop="departemnt" class="teacher_name">
              <el-input
                v-model="ruleForm.department"
                prop="department"
                class="teacher_name_input"
                placeholder="请输入职能单位"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="老师是否随队" prop="teacher_follow" class="teacher_follow line-item">
            <el-switch
              v-model="ruleForm.teacher_follow"
              class="teacher_follow_switch"
              active-text="是"
              inactive-text="否"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </el-form-item>
          <div class="button-list">
            <el-button v-if="uncreated" class="submitButton" type="primary" @click="onSubmit">
              立即创建
            </el-button>
            <el-button v-if="uncreated" class="resetButton" @click="resetForm('ruleForm')">
              重置
            </el-button>
            <el-button v-if="!uncreated" class="editButton" type="primary" @click="submitEditForm()">
              保存队伍修改信息
            </el-button>
            <el-button class="backButton" @click="editToNext()">
              返回
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import SideLine from '@/views/Practice/SideLine'
import { mapGetters, mapMutations } from 'vuex'
import { showAsynConfirm } from '@/mixins/messageBox'
import { postTeamInfo, EditTeam } from '@/api/team'
import { getByNetId } from '@/api/common'
import { getUserInfo } from '@/api/profile'

export default {
  components: {
    SideLine
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      var pattern = /^\d+.?\d{0,2}$/
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (Number(value) >= 0) {
          callback()
        } else {
          callback(new Error('请正确输入'))
        }
      }, 500)
    }
    // var onlyCheckNumber = (rule, value, callback) => {
    //   if (Number(value) > 0) {
    //     callback()
    //   } else {
    //     callback(new Error('请正确输入'))
    //   }
    // }
    var CheckActive = (rule, value, callback) => {
      if (value == 0 || value == 1) {
        callback()
      } else {
        callback(new Error('请正确填写'))
      }
    }
    var checkViceName = (rule, value, callback) => {
      if (this.ruleForm.vice_leader_name == null) {
        return callback(new Error('未查询到副队长'))
      } else {
        callback()
      }
    }
    var checkTime = (rule, value, callback) => {
      if (isNaN(this._plan_begin_time) || isNaN(this._plan_end_time)) {
        return callback(new Error('不能为空'))
      } else {
        callback()
      }
    }

    return {
      teams: [],
      practice_types: [
        {
          value: '1',
          label: '自主立项'
        },
        {
          value: '2',
          label: '专项实践'
        }
      ],
      practice_themes: [
        {
          value: '1',
          label: '脱贫攻坚'
        },
        {
          value: '2',
          label: '西迁精神'
        },
        {
          value: '3',
          label: '政府见习'
        },
        {
          value: '4',
          label: '一带一路'
        },
        {
          value: '5',
          label: '红色寻访'
        },
        {
          value: '6',
          label: '志愿服务'
        },
        {
          value: '0',
          label: '特色实践(其他)'
        }
      ],
      practice_forms: [
        {
          value: '1',
          label: '社会调查'
        },
        {
          value: '2',
          label: '理论宣讲'
        },
        {
          value: '3',
          label: '生产实习'
        },
        {
          value: '4',
          label: '科技创新'
        },
        {
          value: '5',
          label: '返乡实践'
        },
        {
          value: '6',
          label: '网络线上'
        },
        {
          value: '0',
          label: '其他'
        }
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
      ],
      ruleForm: {
        team_name: '',
        project_name: '',
        place: '',
        project_type: '',
        project_theme: '',
        project_form: '',
        plan_region_time: '',
        delivery: false,
        event_content: '',
        event_background: '',
        event_aim: '',
        fee_transport: '',
        fee_print: '',
        fee_other: '',
        // 副队长
        vice_leader_net_id: '',
        vice_leader_id: '',
        vice_leader_name: '',
        // 指导老师
        teacher_name: '',
        belong: '',
        department: '',
        teacher_follow: 0
      },
      rules: {
        team_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        place: [{ required: true, message: '请选择实践地点', trigger: 'blur' }],
        plan_region_time: [
          { validator: checkTime, required: true, trigger: 'blur' }
        ],
        project_type: [
          { required: true, message: '请选择实践类型', trigger: 'change' }
        ],
        project_theme: [
          { required: true, message: '请选择实践主题', trigger: 'change' }
        ],
        project_form: [
          { required: true, message: '请选择实践形式', trigger: 'change' }
        ],
        event_background: [
          { required: true, message: '请填写实践背景', trigger: 'blur' }
        ],
        event_aim: [
          { required: true, message: '请填写实践目的', trigger: 'blur' }
        ],
        event_content: [
          { required: true, message: '请填写活动内容', trigger: 'blur' }
        ],
        fee_transport: [
          { validator: checkNumber, required: true, message: '请填写交通费（可以为0）', trigger: 'blur' }
        ],
        fee_print: [
          { validator: checkNumber, required: true, message: '请填写打印费（可以为0）', trigger: 'blur' }
        ],
        fee_other: [
          { validator: checkNumber, required: true, message: '请填写其他费用（可以为0）', trigger: 'blur' }
        ],
        vice_leader_net_id: [
          { required: true, message: '请填写副队长NetID', trigger: 'blur' }
        ],
        vice_leader_name: [
          { validator: checkViceName, required: true, trigger: 'blur' }
        ],
        teacher_name: [
          { required: true, message: '请填写指导老师姓名', trigger: 'blur' }
        ],
        belong: [
          { required: true, message: '请选择挂靠单位', trigger: 'change' }
        ],
        department: [
          { required: false, message: '请选择职能单位', trigger: 'blur' }
        ],
        teacher_follow: [
          { validator: CheckActive, required: true, trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      uncreated: 'uncreated',
      active: 'active',
      team: 'team',
      isEdit: 'isEdit',
      currentTeamId: 'currentTeamId',
      showDepartment: 'showDepartment'
    }),
    ...mapMutations({
      setUncreated: 'setUncreated'
    }),
    _plan_begin_time() {
      return parseInt(this.ruleForm.plan_region_time[0] / 1000)
    },
    _plan_end_time() {
      return parseInt(this.ruleForm.plan_region_time[1] / 1000)
    },
    has_created() {
      return false
    }
  },
  mounted() {
    document.getElementById('container').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  created() {
    this.getEditForm()
    const keys = [
      'team_name',
      'project_name',
      'event_background',
      'event_aim',
      'fee_transport',
      'fee_print',
      'place',
      'plan_region_time',
      'delivery',
      'event_content',
      'fee_other',
      'vice_leader_net_id',
      'vice_leader_id',
      'teacher_name',
      'vice_leader_name',
      'belong',
      'teacher_follow',
      'department'
    ]
    for (const i in keys) {
      if (!(typeof (localStorage[keys[i]]) === 'undefined') && this.uncreated == true) { this.ruleForm[keys[i]] = localStorage.getItem(keys[i]) }
    }
  },
  methods: {
    ...mapMutations({
    }),
    // 验证表单
    onSubmit() {
      console.log('onSubmit():（验证表单的函数）')
      console.log(this.ruleForm)
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.submitForm()
        } else {
          this.$message({
            type: 'warning',
            message: '检查是否有填写遗漏项或者是不符合规则项。'
          })
          return false
        }
      })
    },
    // 创建队伍
    submitForm() {
      showAsynConfirm('您确定要建立队伍？', '已取消建立', done => {
        this._submitForm(done)
      })
    },
    // 创建队伍
    async _submitForm(done) {
      try {
        done()
        const params = this.parseForm()
        console.log('submitForm():'); console.log(params); console.log(this.ruleForm)
        const data = await postTeamInfo(params)
        this.$message({
          type: 'success',
          message: '创建成功'
        })
        this.toNext()
      } catch (err_msg) {
        done()
        this.$message({
          type: 'warning',
          message: err_msg
        })
      }
    },
    //
    parseForm() {
      // 直接复制的参数
      const keys = [
        'team_name',
        'project_name',
        'event_background',
        'event_aim',
        'fee_transport',
        'fee_print',
        'place',
        'project_type',
        'project_theme',
        'project_form',
        'plan_region_time',
        'event_content',
        'fee_other',
        'vice_leader_id',
        'teacher_name',
        'belong',
        'teacher_follow',
        'department'
      ]
      const params = {}
      console.log(this.ruleForm.teacher_follow)
      for (const i in keys) {
        params[keys[i]] = this.ruleForm[keys[i]]
      }
      // 其他需要特别处理的参数
      const begin_time = parseInt(this.ruleForm.plan_region_time[0] / 1000)
      const end_time = parseInt(this.ruleForm.plan_region_time[1] / 1000)
      params.plan_begin_time = this.timestampToTime(begin_time)
      params.plan_end_time = this.timestampToTime(end_time)
      if (isNaN(params.belong)) {
        params.belong = this.team.belong
      }
      if (isNaN(params.project_type)) {
        params.project_type = this.team.project_type
      }
      if (isNaN(params.project_theme)) {
        params.project_theme = this.team.project_theme
      }
      if (isNaN(params.project_form)) {
        params.project_form = this.team.project_form
      }
      return params
    },
    parseEditForm() {
      // 直接复制的参数
      const keys = [
        'team_name',
        'project_name',
        'project_type',
        'project_theme',
        'project_form',
        'place',
        'event_background',
        'event_aim',
        'event_content',
        'fee_transport',
        'fee_print',
        'fee_other',
        'belong',
        'teacher_follow',
        'vice_leader_id',
        'vice_leader_name',
        'teacher_name',
        'practice_type',
        'department'
      ]
      console.log(this.team)
      console.log(this.ruleForm)
      for (const i in keys) {
        this.ruleForm[keys[i]] = this.team[keys[i]]
      }
      // 需要特殊处理的参数
      // 标准时间转化为时间戳形式，还需要转化为plan_region_time的形式，有点麻烦
      const beginTime = Math.floor(
        new Date(this.team.plan_begin_time).getTime() / 1000
      )
      const endTime = Math.floor(
        new Date(this.team.plan_end_time).getTime() / 1000
      )
      // 副队长netId
      this.ruleForm.vice_leader_net_id = this.team.vice_net_id
      // 挂靠单位
      this.ruleForm.belong = this.BELONGTO_LIST[this.team.belong]
      // 实践类型
      this.ruleForm.project_type = this.PRACTICE_TYPE_LIST[this.team.project_type]
      // 实践类型
      this.ruleForm.project_theme = this.PRACTICE_THEME_LIST[this.team.project_theme]
      // 实践形式
      this.ruleForm.project_form = this.PRACTICE_FORM_LIST[this.team.project_form]
    },
    getEditForm() {
      if (!this.uncreated) {
        this.parseEditForm()
      }
    },
    submitEditForm() {
      showAsynConfirm('您确定要保存本次修改？', '已取消修改', done => {
        this._submitEditForm(done)
      })
    },
    async _submitEditForm(done) {
      try {
        const data = await EditTeam(this.currentTeamId, this.parseForm())
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        done()
        this.toNext()
      } catch (message) {
        this.$message({
          type: 'warning',
          message: '修改失败，请检查是否有填写错误或者未填写项！'
        })
      }
    },
    // 根据副队长的net-id查找副队长的姓名
    async searchViceLeader() {
      try {
        this.$message({
          type: 'primary',
          message: '正在查询中.....'
        })
        const data = await getByNetId(this.ruleForm.vice_leader_net_id)
        const leader_data = await getUserInfo()
        const leader_id = leader_data.user_id
        if (data.user_id != leader_id) {
          this.ruleForm.vice_leader_name = data.user_name
          this.ruleForm.vice_leader_id = data.user_id
          this.$message({
            type: 'success',
            message: '查询成功'
          })
        }
        if (data.user_id == leader_id) {
          this.ruleForm.vice_leader_name = '',
          this.$message({
            type: 'warning',
            message: '队长副队长不能为同一个人'
          })
        }
      } catch (message) {
        this.$message({
          type: 'warning',
          message: message
        })
      }
    },
    // 把时间戳转化为标准时间格式
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D = this.change(date.getDate()) + ' '
      const h = this.change(date.getHours()) + ':'
      const m = this.change(date.getMinutes()) + ':'
      const s = this.change(date.getSeconds())
      return Y + M + D + h + m + s
    },
    change(t) {
      if (t < 10) {
        return '0' + t
      } else {
        return t
      }
    },
    toNext() {
      this.$router.push('/practice/teaminf')
      this.clearStorage()
    },
    editToNext() {
      this.$router.push('/practice/teaminf')
      this.clearStorage()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.clearStorage()
      document.getElementById('container').scrollIntoView({ block: 'end', behavior: 'smooth' })
    },
    clearStorage() {
      const keys = [
        'team_name',
        'project_name',
        'event_background',
        'event_aim',
        'fee_transport',
        'fee_print',
        'place',
        'project_type',
        'project_theme',
        'project_form',
        'plan_region_time',
        'delivery',
        'event_content',
        'fee_other',
        'vice_leader_net_id',
        'vice_leader_id',
        'teacher_name',
        'vice_leader_name',
        'belong',
        'teacher_follow',
        'department'
      ]
      for (const i in keys) {
        localStorage.setItem(keys[i], '')
        this.ruleForm[keys[i]] = ''
      }
    }
  },
  beforeDestroy: function() {
    const keys = [
      'team_name',
      'project_name',
      'event_background',
      'event_aim',
      'fee_transport',
      'fee_print',
      'place',
      'project_type',
      'project_theme',
      'project_form',
      'plan_region_time',
      'delivery',
      'event_content',
      'fee_other',
      'vice_leader_net_id',
      'teacher_name',
      'vice_leader_id',
      'vice_leader_name',
      'belong',
      'teacher_follow',
      'department'
    ]
    if (this.has_created == false) {
      if (this.uncreated == false) {
        localStorage.setItem('uncreated', this.uncreated)
      }
      for (const i in keys) {
        localStorage.setItem(keys[i], this.ruleForm[keys[i]])
      }
    }
    if (this.uncreated == false) {
      this.clearStorage()
    }
  }
}
</script>

<style lang="scss" scoped>
.headIntro {
  height: 50px;
  margin-top: 0.4vw;
  margin-bottom: 1vw;
  font-size: 30px;
}

.headIntro h5 {
  height: 100px;
}

.row {
  display: flex;
  flex-direction: row;
}

.demo-ruleForm {
  display: flex;
  flex-direction: column;
  margin-left: 0px;
}

.belong {
  display: flex;
  justify-content: flex-start;
}

.teacher_follow {
  display: flex;
  justify-content: flex-start;
}

.is_declared {
  display: flex;
  justify-content: flex-start;
}

.date1 {
  display: flex;
  justify-content: flex-start;
}

.project_name {
  margin-left: 20px;
}

.project_type {
  display: flex;
  justify-content: flex-start;
}

.project_form {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}

.project-type-select,
.date-picker,
.belong-select {
  margin-left: -120px;
}

.line1 {
  display: flex;
}

.fees {
  display: flex;
}

.IDs {
  display: flex;
  justify-content: space-between;
}

.teacher_name_input,
.vice_leader_netid_input,
.vice_leader_name_input,
.teacher_name_input {
  width: 250px;
}

.names {
  display: flex;
  justify-content: space-between;
}

.teacher_follow_switch {
  margin-left: -110px;
}

.is_declared_switch {
  margin-left: -110px;
}

@media screen and (max-width: 1100px) {
  .line1,
  .fees,
  .IDs,
  .row {
    display: flex;
    flex-direction: column;
  }
  .project_name {
    margin-left: -15px;
  }
  .project_form {
    margin-left: -30px;
  }
}

@media screen and (max-width: 600px) {
  .button-list {
    display: flex;
    flex-direction: column;
  }
}

@media screen and (max-width: 540px) {
  .line-item,
  .belong {
  }
  .container {
    margin-top: 3.5vw;
    .project_name {
      margin-left: -30px;
    }
  }
  .fees {
  }
  .date-picker {
    width: 240px;
    margin-left: -80px;
  }
  .date1 {
    height: 80px;
    margin-left: -40px;
  }
  .date-picker {
    margin-left: -85px;
  }
  #date_end {
    margin-bottom: 35px;
  }
  .project-type-select {
    width: 150px;
  }

  .IDs,
  .names,
  .fees,
  .vice_leader_netid,
  .teacher_name,
  .vice_leader_name,
  .date1,
  .line1 {
    flex-direction: column;
    text-align: left;
  }

  .vice_leader_netid,
  .vice-leader_name {
    display: flex;
  }

  .teacher_name {
    display: flex;
  }

  .vice_leader_netid_input {
    margin-left: -100px;
    width: 50vw;
  }

  .teacher_name_input {
    margin-left: -100px;
    width: 50vw;
  }

  .vice_leader_name_input,
  .teacher_name_input {
    width: 180px;
  }

  .belong-select {
    width: 150px;
  }

  .declare_type {
    display: flex;
    flex-direction: column;
  }

  .declare_type_select {
    margin-left: -100px;
  }

  .editButton {
    width: 180px;
    font-size: 12px;
    margin-left:15px;
  }

  .backButton {
    font-size: 12px;
  }
}

</style>

<style lang="scss">
.el-form-item__label {
  text-align: left;
}
.el-form-item__content {
  margin-left: -10px;
}
.event_aim_editor,
.event_background_editor,
.event_content_editor {
  textarea {
    resize: none;
  }
}
.declare_type {
  .el-form-item__label
  {
    margin-left: 10px;
  }
}

.fee-print,
.fee-other
{
  .el-form-item__label{
    margin: 0 -50px 0 50px;;
  }
}
@media screen and (max-width: 1100px) {
  .el-form-item {
    transform: scale(0.90,0.90);
    margin-left: -15px;
  }
  .el-select-dropdown__item,
  .el-cascader-menu__item {
    font-size: 16px;
  }
  .fee-print,
  .fee-other
  {
    .el-form-item__label{
      margin: 0;
    }
  }
}

@media screen and (max-width: 780px) {
  .el-form-item {
    transform: scale(0.87,0.87);
    margin-left: -15px;
  }
  .date1 {
    flex-direction: column;
    .el-form-item__content {
      text-align: right;
    }
  }
}

@media screen and (max-width: 540px) {
  .el-form-item {
    transform: scale(0.83,0.83);
    margin-left: -20px;
    margin-top: -5px;
  }
  .el-select-dropdown__item,
  .el-cascader-menu__item {
    font-size: 13px;
  }
}

@media screen and (max-width: 410px) {
  .el-form-item {
    transform: scale(0.75,0.75);
    margin-left: -30px;
    margin-top: -10px;
  }
  .el-select-dropdown__item,
  .el-cascader-menu__item {
    font-size: 12px;
  }
  .el-cascader {
    margin-left: 45px;
  }
}
</style>
