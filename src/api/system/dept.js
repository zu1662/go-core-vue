import { service } from '@/utils/request'

const api = {
  DeptTree: '/dept/tree'
}

// 查询部门下拉树结构
export function GetDeptTree (params) {
  return service({
    url: api.DeptTree,
    method: 'get',
    params
  })
}

export function getDeptList (query) {
  return service({
    url: '/api/v1/deptList',
    method: 'get',
    params: query
  })
}

// 查询部门详细
export function getDept (deptId) {
  return service({
    url: '/api/v1/dept/' + deptId,
    method: 'get'
  })
}

// 根据角色ID查询部门树结构
export function roleDeptTreeselect (roleId) {
  return service({
    url: '/api/v1/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增部门
export function addDept (data) {
  return service({
    url: '/api/v1/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept (data) {
  return service({
    url: '/api/v1/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept (deptId) {
  return service({
    url: '/api/v1/dept/' + deptId,
    method: 'delete'
  })
}
