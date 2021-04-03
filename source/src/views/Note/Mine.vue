<template>
  <div class="note-mine">
    <h2 class="title-h2">
      我的留言
    </h2>
    <pager
      :page-size="10"
      :request-func="getList"
      :error-msg="'无法获取我的留言'"
    >
      <el-table slot-scope="props" border class="note-mine-table" :data="props.list">
        <el-table-column label="查看内容" width="90" type="expand">
          <template slot-scope="props">
            <note-info :info="props.row" />
          </template>
        </el-table-column>
        <el-table-column label="发表时间" width="200" prop="create_time">
        </el-table-column>
        <el-table-column label="标题" width="120" prop="title" class-name="title">
        </el-table-column>
        <el-table-column label="摘要" prop="content" class-name="abstract">
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="props">
            <el-tag v-if="props.row.status==1">
              已回复
            </el-tag>
            <el-tag v-else type="warning">
              未回复
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </pager>
  </div>
</template>

<script>
import NoteInfo from '@/components/NoteInfo'
import Pager from '@/components/ArtPager'
import { getMyNote } from '@/api/note'

export default {
  components: {
    NoteInfo,
    Pager
  },
  methods: {
    getList: getMyNote
  }
}
</script>

<style lang="scss" scoped>
.note-mine-table .title .cell,
.note-mine-table .abstract .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style lang="scss">
.note-mine {
  .title-h2 {
    margin: 1em 0 1em 0;
  }
}

@media screen and (max-width: 940px) {
  .note-mine {
    .title-h2 {
      font-size: 14px;
      margin: 0.6em 0 0.8em 0;
    }
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
  .note-mine {
    .title-h2 {
      font-size: 12px;
      margin: 0.5em 0 0.6em 0;
    }
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
