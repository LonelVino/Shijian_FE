<template>
  <div>
    <ul class="router-nav">
      <li
        v-for="(r, index) in routers"
        :key="index">
        <router-link :to="r.path">
          <img class="icon" :src="r.icon">
          <span class="text">{{ r.name }}</span>
        </router-link>
      </li>
    </ul>
    <img src="@/assets/seperate_line.svg" class="seperate-line">
  </div>
</template>

<script>

export default {
  name: 'RouterNav',
  props: {
    routers: Array
  },
  methods: {
    
  },
}
</script>

<style lang="scss">
.router-nav {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  $len: 60px;
  margin-left: -2em;
  .text {
    font-size: 20px;
    font-family: "Microsoft YaHei";
    color: rgb(153, 122, 98);
    font-weight: bold;
    transform: scale(0.94, 1.08);
  }
  .text:hover {
    color: rgb(78, 64, 53);
  }
  .router-link-active .text {
    color: rgb(78, 64, 53);
  }
  .icon {
    width: $len;
    height: $len;
    transition-duration: 1s;
    transition-property: width, height;
    transition-timing-function: linear;
  }
  a {
    align-items: center;
    display: flex;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

  }
}
.seperate-line {
  width: 100%;
}
@media screen and (max-width: 830px) {
  .text {
    font-size: 16px;
  }
}

@media screen and (max-width: 540px) {
  .text {
    font-size: 12px;
  }
  .icon {
    width: 5px;
    height: 12px;
  }
}
</style>
