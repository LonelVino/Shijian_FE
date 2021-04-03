<template>
  <div>
    <div class="bar">
      <router-link class="back" to="/home">
        <img class="back-img" src="@/assets/ui/back.png">
        <span class="back-txt">
          返回
        </span>
      </router-link>
      <div class="icon">
        <img class="icon-img" src="@/assets/ui/smallnotice.png">
        <span class="icon-txt">
          实践公告
        </span>
      </div>
    </div>
    <div v-loading="loading">
      <div v-if="ndata" class="content">
        <div class="title">
          <h2>{{ ndata.title }}</h2>
          <el-tag v-if="ndata.type==1" class="el-tag" type="primary">
            普通
          </el-tag>
          <el-tag v-if="ndata.type == 2" class="el-tag" type="success">
            特别
          </el-tag>
          <el-tag v-if="ndata.type == 3" class="el-tag" type="info">
            消息
          </el-tag>
          <el-tag v-if="ndata.type == 4" class="el-tag" type="danger">
            紧急
          </el-tag>
        </div>
        <div class="information">
          <ul class="notice-ul">
            <li>发布者：{{ user_name }}</li>
            <li>通知过期时间：{{ ndata.overtime }}</li>
          </ul>
        </div>
        <p class="notice-content" v-html="ndata.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
import statusMixin from '@/mixins/status'
import { getNotification } from '@/api/notification'
import { getHtml } from '@/js/htmlchar.js'
import { getByUserId } from '@/api/common'

export default {
  name: 'Notice',
  mixins: [statusMixin],
  data() {
    return {
      ndata: null,
      loading: false,
      user_name: ''
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  async mounted() {
    this.loading = true
    try {
      var d = await getNotification(this.id)
      console.log(d)
      if (d.content) d.content = getHtml(d.content)
      console.log(d)
      this.ndata = d
      this.getUserName()
    } catch (e) {
      this.$message({
        type: 'error',
        message: '实践公告获取失败：' + e
      })
    }
    this.loading = false
  },
  methods: {
    async getUserName() {
      this.loading = true
      try {
        const data = await getByUserId(this.ndata.author_id)
        this.user_name = data.user_name
        this.loading = false
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取发布者姓名,' + e
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: row;
}

.el-tag {
  margin-left: 10px;
}

.content {
  display: flex;
  flex-direction: column;
}

.bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.notice-ul {
  margin: 10px 0;
  list-style: none;
  font-size: 15px;
  font-weight: 600;
  font-family: "Adobe Heiti Std";
  color: rgb(78, 64, 53);
  line-height: 2.043;
  transform: scale(0.94, 1.08);
}

.back {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.back-txt {
  font-size: 24px;
  font-family: "Adobe Heiti Std";
  color: rgb(78, 64, 53);
  line-height: 2.043;
  transform: scale(0.94, 1.08);
}

.icon {
  display: flex;
  align-items: center;
}

.icon-txt {
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  line-height: 1.635;
  transform: matrix(0.65451370478962, 0, 0, 0.74432432432433, 0, 0);
}

.notice-content {
  word-wrap: break-word;
	word-break: break-all;
  text-indent: 2em;
}

@media screen and (max-width: 600px) {
  .title {
    flex-direction: column;
  }
  .back-txt {
    font-size: 16px;
  }
  .icon-img {
    height: 34px;
  }
  .icon-txt {
    font-size: 20px;
  }
  .title h2 {
    font-size: 18px;
  }
  .notice-content {
    font-size: 18px;
  }
  .notice-ul {
    margin: 5px 0;
    font-size: 14px;
    font-weight: 600;
    transform: scale(0.94, 1.08);
  }
  .el-tag {
    width: 50px;
  }
}

@media screen and (max-width: 480px) {
  .back-txt {
    font-size: 14px;
  }
  .icon-img {
    height: 28px;
  }
  .icon-txt {
    font-size: 15px;
  }
  .title h2 {
    font-size: 12px;
  }
  .notice-content {
    font-size: 12px;
  }
  .notice-ul {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 600;
    transform: scale(0.94, 1.08);
  }
  .el-tag {
    transform: scale(0.8);
    margin-left: -5px;
  }
}
</style>
