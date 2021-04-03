<template>
  <div class="liuyan">
    <div class="_out" v-if="!hasDetails">
      <div class="header">
        <p>请先填写个人信息</p>
        <el-button class="jumpto-profile-button" @click="jumpToProfile()">填写个人信息</el-button>
      </div>
    </div>
    <div class="out" v-if="canCheckNote">
      <router-link class="link" to="/note/all">
        <span class="image-a"></span>
        <span class="text">全部留言</span>
      </router-link>
      <router-link class="link" to="/note/commit">
        <span class="image-a"></span>
        <span class="text">发表留言</span>
      </router-link>
      <router-link class="link" to="/note/mine">
        <span class="image-b"></span>
        <span class="text">我的留言</span>
      </router-link>
    </div>
      <img v-if="canCheckNote" src="@/assets/seperate_line.svg" class="seperate-line">
      <router-view v-if="canCheckNote"></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Note",
  computed: {
    ...mapGetters({
      canPanel: "canPanel",
      canAdmin: "canAdmin",
      canManage: "canManage",
      hasDetails: "hasDetails"
    }),
    canCheckNote() {
      if(!this.hasDetails) {
        return false;
      } else {
        return true
      }
    }
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

.seperate-line {
  width: 100%;
  margin-top: 10px; 
}

.image-a {
  width: 55px;
  height: 44px;
  background-image: url(~@/assets/ui/chat.png);
  background-size: 100%;
}

.image-b {
  width: 17px;
  height: 44px;
  background-image: url(~@/assets/ui/kid.png);
  background-size: 100%;
}

.text {
  font-size: 24px;
  font-family: "Microsoft YaHei";
  color: rgb(153, 122, 98);
  font-weight: bold;
  transform: scale(0.94, 1.08);
}

@media screen and (max-width: 830px) {

  .link+.link {
    margin-left: 30px;
  }

  .image-a {
    width: 30px;
    height: 24px;
  }

  .image-b {
    width: 10px;
    height: 24px;
  }

  .text {
    font-size: 16px;
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
    width: 15px;
    height: 12px;
  }

  .image-b {
    width: 5px;
    height: 12px;
  }

  .text {
    font-size: 12px;
  }
}

.link:hover .image-a,
.router-link-active .image-a {
  background-image: url(~@/assets/ui/chat-1.png);
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
