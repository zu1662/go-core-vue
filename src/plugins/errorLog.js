import Vue from 'vue'
import store from '@/store'
import { isString, isArray } from '@/utils/validate'
import { errorLog } from '@/config/defaultSetting'

// you can set in defaultSetting.js
// errorLog:'production' | ['production', 'development']

function checkNeed () {
  const env = process.env.NODE_ENV
  if (isString(errorLog)) {
    return env === errorLog
  }
  if (isArray(errorLog)) {
    return errorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function (err, vm, info) {
    const time = new Date().getTime()
    Vue.nextTick(() => {
      store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        time,
        url: window.location.href
      })
      // eslint-disable-next-line no-console
      console.error(err, info)
    })
  }
}
