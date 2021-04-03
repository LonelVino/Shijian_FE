<template>
  <div class="navmenu">
    <router-link class="tag" to="/home">
      <img class="image" src="@/assets/ui/taghouse.png">
      <span id="text-home" class="text">
        首 页
      </span>
    </router-link>
    <router-link class="tag" to="/practice">
      <img class="image" src="@/assets/ui/tagkids.png">
      <span class="text">
        社会实践
      </span>
    </router-link>
    <router-link class="tag" to="/note">
      <img class="image" src="@/assets/ui/tagchat.png">
      <span class="text">
        留言板
      </span>
    </router-link>
    <router-link class="tag" to="/recruit">
      <img class="image" src="@/assets/ui/tagflag.png">
      <span class="text">
        队友招募
      </span>
    </router-link>
    <router-link class="tag" to="/message">
      <img class="image" src="@/assets/ui/tagchat.png">
      <span class="text">
        消息中心
      </span>
    </router-link>
    <router-link v-if="hasManageRole" class="tag" to="/manage">
      <img class="image" src="@/assets/ui/tagflag.png">
      <span class="text">
        队伍管理
      </span>
    </router-link>
    <router-link v-if="hasPanelRole" class="tag" to="/panel">
      <img class="image" src="@/assets/ui/tagflag.png">
      <span class="text">
        信息管理
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  computed: {
    ...mapGetters({
      canManage: 'canManage',
      canPanel: 'canPanel',
      isAdmin: 'isAdmin',
      hasDetails: 'hasDetails'
    }),
    hasManageRole() {
      return !!(this.canManage || this.isAdmin)
    },
    hasPanelRole() {
      return !!(this.canPanel || this.isAdmin)
    }
  }
}
</script>

<style scoped>
.navmenu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.tag {
  margin-top: 1.4vw;
  margin-bottom: 0vw;
  width: 13vw;
  height: 5.6vw;
  text-decoration: none;
  background-image: url(~@/assets/ui/tag.png);
  background-size: 100% 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag:hover,
.router-link-active {
  margin-top: 1vw;
  margin-bottom: 0;
  width: 16vw;
  height: 6.5vw;
  background-image: url(~@/assets/ui/tag-1.png);
  background-size: 100% 100%;
}

.image {
  margin-left: 1.8vw;
  width: 3vw;
  height: 2.8vw;
}

.text {
  text-align: center;
  margin-right: 0.4vw;
  font-size: 1.6vw;
  font-family: "Microsoft YaHei";
  color: rgb(255, 255, 255);
  font-weight: bold;
  transform: scale(0.94, 1.08);
}

.tag:hover .image,
.router-link-active .image {
  margin-left: 3.5vw;
  transform: scale(1.57, 1.57);
}

.tag:hover .text,
.router-link-active .text {
  font-size: 2.1vw;
}

@media screen and (max-width: 540px) {
  .image {
    width: 0;
    margin-right: -20px;
  }
  span {
    width: 100vw;
  }
  .text {
    margin-left: 20px;
    transform: scale(0.70,0.70);
    white-space: nowrap;
    text-overflow: ellipsis;
     overflow: hidden;
  }
  .tag:hover .text,
  .router-link-active .text {
    transform: scale(0.90,0.90)
  }
}

@media screen and (max-width: 410px) {
  .tag {
    justify-content: flex-end;
  }

  .image {
    margin-right: -30px;;
  }

  .text {
    margin-right: 0;
    transform: scale(0.70 , 0.70)
  }
  .tag:hover .text,
  .router-link-active .text {
    transform: scale(0.80,0.80)
  }
}

@media screen and (max-width: 375px) {
  .tag {
    justify-content: flex-end;
  }

  .image {
    margin-right: -20px;
  }

  .tag:hover .text,
  .router-link-active .text {
    transform: scale(0.65,0.65)
  }
}

@media screen and (max-width: 325px) {
  .image {
    margin-right: -20px;
  }

  .tag:hover .text,
  .router-link-active .text {
    transform: scale(0.60,0.60)
  }
}
</style>
