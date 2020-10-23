import { service } from '@/utils/request'

const api = {
  APITree: '/interface/tree',
  UpdateAPI: '/interface/update',
  AddAPI: '/interface/add',
  DelAPI: '/interface/delete',
  APIInfo: '/interface/info'
}

// 分页数据
export function GetAPITree (params) {
  return service({
    url: api.APITree,
    method: 'get',
    params
  })
}

// 修改
export function updateAPI (data) {
  return service({
    url: api.UpdateAPI,
    method: 'put',
    data: data
  })
}

// 新增
export function addAPI (data) {
  return service({
    url: api.AddAPI,
    method: 'post',
    data: data
  })
}

// 删除
export function delAPI (id) {
  return service({
    url: api.DelAPI + `/${id}`,
    method: 'delete'
  })
}

// 查询详细
export function getAPIInfo (id) {
  return service({
    url: api.APIInfo + `/${id}`,
    method: 'get'
  })
}
