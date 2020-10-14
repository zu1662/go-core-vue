/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-12-23 15:41:47
 * @LastEditTime: 2019-12-27 11:41:52
 * @Description: 权限插件，用于控制页面按钮等权限
 */
import store from '@/store'

const PerssionPlugin = {}

// v-if="$auth('product:product:update')"
PerssionPlugin.install = (Vue) => {
  Vue.prototype.$auth = permissions => {
    const [type1, type2] = permissions.split(':')
    const permissionList = store.getters.roles
    let flag = false
    const firstRoles = permissionList && permissionList.find((firstType) => {
      return firstType.code === `${type1}`
    })

    const secondRoles = firstRoles && firstRoles.children.find((secondType) => {
      return secondType.code === `${type1}:${type2}`
    })
    const actionRoles = secondRoles && secondRoles.children.find((actionType) => {
      return actionType.code === permissions
    })

    if (actionRoles && actionRoles.statusTag === '1') {
      flag = true
    }
    return flag
  }
}

export default PerssionPlugin
