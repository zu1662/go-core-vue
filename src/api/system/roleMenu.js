import { service } from '@/utils/request'

const api = {
  RoleMenuList: '/rolemenu/list',
  UpdateRoleMenu: '/rolemenu/update'
}

// 分页数据
export function GetRoleMenuList (params) {
  return service({
    url: api.RoleMenuList,
    method: 'get',
    params
  })
}

// 修改
export function updateRoleMenu (data) {
  return service({
    url: api.UpdateRoleMenu,
    method: 'post',
    data: data
  })
}
