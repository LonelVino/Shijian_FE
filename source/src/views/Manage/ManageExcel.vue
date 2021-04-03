<template>
  <div class="manage-excel manage-dev">
    <div class="title-line">
      <p class="title">
        导出Excel
      </p>
    </div>
    <div class="button">
      <el-button @click="exportExcel3">
        导出挂靠单位下所有队伍信息
      </el-button>
    </div>
    <div v-if="canPanel" class="button">
      <el-button @click="exportExcel4">
        导出全校所有队伍信息
      </el-button>
    </div>
    <p>{{ stat6 ? `若始终没有反应，请${remainTime}秒后再试` : '' }}</p>
    <div v-if="canPanel" class="button">
      <el-button @click="exportExcel6">
        导出全校所有队伍+队伍成员信息
      </el-button>
    </div>
    <!-- <div class="input">
      <el-input
        ref="uploader"
        action="/api/admin/materials"
        :data="uploadData"
        multiple
        :limit="3"
        class="uploaad-demo"
        :on-error="uploadError"
        :on-success="uplaodSuccess"
        :on-exceed="handleExceed"
        :on-remove="onRemoveTxt"
        :file-list="files"
        :auto-upload="false"
        :before-upload="beforeUpload"
      >
        <el-button id="upload" size="small" type="button" @click="upload">
          上传文件
        </el-button>
      </el-input>
    </div> -->
  </div>
</template>

<script>
import { openDownloadDialog } from '@/js/download.js'
import { mapGetters } from 'vuex'
import { guid } from '@/js/guid.js'

export default {
  name: 'ManageExcel',
  data() {
    return {
      stat6: false,
      remainTime: 30,
      localFiles: {}
    }
  },
  computed: {
    ...mapGetters({
      canPanel: 'canPanel'
    }),
    uploadData() {
      return {
        title: this.params.title
      }
    }
  },
  mounted() {
    document.getElementById('manage-excel').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  methods: {
    exportExcel3() {
      openDownloadDialog('/api/outExcelOrgTable/')
      this.$message('下载已经开始，若长时间没有反应请重试或尝试切换浏览器')
    },
    exportExcel4() {
      openDownloadDialog('/api/outExcelSchoolTable/')
      this.$message('下载已经开始，若长时间没有反应请重试或尝试切换浏览器')
    },
    exportExcel6() {
      if (this.stat6) {
        this.$message('该导出对服务器压力较大，请不要反复导出')
      } else {
        this.stat6 = true
        this.remainTime = 30
        openDownloadDialog('/api/outExcelSchoolTeammateTable/')
        this.$message('下载已经开始，若长时间没有反应请重试或尝试切换浏览器')
        setTimeout(() => {
          this.stat6 = false
        }, this.remainTime * 1000)
        var down = () => {
          this.remainTime--
          if (this.remainTime > 0) {
            setTimeout(down, 1000)
          }
        }
        setTimeout(down, 1000)
      }
    },
    // 选取文件后自动回调，里面可以获取到文件
    beforeUpload(file) {
      this.localFiles = file.raw
      const reader = new FileReader()
      reader.readAsDataURL(this.localFiles)
      // 转换成功后的操作，reader.result即为转换后的DataURL ，
      // 它不需要自己定义，你可以console.log(reader.result)看一下
      reader.onload = () => {
        console.log(reader.result)
      }
    },
    upload() {
      var file = document.getElementById('file')
      var fileList = file.files
      // 操作文件
      this.handleFiles(fileList)
      return false
    },
    async handleFiles(fileList) {
      var i = 0
      while (i < fileList.length) {
        console.log('=================================================')
        console.log('开始处理第' + i + '个文件, 文件是' + fileList[i]['name'] + '大小是:' + fileList[i]['size'])
        var targetFile = fileList[i]
        // totalSize += targetFile.size
        await this.uploadFile(targetFile, i)
        i++
        if (i == fileList.length) return
      }
    },
    async uploadFile(targetFile, index) {
      // console.log(targerFile)
      var pieceSize = 1024
      var tmp = targetFile.name.split('.')
      var filename = 'file-' + guid() + '.' + tmp[tmp.length - 1]
      var fileSize = targetFile.sieze
      var total = Math.cell(fileSize / pieceSize)

      await handle()

      async function handle() {
        var i = 0
        var start = 0
        var end = 0
        while (i < total) {
          end = start + pieceSize

          if (end >= fileSize) {
            end = fileSize
          }

          console.log('文件的index:' + index + '| 处理文件切片 i:' + i, 'start:' + start, 'end:' + end)
          var frag = targetFile.slice(start, end)

          await this.send(filename, frag, i, total, function() {
            console.log('文件的index:' + index + '| 切片上传完成 回调 res111', i)
          })
          start = end
          i++
        }
      }
    },
    async send(filename, frag, index, total, cb) {
      var formData = new FormData()
      var fragname = 'frag-' + guid()

      formData.append('filename', filename)
      formData.append('fragname', fragname)
      formData.append('file', frag)
      formData.append('fragindex', index)
      formData.append('total', total)

      await this.ajax({
        url: '/api/admin/materials',
        type: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false
      }).done(function(res) {
        // console.log('res:' + index);
        cb && cb()
      }).fail(function(res) {
      })
    },
    uploadError(err) {
      console.log(err)
      this.$message({
        type: 'error',
        message: '上传失败！'
      })
    },
    // 上传成功时
    uploadSuccess(response) {
      if (response.success) {
        this.changePages(1)
        this.fileList = []
        this.params.title = null
        this.$message({
          type: 'success',
          message: '上传成功！'
        })
      } else {
        this.$message({
          type: 'error',
          message: response.err_msg
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.manage-excel .title {
  font-size: 1.3em;
}
.manage-excel .button {
  margin: 0.5em 0;
}
.title {
  font-size: 25px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  transform: scale(0.94, 1.08);
  margin-bottom: 15px;
  margin-left: -1.0em;
  margin-top: 0.3em;
}

@media screen and (max-width: 1000px) {
  .manage-dev{
    .title-line {
      font-size: 16px;
      .title {
        width: 80px;
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 16px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 15px;
    }
    .el-table .cell {
      font-size: 15px;
    }
    .el-table th, .el-table td {
      padding: 8px 0;
    }
    .button {
      transform: scale(0.85,0.85);
      margin-left: -30px;
    }
  }
}

@media screen and (max-width: 700px) {
  .manage-dev{
    .title-line {
      font-size: 14px;
      .title {
        width: 80px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 14px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 14px;
    }
    .el-table .cell {
      font-size: 14px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
    }
    .button {
      transform: scale(0.80,0.80);
      margin-left: -30px;
    }
  }
}

@media screen and (max-width: 410px) {
  .manage-dev{
    .title-line {
      font-size: 12px;
      .title {
        width: 70px;
        font-size: 12px;
        margin-left: 6px;
      }
    }
    .table-tab {
      .el-tabs__nav {
        .el-tabs__item {
          font-size: 12px;
        }
      }
    }
    .el-table th > .cell {
      font-size: 12px;
    }
    .el-table .cell {
      font-size: 12px;
    }
    .el-table th, .el-table td {
      padding: 4px 0;
    }
    .button {
      transform: scale(0.70,0.70);
      margin-left: -35px;
      margin-top: -5px;
    }
  }
}
</style>
