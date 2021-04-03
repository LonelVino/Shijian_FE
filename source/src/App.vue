<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import tenzor from "@/assets/tenzor.png";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      screen: {
        timer: false,
        width: 0
      }
    };
  },
  created() {
    this.onResize();
    this.checkBrowser();
    this.logWelcome();
  },
  methods: {
    ...mapMutations({
      saveScreenWidth: "saveScreenWidth"
    }),
    onResize() {
      var saveSize = next => {
        let domel = document.documentElement;
        if (domel) {
          this.screen.timer = next;
          this.screen.width = domel.clientWidth;
        } else {
          this.screen.timer = true;
          this.screen.width = 0;
        }
        this.saveScreenWidth(this.screen);
      };
      if (!this.screen.timer) {
        saveSize(true);
        setTimeout(() => {
          saveSize(false);
        }, 400);
      }
    },
    checkBrowser() {
      var userAgent = navigator.userAgent;
      var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
      var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE || isIE11) {
        this.$notify.error({
          title: "建议您切换浏览器",
          message:
            "检测到您正在使用IE浏览器，我们无法保证该页面运行正常，强烈建议您切换为其他主流浏览器！",
          duration: 0
        });
      }
    },
    logWelcome() {
      // 配置样式
      let logger = console.log;
      let fontFamily =
        '"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif';
      let fontStyle = `font-size: 22px; margin-left: 0.8em; color: #f77513; text-shadow: 0 0 10px #ccc; font-family: ${fontFamily};`;
      let url = `${window.location.origin}${tenzor}`;
      let style = `padding:64px 128px;line-height:128px;background:url(${url}) no-repeat;`;
      logger("%c", style);
      logger("%c用技术和创意改变世界！", fontStyle);
      logger("%c加入挑战，你也可以改变世界！", fontStyle);
      logger(
        "%c请发送邮件到contact@tiaozhan.com（注明“来自 console”）",
        "color:red"
      );
    }
  }
};
</script>

<style lang="scss">
@import '@/common/common.scss';
@import '@/common/config.scss';

html,
body {
  margin: 0;
  padding: 0;
}
</style>
