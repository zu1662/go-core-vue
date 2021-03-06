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

      // system
      {
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: PageView,
        meta: { title: '系统管理', keepAlive: true, permissionCode: 'system', icon: 'dashboard' },
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
            name: 'post',
            component: () => import('@/views/post/index'),
            meta: { title: ' 岗位管理', titlePath: 'system.post', keepAlive: true, icon: 'dashboard', permissionCode: 'system:post', affix: false }
          },
          {
            path: '/system/menu',
            name: 'menu',
            component: () => import('@/views/menu/index'),
            meta: { title: ' 菜单管理', titlePath: 'system.menu', keepAlive: true, icon: 'dashboard', permissionCode: 'system:post', affix: false }
          },
          {
            path: '/system/dicttype',
            name: 'dicttype',
            component: () => import('@/views/dict/index'),
            meta: { title: ' 字典管理', titlePath: 'system.dicttype', keepAlive: true, icon: 'dashboard', permissionCode: 'system:dicttype', affix: false }
          },
          {
            path: '/system/dictval/:dictId',
            name: 'dictval',
            hidden: true,
            component: () => import('@/views/dict/data'),
            meta: { title: ' 字典数据管理', titlePath: 'system.dictval', keepAlive: true, icon: 'dashboard', permissionCode: 'system:dictval', affix: false }
          },
          {
            path: '/system/interface',
            name: 'interface',
            component: () => import('@/views/interface/index'),
            meta: { title: ' 接口管理', titlePath: 'system.api', keepAlive: true, icon: 'dashboard', permissionCode: '', affix: false }
          }
        ]
      },

      // system
      {
        path: '/log',
        name: 'log',
        redirect: '/log/loginlog',
        component: PageView,
        meta: { title: '日志', keepAlive: true, permissionCode: 'log', icon: 'dashboard' },
        children: [
          {
            path: '/log/loginlog',
            name: 'loginlog',
            component: () => import('@/views/loginlog/index'),
            meta: { title: '登录日志', titlePath: 'log.loginlog', keepAlive: true, icon: 'dashboard', permissionCode: 'log:loginlog', affix: false }
          },
          {
            path: '/log/operlog',
            name: 'operlog',
            component: () => import('@/views/operlog/index'),
            meta: { title: '操作日志', titlePath: 'log.operlog', keepAlive: true, icon: 'dashboard', permissionCode: 'log:operlog', affix: false }
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
