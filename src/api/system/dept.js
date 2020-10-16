import { service } from '@/utils/request'

const api = {
  DeptTree: '/dept/tree',
  UpdateDept: '/dept/update',
  AddDept: '/dept/add',
  DelDept: '/dept/delete',
  DeptInfo: '/dept/info'
}

// 分页数据
export function GetDeptTree (params) {
  return service({
    url: api.DeptTree,
    method: 'get',
    params
  })
}

// 修改
export function updateDept (data) {
  return service({
    url: api.UpdateDept,
    method: 'put',
    data: data
  })
}

// 新增
export function addDept (data) {
  return service({
    url: api.AddDept,
    method: 'post',
    data: data
  })
}

// 删除
export function delDept (id) {
  return service({
    url: api.DelDept + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getDeptInfo (id) {
  return service({
    url: api.DeptInfo + `/${id}`,
    method: 'get'
  })
}
