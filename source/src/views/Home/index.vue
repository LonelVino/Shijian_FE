<template>
  <div>
    <div class="block">
      <div class="bar">
        <img class="image" src="@/assets/ui/what.png">
        <span class="title">
          什么是社会实践？
        </span>
      </div>
      <!-- <el-collapse>
        <el-collapse-item title="社会实践" name="1">
          <div><p style="text-indent:2em;">  所谓社会实践即假期实习或是在校外实习，通过开展丰富的社会实践活动，使同学们逐步了解社会，开拓视野，增长才干，并在社会实践活动中认清自己的位置，发现自己的不足，对自身价值进行客观的评价。这在无形中使我们对自己有一个正确的定位，增强了我们努力学习的信心和毅力。作为一名大学生，很快也将走上社会，所以提早走进社会，认识社会，适应社会是必要且有意义的。</p></div>
          <div><p style="text-indent:2em;">  西安交通大学的社会实践活动从上世纪八十年代开展至今，已有三十多年的历史。通过实地考察、问卷调查等方式使同学们近距离观察了解社会。三十余年来，一批又一批的同学参与于此，树立了人生的目标，确立了未来的方向，对之后的道路有了更多的憧憬与期待。交大社会实践已经成为交大学子开拓视野、增长才干的上佳平台。</p></div>
        </el-collapse-item>
      </el-collapse> -->
      <p class="p1">
        社会实践是大学生思想政治教育的重要环节，对于促进大学生了解社会、了解国情、增长才干、奉献社会、锻炼毅力、培养品质、增强社会责任感等具有不可替代的作用。通过开展丰富的社会实践活动，使同学们逐步了解社会，开拓视野，增长才干，并在社会实践活动中认清自己的位置，发现自己的不足，对自身价值进行客观的评价。这在无形中使我们对自己有一个正确的定位，增强了我们努力学习的信心和毅力。作为一名大学生，很快也将走上社会，所以提早走进社会，认识社会，适应社会是必要且有意义的。
      </p>
      <p class="p2">
        西安交通大学的社会实践活动从上世纪八十年代开展至今，已有三十多年的历史。通过实地调研、问卷调查等方式使同学们近距离观察了解社会。三十余年来，一批又一批的同学参与于此，树立了人生的目标，确立了未来的方向，对之后的道路有了更多的憧憬与期待。交大社会实践将不断为交大学子提供开拓视野、增长才干的优秀平台。
      </p>
    </div>
    <div class="block">
      <div class="bar">
        <img class="image" src="@/assets/ui/notice.png">
        <span class="title">
          实践公告
        </span>
      </div>
      <pager :page-size="6" :request-func="getNotice" :error-msg="'无法获取实践公告'">
        <template slot-scope="props">
          <linkk
            v-for="(v,k) in props.list"
            :id="v.notification_id"
            :key="k"
            class="link"
            :title="v.title"
            router
          />
        </template>
      </pager>
    </div>
    <div class="block">
      <div class="bar">
        <img class="image" src="@/assets/ui/download.png">
        <span class="title">
          资料下载
        </span>
      </div>
      <pager :page-size="6" :request-func="getGuide" :error-msg="'无法获取资料列表'">
        <template slot-scope="props">
          <linkk
            v-for="(v,k) in props.list"
            :id="v.guide_id"
            :key="k"
            class="link"
            :title="v.title"
          />
        </template>
      </pager>
    </div>
  </div>
</template>

<script>
import Linkk from './Link'
import Pager from '@/components/ArtPager'
import { getAllNotification } from '@/api/notification'
import { getAllGuide } from '@/api/guide'

export default {
  name: 'Home',
  components: {
    Linkk,
    Pager
  },
  methods: {
    getNotice: getAllNotification,
    getGuide: getAllGuide
  }
}
</script>

<style lang="scss" scoped>

.block + .block {
  margin-top: 2.5vw;
}

.block {
  p {
    text-indent: 5vw;
    font-size: 1.2vw;
    font-family: "Microsoft YaHei";
    color: rgb(78, 64, 53);
    font-weight: bold;
  }
}

.bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 10px;
  font-size: 30px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
  transform: scale(0.94, 1.08);
}

.el-collapse-item,
.el-collapse-item__header  {
  font-size: 20px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  font-weight: bold;
}

.el-collapse-item__header {
  margin-left: 20px;
}

.text {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  color: rgb(78, 64, 53);
  transform: scale(0.94, 1.08);
}

.link {
  margin-top: 16px;
  margin-left: 32px;
}

@media screen and (max-width: 1300px) {
  .block {
    p {
      font-size: 1.5vw;
    }
  }
}

@media screen and (max-width: 900px) {
  .image {
    height: 45px;
  }

  .block {
    font-size: 12px;
    .p2 {
      height: 0;
      opacity: 0;
    }
  }

  .title {
    font-size: 16px;
  }
}

@media screen and (max-width: 600px) {
  .image {
    height: 40px;
  }

  .block {
    font-size: 10px;
  }

  .title {
    font-size: 14px;
  }

  .link {
    margin-top: 1vw;
    margin-left: 32px;
  }
}

@media screen and (max-width: 410px) {
  .image {
    height: 35px;
  }

  .block p {
    margin-top: -2.5em;
    margin-bottom: -3.5em;
    transform: scale(0.70, 0.70);
  }

  .title {
    transform: scale(0.85, 0.85);
  }
}
</style>
