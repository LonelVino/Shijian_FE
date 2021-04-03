import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //数据的获取处理
    online: false,
    user_info: null,           //后端存的user信息，有user_id（可以用来判断是不是队长或者副队长）
    cas_user: null,            //第一次返回的用户信息，可以用于自动填写个人信息
    personal_user: null,       //第二次返回的用户信息，用户填写好个人信息之后系统储存的
    team: null,
    //team实践按钮或者板块的显示
    currentTeamId: null,
    secondLoad: 1,
    active: 0,                //team实践中步骤监听
    uncreated: true,          //创建队伍&修改队伍信息
    isEdit: false,            //是否正在修改队伍信息
    showDepartment: false,    //是否显示职能单位
    //招募布尔值
    recruitStatus: 0,
    //屏幕大小，判断是不是手机用户端
    screenWidth: 0,
  },
  getters: {
    online: s => s.online,
    user_info: s => s.user_info,
    cas_user: state => state.cas_user,
    user_role: s => s.cas_user ? s.cas_user.role : 0,
    isLogin: s => s.cas_user ? true : false, //有待商榷
    hasDetails: s => s.cas_user ? (s.cas_user.has_details == 1) : false,
    active: (s, g) => g.hasDetails == false ? 0 : 1,
    secondLoad: s => s.secondLoad,
    canManage: (s, g) => g.user_role >= 1 ? true : false, //1代表实践公告、资料下载、留言招募管理
    canPanel: (s, g) => g.user_role >= 2 ? true : false,   //2代表审核队伍、测评队伍
    isAdmin: (s, g) => g.user_role == 3 ? true : false, //3表示超管，都可以
    personal_user: state => state.personal_user,
    team: state => state.team,
    screenWidth: state => state.screenWidth,
    //team实践按钮或者板块的显示
    currentTeamId: s => s.currentTeamId,
    isEdit: s => s.isEdit,        //是否正在修改队伍信息
    uncreated: state => state.uncreated,
    showDepartment: state=>state.showDepartment,
    //招募布尔值
    recruitStatus: state => state.recruitStatus,
    //是不是手机用户
    isPhone: s => s.screenWidth < 560,
  },
  mutations: {
    saveOnline(state, value) {
      state.online = value
    },
    setUserInfo(state, value) {
      state.user_info = value
    },
    setCasUser(state, value) {
      state.cas_user = value
    },
    setPersonalUser(state, payload) {
      state.personal_user = payload
    },
    setTeam(state, value) {
      state.team = value
    },
    setRecruitStatus(state, value) {
      state.recruitStatus = value
    },
    saveScreenWidth(state, screen) {
      state.screenWidth = screen.width
    },
    //队伍创建&实践
    saveCurrentTeamId(state, value) {
      state.currentTeamId = value
    },
    setSecondLoad(state, value) {
      state.secondLoad = value
    },
    setActive(state, value) {
      state.active = value
    },
    setIsEdit(state, value) {
      state.isEdit = value
    },
    setShowDepartment(state, value) {
      state.showDepartment = value
    },
    setUncreated(state, value) {
      state.uncreated = value
    },
  },
  actions: {
  }
})
