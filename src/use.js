/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-31 16:54:16
 * @LastEditTime : 2020-10-15 19:46:47
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

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'success' })
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}

Vue.use(VueLazyload)
Vue.use(LogPlugin)
Vue.component(RowTransition.name, RowTransition)
