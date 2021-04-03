<template>
  <div class="practice-team-enter">
    <el-form ref="form" :inline="true" :model="form" :rules="rules">
      <el-form-item label="队伍口令" prop="code">
        <el-input
          v-model="form.code"
          placeholder="队伍口令"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="enter-button" type="primary" @click="onSubmit">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { showAsynConfirm } from '../../../mixins/messageBox.js'
import axios from 'axios'

export default {
  name: 'TeamInfoCode',
  data() {
    return {
      form: {
        code: ''
      },
      rules: {
        code: [
          { required: true, message: '请输入队伍口令', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          showAsynConfirm('是否确认加入队伍?', '已取消提交', (done) => {
            const keys = ['code']
            const params = {}
            for (const i in keys) {
              params[keys[i]] = this.form[keys[i]]
            }
            this.handleEdit(params, done)
          })
        } else {
          return false
        }
      })
    },
    handleEdit(params, done) {
      done()
      axios.post('/api/joinTeam', params)
        .then(response => {
          const data = response.data
          if (data.success == 1) {
            this.$message({
              type: 'success',
              message: '成功加入！'
            })
            this.$router.push('/practice/teaminf')
          } else if (data.success == 0) {
            this.$message({
              type: 'warning',
              message: data.err_msg
            })
          } else {
            this.$message({
              type: 'warning',
              message: '加入失败！'
            })
          }
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.practice-team-enter {
  margin-top: 1em;
  p {
    color: red;
    margin-bottom: 10px;
  }
  .prompt {
    margin: 1em;
    font-size: 1.15em;
    color: rgb(247, 81, 81);
    display: inline-block;
  }
}

@media screen and (max-width: 700px) {
.practice-team-enter{
    transform: scale(0.90);
    margin: -5px;
}
}

@media screen and (max-width: 500px) {
.practice-team-enter {
  .enter-button {
    margin-left: 30px;
    margin-top: -10px;
  }
}
}

@media screen and (max-width: 400px) {
.practice-team-enter {
  .enter-button {
    margin-left: 30px;
    margin-top: -20px;
    position: relative;
    top: -10px;
  }
}
}

@media screen and (max-width: 350px) {
.practice-team-enter {
    transform: scale(0.80);
    margin-left: -10px;
    position: relative;
    top: -5px;
}
}
</style>
