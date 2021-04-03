<template>
  <div class="selfinfo">
    <div id="main" class="main">
      <h1 class="top-words">
        修改个人信息
      </h1>
      <div class="header">
        <h4 class="top-words-2" style="height:50px;">
          西安交通大学社会实践项目个人基本信息表
        </h4>
      </div>
      <div v-loading="loading" class="container">
        <div v-if="isDisplay" class="not-display">
          <p>请先填写个人信息</p>
          <el-button type="primary" @click="toSelfInfo">
            填写个人信息
          </el-button>
        </div>
        <el-form
          v-if="showForm"
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="column-groups">
            <div class="column">
              <el-form-item label="姓名" prop="user_name">
                <el-input v-model="ruleForm.user_name"></el-input>
              </el-form-item>
              <el-form-item label="证件类型" prop="card_type">
                <el-select v-model="ruleForm.card_type" placeholder="请选择证件类型">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="其他" value="0"></el-option>
                </el-select>
              </el-form-item>
              <FitForm ref="form" :mirrors="mirrors" class="area" />
              <el-form-item label="教育程度" prop="edu_level">
                <el-select v-model="ruleForm.edu_level" placeholder="请选择教育程度">
                  <el-option label="本科生" value="0"></el-option>
                  <el-option label="研究生" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学号" prop="user_number">
                <el-input v-model="ruleForm.user_number"></el-input>
              </el-form-item>
            </div>
            <div class="column">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="请选择性别">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="card_id">
                <el-input v-model="ruleForm.card_id"></el-input>
              </el-form-item>
              <el-form-item label="年级" prop="grade">
                <el-select v-model="ruleForm.grade" placeholder="请选择年级">
                  <el-option label="本科一年级" value="本科一年级"></el-option>
                  <el-option label="本科二年级" value="本科二年级"></el-option>
                  <el-option label="本科三年级" value="本科三年级"></el-option>
                  <el-option label="本科四年级" value="本科四年级"></el-option>
                  <el-option label="研究生一年级" value="研究生一年级"></el-option>
                  <el-option label="研究生二年级" value="研究生二年级"></el-option>
                  <el-option label="研究生三年级" value="研究生三年级"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="书院" prop="college">
                <el-select v-model="ruleForm.college" placeholder="请选择书院">
                  <el-option label="南洋书院" value="1"></el-option>
                  <el-option label="崇实书院" value="7"></el-option>
                  <el-option label="文治书院" value="0"></el-option>
                  <el-option label="仲英书院" value="4"></el-option>
                  <el-option label="启德书院" value="5"></el-option>
                  <el-option label="宗濂书院" value="2"></el-option>
                  <el-option label="钱学森书院" value="8"></el-option>
                  <el-option label="彭康书院" value="3"></el-option>
                  <el-option label="励志书院" value="6"></el-option>
                  <el-option label="其他" value="9"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
              </el-form-item>
            </div>
            <div class="column">
              <el-form-item label="民族" prop="nation">
                <el-select v-model="ruleForm.nation" placeholder="请选择民族">
                  <el-option label="汉族" value="1"></el-option>
                  <el-option label="蒙古族" value="2"></el-option>
                  <el-option label="回族" value="3"></el-option>
                  <el-option label="藏族" value="4"></el-option>
                  <el-option label="维吾尔族" value="5"></el-option>
                  <el-option label="苗族" value="6"></el-option>
                  <el-option label="彝族" value="7"></el-option>
                  <el-option label="壮族" value="8"></el-option>
                  <el-option label="布依族" value="9"></el-option>
                  <el-option label="朝鲜族" value="10"></el-option>
                  <el-option label="满族" value="11"></el-option>
                  <el-option label="侗族" value="12"></el-option>
                  <el-option label="瑶族" value="13"></el-option>
                  <el-option label="白族" value="14"></el-option>
                  <el-option label="土家族" value="15"></el-option>
                  <el-option label="哈尼族" value="16"></el-option>
                  <el-option label="哈萨克族" value="17"></el-option>
                  <el-option label="傣族" value="18"></el-option>
                  <el-option label="黎族" value="19"></el-option>
                  <el-option label="傈僳族" value="20"></el-option>
                  <el-option label="佤族" value="21"></el-option>
                  <el-option label="畲族" value="22"></el-option>
                  <el-option label="高山族" value="23"></el-option>
                  <el-option label="拉祜族" value="24"></el-option>
                  <el-option label="水族" value="25"></el-option>
                  <el-option label="东乡族" value="26"></el-option>
                  <el-option label="纳西族" value="27"></el-option>
                  <el-option label="景颇族" value="28"></el-option>
                  <el-option label="柯尔克孜族" value="29"></el-option>
                  <el-option label="土族" value="30"></el-option>
                  <el-option label="达斡尔族" value="31"></el-option>
                  <el-option label="仫佬族" value="32"></el-option>
                  <el-option label="羌族" value="33"></el-option>
                  <el-option label="布朗族" value="34"></el-option>
                  <el-option label="撒拉族" value="35"></el-option>
                  <el-option label="毛南族" value="36"></el-option>
                  <el-option label="仡佬族" value="37"></el-option>
                  <el-option label="锡伯族" value="38"></el-option>
                  <el-option label="阿昌族" value="39"></el-option>
                  <el-option label="普米族" value="40"></el-option>
                  <el-option label="塔吉克族" value="41"></el-option>
                  <el-option label="怒族" value="42"></el-option>
                  <el-option label="乌孜别克族" value="43"></el-option>
                  <el-option label="俄罗斯族" value="44"></el-option>
                  <el-option label="鄂温克族" value="45"></el-option>
                  <el-option label="德昂族" value="46"></el-option>
                  <el-option label="保安族" value="47"></el-option>
                  <el-option label="裕固族" value="48"></el-option>
                  <el-option label="京族" value="49"></el-option>
                  <el-option label="塔塔尔族" value="50"></el-option>
                  <el-option label="独龙族" value="51"></el-option>
                  <el-option label="鄂伦春族" value="52"></el-option>
                  <el-option label="赫哲族" value="53"></el-option>
                  <el-option label="门巴族" value="54"></el-option>
                  <el-option label="珞巴族" value="55"></el-option>
                  <el-option label="基诺族" value="56"></el-option>
                  <el-option label="外国血统" value="57"></el-option>
                  <el-option label="其他" value="58"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="政治面貌" prop="outlook">
                <el-select v-model="ruleForm.outlook" placeholder="请选择政治面貌">
                  <el-option label="群众" value="群众"></el-option>
                  <el-option label="共青团员" value="共青团员"></el-option>
                  <el-option label="中共党员" value="中共党员"></el-option>
                  <el-option label="中共预备党员" value="中共预备党员"></el-option>
                  <el-option label="民盟盟员" value="民盟盟员"></el-option>
                  <el-option label="民革党员" value="民革党员"></el-option>
                  <el-option label="民建会员" value="民建会员"></el-option>
                  <el-option label="台盟盟员" value="台盟盟员"></el-option>
                  <el-option label="无党派人士" value="无党派人士"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学院" prop="institute">
                <el-select v-model="ruleForm.institute" placeholder="请选择学院">
                  <el-option
                    v-for="(item,index) in institutes"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级" prop="clazz">
                <el-input v-model="ruleForm.clazz"></el-input>
              </el-form-item>
              <el-form-item label="专业" prop="major">
                <el-input v-model="ruleForm.major"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">
              确认修改
            </el-button>
            <el-button @click="resetForm('ruleForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FitForm from '@/components/FitForm.vue'
import { putProfileInfo } from '@/api/profile'
import { showAsynConfirm } from '@/mixins/messageBox.js'
import { PROVINCES } from '@/mixins/consts.js'

const mirrors = [
  {
    type: 'cascader',
    label: '籍贯',
    prop: 'native_area',
    options: PROVINCES,
    props: {
      value: 'label',
      children: 'cities'
    }
  }
]

export default {
  components: {
    FitForm
  },
  data() {
    var checkNumberAndLetter = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        var reg = /^[A-Za-z0-9]{1,30}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确格式'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      loading: false,
      showForm: true,
      isDisplay: false,
      mirrors,
      PROVINCES,
      institutes: [
        {
          value: '1',
          label: '钱学森学院'
        },
        {
          value: '2',
          label: '材料学院'
        },
        {
          value: '3',
          label: '数统学院'
        },
        {
          value: '4',
          label: '电信学院'
        },
        {
          value: '5',
          label: '生命学院'
        },
        {
          value: '6',
          label: '能动学院'
        },
        {
          value: '7',
          label: '外语学院'
        },
        {
          value: '8',
          label: '理学院'
        },
        {
          value: '9',
          label: '经金学院'
        },
        {
          value: '10',
          label: '医学部'
        },
        {
          value: '11',
          label: '电气学院'
        },
        {
          value: '12',
          label: '人居学院'
        },
        {
          value: '13',
          label: '人文学院'
        },
        {
          value: '14',
          label: '化工学院'
        },
        {
          value: '15',
          label: '机械学院'
        },
        {
          value: '16',
          label: '软件学院'
        },
        {
          value: '17',
          label: '航天学院'
        },
        {
          value: '18',
          label: '公管学院'
        },
        {
          value: '19',
          label: '马克思学院'
        },
        {
          value: '20',
          label: '法学院'
        },
        {
          value: '21',
          label: '管理学院'
        },
        {
          value: '22',
          label: '金禾学院'
        },
        {
          value: '23',
          label: '体育中心'
        },
        {
          value: '24',
          label: '继续教育学院'
        },
        {
          value: '25',
          label: '网络教育学院'
        },
        {
          value: '26',
          label: '国际教育学院'
        },
        {
          value: '27',
          label: '前沿院'
        },
        {
          value: '28',
          label: '创新创业学院'
        },
        {
          value: '0',
          label: '其他'
        }
      ],
      NATION_LIST: [
        '',
        '汉族',
        '蒙古族',
        '回族',
        '藏族',
        '维吾尔族',
        '苗族',
        '彝族',
        '壮族',
        '布依族',
        '朝鲜族',
        '满族',
        '侗族',
        '瑶族',
        '白族',
        '土家族',
        '哈尼族',
        '哈萨克族',
        '傣族',
        '黎族',
        '傈僳族',
        '佤族',
        '畲族',
        '高山族',
        '拉祜族',
        '水族',
        '东乡族',
        '纳西族',
        '景颇族',
        '柯尔克孜族',
        '土族',
        '达斡尔族',
        '仫佬族',
        '羌族',
        '布朗族',
        '撒拉族',
        '毛南族',
        '仡佬族',
        '锡伯族',
        '阿昌族',
        '普米族',
        '塔吉克族',
        '怒族',
        '乌孜别克族',
        '俄罗斯族',
        '鄂温克族',
        '德昂族',
        '保安族',
        '裕固族',
        '京族',
        '塔塔尔族',
        '独龙族',
        '鄂伦春族',
        '赫哲族',
        '门巴族',
        '珞巴族',
        '基诺族',
        '外国血统',
        '其他'
      ],
      COLLEGE_LIST: [
        '文治书院',
        '南洋书院',
        '宗濂书院',
        '彭康书院',
        '仲英书院',
        '启德书院',
        '励志书院',
        '崇实书院',
        '钱学森书院',
        '其他'
      ],
      INSTITUTE_LIST: [
        '其他',
        '钱学森学院',
        '材料学院',
        '数统学院',
        '电信学院',
        '生命学院',
        '能动学院',
        '外语学院',
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
        '马克思学院',
        '法学院',
        '管理学院',
        '金禾学院',
        '体育中心',
        '新媒体学院',
        '继续教育学院',
        '网络教育学院',
        '国际教育学院',
        '前沿院',
        '创新创业学院'
      ],
      ruleForm: {
        user_name: '',
        gender: '',
        nation: '',
        card_type: '',
        card_id: '',
        outlook: '',
        native_area: [],
        grade: '',
        institute: '',
        edu_level: '',
        college: '',
        clazz: '',
        user_number: '',
        mobile: '',
        major: '',
        org: 0
      },
      rules: {
        user_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        gender: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        card_type: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        card_id: [
          { validator: checkNumberAndLetter, required: true, trigger: 'blur' }
        ],
        outlook: [
          { required: true, message: '请选择政治面貌', trigger: 'change' }
        ],
        native_area: [
          { required: true, message: '请选择籍贯省市', trigger: 'change' }
        ],
        grade: [{ required: true, message: '请选择年级', trigger: 'change' }],
        institute: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        edu_level: [
          { required: true, message: '请选择教育程度', trigger: 'change' }
        ],
        college: [{ required: true, message: '请选择书院', trigger: 'change' }],
        clazz: [{ required: true, message: '请输入班级', trigger: 'blur' }],
        user_number: [
          {
            validator: checkNumberAndLetter,
            required: true,
            message: '请输入正确学号',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        major: [{ required: true, message: '请输入专业', trigger: 'blur' }]
      },
      paramsForm: {
        nation: '',
        college: '',
        institute: ''
      }
    }
  },
  mounted() {
    this.loadPage()
    document.getElementById('main').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  methods: {
    loadPage() {
      this.loading = true
      axios
        .get('/api/user/profile')
        .then(response => {
          const valid = response.data
          if (valid.success == 1) {
            const data = response.data.data.profile
            this.ruleForm.major = data.major
            this.ruleForm.mobile = data.mobile
            this.ruleForm.user_number = data.user_number
            this.ruleForm.nation = this.NATION_LIST[data.nation]
            this.ruleForm.college = this.COLLEGE_LIST[data.college]
            this.ruleForm.edu_level = data.edu_level
            this.ruleForm.institute = this.INSTITUTE_LIST[data.institute]
            this.ruleForm.card_id = data.card_id
            this.ruleForm.outlook = data.outlook
            this.ruleForm.card_type = data.card_type
            this.ruleForm.grade = data.grade
            this.ruleForm.user_name = data.user_name
            this.ruleForm.gender = data.gender
            this.ruleForm.clazz = data.clazz
            this.ruleForm.native_area = data.native_area
            this.paramsForm.nation = data.nation
            this.paramsForm.college = data.college
            this.paramsForm.institute = data.institute
            this.loading = false
          }
          console.log(this.ruleForm.native_area)
          console.log(this.ruleForm.card_type)
          if (valid.success == 0) {
            this.$message({
              type: 'warning',
              message: valid.err_msg
            })
            this.showForm = false
            this.isDisplay = true
            this.loading = false
          }
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    parseForm() {
      // 直接复制的参数
      const form = this.$refs['form']
      const keys = [
        'major',
        'mobile',
        'user_name',
        'user_number',
        'card_id',
        'card_type',
        'grade',
        'outlook',
        'edu_level',
        'clazz',
        'gender',
        'native_area',
        'org'
      ]
      const params = {}
      const data = form.getData()
      for (const i in keys) {
        params[keys[i]] = this.ruleForm[keys[i]]
        params.native_area = data.native_area[0] + data.native_area[1]
      }
      // 需要特殊处理的参数
      if (isNaN(this.ruleForm.nation)) {
        // 判断是不是数字，不是则使用paramsForm.nation
        params.nation = this.paramsForm.nation
      } else {
        params.nation = this.ruleForm.nation
      }
      if (isNaN(this.ruleForm.college)) {
        // 判断是不是数字
        params.college = this.paramsForm.college
      } else {
        params.college = this.ruleForm.college
      }
      if (isNaN(this.ruleForm.institute)) {
        // 判断是不是数字
        params.institute = this.paramsForm.institute
      } else {
        params.institute = this.ruleForm.institute
      }
      return params
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          showAsynConfirm('您确定要立即提交修改', '已取消提交', done => {
            this._submitForm(done)
          })
        } else {
          this.$message({
            type: 'error',
            message: '错误，请检查。'
          })
          return false
        }
      })
    },
    async _submitForm(done) {
      try {
        const data = await putProfileInfo(this.parseForm())
        this.$message({
          type: 'success',
          message: '修改成功！'
        })
        done()
        this.loadPage()
      } catch (message) {
        done()
        this.$message({
          type: 'error',
          message: '操作失败！'
        })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    toSelfInfo() {
      this.$router.push('/practice/getselfinfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-words {
  font-size: 25px;
  align-items: center;
  margin-right: 20px;
}
.column-groups {
  display: flex;
  flex-direction: row;
}
.column {
  margin-right: 1.2vw;
}

@media screen and (max-width: 940px) {
  .column-groups {
    flex-direction: column;
  }
  .top-words,
  .top-words-2 {
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {
  .top-words,
  .top-words-2 {
    font-size: 14px;
  }
}

@media screen and (max-width: 410px) {
  .top-words,
  .top-words-2 {
    font-size:12px;
  }
}
</style>

<style lang="scss">
.el-form-item,
.el-input__inner {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-form-item__label {
  text-align: left;
}
.el-form-item__content {
  margin-left: -5px;
}
.el-cascader {
  margin-left: 27px;
}

@media screen and (max-width: 740px) {
  .el-form-item {
    transform: scale(0.90,0.90);
    margin-left: -15px;
  }
  .el-select-dropdown__item,
  .el-cascader-menu__item {
    font-size: 16px;
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
