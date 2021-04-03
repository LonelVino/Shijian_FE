<template>
  <div class="recruit-line">
    <div class="line-head line">
      <el-tag :type="type">
        {{ tag }}
      </el-tag>
    </div>
    <div class="line-body line">
      <div class="container">
        <a class="line-title clickable" @click="showDetails(row)">
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
    <div class="line-end line">
      <p class="line-author">
        发布者：{{ row.user_name }}
      </p>
      <p class="line-time">
        发布时间：{{ row.update_time }}
      </p>
    </div>
    <el-dialog
      v-dialogDrag
      title="招募详情"
      :visible.sync="details.visible"
      :fullscreen="isPhone"
      class="recruit-details-dialog"
    >
      <div class="recruit-details-content">
        <el-tag v-if="details.row.recruit_type == 1">
          招募队员
        </el-tag>
        <el-tag v-else type="success">
          等待招募
        </el-tag>
        <p class="details-title">
          标题：{{ details.row.title }}
        </p>
        <p class="details-content">
          详情：{{ details.row.content }}
        </p>
        <p class="details-author">
          发布者：{{ details.row.user_name }}
        </p>
        <p class="details-time">
          发布时间：{{ details.row.create_time }}
        </p>
        <p class="details-time">
          更新时间：{{ details.row.update_time }}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
      }
    }
  },
  methods: {
    showDetails(data) {
      this.details.visible = true
      this.details.row = data
      console.log(this.details.row)
      console.log(this.isPhone)
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
        if (this.row.recruit_type == 1) {
          return ''
        } else {
          return 'success'
        }
      }
    },
    tag() {
      if (this.row.status == 0) {
        return '已经关闭'
      } else {
        if (this.row.recruit_type == 1) {
          return '招募队员'
        } else {
          return '等待招募'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.recruit-line {
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
    margin-top: -0px;
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
  .line-reply {
    color: #f56c6c;
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
  .details-author {
    color: #f56c6c;
  }
  .clickable {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 540px) {
  .recruit-line {
    .line-end {
      visibility: hidden;
      width: 0px;
      min-width: 0;
    }
    .line {
      height: 10vw;
    }
  }
}
</style>
