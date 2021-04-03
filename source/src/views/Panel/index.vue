<template>
  <div class="panel" v-if="canPanel" id="panel">
    <div class="out">
      <router-link class="link" to="/panel/notification">
        <span class="image-a"></span>
        <span class="text">实践公告</span>
      </router-link>
      <router-link class="link" to="/panel/material">
        <span class="image-b"></span>
        <span class="text">资料下载</span>
      </router-link>
      <router-link class="link" to="/panel/note">
        <span class="image-c"></span>
        <span class="text">留言板</span>
      </router-link>
      <router-link class="link" to="/panel/recruit">
        <span class="image-d"></span>
        <span class="text">队友招募</span>
      </router-link>
    </div>
    <img src="@/assets/seperate_line.svg" class="seperate-line">
    <router-view></router-view>
  </div>
  <div v-else>
    <p>您无权查看此页面</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Panel",
  computed: {
    ...mapGetters({
      canPanel: "canPanel"
    })
  },
  mounted() {
    document.getElementById("panel").scrollIntoView({block:"end",behavior:"smooth"});
  }
};
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
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
  width: 55px;
  height: 48px;
  background-image: url(~@/assets/ui/notice.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-b {
  width: 38px;
  height: 40px;
  background-image: url(~@/assets/ui/download.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-c {
  width: 44px;
  height: 35px;
  background-image: url(~@/assets/ui/chat.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.image-d {
  width: 44px;
  height: 49px;
  background-image: url(~@/assets/ui/flagkids.png);
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

@media screen and (max-width: 1080px) {
.text {
    font-size: 19px;
  }
}

@media screen and (max-width: 830px) {

  .link+.link {
    margin-left: 30px;
  }

  .image-a {
    width: 30px;
    height: 26px;
  }

  .image-b {
    width: 21px;
    height: 22px;
  }

  .image-c {
    width: 24px;
    height: 19px;
  }

  .image-d {
    width: 24px;
    height: 26px;
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

@media screen and (max-width: 540px) {

  .link+.link {
    margin-left: 10px;
  }

  .image-a {
    width: 17px;
    height: 15px;
  }

  .image-b {
    width: 15px;
    height: 15px;
  }
  
  .image-c {
    width: 18px;
    height: 14px;
  }

  .image-d {
    width: 15px;
    height: 19px;
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

.link:hover .image-a,
.router-link-active .image-a {
  background-image: url(~@/assets/ui/notice.png);
}

.link:hover .image-b,
.router-link-active .image-b {
  background-image: url(~@/assets/ui/download.png);
}

.link:hover .image-c,
.router-link-active .image-c {
  background-image: url(~@/assets/ui/chat-1.png);
}

.link:hover .image-d,
.router-link-active .image-d {
  background-image: url(~@/assets/ui/flagkids-1.png);
}

.link:hover .text,
.router-link-active .text {
  color: rgb(78, 64, 53);
}

.image-a,
.image-b,
.image-c,
.iamge-d {
  transition-duration: 1s;
  transition-property: width, height;
  transition-timing-function: linear;
}
</style>
