import { asyncRouterMap, constantRouterMap } from '@/router/router'

/**
 * 递归permissions，赋予当前route是否存在权限
 * @param permissions
 * @param route
 */
function getRouterPermission (permissions, route) {
  for (let i = 0, len = permissions.length; i < len; i++) {
    if (route.meta.permissionCode === permissions[i].code) {
      if (permissions[i].status === 1) {
        return true
      }
    } else if (permissions[i].children && permissions[i].type <= 1) {
      const nextFlag = getRouterPermission(permissions[i].children, route)
      if (nextFlag) return true
    }
  }
  return false
}

/**
 * 根据permissions，判断当前route是否存在权限
 * @param permissions
 * @param route
 */
function hasPermission (permissions, route) {
  if (route.meta && route.meta.permissionCode) {
    const flag = getRouterPermission(permissions, route)
    return flag
  }
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param permissions
 */
function filterAsyncRouter (routes, permissions) {
  const accessedRouters = routes.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const permissions = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, permissions)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
