<template>
  <div class="link">
    <img src="@/assets/ui/smallarrow.png">
    <router-link v-if="router" :to="'/home/notice/'+id">
      {{ title }}
    </router-link>
    <a v-else :href="'/api/guide/'+id" @click="showMessage()">
      {{ title }}
    </a>
  </div>
</template>

<script>
import statusMixin from '@/mixins/status'
import { mapGetters } from 'vuex'

export default {
  name: 'Link',
  mixins: [statusMixin],
  props: {
    title: String,
    id: Number,
    router: Boolean
  },

  methods: {
    showMessage() {
      this.$message({
        type: 'info',
        message: '下载已经开始，若长时间没有反应请重试或尝试切换浏览器'
      })
    }
  }
}
</script>

<style scoped>
.link {
  display: flex;
  align-items: center;
}

a {
  margin-left: 20px;
  text-decoration: none;
  font-size: 1.5vw;
  font-weight: bold;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  transform: scale(0.94, 1.08);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media screen and (max-width: 500px) {
  img {
    transform: scale(0.25);
  }
  a {
    margin-left: 0.25em;
  }
}
</style>
