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
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "Register" */ '@/views/login/Register')
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

      // dashboard
      {
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: PageView,
        meta: { title: '系统管理', keepAlive: true, permissionCode: 'system' },
        children: [
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/user/index'),
            meta: { title: '用户管理', titlePath: 'system.user', keepAlive: true, icon: 'dashboard', permissionCode: 'system:user', affix: false }
          },
          {
            path: '/system/dept',
            name: 'dept',
            component: () => import('@/views/dept/index'),
            meta: { title: ' 部门管理', titlePath: 'system.dept', keepAlive: true, icon: 'dashboard', permissionCode: 'system:user', affix: false }
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/role/index'),
            meta: { title: ' 角色管理', titlePath: 'system.role', keepAlive: true, icon: 'dashboard', permissionCode: 'system:role', affix: false }
          },
          {
            path: '/system/post',
            name: 'role',
            component: () => import('@/views/post/index'),
            meta: { title: ' 岗位管理', titlePath: 'system.post', keepAlive: true, icon: 'dashboard', permissionCode: 'system:post', affix: false }
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
            name: 'exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', titlePath: 'exception.403', permissionCode: 'exception:403' }
          },
          {
            path: '/exception/500',
            name: 'exception500',
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
