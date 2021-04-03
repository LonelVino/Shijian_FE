<template>
  <el-container
    v-loading="true"
    :class="{'day':daytime}"
    class="main-layout"
    element-loading-text="正在登陆中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-header class="main-layout-header preback" :class="{'preback':!online}" height="62vw">
      <div class="premob premob0"></div>
      <div class="premob premob1"></div>
      <div class="prefore"></div>
      <img class="logo" src="@/assets/ui/logo.png">
      <img class="title" src="@/assets/ui/title.png">
    </el-header>
  </el-container>
</template>

<script>
import { runCallback } from '@/api/cas'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'LoginCallback',
  data() {
    return {
      hours: ''
    }
  },
  computed: {
    ...mapGetters({
      online: 'online'
    }),
    daytime() {
      if (this.hours <= 19 && this.hours >= 7) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.getnow()
  },
  async mounted() {
    // 当用户输入完用户名密码后，会跳转到这个地址  这个时候URL中带有guid参数  需要开启vue-router的history模式
    // 第一步：从URL中获取guid参数
    const { guid } = this.$route.query
    try {
      // 第二步：将guid交给后端
      const data = await runCallback(guid)
      this.setCasUser(data)
      this.saveOnline(true)
    } catch (message) {
      // 如果执行到这一行，说明登陆失败，需要重新登录
      this.$message({
        type: 'error',
        message: '登录失败' + message
      })
    }
    setTimeout(() => {
      this.$router.push('/home') // 无论成功与否，都回到主页面，防止无限循环
    }, 500)
  },
  methods: {
    ...mapMutations({
      setCasUser: 'setCasUser',
      saveOnline: 'saveOnline'
    }),
    getnow() {
      var data = new Date()
      this.hours = data.getHours()
    }
  }
}
</script>

<style>
.login-callback-text {
  text-align: center;
  height: 100vh;
  line-height: 100vh;
}
</style>

<style scoped>
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
  to {transform: translate(-100%, 0);}
}

.main-layout-header {
  position: relative;
  background-image: url(~@/assets/ui/header.png);
  background-size: 100%;
  overflow: hidden;
}

.day .main-layout-header {
  background-image: url(~@/assets/ui/dayheader.png);
}

.preback {
  background-image: url(~@/assets/ui/preback.png);
  background-size: 100%;
}

.day .preback {
  background-image: url(~@/assets/ui/presky.png);
}

.premob {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: url(~@/assets/ui/premob.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.day .premob {
  background-image: url(~@/assets/ui/cloud.png);
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
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: 0 100%;
}

.logo {
  position: absolute;
  left: 20px;
  top: 20px;
}

.login {
  position: absolute;
  right: 20px;
  top: 20px;
  display: flex;
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
  .logo {
    width: 90px;
  }

  .login-link {
    font-size: 13px;
  }
}

.main-layout-center {
  background-image: url(~@/assets/ui/center.png);
  background-size: 100% 100%;
}

.day .main-layout-center {
  background-image: url(~@/assets/ui/daycenter.png);
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
  background-size: 100%;
}

.day .main-layout-footer {
  background-image: url(~@/assets/ui/dayfooter.png);
}
</style>
