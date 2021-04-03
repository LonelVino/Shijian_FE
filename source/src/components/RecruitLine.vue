<template>
  <div class="recruit-line">
    <div class="line-head">
      <el-tag :type="type">
        {{ tag }}
      </el-tag>
    </div>
    <div class="line-body" width="100">
      <div class="container">
        <p class="line-title clickable" @click="showDetails(row)">
          {{ row.title }}
        </p>
      </div>
      <div class="blank"></div>
      <div class="container">
        <p class="line-content">
          {{ row.content }}
        </p>
      </div>
    </div>
    <div class="line-end">
      <div class="line-action">
        <el-button size="mini" @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button size="mini" type="danger" @click="changeStatus()">
          {{ buttonText }}
        </el-button>
      </div>
      <p class="line-time">
        发布时间：{{ row.update_time }}
      </p>
    </div>
    <el-dialog
      v-dialogDrag
      title="招募详情"
      :visible.sync="edit.visible"
      :fullscreen="isPhone"
      class="recruit-edit-dialog"
    >
      <div class="recruit-edit-content">
        <el-tag v-if="edit.row.recruit_type == 1">
          招募队员
        </el-tag>
        <el-tag v-else type="success">
          等待招募
        </el-tag>
        <el-tag v-if="edit.row.status == 0" type="danger">
          已经关闭
        </el-tag>
        <el-input v-model="edit.row.title" class="edit-title" placeholder="请填写招募信息标题"></el-input>
        <el-input
          v-model="edit.row.content"
          class="edit-content"
          type="textarea"
          :rows="4"
          :placeholder="edit.row.placeholder"
        ></el-input>
        <p class="warning">
          请不要在详情中留下队伍口令，防止他人误加入队伍。
        </p>
        <el-button class="edit-button" type="primary" @click="_handleEdit()">
          提交修改
        </el-button>
        <el-button class="edit-button" @click="edit.visible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      title="招募详情"
      :visible.sync="details.visible"
      :fullscreen="isPhone"
      class="recruit-details-dialog"
    >
      <div class="recruit-details-content">
        <el-tag v-if="details.row.type == 1">
          招募队员
        </el-tag>
        <el-tag v-else type="success">
          等待招募
        </el-tag>
        <el-tag v-if="details.row.status == 0" type="danger">
          已经关闭
        </el-tag>
        <p class="details-title">
          <i class="el-icon-document icon"></i>标题：{{ details.row.title }}
        </p>
        <p class="details-content">
          <i class="el-icon-menu icon"></i>详情：{{ details.row.content }}
        </p>
        <p class="details-author">
          <i class="el-icon-author icon"></i>发布者：{{ user_name }}
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
import axios from 'axios'
import { mapGetters } from 'vuex'
import { showAsynConfirm } from '@/mixins/messageBox'
import { getByUserId } from '@/api/common'

export default {
  name: 'NoteLine',
  props: {
    row: Object
  },
  data() {
    return {
      details: {
        row: {},
        visible: false
      },
      edit: {
        row: {},
        visible: false
      },
      user_name: ''
    }
  },
  mounted() {
    this.getUserName()
  },
  methods: {
    showDetails(data) {
      (this.details.visible = true),
      (this.details.row = Object.assign({}, data))
    },
    // 打开编辑窗口(浅copy)
    handleEdit(data) {
      const map = {
        1: '建议您在详情中说明清楚实践的时间、地点、联系方式等问题。',
        0: '建议您在详情中介绍个人情况与能力，期望的实践类型等问题。'
      }
      this.edit.row = Object.assign({}, data)
      this.edit.row.placeholder = map[data.recruit_type]
      this.edit.visible = true
    },
    _handleEdit() {
      showAsynConfirm('您确定要修改招募信息？', '已取消修改', done => {
        this._submitEdit(done)
      })
    },
    async getUserName() {
      try {
        const data = await getByUserId(this.row.user_id)
        this.user_name = data.user_name
      } catch (e) {
        this.$message({
          type: 'error',
          message: '无法获取发布者姓名,' + e
        })
      }
    },
    _submitEdit(done) {
      const fields = ['status', 'title', 'content']
      const data = {}
      for (const i in fields) {
        const k = fields[i]
        data[k] = this.edit.row[k]
      }
      axios
        .put('/api/recruit/' + this.row.recruit_id.toString(), data)
        .then(response => {
          const data = response.data
          done()
          this.$emit('refresh')
          if (data.success == 1) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.edit.visible = false
          } else {
            done()
            this.$message({
              type: 'warning',
              message: data.err_msg
            })
          }
        })
        .catch(err => {
          done()
          this.$message({
            type: 'error',
            message: err
          })
          this.errorOpen()
        })
    },
    errorOpen() {
      this.$confirm('您的修改不符合要求', '标题名称', {
        confirmButtonText: '重新查看',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
          this.edit.visible = false
        }
      })
    },
    changeStatus() {
      showAsynConfirm(this.changeMessage, '已取消', done => {
        this._changeStatus(done)
      })
    },
    _changeStatus(done) {
      // 有待修改完善
      this.row.status = this.row.status == 1 ? 0 : 1
      const fields = ['status', 'title', 'content']
      const data = {}
      for (const i in fields) {
        const k = fields[i]
        data[k] = this.row[k]
      }
      axios
        .put('/api/recruit/' + this.row.recruit_id.toString(), data)
        .then(response => {
          done()
          const data = response.data
          this.$emit('refresh')
          this.$message({
            type: 'success',
            message: this.successMessage
          })
        })
        .catch(err => {
          done()
          this.$message({
            type: 'error',
            message: err
          })
        })
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
    },
    buttonText() {
      if (this.row.status == 0) {
        return '发布'
      } else {
        return '关闭'
      }
    },
    changeMessage() {
      if (this.row.status == 0) {
        return '您确定要发布此条招募？'
      } else {
        return '您确定要关闭此条招募？'
      }
    },
    successMessage() {
      if (this.row.status == 0) {
        return '关闭成功！'
      } else {
        return '发布成功！'
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
  $len-end: 200px;

  .edit-title {
    margin: 1vw 0;
  }
  .edit-content {
    textarea {
      resize: none;
    }
  }
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
    min-width: 50px;
    width: 100%;
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .line-content {
    margin-top: -22px;
    padding-top: 20px;
    line-height: 1.7em;
    color: #606266;
  }
  .line-reply {
    color: #f56c6c;
  }
  .line-end {
    width: $len-end;
    font-size: 0.8em;
    line-height: 1.8em;
  }
  .line-action {
    display: flex;
    flex-direction: row;
  }
  .line-author {
    text-indent: 1.5em;
  }
  .details-author,
  .details-title,
  .details-content {
    font-weight: bold;
  }
  .warning {
    color: red;
    margin: 1em 0;
  }
  .clickable {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
@media screen and (max-width: 940px) {
  .warning {
    font-size: 15px;
  }
  .recruit-edit-dialog {
    font-size: 15px;
  }
  .edit-button {
    transform: scale(0.85,0.85);
  }
}

@media screen and (max-width: 540px) {
  .warning {
    font-size: 12px;
  }
  .recruit-edit-dialog {
    font-size: 12px;
  }
  .edit-button {
    transform: scale(0.80,0.80);
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 940px) {
  .el-dialog__title {
    font-size: 14px;
    margin-bottom: -20px;
  }
  .recruit-edit-content {
    margin-top: -20px;
  }
}

@media screen and (max-width: 540px) {
  .el-dialog__title {
    font-size: 12px;
    margin-bottom: -20px;
  }
  .recruit-edit-content {
    margin-top: -20px;
  }
}
</style>
