import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home'
import HomeNotice from './views/Home/Notice'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './element-variables.scss'

import Mainlayout from './layouts/Mainlayout'

import TinyMce from './components/TinyMce'

import Note from './views/Note'
import NoteAll from './views/Note/All'
import NoteCommit from './views/Note/Commit'
import NoteMine from './views/Note/Mine'

import Panel from './views/Panel'
import PanelNotification from './views/Panel/PanelNotification'
import PanelMaterial from './views/Panel/PanelMaterial'
import PanelNote from './views/Panel/PanelNote'
import PanelRecruit from './views/Panel/PanelRecruit'

import Manage from './views/Manage'
import ManageCheck from './views/Manage/ManageCheck'
import ManageExamine from './views/Manage/ManageExamine'
import ManageExcel from './views/Manage/ManageExcel'
import ManageTeam from './views/Manage/ManageTeam'

import LoginCallback from './views/LoginCallback/index'

import Practice from './views/Practice'
import Enter from './views/Practice/TeamInfo/Enter'
import GetInfo from './views/Practice/TeamInfo/GetInfo'
import TeamInf from './views/Practice/TeamInfo/TeamInf'
import SelfInfo from './views/Practice/SelfInfo'
import SelfInfoEdit from './views/Practice/SelfInfo/Edit'


import Recruit from './views/Recruit'
import Square from './views/Recruit/RecruitSquare'
import Publish from './views/Recruit/RecruitPublish'
import Personal from './views/Recruit/RecruitPersonal'
import Unfinished from './views/Recruit/RecruitUnfinished'


import Message from './views/Message'
import MessageAll from './views/Message/MessageAll/index'
import SuggestionAll from './views/Message/SuggestionAll/index'



Vue.use(Router)
Vue.use(ElementUI);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'MainLayout',
      component: Mainlayout,
      redirect: '/home',
      children: [
        {
          path: 'home',                 //头顶导航条：首页
          name: 'Home',
          component: Home
        },
        {
          path: 'editor',                 
          name: 'Editor',
          component: TinyMce
        },
        {
          path: 'home/notice/:id',
          name: 'HomeNotice',
          component: HomeNotice
        },
        {
          path: 'note',             //头顶导航条：留言板
          name: 'Note',
          component: Note,
          redirect: '/note/all',
          children: [
            {
              path: 'all',
              name: 'NoteAll',
              component: NoteAll
            },
            {
              path: 'commit',
              name: 'NoteCommit',
              component: NoteCommit
            },
            {
              path: 'mine',
              name: 'NoteMine',
              component: NoteMine
            }
          ]
        },

        {
          path: 'practice',            //头顶导航条：社会实践
          name: 'Practice',
          component: Practice
        },

        {
          path: 'practice/getselfinfo',               //社会实践---步骤0.填写个人基础信息
          name: 'GetSelfInfo',
          component: SelfInfo
        },
        {
          path: 'practice/selfinfoedit',               //社会实践---修改个人基础信息
          name: 'SelfInfoEdit',
          component: SelfInfoEdit
        },
        {
          path: 'practice/getinfo',               //社会实践---步骤1.填写个人信息
          name: 'GetInfo',
          component: GetInfo
        },
        {
          path: 'practice/teaminf',               //社会实践---步骤2.填写队伍以及项目名称
          name: 'TeamInf',
          component: TeamInf
        },
        {
          path: 'practice/enter',               //社会实践---步骤2.填写队伍以及项目名称
          name: 'Enter',
          component: Enter
        },


        {                             //头顶导航条：队友招募
          path: 'recruit',
          name: 'Recruit',
          component: Recruit,
          redirect: '/recruit/square',
          children: [
            {
              path: 'square',           ////队友招募导航：招募广场
              name: 'RecruitSquare',
              component: Square
            },
            {
              path: 'publish',           ////队友招募导航：我要发布
              name: 'RecruitPublish',
              component: Publish
            },
            {
              path: 'personal',           ////队友招募导航：我的发布
              name: 'RecruitPersonal',
              component: Personal
            },
            {
              path: 'unfinished',           ////队友招募导航：我的发布
              name: 'RecruitUnfinished',
              component: Unfinished
            },
          ]
        },


        {
          path: '/panel',                  //头顶导航条：信息管理
          name: 'Panel',
          component: Panel,
          redirect: '/panel/notification',
          children: [
            {
              path: 'notification',
              component: PanelNotification
            },
            {
              path: 'material',
              component: PanelMaterial
            },
            {
              path: 'note',
              component: PanelNote
            },
            {
              path: 'recruit',
              component: PanelRecruit
            },
          ]
        },


        {
          path: '/manage',
          name: 'Manage',
          component: Manage,
          redirect: '/manage/check',
          children: [
            {
              path: 'check',
              component: ManageCheck,
            },
            {
              path: 'examine',
              component: ManageExamine,
            },
            {
              path: 'team',
              component: ManageTeam,
            },
            {
              path: 'excel',
              component: ManageExcel,
            },
          ]
        },

        {
          path: '/message',
          name: 'Message',
          component: Message,
          redirect: '/message/msgall',
          children: [
            {
              path: 'msgall',
              component: MessageAll,
            },
            {
              path: 'sgsall',
              component: SuggestionAll,
            },
          ]
        }
      ]
    },
    {
      path: '/login/callback',
      name: 'LoginCallback',
      component: LoginCallback
    },
  ]
})

/**
 * 初始化结束前禁止访问以下路由
 */
const rejectList = [
  '/panel',
  '/manage'
]

router.beforeEach((to, from, next) => {
  let online = store.state.online;
  let details = store.getters.hasDetails;
  if (to.path == '/' || to.path == '/home') {
    next();
  } else {
    if (details) {
      if (to.path == '/practice/getselfinfo') {
        next('/');
      } else {
        next();
      }
    }
    if (!online) {
      for (let i in rejectList) {
        let rej = rejectList[i];
        if (to.path.indexOf(rej) == 1) {
          next('/');
        }
      }
      next();
    } else {
      next();
    }
  }
})

export default router