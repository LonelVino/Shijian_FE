<template>
  <div class="footer">
    <section class="section">
      <div class="row">
        <section class="footer-banner block">
          <div class="container">
            <img class="logo" :src="tensor_logo" />
            <div class="infos">
              <p>西安交通大学团委挑战网</p>
              <p>contact@tiaozhan.com</p>
            </div>
          </div>
        </section>
        <ul class="footer-contact block">
          <li class="tencent">
            <a href="http://v.qq.com/vplus/tiaozhan" target="window"></a>
          </li>
          <li class="weibo">
            <a href="https://weibo.com/tiaozhanwang?refer_flag=1001030101_&amp;is_hot=1" target="window"></a>
          </li>
          <li class="wechat">
            <a href="https://mp.weixin.qq.com/s?__biz=MzAwOTA1MDkxOA==&amp;mid=202185404&amp;idx=2&amp;sn=adfb6fe6cb7db9011578f91e0d0ae3cc&amp;mpshare=1&amp;scene=23&amp;srcid=04309rJC5JFD33Oz5Hrl7SXd#rd" target="window"></a>
          </li>
        </ul>
      </div>
      <div class="row">
        <section class="footer-about block">
          <div class="container">
            <p class="vice-title">
              关于我们
            </p>
            <p class="content">
              挑战网始终服务仙交广大师生，挖掘并发挥每个成员自身潜力，培养追求卓越的能力和先人一步的勇气。在网站搭建和维护、视频拍摄制作、美工设计、新媒体运营等方面优势突出，并有所成绩。挑战无处不在，战无不胜。
            </p>
          </div>
        </section>
        <div class="space"></div>
        <aside class="footer-products block">
          <p class="vice-title">
            旗下产品
          </p>
          <div class="content">
            <ul class="list1">
              <li>
                <a href="https://tuanwei.xjtu.edu.cn/">
                  交大青年之声
                </a>
              </li>
              <li>
                <a href="https://shijian.tiaozhan.com/">
                  社会实践
                </a>
              </li>
              <li>
                <a href="https://apply.tiaozhan.com/">
                  公共资源申请
                </a>
              </li>
            </ul>
            <ul class="list2">
              <li>
                <a href="https://www.tiaozhan.com/">
                  挑战首页
                </a>
              </li>
              <li>
                <a href="https://v.tiaozhan.com/">
                  挑战V网
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <aside class="footer-links block">
          <p class="vice-title">
            友情链接
          </p>
          <ul class="list3">
            <li>
              <a href="http://www.xjtu.edu.cn/">
                西安交通大学
              </a>
            </li>
            <li>
              <a href="http://newsxq.xjtu.edu.cn/">
                交大新闻网
              </a>
            </li>
            <li>
              <a href="http://dean.xjtu.edu.cn/">
                西安交大教务处
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <section class="footer-copyright">
        <p class="normal-version">
          Copyright &copy; 2001-2020 TIAOZHAN. All rights reserved. 陕ICP备06001542号
        </p>
        <div class="phone-version">
          <p>Copyright &copy; 2001-2020 TIAOZHAN.</p>
          <p>All rights reserved.</p>
          <p>陕ICP备06001542号</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import tensor_logo from '@/assets/footer/tensor_logo.svg'
import tencent_white from '@/assets/footer/tencent_white.svg'
import tencent_black from '@/assets/footer/tencent_black.svg'
import weibo_white from '@/assets/footer/weibo_white.svg'
import weibo_black from '@/assets/footer/weibo_black.svg'
import wechat_white from '@/assets/footer/wechat_white.svg'
import wechat_black from '@/assets/footer/wechat_black.svg'

export default {
  name: 'Footer',
  data() {
    return {
      tensor_logo,
      tencent_white,
      tencent_black,
      weibo_white,
      weibo_black,
      wechat_white,
      wechat_black
    }
  }
}
</script>

<style lang="scss">
$gap: 30px;

// 统一效果
.footer {
  color: white;
  background-color: #313131;
  font-size: 16px;
  .contact {
    margin-top: 25px;
  }
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1560px;
    margin: 0 auto;
  }
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: $gap 0 0;
    width: 100%;
    .vice-title {
      margin-bottom: 30px;
    }
  }
  .vice-title {
    color: #999;
  }
  .block {
    padding: $gap $gap 0;
  }
  a {
    text-decoration:none;
    color: white;
  }
}
.tencent,
.weibo,
.wechat {
  width: 100px;
  height: 100px;
}
.wechat {
  background-image: url(~@/assets/footer/wechat_white.svg);
  background-position: 50% 0%;
}
.wechat:hover {
  background-image: url(~@/assets/footer/wechat_black.svg);
  background-position: 50% 0%;
}
.weibo {
  background-image: url(~@/assets/footer/weibo_white.svg);
  background-position: 50% 0%;
}
.weibo:hover {
  background-image: url(~@/assets/footer/weibo_black.svg);
  background-position: 50% 0%;
}
.tencent {
  background-image: url(~@/assets/footer/tencent_white.svg);
  background-position: 50% 0%;
}
.tencent:hover {
  background-image: url(~@/assets/footer/tencent_black.svg);
  background-position: 50% 0%;
}
// 挑战网及联系方式
.footer-banner {
  $height: 80px;
  .container {
    display: flex;
    flex-direction: row;
  }
  flex-grow: 1;

  .logo {
    height: $height;
    margin-right: 10px;
  }
  .infos {
    padding-left: 10px;
    border-left: 2px solid white;
    line-height: ($height / 2);
    width: 12em;
    text-align: justify;
    p {
      text-align: justify;
    }
  }
}

// 三种联系方式
.footer-contact {
  width: 150px;
  $len: 40px;
  position: relative;
  left:-30px;
  display: flex;
  flex-direction: row;
  li {
    display: block;
    margin-right: 20px;
    width: $len;
    height: $len;
    cursor: pointer;
    background-size: $len $len;
    &:first-child {
      margin-left: 0;
    }
  }
  a {
    display: block;
    width: 40px;
    height: 100%;
  }

}

// 关于我们
.footer-about {
  flex-grow: 1;
  .container {
    max-width: 520px;
  }
  .content {
    text-indent: 2em;
  }
}

// 旗下产品
.footer-products {
  .content {
    display: flex;
    flex-direction: row;
  }
}

.footer-products {
  .list1 {
    width: 100px;
    margin-right: 30px;
    list-style: none;
    @media screen and (max-width: 300px) {
      margin-right: 20px;
    }
  }
  .list2 {
    width: 80px;
    list-style: none;
  }
}

.list3 {
    list-style: none;
  }

.footer-links {
  width: 170px;
}

.footer-products,
.footer-links {
  li {
    margin-bottom: 12px;
  }
}

// 版权
.footer-copyright {
  padding: 40px 0;
  font-size: 12px;
}

// 其他适配
.phone-version {
  display: none;
}
@media screen and (max-width: 1600px) {
  .footer {
    .section {
      margin: 0 $gap 0 $gap;
    }
  }
}
@media screen and (max-width: 1100px) {
  .footer {
    .footer-links {
      height: 0;
      opacity: 0;
      margin-top: -10vw;
    }
  }
}
@media screen and (max-width: 430px) {
  .footer {
    font-size: 12px;
    .block {
      padding: 20px 20px 0;
    }
    .logo {
      transform: scale(0.80, 0.80);
      margin-top: 0px;
    }
    .footer-contact {
      visibility: hidden;
      height: 0;
    }
    .footer-banner {
      overflow: hidden;
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 5em;
        .infos {
          border: none;
          margin: 1em auto 0 auto;
          p {
            height: 24px;
          }
        }
      }
    }
    .row {
      margin-top: 0;
      .vice-title {
        margin-bottom: 10px;
      }
    }
  }
  .footer-copyright {
    width: 100%;
    .normal-version {
      display: none;
    }
    .phone-version {
      display: block;
      p {
        text-align: center;
      }
    }
  }

}
</style>
