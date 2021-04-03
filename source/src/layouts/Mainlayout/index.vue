<template>
  <el-container class="main-layout" :class="{'day':daytime}">
    <el-header class="main-layout-header" :class="{'preback':!online}" :height="online?'58vw':'64vw'">
      <div class="premob premob0"></div>
      <div class="premob premob1"></div>
      <div class="premob-d premob0"></div>
      <div class="premob-d premob1"></div>
      <div v-if="!online" class="prefore"></div>
      <div class="logo" :class="{'day':daytime}"></div>
      <!-- <span v-if="!online" class="timely">
        网站将于今天下午5点之后投入使用
      </span>
      <span v-if="!online" class="timely-2">
        抱歉给您造成了不便
      </span> -->
      <div class="login">
        <span v-if="online" class="login-link">
          欢迎您，{{ user_name }}
        </span>
        <span v-else class="login-link login-linkbtn" @click="handleLogin()">
          登录
        </span>
        <span v-if="online" class="login-link login-linkbtn" @click="handleLogout()">
          注销
        </span>
        <span v-if="online" class="login-link login-linkbtn" @click="SelfInfoEdit()">
          修改信息
        </span>
      </div>
      <img class="title noselect" src="@/assets/ui/title.png">
      <img v-if="!online" class="loginbtn" src="@/assets/ui/login.png" @click="handleLogin()">
      <span v-if="isPhone" class="phone-suggest">
        建议横屏使用，体验更佳
      </span>
    </el-header>
    <el-container v-if="online" id="main-layout-center" class="main-layout-center">
      <el-aside class="main-layout-aside" width="16vw">
        <nav-menu class="nav"></nav-menu>
      </el-aside>
      <el-main v-if="online" id="main-layout-main" class="main-layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer v-if="online" class="main-layout-footer" height="43vw">
    </el-footer>
  </el-container>
</template>

<script>
import { getUserInfo } from '@/api/profile'
import { getCurrentUserInfo, getRedirectUrl } from '@/api/cas'
import NavMenu from './NavMenu'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import { getCurrentAllmessage } from '@/api/message.js'
import { showAsynConfirm } from '@/mixins/messageBox.js'

export default {
  name: 'Mainlayout',
  components: {
    NavMenu
  },
  data() {
    return {
      hours: '',
      total: 0,
      status: 0
    }
  },
  computed: {
    ...mapGetters({
      cas_user: 'cas_user',
      online: 'online',
      isPhone: 'isPhone'
    }),
    user_name() {
      return this.cas_user ? this.cas_user.user.userinfo.username : ''
    },
    daytime() {
      if (this.hours <= 19 && this.hours >= 7) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    console.log(this.isPhone)
    // 页面加载完成后，若未登录（即非从/login/callback跳转而来），检查是否已登陆
    if (!this.online) {
      try {
        const data = await getCurrentUserInfo()
        this.setCasUser(data)
        if (data.has_login) {
          this.saveOnline(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (this.online) {
      // 若未从/login/callback跳转而来或上面检查到已登录，进一步获取信息
      try {
        const data_user_info = await getUserInfo()
        this.setUserInfo(data_user_info)
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取用户详细信息：' + e
        })
      }
    }
    setTimeout(() => {
      if (this.online) {
        this.popMessage()
      }
    }, 1000)
  },
  created() {
    this.getnow()
  },
  methods: {
    ...mapMutations({
      saveOnline: 'saveOnline',
      setCasUser: 'setCasUser',
      setUserInfo: 'setUserInfo'
    }),
    getnow() {
      var data = new Date()
      this.hours = data.getHours()
    },
    // 获取消息，检验有没有未读的消息
    async popMessage() {
      try {
        const data = await getCurrentAllmessage(this.status)
        // 消息总数
        this.total = data.total
        if (this.total != 0) {
          showAsynConfirm('您有新的未读消息！是否前去查看？', '', done => {
            this.jumpToMessages(done)
          })
        }
      } catch (err) {
        this.$message({
          type: 'error',
          message: err
        })
      }
    },
    jumpToMessages(done) {
      done()
      this.$router.push('/message/msgall')
    },
    async handleLogin() {
      try {
        const data = await getRedirectUrl()
        location.href = data
        // 目前请求此接口可以跳转到学校caslogin界面，但是输入用户名密码之后
        // 再次跳转到了localhost，此处后端写的callback_URL="index/index/index"(localhost)
        // 需要将callback_URL改为"base_URL" + "/login/callback",跳转到LoginCallback.vue
        // 然后再将guid通过请求接口返回给后端获取个人信息，然后刷新界面
        // ps:刷新界面要抛出给父组件来做，这里存在一些问题
      } catch (message) {
        this.$message({
          type: 'error',
          message: '无法登录：' + message
        })
      }
    },
    handleLogout() {
      axios.delete('/api/cas')
        .then(r => {
          document.write(r.data)
          this.clearStorage()
        })
        .catch(e => {
          this.$message({
            type: 'error',
            message: '注销失败：' + e
          })
        })
    },
    SelfInfoEdit: function() {
      document.getElementById('main-layout-center').scrollIntoView({ block: 'end', behavior: 'smooth' })
      // 此方法会让页面一进来就能看见main-layout-center，即一开始就定位到此板块
      this.$router.push('/practice/selfinfoedit')
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
        'plan_region_time',
        'delivery',
        'type',
        'resource',
        'event_content',
        'fee_other',
        'vice_leader_net_id',
        'vice_leader_id',
        'teacher_name',
        'vice_leader_name',
        'belong',
        'teacher_follow'
      ]
      for (const i in keys) {
        localStorage.setItem(keys[i], '')
      }
      this.ruleForm = []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/common.scss';
@import '@/common/config.scss';

@keyframes mob0 {
  from {transform: translate(70%, -100%);}
  to {transform: translate(0, 0);}
}

@keyframes mob1 {
  from {transform: translate(0, 0);}
  to {transform: translate(-70%, 100%);}
}

@keyframes mob0d {
  from {transform: translate(100%, 0);}
  to {transform: translate(0, 0);}
}

@keyframes mob1d {
  from {transform: translate(0, 0);}
  to {transform: translate(-80%, 0);}
}

.main-layout-header {
  position: relative;
  background-image: url(~@/assets/ui/header.png);
  background-size: 101% 100%;
  overflow: hidden;
}

.day .main-layout-header {
  background-image: url(~@/assets/ui/dayheader.png);
  overflow: hidden;
}

.main-layout-center {
  background-image: url(~@/assets/ui/center.png);
  background-size: 101% 100%;
  overflow: hidden;
}

.day .main-layout-center {
  background-image: url(~@/assets/ui/daycenter.png);
  overflow: hidden;
}

.main-layout-aside {
  overflow: hidden;
}

.main-layout-main {
  overflow: hidden;
  margin-right: 12.5vw;
  padding: 0 4vw;
}

.main-layout-footer {
  background-image: url(~@/assets/ui/footer.png);
  background-size: 101% 103%;
}

.day .main-layout-footer {
  background-image: url(~@/assets/ui/dayfooter.png);

}

.day .preback {
  background-image: url(~@/assets/ui/presky.png);
}

.premob, .premob-d {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url(~@/assets/ui/premob.png);
  margin-top: -100px;
  background-size: 70%;
  height: 400px;
}

.day .premob, .day .premob-d {
  background-image: url(~@/assets/ui/cloud.png);
  background-size: 80%;
  background-repeat: no-repeat;
  height: 100%;
}

.premob-d {
  margin-top: 300px;
}

.premob0 {
  animation: mob0 3s linear infinite;
}

.day .premob0 {
  animation: mob0d 20s linear infinite;
}

.premob1 {
  animation: mob1 3s linear infinite;
}

.day .premob1 {
  animation: mob1d 20s linear infinite;
}

.prefore {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url(~@/assets/ui/prefore.png);
  background-size: 101%;
  background-repeat: no-repeat;
  background-position: 0 100%;
  overflow: hidden;
}

.day .logo {
  background-image: url(~@/assets/logo.png);
}

.logo {
  position: absolute;
  left: 20px;
  top: 20px;
  width: 220px;
  height: 60px;
  background-image: url(~@/assets/ui/logo.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.login {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
}

.timely {
  width: 40vw;
  margin:15vw auto 0 auto;
  font-size: 2.5vw;
  font-weight: bolder;
  color: rgb(78, 64, 53);
  font-family: "Microsoft YaHei";
  transform: scale(0.94, 1.08);
  display: flex;
  flex-direction: row;
}
.timely-2 {
  width: 40vw;
  margin: 0 auto;
  font-size: 2.5vw;
  font-weight: bolder;
  color: rgb(78, 64, 53);
  font-family: "Microsoft YaHei";
  transform: scale(0.94, 1.08);
  display: flex;
  flex-direction: row;
}

.phone-suggest {
  width: 35vw;
  margin: 1vw auto;
  font-size: 2.5vw;
  font-weight: bolder;
  color: rgb(78, 64, 53);
  font-family: "Microsoft YaHei";
  transform: scale(0.94, 1.08);
  display: flex;
  flex-direction: row;
}

.login-link {
  font-size: 22px;
  font-family: "Microsoft YaHei";
  color: rgb(255, 255, 255);
  transform: scale(0.94, 1.08);
  display: flex;
  flex-direction: row;
}

.login-link+.login-link::before {
  content: "|";
  margin: 0 5px;
}

.login-linkbtn {
  cursor: pointer;
}

.title {
  position: relative;
  display: block;
  margin-top: 16vw;
  margin-left: auto;
  margin-right: auto;
}

.loginbtn {
  position: relative;
  display: block;
  margin-top: 3vw;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

@media screen and (max-width: 1200px) {
  .logo {
    width: 180px;
    height: 55px;
  }

  .login-link {
    font-size: 25px;
  }

  .title {
    width: 300px;
  }

  .loginbtn {
    width: 120px;
  }
}

@media screen and (max-width: 800px) {
  .logo {
    width: 120px;
    height: 35px;
  }

  .login-link {
    font-size: 15px;
  }

  .title {
    width: 200px;
  }

  .loginbtn {
    width: 80px;
  }
}

@media screen and (max-width: 540px) {
  .el-container {
     transform: scaleY(1.1);
  }
  .logo {
    width: 90px;
    margin-top: 6.5vw;
  }
 .login {
    margin-top: 6.5vw;
  }
  .login-link {
    font-size: 13px;
  }

  .loginbtn {
    margin-top: 2vw;
  }
  .title {
    margin-top: 20vw;
  }
}

@media screen and (max-width: 410px) {
  .logo {
    width: 70px;
  }

  .login-link {
    font-size: 10px;
  }
}

</style>
