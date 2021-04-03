<template>
  <div class="container">
    <div class="_out" v-if="!hasDetails">
      <div class="header">
        <p>请先填写个人信息</p>
        <el-button class="jumpto-profile-button" @click="jumpToProfile()">填写个人信息</el-button>
      </div>
    </div>
    <div class="out"  v-if="canCheckRecruit">
      <router-link class="link" to="/recruit/square">
        <span class="image-a"></span>
        <span class="text">招募广场</span>
      </router-link>
      <router-link class="link" to="/recruit/publish">
        <span class="image-a"></span>
        <span class="text">发布招募</span>
      </router-link>
      <router-link class="link" to="/recruit/personal">
        <span class="image-b"></span>
        <span class="text">我的已发招募</span>
      </router-link>
      <router-link class="link" to="/recruit/unfinished">
        <span class="image-b"></span>
        <span class="text">我的未发招募</span>
      </router-link>
    </div>
    <img v-if="canCheckRecruit" src="@/assets/seperate_line.svg" class="seperate-line">
    <div v-if="canCheckRecruit" class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "recruit",
  computed: {
    ...mapGetters({
      canPanel: "canPanel",
      canAdmin: "canAdmin",
      canManage: "canManage",
      hasDetails: "hasDetails"
    }),
    canCheckRecruit() {
      if(!this.hasDetails) {
        return false;
      } else {
        return true
      }
    },
  },
  methods: {
    jumpToProfile() {
      this.$router.push("/practice/getselfinfo");
    }
  }
};
</script>

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
  width: 40px;
  height: 45px;
  background-image: url(~@/assets/ui/flagkids.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-b {
  width: 17px;
  height: 44px;
  background-image: url(~@/assets/ui/kid.png);
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
    width: 30px;
    height: 35px;
  }

  .image-b {
    width: 10px;
    height: 24px;
  }

  .text {
    font-size: 16px;
  }

  .seperate-line {
    width: 100%;
    margin-top: 1.0em;
    margin-bottom: 1.5em;
  }
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
    width: 20px;
    height: 24px;
  }

  .image-b {
    width: 9px;
    height: 22px;
  }

  .text {
    font-size: 12px;
    transform: scale(0.90,0.90)
  }

  .seperate-line {
    width: 100%;
    margin-top: 0.8em;
    margin-bottom: 1.0em;
  }
}

.link:hover .image-a,
.router-link-active .image-a {
  background-image: url(~@/assets/ui/flagkids-1.png);
}

.link:hover .image-b,
.router-link-active .image-b {
  background-image: url(~@/assets/ui/kid-1.png);
}

.link:hover .text,
.router-link-active .text {
  color: rgb(78, 64, 53);
}
</style>
