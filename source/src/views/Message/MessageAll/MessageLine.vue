<template>
  <div class="message-line" @click="jumpTo(row.message_id)">
    <div class="line-head">
      <el-tag :type="type">
        {{ tag }}
      </el-tag>
    </div>
    <div class="line-body">
      <div class="container">
        <a class="line-title" @click="showDetails(row)">
          {{ row.title }}
        </a>
      </div>
      <div class="blank"></div>
      <div class="container">
        <p class="line-content">
          {{ row.content }}
        </p>
      </div>
    </div>
    <div class="line-end">
      <p class="line-time">
        时间： {{ row.update_time }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOnemessage } from '@/api/message.js'

export default {
  name: 'NoteLine',
  props: {
    row: Object
  },
  data() {
    return {
      details: {
        visible: false,
        row: {}
      },
      user_name: ''
    }
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    showDetails(data) {
      this.details.visible = true
      this.details.row = data
    },
    async getOnemessage(id) {
      try {
        const data = await getOnemessage(id)
      } catch (err) {
        this.$message({
          type: 'error',
          message: err
        })
      }
    },
    jumpTo(id) {
      this.getOnemessage(id)
      if (this.details_type == 0) {
        this.$router.push('/practice/teaminf')
      } else {
        if (this.details_type == 1) {
          this.$router.push('/note/mine')
        } else {
          if (this.details_type == 2) {
            this.$router.push('/practice/teaminf')
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      isPhone: 'isPhone'
    }),
    type() {
      if (this.row.status == 0) {
        return 'danger'
      } else {
        if (this.row.status == 1) {
          return ''
        } else {
          return 'success'
        }
      }
    },
    tag() {
      if (this.row.status == 0) {
        return '未读'
      } else {
        if (this.row.status == 1) {
          return '已读'
        } else {
          return '未知消息'
        }
      }
    },
    details_type() {
      if (this.row.title.indexOf('审') != -1) {
        return 0
      } else {
        if (this.row.title.indexOf('留') != -1) {
          return 1
        } else {
          return 2
        }
      }
    }
  }
}
</script>

<style lang="scss">
.message-line {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom: dotted 1px #e4e6eb;
  padding: 0.6em;

  $len-head: 60px;
  $len-end: 180px;

  .line-head {
    width: $len-head;
    margin-right: 1em;
  }
  .line-body {
    margin: 0 1em;
    flex-grow: 1;
    .container {
      position: relative;
      height: 1.4em;
      overflow: hidden;
    }
  }
  .blank {
    height: 10px;
    width: 20px;
  }
  .line-title {
    color: #409eff;
    font-size: 22px;
    margin-top: -8px;
    line-height: 1.8em;
  }
  .line-content,
  .line-reply,
  .line-title {
    width: 100%;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line-content {
    margin-top: -22px;
    padding-top: 20px;
    line-height: 1.8em;
    color: #606266;
  }
  .line-end {
    min-width: 200px;
    width: $len-end;
    font-size: 0.8em;
    line-height: 1.8em;
  }
  .line-author {
    text-indent: 1.5em;
  }

  .clickable {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 540px){
  .message-line {
    .line-head {
      visibility: hidden;
      width: 0;
      margin: 0;
    }
    .line-body {
      min-width: 40vw;
    }
  }
}
</style>
