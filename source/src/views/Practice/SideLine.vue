<template>
  <div class="steps">
    <div class="step" :class="{active:active>0}">
      <div class="step1"></div>
      <div class="text">
        填写个人信息
      </div>
    </div>
    <div class="arrow"></div>
    <div class="step" :class="{active:active>=1}">
      <div class="step2"></div>
      <div class="text">
        填写队伍及项目信息
      </div>
    </div>
    <div class="arrow"></div>
    <div class="step" :class="{active:active>2}">
      <div class="step3"></div>
      <div class="text">
        社会实践
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SideLine',
  computed: mapGetters({
    active: 'active'
  })
}
</script>

<style scoped>
.steps {
  display: flex;
  justify-content: right;
  align-items: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow {
  width: 192px;
  height: 21px;
  background-image: url(~@/assets/ui/arrow.png);
}

.text {
  text-align: center;
  margin-top: 12px;
  font-size: 18px;
  font-family: "DengXian";
  color: rgb(213, 168, 131);
  font-weight: bold;
  transform: scale(0.94, 1.08);
  background-size: 100%;
}

.step1 {
  width: 21px;
  height: 51px;
  background-image: url(~@/assets/ui/bigkid.png);
  background-size: 100%;
}

.step2 {
  width: 65px;
  height: 52px;
  background-image: url(~@/assets/ui/kids.png);
  background-size: 100%;
}

.step3 {
  width: 52px;
  height: 57px;
  background-image: url(~@/assets/ui/flagkids.png);
  background-size: 100%;
}
@media screen and (max-width: 1170px) {
  .arrow {
    width: 120px;
  }
}

@media screen and (max-width: 950px) {
  .arrow {
    width: 60px;
  }

  .text {
    font-size: 16px;
  }

  .step1 {
    width: 15px;
    height: 36px;
  }

  .step2 {
    width: 45px;
    height: 36px;
  }

  .step3 {
    width: 37px;
    height: 40px;
  }
}

@media screen and (max-width: 700px) {
  .arrow {
    width: 30px;
  }
  .steps {
    transform: scale(0.9);
  }
}

@media screen and (max-width: 540px) {
  .arrow {
    width: 15px;
  }
  .steps {
    transform: scale(0.7);
    margin-bottom: -20px;
  }
}

@media screen and (max-width: 375px) {
  .steps {
    transform: scale(0.65);
    margin-top: -10px;
    margin-bottom: -30px;
  }
}

.active .text {
  color: rgb(78, 64, 53);
}

.active .step1 {
  background-image: url(~@/assets/ui/bigkid-1.png);
}

.active .step2 {
  background-image: url(~@/assets/ui/kids-1.png);
}

.active .step3 {
  background-image: url(~@/assets/ui/flagkids-1.png);
}
</style>
