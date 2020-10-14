import Vue from 'vue'
import { changeTheme } from '@/utils/domUtil'
import {
  GLOBAL_COLOR,
  GLOBAL_THEME,
  SHOW_SETTINGS,
  TAGS_VIEW,
  FIXED_HEADER,
  SIDEBAR_LOGO,
  LAYOUT_TYPE
} from '@/config/variableInit'

const mapping = {
  theme: GLOBAL_THEME,
  color: GLOBAL_COLOR,
  showSettings: SHOW_SETTINGS,
  tagsView: TAGS_VIEW,
  fixedHeader: FIXED_HEADER,
  sidebarLogo: SIDEBAR_LOGO,
  layoutType: LAYOUT_TYPE
}

const settings = {
  state: {
    theme: 'default',
    color: '#409EFF',
    showSettings: true,
    tagsView: true,
    fixedHeader: true,
    sidebarLogo: true,
    layoutType: 'sidebar'
  },
  mutations: {
    CHANGE_SETTING: (state, { key, value }) => {
      if (key === 'theme') changeTheme(value)
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = value
        Vue.ls.set(mapping[key], value)
      }
    }
  },
  actions: {
    changeSetting ({ commit }, data) {
      commit('CHANGE_SETTING', data)
    }
  }
}

export default settings
