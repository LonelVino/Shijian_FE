<template>
  <el-pagination
    class="fit-pager"
    :pager-count="7"
    :page-size="pagination.pageSize"
    :total="pagination.total"
    @current-change="send">
  </el-pagination>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FitPager',
  props: {
    pagination: Object,
  },
  methods: {
    send() {
      console.log('改变页面重新获取数据')
    }
  },
}
</script>

<style lang="scss">
.fit-pager {
  @media screen and (max-width: 440px) {
    ul.el-pager {
      display: none;
    }
  }
  @media screen and (max-width: 330px) {
    span.el-pagination__total {
      display: none;
    }
  }
}
</style>
