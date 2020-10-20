import { service } from '@/utils/request'

const api = {
  RoleList: '/role/list',
  RoleAll: '/role/listall',
  UpdateRole: '/role/update',
  AddRole: '/role/add',
  DelRole: '/role/delete',
  RoleInfo: '/role/info'
}

// 分页数据
export function GetRoleList (params) {
  return service({
    url: api.RoleList,
    method: 'get',
    params
  })
}

// 全部数据
export function GetRoleAll (params) {
  return service({
    url: api.RoleAll,
    method: 'get',
    params
  })
}

// 修改
export function updateRole (data) {
  return service({
    url: api.UpdateRole,
    method: 'put',
    data: data
  })
}

// 新增
export function addRole (data) {
  return service({
    url: api.AddRole,
    method: 'post',
    data: data
  })
}

// 删除
export function delRole (id) {
  return service({
    url: api.DelRole + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getRoleInfo (id) {
  return service({
    url: api.RoleInfo + `/${id}`,
    method: 'get'
  })
}
