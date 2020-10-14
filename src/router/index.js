import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router'

// 解决路由地址跳转相同的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.VUE_APP_BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
