import Vue from 'vue'
import store from '@/store/'
import {
  ACCESS_TOKEN,
  SET_LOCKER,
  LOCKER_PSW,
  LOCKER_REDIRECT,
  GLOBAL_COLOR,
  GLOBAL_THEME,
  SHOW_SETTINGS,
  TAGS_VIEW,
  FIXED_HEADER,
  SIDEBAR_LOGO,
  LAYOUT_TYPE
} from '@/config/variableInit'

import { settings } from '@/config/defaultSetting'

export default function Initializer () {
  // console.log(`API_URL: ${process.env.BASE_URL}`)

  // 判断是首次进入还是刷新。首次进入清除locker信息
  if (window.name === '') { // 首次进入
    Vue.ls.remove(SET_LOCKER)
    Vue.ls.remove(LOCKER_PSW)
    Vue.ls.remove(LOCKER_REDIRECT)
    window.name = 'isReload'
  }

  store.commit('CHANGE_SETTING', { key: 'color', value: Vue.ls.get(GLOBAL_COLOR, settings.color) })
  store.commit('CHANGE_SETTING', { key: 'theme', value: Vue.ls.get(GLOBAL_THEME, settings.theme) })
  store.commit('CHANGE_SETTING', { key: 'showSettings', value: Vue.ls.get(SHOW_SETTINGS, settings.showSettings) })
  store.commit('CHANGE_SETTING', { key: 'tagsView', value: Vue.ls.get(TAGS_VIEW, settings.tagsView) })
  store.commit('CHANGE_SETTING', { key: 'fixedHeader', value: Vue.ls.get(FIXED_HEADER, settings.fixedHeader) })
  store.commit('CHANGE_SETTING', { key: 'sidebarLogo', value: Vue.ls.get(SIDEBAR_LOGO, settings.sidebarLogo) })
  store.commit('CHANGE_SETTING', { key: 'layoutType', value: Vue.ls.get(LAYOUT_TYPE, settings.layoutType) })

  store.commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
}
