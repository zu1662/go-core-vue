import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import user from './modules/user'
import i18n from './modules/i18n'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    settings,
    tagsView,
    errorLog,
    user,
    i18n,
    permission
  },
  getters
})
