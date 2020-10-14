/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2020-01-04 18:04:44
 * @LastEditTime : 2020-01-04 19:35:21
 * @Description:
 */
import Vue from 'vue'
import router from '.'
import store from '../store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Notification } from 'element-ui'
import { setDocumentTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, SET_LOCKER } from '@/config/variableInit'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // set document title
  if (to.meta) {
    document.title = setDocumentTitle(to.meta, process.env.VUE_APP_GLOBAL_TITLE)
  }
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/login') {
      next({ path: '/dashboard/index' })
      NProgress.done()
    } else {
      // to locker
      if (to.path === '/locker') {
        Vue.ls.get(SET_LOCKER) ? next() : next({ path: '/dashboard/index', replace: true })
        return
      }
      // not to locker but isLocked
      if (Vue.ls.get(SET_LOCKER)) {
        next({ path: '/locker' })
        NProgress.done()
        return
      }
      // when no permissions
      if (store.getters.permissions.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            const permissions = res && res.permissions
            store.dispatch('GenerateRoutes', permissions).then(_ => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            Notification.error({
              title: '错误',
              message: '请求用户信息失败，请重试'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
