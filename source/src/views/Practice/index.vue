<template>
  <div class="practice">
    <div id="container" class="max-container">
      <side-line></side-line>
      <div id="main-container" v-loading="loading" class="main-container">
        <div class="participate">
          <div class="header">
            <h2>加入队伍</h2>
            <p style="font-weight: bold;">
              现在你有两种办法进入一支队伍：
            </p>
          </div>
          <div class="choice">
            <!-- <p class="noCreate" style="color:red; margin:-45px 0 0 0px; padding-bottom:40px;">
              在6月27日0:00之后无法创建队伍和加入队伍！！
            </p> -->
            <div class="choice-1">
              <p style="height:50px; margin-top:-30px;">
                1. 自行创建队伍并且完成立项
              </p>
              <el-button id="create-button" type="primary" @click="toCreate()">
                创建队伍
              </el-button>
            </div>
            <div class="choice-2">
              <p style="height:50px; margin-top:-20px">
                2. 通过队伍口令加入队伍
              </p>
              <el-button id="join-button" type="primary" @click="toEnter()">
                加入队伍
              </el-button>
            </div>
          </div>
        </div>
        <el-button id="check-button" type="primary" @click="viewTeams()">
          查看我已加入的队伍
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SideLine from './SideLine'
import { mapGetters, mapMutations } from 'vuex'
import { getAllTeamInfo } from '@/api/team'
import { setTimeout } from 'timers'

export default {
  name: 'Practice',
  components: {
    SideLine
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      cas_user: 'cas_user',
      active: 'active',
      secondLoad: 'secondLoad'
    }),
    active() {
      if (this.cas_user.has_details == 1) {
        return 1
      } else {
        return 0
      }
    }
  },
  created() {
    setTimeout(() => {
      this.reload()
    }, 200)
    setTimeout(() => {
      this.loading = false
    }, 500)
    document.getElementById('main-layout-main').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  mounted() {
    document.getElementById('main-layout-main').scrollIntoView({ block: 'end', behavior: 'smooth' })
  },
  methods: {
    ...mapMutations({
      setUncreated: 'setUncreated',
      setActive: 'setActive'
    }),
    async getTeams() {
      try {
        const data = await getAllTeamInfo()
        if (!data.total == 0) {
          this.setActive(1)
        }
      } catch (message) {
        this.$message.warning(message)
      }
    },
    toCreate() {
      this.setUncreated(true)
      this.$router.push('/practice/getinfo')
    },
    toEnter() {
      this.$router.push('/practice/enter')
    },
    viewTeams() {
      this.$router.push('/practice/teaminf')
    },
    async reload() {
      try {
        if (this.cas_user.has_details == 0) {
          this.$router.push('/practice/getselfinfo')
        } else if (this.cas_user.has_details == 1) {
          if (!this.active == 0 && !this.secondLoad == 0) {
            this.$router.push('/practice/teaminf')
          } else {
            this.$router.push('/practice')
          }
        }
        const data = await this.getTeams()
      } catch (message) {
        this.$message.warning(message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.practice {
  width: 100%;
}

.main-container {
  margin-top: 50px;
}

.choice {
  margin-top: 50px;
}

.choice-1 {
  display: flex;
  margin-bottom: 2vw;
}

.choice-2 {
  display: flex;
}

#create-button {
  height: 38px;
  margin: -2vw 0 0 20px;
}

#join-button {
  height: 38px;
  margin: -1.6vw 0 0 50px;
}

.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

@media screen and (max-width: 900px) {
  .main-container {
    font-size: 12px;
  }

  .choice-1,
  .choice-2 {
    flex-direction: column;
  }

  #create-button,
  #join-button {
    width: 85px;
    height: 35px;
    margin: -20px 0 20px 0px;
    font-size: 12px;
  }
}

@media screen and (max-width: 660px) {
  #create-button,
  #join-button,
  #check-button {
    transform: scale(0.85,0.85)
  }
  #check-button {
    margin: -8px;
  }
}

@media screen and (max-width: 500px) {
  #create-button,
  #join-button,
  #check-button {
    transform: scale(0.78,0.88)
  }
  #check-button {
    margin-top: -20px;
    padding-bottom: 15px;
  }
  .participate {
    margin-top: -40px;
  }
}

@media screen and (max-width: 400px) {
  #create-button,
  #join-button {
    transform: scale(0.73,0.73)
  }
  #check-button {
    transform: scale(0.70,0.70);
    margin: -20px;
  }
}
</style>
