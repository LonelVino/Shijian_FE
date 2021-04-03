<template>
  <div v-if="canManage" id="manage" class="manage">
    <div v-if="!hasDetails" class="_out">
      <div class="header">
        <p>请先填写个人信息(如果是老师，个人信息部分内容（如班级）请随意填写，没有影响)</p>
        <el-button class="jumpto-profile-button" @click="jumpToProfile()">
          填写个人信息
        </el-button>
      </div>
    </div>
    <div v-if="canCheckManage" class="out">
      <router-link class="link" to="/manage/check">
        <span class="image-a"></span>
        <span class="text">
          项目审核
        </span>
      </router-link>
      <router-link class="link" to="/manage/examine">
        <span class="image-c"></span>
        <span class="text">
          项目测验
        </span>
      </router-link>
      <router-link class="link" to="/manage/team">
        <span class="image-b"></span>
        <span class="text">
          队伍信息
        </span>
      </router-link>
      <router-link class="link" to="/manage/excel">
        <span class="image-b"></span>
        <span class="text">
          队伍信息导出
        </span>
      </router-link>
    </div>
    <img v-if="canCheckManage" src="@/assets/seperate_line.svg" class="seperate-line">
    <div v-if="canCheckManage" class="main">
      <router-view></router-view>
    </div>
  </div>
  <div v-else>
    <p>您无权查看此页面</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Manage',
  computed: {
    ...mapGetters({
      canManage: 'canManage',
      hasDetails: 'hasDetails'
    }),
    canCheckManage() {
      if (!this.hasDetails) {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    document.getElementById('main-layout-main').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  methods: {
    jumpToProfile() {
      this.$router.push('/practice/getselfinfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.manage {
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
.jumpto-profile-button {
  margin-left: 20px;
}

.header p {
  font-size: 25px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  transform: scale(0.94, 1.08);
  margin-bottom: 10px;
  margin-left: -10px;
}

.out {
  display: flex;
}

.link {
  display: flex;
  text-decoration: none;
  align-items: center;
}

.link+.link {
  margin-left: 48px;
}

.image-a {
  width: 35px;
  height: 45px;
  background-image: url(~@/assets/ui/grid.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-b {
  width: 35px;
  height: 44px;
  background-image: url(~@/assets/ui/tickets.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-c {
  width: 55px;
  height: 40px;
  background-image: url(~@/assets/ui/chat.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.text {
  font-size: 24px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 122, 98);
  font-weight: bold;
  transform: scale(0.94, 1.08);
}

.link:hover .image-a,
.router-link-active .image-a {
  background-image: url(~@/assets/ui/grid-dark.png);
}

.link:hover .image-b,
.router-link-active .image-b {
  background-image: url(~@/assets/ui/tickets-dark.png);
}

.link:hover .image-c,
.router-link-active .image-c {
  background-image: url(~@/assets/ui/chat-1.png);
}

.link:hover .text,
.router-link-active .text {
  color: rgb(78, 64, 53);
}

.seperate-line {
  width: 100%;
  margin-top: 1.5em;
  margin-bottom: 2em;
}

@media screen and (max-width: 830px) {

  .link+.link {
    margin-left: 30px;
  }

  .image-a {
    width: 25px;
    height: 28px;
  }

  .image-b {
    width: 25px;
    height: 35px;
    margin-top: 5px;
  }

  .image-c {
    width: 35px;
    height: 35px;
    margin-left: -5px;
  }

  .text {
    font-size: 16px;
  }
}

  .seperate-line {
    width: 100%;
    margin-top: 1.0em;
    margin-bottom: 1.5em;
  }

  .image-a,
  .image-b {
    transition-duration: 1s;
    transition-property: width, height;
    transition-timing-function: linear;
   }

@media screen and (max-width: 540px) {

  .link+.link {
    margin-left: 10px;
  }

  .image-a {
    width: 28px;
    height: 20px;
  }

  .image-b {
    width: 25px;
    height: 25px;
  }

  .image-c {
    width: 35px;
    height: 20px;
  }

  .text {
    font-size: 12px;
  }

  .seperate-line {
    width: 100%;
    margin-top: 0.8em;
    margin-bottom: 1.0em;
  }
}
</style>
