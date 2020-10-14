/* Layout */
import Layout from '@/layout'
import PageView from '@/layout/PageView'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/components/Redirect/index')
      }
    ]
  },
  {
    path: '/locker',
    name: 'locker',
    component: () => import(/* webpackChunkName: "Locker" */ '@/components/Locker/LockerIn.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登陆' },
    component: () => import(/* webpackChunkName: "Login" */ '@/views/user/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ '@/views/user/Register')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

/**
 * 动态路由
 * @type { *[] }
 */
export const asyncRouterMap = [

  {
    path: '/',
    name: 'home',
    redirect: '/dashboard/index',
    component: Layout,
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/index',
        component: PageView,
        meta: { title: '主页', keepAlive: true, permissionCode: 'dashboard' },
        children: [
          {
            path: '/dashboard/index',
            name: 'index',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '主页', titlePath: 'dashboard', keepAlive: true, icon: 'dashboard', permissionCode: 'dashboard:index', affix: true }
          }
        ]
      },
      // outpath
      {
        path: '/outpath',
        name: 'outpath',
        redirect: '/outpath/index',
        component: PageView,
        meta: { title: '外链', titlePath: 'outpath', keepAlive: true, permissionCode: 'outpath' },
        children: [
          {
            path: 'https://www.baidu.com',
            name: 'outIndex',
            meta: { title: '外链（百度）', titlePath: 'outpath.outpath_BD', icon: 'dashboard', permissionCode: 'outpath:outIndex' }
          }
        ]
      },

      // components
      {
        path: '/components',
        name: 'components',
        component: PageView,
        redirect: '/components/AnimateTransition',
        meta: { title: '组件', titlePath: 'components.mainTitle', icon: 'dashboard', permissionCode: 'components' },
        children: [
          {
            path: '/components/AnimateTransition',
            name: 'AnimateTransition',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/components/AnTransition.vue'),
            meta: { title: '动画过渡', titlePath: 'components.transition', permissionCode: 'components:anTransition' }
          },
          {
            path: '/components/watermark',
            name: 'watermark',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/components/WaterMark.vue'),
            meta: { title: '水印', titlePath: 'components.watermark', permissionCode: 'components:watermark' }
          },
          {
            path: '/components/highlight',
            name: 'highlight',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/components/CodeHighlight.vue'),
            meta: { title: 'code展示', titlePath: 'components.highlight', permissionCode: 'components:highlight' }
          },
          {
            path: '/components/countup',
            name: 'countup',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/components/CountUp.vue'),
            meta: { title: '数字动画', titlePath: 'components.countup', permissionCode: 'components:countup' }
          },
          {
            path: '/components/log',
            name: 'log',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/components/Log.vue'),
            meta: { title: 'log输出', titlePath: 'components.log', permissionCode: 'components:log' }
          }
        ]
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: PageView,
        redirect: '/exception/403',
        meta: { title: '异常', titlePath: 'exception.mainTitle', icon: 'dashboard', permissionCode: 'exception' },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', titlePath: 'exception.403', permissionCode: 'exception:403' }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', titlePath: 'exception.500', permissionCode: 'exception:500' }
          }
        ]
      }
    ]
  },

  {
    path: '*', redirect: '/404', hidden: true
  }

]
