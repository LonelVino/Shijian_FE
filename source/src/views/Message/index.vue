<template>
  <div id="message" class="message">
    <div class="out">
      <router-link class="link" to="/message/msgall">
        <span class="image-a"></span>
        <span class="text">
          全部消息
        </span>
      </router-link>
      <router-link class="link" to="/message/sgsall">
        <span class="image-b"></span>
        <span class="text">
          全部建议
        </span>
      </router-link>
    </div>
    <img src="@/assets/seperate_line.svg" class="seperate-line">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Message',
  mounted() {
    document.getElementById('message').scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
.message {
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
  width: 45px;
  height: 35px;
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
  background-image: url(~@/assets/ui/notice.png);
}

.link:hover .image-b,
.router-link-active .image-b {
  background-image: url(~@/assets/ui/chat-1.png);
}

.link:hover .text,
.router-link-active .text {
  color: rgb(78, 64, 53);
}

.image-a,
.image-b {
  transition-duration: 1s;
  transition-property: width, height;
  transition-timing-function: linear;
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

</style>
