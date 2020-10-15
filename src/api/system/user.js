import { service } from '@/utils/request'

const api = {
  UserList: '/user/list',
  UpdateUser: '/user/update',
  AddUser: '/user/add',
  DelUser: '/user/delete',
  UserInfo: '/user/info',
  ResetPsw: '/user/resetpsw'
}

// 查询部门下拉树结构
export function GetUserList (params) {
  return service({
    url: api.UserList,
    method: 'get',
    params
  })
}

// 修改用户
export function updateUser (data) {
  return service({
    url: api.UpdateUser,
    method: 'put',
    data: data
  })
}

// 新增用户
export function addUser (data) {
  return service({
    url: api.AddUser,
    method: 'post',
    data: data
  })
}

// 删除用户
export function delUser (id) {
  return service({
    url: api.DelUser + `/${id}`,
    method: 'delete'
  })
}

// 查询用户详细
export function getUserInfo (userId) {
  return service({
    url: api.UserInfo + `/${userId}`,
    method: 'get'
  })
}

// 导出用户
export function getUserInit (query) {
  return service({
    url: '/sysUser/export',
    method: 'get',
    params: query
  })
}
// 导出用户
export function exportUser (query) {
  return service({
    url: '/sysUser/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd (data) {
  return service({
    url: api.ResetPsw,
    method: 'put',
    data
  })
}

// 用户头像上传
export function uploadAvatar (data) {
  return service({
    url: '/user/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate () {
  return service({
    url: '/sysUser/importTemplate',
    method: 'get'
  })
}
