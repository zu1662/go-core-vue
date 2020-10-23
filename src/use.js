/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-31 16:54:16
 * @LastEditTime : 2020-10-23 10:40:19
 * @Description: 自定义的一些插件，在这里引入
 */

import Vue from 'vue'

// directives
import '@/directives/waves'
import '@/directives/highlight'

// filters
import './filters'

// errorLog
import '@/plugins/errorLog'

// log plugin
import LogPlugin from '@/plugins/log'

// svg icons
import '@/icons'

// img lazyload
import VueLazyload from 'vue-lazyload'

// <row-transition> same as element-ui el-collspe-trasition
import RowTransition from '@/components/RowTransition'

import Pagination from '@/components/Pagination'
import { DICT_ALL } from './config/variableInit'
// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}

Vue.prototype.getDictList = function (typeCode) {
  const dictAll = Vue.ls.get(DICT_ALL)
  if (dictAll) return dictAll[typeCode]
  return []
}

Vue.prototype.getDictVal = function (typeCode, val) {
  const dictAll = Vue.ls.get(DICT_ALL)
  if (dictAll) {
    const nowList = dictAll[typeCode] || []
    const nowDictData = nowList.find(item => {
      return item.dictValue === val
    })
    if (nowDictData) return nowDictData.dictLabel
  }
  return val
}

Vue.use(VueLazyload)
Vue.use(LogPlugin)
Vue.component(RowTransition.name, RowTransition)
