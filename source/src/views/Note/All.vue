<template>
  <div class="note-all">
    <div>
      <h2 class="title-h2">
        留言板
      </h2>
      <pager
        :page-size="6"
        :request-func="getList"
        :error-msg="'无法获取全部留言'"
        class="pager"
      >
        <el-table slot-scope="props" border :data="props.list">
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 0" type="warning">
                未回复
              </el-tag>
              <el-tag v-if="scope.row.status==1">
                已回复
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <div class="line title-link" @click="dialog=scope.row;dialogon=true">
                {{ scope.row.title }}
              </div>
              <div class="line">
                {{ scope.row.content }}
              </div>
              <div v-if="scope.row.status==1" class="line">
                回复:{{ scope.row.reply }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="信息" width="250">
            <template slot-scope="scope">
              <div class="info">
                留言作者：{{ scope.row.user_name }}
              </div>
              <div class="info">
                留言时间：{{ scope.row.create_time }}
              </div>
              <div v-if="scope.row.status==1" class="info">
                回复时间：{{ scope.row.reply_time }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </pager>
      <el-dialog
        v-dialogDrag
        title="留言详情"
        :visible.sync="dialogon"
        :fullscreen="isPhone"
      >
        <note-info v-if="dialog" :info="dialog" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NoteInfo from '@/components/NoteInfo'
import Pager from '@/components/ArtPager'
import { getAllNote } from '@/api/note'

export default {
  components: {
    NoteInfo,
    Pager
  },
  data() {
    return {
      dialogon: false,
      dialog: null
    }
  },
  computed: mapGetters({
    isPhone: 'isPhone'
  }),
  methods: {
    getList: getAllNote
  }
}
</script>

<style lang="scss" scoped>
.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-h2 {
  margin: 1em 0 1em 0;
}

.title-link {
  font-weight: bold;
  cursor: pointer;
}

.title-link:hover {
  text-decoration: underline;
}

.info {
  font-size: 12px;
}

@media screen and (max-width: 940px) {
  .title-h2 {
    font-size: 13px;
  }
  .line,
  .info {
    font-size: 13px;
  }
}

@media screen and (max-width: 540px) {
  .title-h2 {
    font-size: 12px;
  }
  .line,
  .info{
    font-size: 12px;
  }
}
</style>

<style lang="scss">
@media screen and (max-width: 940px) {
  .note-all {
    .el-table .cell {
      font-size: 15px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 540px) {
  .note-all {
    .el-table .cell {
      font-size: 12px;
    }
    .el-table th, .el-table td {
      padding: 6px 0;
      width: 80px;
    }
    .el-table th > .cell {
      font-size: 12px;
    }
  }
}
</style>
